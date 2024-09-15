// API Routes:
// GET /api/passengers - Retrieve all passengers
// POST /api/passengers - Create a new passenger
// PUT /api/passengers/:id - Update a passenger
// DELETE /api/passengers/:id - Delete a passenger

// GET /api/flights - Retrieve all flights
// POST /api/flights - Create a new flight
// PUT /api/flights/:id - Update a flight
// DELETE /api/flights/:id - Delete a flight

// GET /api/bookings - Retrieve all bookings
// POST /api/bookings - Create a new booking
// PUT /api/bookings/:id - Update a booking
// DELETE /api/bookings/:id - Delete a booking

import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './pages/Home';
import Passengers from './pages/Passengers';
import Flights from './pages/Flights';
import Bookings from './pages/Bookings';

function App() {
  return (
    <Router>
      <div className="bg-gray-800 text-white">
        <nav className="container mx-auto p-4 flex justify-between">
          <div className="text-2xl font-bold">Robs Travel Management System</div>
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-yellow-500">Home</Link></li>
            <li><Link to="/passengers" className="hover:text-yellow-500">Passengers</Link></li>
            <li><Link to="/flights" className="hover:text-yellow-500">Flights</Link></li>
            <li><Link to="/bookings" className="hover:text-yellow-500">Bookings</Link></li>
          </ul>
        </nav>
      </div>
      <div className="container mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/passengers" element={<Passengers />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/bookings" element={<Bookings />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
