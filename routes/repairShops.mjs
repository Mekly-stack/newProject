import express from 'express';
import db from '../config/database.mjs';

const router = express.Router();

// Haversine formula to calculate distance between two coordinates
function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const R = 6371; // Radius of the Earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

router.get('/repair-shops', (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ success: false, message: 'Latitude and longitude are required' });
  }

  db.all('SELECT * FROM repair_shops', [], (err, rows) => {
    if (err) {
      return res.status(500).json({ success: false, message: 'Error fetching repair shops', error: err.message });
    }

    const nearbyShops = rows.filter(shop => {
      const distance = getDistanceFromLatLonInKm(lat, lng, shop.latitude, shop.longitude);
      return distance <= 10; // Adjust this value as needed for the proximity check
    });

    if (nearbyShops.length > 0) {
      return res.json({ success: true, shops: nearbyShops });
    } else {
      return res.json({ success: false, message: 'No repair shops available in your area' });
    }
  });
});

export default router;