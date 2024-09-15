import React, { useState } from 'react';
import PassengerForm from '../components/PassengerForm';
import PassengerList from '../components/PassengerList';

function Passengers() {
  const [selectedPassenger, setSelectedPassenger] = useState(null);
  const [passengers, setPassengers] = useState([]);

  const handlePassengerUpdated = (updatedPassenger) => {
    if (selectedPassenger) {
      setPassengers(passengers.map(p => (p._id === updatedPassenger._id ? updatedPassenger : p)));
      setSelectedPassenger(null); // Clear form after update
    } else {
      setPassengers([...passengers, updatedPassenger]);
    }
  };

  const handleEdit = (passenger) => {
    setSelectedPassenger(passenger);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Passengers</h1>
      <PassengerForm selectedPassenger={selectedPassenger} onPassengerUpdated={handlePassengerUpdated} />
      <PassengerList onEdit={handleEdit} />
    </div>
  );
}

export default Passengers;
