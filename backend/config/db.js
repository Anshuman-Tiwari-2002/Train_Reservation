const { Pool } = require('pg');

// Set up PostgreSQL connection
const pool = new Pool({
  user: 'your_user',
  host: 'localhost',
  database: 'train_booking',
  password: 'your_password',
  port: 5432,
});

module.exports = pool;
