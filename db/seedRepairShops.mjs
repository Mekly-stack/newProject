// db/seedRepairShops.mjs
import db from '../config/database.mjs';

const seedData = [
  ['QuickFix Auto Repair', '123 Main St, Stockholm', '123-456-7890', 'Fast and reliable auto repair services.', 59.3293, 18.0686, 'Mon-Fri 8am-5pm'],
  ['Reliable Mechanics', '456 Elm St, Stockholm', '098-765-4321', 'Experienced mechanics for all your car needs.', 59.3313, 18.0708, 'Mon-Sat 9am-6pm']
];

db.serialize(() => {
  const stmt = db.prepare('INSERT INTO repair_shops (name, address, phone, description, latitude, longitude, opening_hours) VALUES (?, ?, ?, ?, ?, ?, ?)');
  for (const shop of seedData) {
    stmt.run(shop, (err) => {
      if (err) {
        console.error('Error inserting data:', err.message);
      }
    });
  }
  stmt.finalize();

  console.log('Repair shops data seeded.');

  db.close((err) => {
    if (err) {
      console.error('Error closing database', err.message);
    } else {
      console.log('Database connection closed.');
    }
  });
});