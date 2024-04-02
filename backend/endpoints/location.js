const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/reported-ads", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from reported_ads");
    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/reported-users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * from reported_users");
    res.json(result);

  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.post("/saveLocation", async (req, res) => {
    const { city, country } = req.body;
    
    try {
      const checkQuery = 'SELECT * FROM locations WHERE city = $1 AND country = $2';
      const checkResult = await pool.query(checkQuery, [city, country]);
  
      if (checkResult.rows.length > 0) {
        return res.status(200).json({ message: 'Location already exists in the database.' });
      }
      const insertQuery = 'INSERT INTO locations (city, country) VALUES ($1, $2)';
      await pool.query(insertQuery, [city, country]);
      
      res.status(200).json({ message: 'Location saved successfully!' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Server Error' });
    }
  });

router.get("/locations", async (req, res) => {
  try {
 
    const query = 'SELECT * FROM locations';
    const result = await pool.query(query);
    
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server Error' });
  }
});

module.exports = router;
