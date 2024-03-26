const express = require("express");
const router = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

// Get all categories
router.get("/sections", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
