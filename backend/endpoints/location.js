const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

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
