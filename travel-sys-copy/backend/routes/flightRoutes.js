const express = require('express');
const Flight = require('../models/Flight');

const router = express.Router();

// Create a new flight
router.post('/', async (req, res) => {
  try {
    const newFlight = new Flight(req.body);
    const savedFlight = await newFlight.save();
    res.status(201).json(savedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all flights
router.get('/', async (req, res) => {
  try {
    const flights = await Flight.find();
    res.json(flights);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a flight by ID
router.put('/:id', async (req, res) => {
  try {
    const updatedFlight = await Flight.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json(updatedFlight);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a flight by ID
router.delete('/:id', async (req, res) => {
  try {
    const deletedFlight = await Flight.findByIdAndDelete(req.params.id);
    if (!deletedFlight) {
      return res.status(404).json({ message: 'Flight not found' });
    }
    res.json({ message: 'Flight deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
