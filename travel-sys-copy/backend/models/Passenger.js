const mongoose = require('mongoose');

const passengerSchema = new mongoose.Schema({
  title: { type: String, required: true },
  firstName: { type: String, required: true },
  surname: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  homeAddress: {
    addressLine1: { type: String, required: true },
    addressLine2: { type: String },
    town: { type: String, required: true },
    countyCity: { type: String, required: true },
    eircode: { type: String, required: true }
  }
});

module.exports = mongoose.model('Passenger', passengerSchema);
