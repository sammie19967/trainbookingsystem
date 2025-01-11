const mysql = require('mysql2');

const pool = mysql.createPool({
  host: 'localhost', 
  user: 'root',     
  password: '0000',      
  database: 'train_booking', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool.promise();
