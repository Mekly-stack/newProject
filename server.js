const express = require('express');
const path = require('path');
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

// API endpoint for car repair shops
app.get('/api/repair-shops', (req, res) => {
  const address = req.query.address;
  const shops = [
    { id: 1, name: 'Repair Shop 1', location: 'City A' },
    { id: 2, name: 'Repair Shop 2', location: 'City B' }
  ];

  // Simulate matching logic
  const matchedShop = shops.find(shop => shop.location.toLowerCase() === address.toLowerCase());

  if (matchedShop) {
    res.json({ success: true, shop: matchedShop });
  } else {
    res.json({ success: false });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});