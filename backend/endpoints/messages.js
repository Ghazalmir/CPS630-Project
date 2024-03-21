const express = require("express");
const router = express.Router();
const pool = require("../db");
const bodyParser = require("body-parser");
router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/messages", async (req, res) => {
	try {
		const signedInUserID = req.query.signedInUserID;

		const result = await pool.query(
			`SELECT
            m.*,
            sender.first_name AS sender_first_name,
            sender.last_name AS sender_last_name,
            receiver.first_name AS receiver_first_name,
            receiver.last_name AS receiver_last_name
        FROM
            Messages m
        INNER JOIN
            Users sender ON m.Sender_id = sender.id
        INNER JOIN
            Users receiver ON m.Receiver_id = receiver.id
        WHERE
            m.Sender_id = $1 OR m.Receiver_id = $1;`,
			[signedInUserID]
		);
		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.get("/conversations", async (req, res) => {
	try {
		const signedInUserID = req.query.signedInUserID;

		const result = await pool.query(
			`SELECT
      c.*,
      user1.first_name AS user1_first_name,
      user1.last_name AS user1_last_name,
      user2.first_name AS user2_first_name,
      user2.last_name AS user2_last_name
  FROM
      Conversations c
  INNER JOIN
      Users user1 ON c.Userid1 = user1.id
  INNER JOIN
      Users user2 ON c.Userid2 = user2.id
  WHERE
      c.Userid1 = $1 OR c.Userid2 = $1;`,
			[signedInUserID]
		);
		res.json(result.rows);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post("/messages", async (req, res) => {
	try {
		const result = await pool.query(
			`INSERT INTO messages (sender_id, receiver_id, message, time_stamp, conversation_id)
      VALUES ($1, $2, $3, CURRENT_TIMESTAMP, $4);`,
			[req.body.senderID, req.body.recieverID, req.body.message, req.body.conversation_id]
		);
		res.status(201).json(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});



module.exports = router;
