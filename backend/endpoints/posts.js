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

router.get('/products', async (req, res) => {
	try {
		const result = await pool.query('SELECT * FROM products;');
		res.json(result);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post("/postNewAd", async (req, res) => {
	try {
		const {user_id, location_id, title, description, price, is_available, category_id, meet_on_campus}
		 = {...req.body};
    /* FIX THE user id and location and SUB CATEGORY FIELD, also add images*/
		const result = await pool.query(
      `INSERT INTO products (User_id, Location_id, title, Description, Price, Is_available, Category_id, Subcategory_id, meet_on_campus, Date_posted)
      VALUES ($1, $2, $3, $4, $5, $6, $7, 1, $8, CURRENT_TIMESTAMP);`,
			[user_id, location_id, title, description, price, is_available, category_id, meet_on_campus]
		);
		res.status(201).json(result.rows[0]);
		console.log(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

router.post("/updateAd", async (req, res) => {
	try {
		const {product_id, values} = {...req.body};
		const {location_id, title, description, price, category_id, meet_on_campus, is_available} = {...values};
		const result = await pool.query(
      `UPDATE products 
			SET location_id = $1, title = $2, description = $3, price = $4, category_id = $5, meet_on_campus = $6, is_available = $7 
			WHERE product_id = $8;`,
			[location_id, title, description, price, category_id, meet_on_campus, is_available, product_id]
		);
		res.status(201).json(result.rows[0]);
		console.log(result.rows[0]);
	} catch (error) {
		console.error(error);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
