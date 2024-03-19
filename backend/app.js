const express = require('express');
const app = express();
const mysql = require('mysql');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'username',
  password: 'password',
  database: 'my_database'
});

const port = 8080;

const profileRoutes = require("./endpoints/profile")

app.use('/profile', profileRoutes)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
