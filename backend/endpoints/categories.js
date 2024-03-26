const express = require('express');
const router = express.Router();
const pool = require("../db");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM categories');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
