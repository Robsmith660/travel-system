const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  bookingDate: { type: Date, required: true },
  departureCountry: { type: String, required: true },
  arrivalCountry: { type: String, required: true },
  passengers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Passenger', required: true }],
  flight: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
  estimatedLengthOfFlight: { type: Number, required: true },
  flightType: { type: String, enum: ['Domestic', 'International', 'Intercontinental'], required: true },
  numberOfCrewMembers: { type: Number, required: true },
  complimentaryDrink: { type: String, enum: ['Blueberry', 'Strawberry', 'Water', 'Other'], required: true }
});

module.exports = mongoose.model('Booking', bookingSchema);
