// db.js
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: 'postgresql://matt:DHhC31SCPYfWth-sbqSuuA@tmubuysell-7310.g8z.gcp-us-east1.cockroachlabs.cloud:26257/defaultdb?sslmode=verify-full',
  ssl: {
    rejectUnauthorized: false,
  }
});

module.exports = pool;
