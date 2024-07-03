// db/initDb.mjs
import db from '../config/database.mjs';

// Create tables
db.serialize(() => {
  // Drop the existing repair_shops table if it exists
  db.run('DROP TABLE IF EXISTS repair_shops');

  // Create services table
  db.run(`
    CREATE TABLE IF NOT EXISTS services (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      price REAL NOT NULL
    )
  `);

  // Create users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      address TEXT
    )
  `);

  // Create bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      service_id INTEGER NOT NULL,
      date TEXT NOT NULL,
      time TEXT NOT NULL,
      status TEXT DEFAULT 'Pending',
      FOREIGN KEY (user_id) REFERENCES users(id),
      FOREIGN KEY (service_id) REFERENCES services(id)
    )
  `);

  // Create repair shops table
  db.run(`
    CREATE TABLE IF NOT EXISTS repair_shops (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      address TEXT NOT NULL,
      phone TEXT,
      description TEXT,
      latitude REAL,
      longitude REAL,
      opening_hours TEXT
    )
  `);

  console.log('Database schema initialized.');
});

// Close the database connection
db.close((err) => {
  if (err) {
    console.error('Error closing database', err.message);
  } else {
    console.log('Database connection closed.');
  }
});