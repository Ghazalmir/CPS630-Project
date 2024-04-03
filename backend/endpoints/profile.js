const express = require('express');
const router = express.Router();
const pool = require("../db");
const bodyParser = require('body-parser')
const jwtMiddleware = require('../jwtMiddleware')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 
const bcrypt = require('bcrypt')

const jwt = require('jsonwebtoken')



router.get('/details', jwtMiddleware, async (req, res) => {
  try {
    const signedInUserID = req.query.signedInUserID;

    const result = await pool.query('SELECT * FROM users WHERE id = $1', [signedInUserID]);
    console.log(signedInUserID)
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

router.put('/update', async (req, res) => {
  const { id, first_name, last_name, email, phone_number } = req.body;
  try {
      await pool.query('UPDATE users SET first_name = $1, last_name = $2, email = $3, phone_number = $4 WHERE id = $5',
      [first_name, last_name, email, phone_number, id]
    );
    res.status(200).json({ message: 'User details updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { firstName, lastName, email, phoneNumber, password } = req.body;

  // First, check if there's already a user with that email
  try {
    const checkUserResult = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
    if (checkUserResult.rows.length > 0) {
      // User already exists with the given email
      return res.status(409).json({ error: "A user with that email already exists." });
    }
  } catch (error) {
    console.error("Error checking user existence:", error);
    return res.status(500).json({ error: "Server Error" });
  }

  // If no user exists, hash the password and proceed to create the user
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Begin a transaction to ensure both inserts are executed or none at all
    const client = await pool.connect();

    try {
      await client.query('BEGIN');
      const insertUserText = 'INSERT INTO users (is_admin, first_name, last_name, email, phone_number) VALUES ($1, $2, $3, $4, $5) RETURNING id';
      const insertUserValues = [0, firstName, lastName, email, phoneNumber];
      
      // Insert the user and get the user id
      const userResult = await client.query(insertUserText, insertUserValues);
      const userId = userResult.rows[0].id;

      // Insert the hashed password with the returned user id
      const insertPasswordText = 'INSERT INTO passwords (user_id, hashed_password) VALUES ($1, $2)';
      const insertPasswordValues = [userId, hashedPassword];
      await client.query(insertPasswordText, insertPasswordValues);

      // Commit the transaction
      await client.query('COMMIT');

      const token = jwt.sign({id: userId}, "jwtsecret", {
        expiresIn: "1h",
      });

      res.json({ token: token });
    } catch (error) {
      await client.query('ROLLBACK'); // If an error occurs, rollback the transaction
      console.error("Transaction error:", error);
      res.status(500).json({ error: 'Server Error' });
    } finally {
      client.release(); // Release the client back to the pool
    }
  } catch (error) {
    console.error("Error hashing password:", error);
    res.status(500).json({ error: 'Server Error' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if user exists and get their hashed password along with other details
    const query = `
      SELECT users.id, users.email, passwords.hashed_password, users.is_admin 
      FROM users 
      JOIN passwords ON users.id = passwords.user_id 
      WHERE users.email = $1
    `;
    const userResult = await pool.query(query, [email]);
    
    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User does not exist." });
    }

    const user = userResult.rows[0];

    // Compare provided password with hashed password in database
    const match = await bcrypt.compare(password, user.hashed_password);

    if (!match) {
      return res.status(401).json({ error: "Password does is incorrect." });
    }

    const id = user.id
    const token = jwt.sign({id: id}, "jwtsecret", {
      expiresIn: "1h",
    });

    res.json({ token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server Error" });
  }
});



module.exports = router;
