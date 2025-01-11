const db = require('./db');

(async () => {
  try {
    const [rows] = await db.query('SELECT 1 + 1 AS result');
    console.log('Database connection successful:', rows[0].result);
  } catch (error) {
    console.error('Database connection failed:', error);
  }
})();
