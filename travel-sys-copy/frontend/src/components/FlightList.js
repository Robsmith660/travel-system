import React, { useEffect, useState } from 'react';
import axios from 'axios';

function FlightList({ onEdit }) {
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error fetching flights:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this flight?')) {
      axios.delete(`http://localhost:5000/api/flights/${id}`)
        .then(() => {
          setFlights(flights.filter(flight => flight._id !== id));
        })
        .catch(error => console.error('Error deleting flight:', error));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Flights</h2>
      <ul>
        {flights.map(flight => (
          <li key={flight._id} className="border p-2 mb-2">
            {flight.flightNumber} - {flight.aircraftType} - {flight.pilotName}
            <button
              onClick={() => onEdit(flight)}
              className="ml-4 p-1 bg-yellow-500 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(flight._id)}
              className="ml-2 p-1 bg-red-500 text-white"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FlightList;
