const express = require('express');
const router = express.Router();
const pool = require("../db");
const bodyParser = require('body-parser')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 


router.get('/details', async (req, res) => {
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

module.exports = router;
