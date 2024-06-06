import express from 'express';
import bodyParser from 'body-parser';
import serviceRoutes from './routes/services.mjs';
import bookingRoutes from './routes/bookings.mjs';
import userRoutes from './routes/users.mjs'; // Import user routes

const app = express();
app.use(bodyParser.json());

// Use the service routes
app.use('/api/services', serviceRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/users', userRoutes); // Use the user routes

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});