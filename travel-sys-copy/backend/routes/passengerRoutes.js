const express = require('express');
const Passenger = require('../models/Passenger');

const router = express.Router();

// Create a new passenger
router.post('/', async (req, res) => {
  try {
    const newPassenger = new Passenger(req.body);
    const savedPassenger = await newPassenger.save();
    res.status(201).json(savedPassenger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all passengers
router.get('/', async (req, res) => {
  try {
    const passengers = await Passenger.find();
    res.json(passengers);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a passenger
router.put('/:id', async (req, res) => {
  try {
    const updatedPassenger = await Passenger.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!updatedPassenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.json(updatedPassenger);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a passenger
router.delete('/:id', async (req, res) => {
  try {
    const deletedPassenger = await Passenger.findByIdAndDelete(req.params.id);
    if (!deletedPassenger) {
      return res.status(404).json({ message: 'Passenger not found' });
    }
    res.json({ message: 'Passenger deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
