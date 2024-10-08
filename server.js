import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import repairShopsRouter from './routes/repairShops.mjs';

// Load environment variables from .env file
dotenv.config();
console.log('GOOGLE_MAPS_API_KEY:', process.env.GOOGLE_MAPS_API_KEY); // Verify that the API key is loaded

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

app.use(cors()); // Use CORS middleware
app.use(express.json());

// Serve static files from the root directory (since files are now in the root)
app.use(express.static(__dirname)); // Adjusted to serve the root directory

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html')); // Adjusted to root
});

app.get('/booking', (req, res) => {
  res.sendFile(path.join(__dirname, 'booking.html')); // Adjusted to root
});

// Use the repair shops router
app.use('/api', repairShopsRouter);

// Endpoint to fetch the Google Maps API key
app.get('/api/key', (req, res) => {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY;
  if (apiKey) {
    res.json({ apiKey });
  } else {
    res.status(500).json({ error: 'API key not found' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});