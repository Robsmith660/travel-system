// Database Design Explanation:
// The MongoDB database is structured with three main collections: Passengers, Flights, and Bookings.
// Passengers and Flights are related through the Bookings collection, which references both.
// Each Booking document includes a reference to a single Flight and up to ten Passengers.
// This design was chosen for its simplicity and efficiency.


const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const flightRoutes = require('./routes/flightRoutes');
const bookingRoutes = require('./routes/bookingRoutes');
const passengerRoutes = require('./routes/passengerRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/flights', flightRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/passengers', passengerRoutes);
console.log('Routes are set up');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('API is running...');
});
