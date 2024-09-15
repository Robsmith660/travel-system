import React, { useState } from 'react';
import FlightForm from '../components/FlightForm';
import FlightList from '../components/FlightList';

function Flights() {
  const [selectedFlight, setSelectedFlight] = useState(null);
  const [flights, setFlights] = useState([]);

  const handleFlightUpdated = (updatedFlight) => {
    if (selectedFlight) {
      setFlights(flights.map(f => (f._id === updatedFlight._id ? updatedFlight : f)));
      setSelectedFlight(null); // Clear form after update
    } else {
      setFlights([...flights, updatedFlight]);
    }
  };

  const handleEdit = (flight) => {
    setSelectedFlight(flight);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Flights</h1>
      <FlightForm selectedFlight={selectedFlight} onFlightUpdated={handleFlightUpdated} />
      <FlightList onEdit={handleEdit} />
    </div>
  );
}

export default Flights;
