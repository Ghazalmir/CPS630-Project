const express = require("express");
const router = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
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

router.post("/reported-ads", async (req, res) => {
  try {
    const { ad_id, reason } = req.body;
    const result = await pool.query(
      "INSERT INTO reported_ads (ad_id, reason) VALUES ($1, $2) RETURNING *",
      [ad_id, reason]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

// Create reported user
router.post("/reported-users", async (req, res) => {
  try {
    const { reported_user_id, reported_by_user_id, reason } = req.body;
    const result = await pool.query(
      "INSERT INTO reported_users (reported_user_id, reported_by_user_id, reason) VALUES ($1, $2, $3) RETURNING *",
      [reported_user_id, reported_by_user_id, reason]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

router.get("/users", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM users");
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
