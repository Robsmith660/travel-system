const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  aircraftType: { type: String, required: true },
  pilotName: { type: String, required: true },
  coPilotName: { type: String, required: true },
  flightNumber: { type: String, required: true, unique: true },
  homeCountry: { type: String, required: true },
  cabinCrew: {
    managerName: { type: String, required: true },
    steward1Name: { type: String },
    steward2Name: { type: String, required: true },
    steward3Name: { type: String, required: true }
  }
});

module.exports = mongoose.model('Flight', flightSchema);
