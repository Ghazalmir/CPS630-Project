const express = require('express');
const router = express.Router();
const pool = require("../db");
const bodyParser = require('body-parser')
router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended: true })); 

router.get('/adDetails/:id', async (req, res) => {
	try {
		const productId = req.query.id;

    const result = await pool.query('SELECT * FROM products WHERE products.Product_id = $1;', [productId]);
    console.log(productId);
    res.json(result);

	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});




module.exports = router;
