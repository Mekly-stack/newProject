import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'booking.html'));
});

app.get('/api/repair-shops', (req, res) => {
  const address = req.query.address;
  const shops = [
    { id: 1, name: 'Repair Shop 1', location: 'City A' },
    { id: 2, name: 'Repair Shop 2', location: 'City B' }
  ];

  const matchedShop = shops.find(shop => shop.location.toLowerCase() === address.toLowerCase());

  if (matchedShop) {
    res.json({ success: true, shop: matchedShop });
  } else {
    res.json({ success: false });
  }
});

// Endpoint to fetch the Google Maps API key
app.get('/api/key', (req, res) => {
  res.json({ apiKey: process.env.GOOGLE_MAPS_API_KEY });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});