// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'I will send this on discord',
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;
