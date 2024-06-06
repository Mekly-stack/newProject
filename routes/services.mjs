// routes/services.mjs
import express from 'express';
import db from '../config/database.mjs';

const router = express.Router();

router.post('/add-service', (req, res) => {
  const { name, description, price } = req.body;

  db.run(`
    INSERT INTO services (name, description, price)
    VALUES (?, ?, ?)`,
    [name, description, price],
    function(err) {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.json({ serviceId: this.lastID });
    }
  );
});

export default router;