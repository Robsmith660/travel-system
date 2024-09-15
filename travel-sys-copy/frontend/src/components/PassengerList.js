import React, { useEffect, useState } from 'react';
import axios from 'axios';

function PassengerList({ onEdit }) {
  const [passengers, setPassengers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/passengers')
      .then(response => setPassengers(response.data))
      .catch(error => console.error('Error fetching passengers:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this passenger?')) {
      axios.delete(`http://localhost:5000/api/passengers/${id}`)
        .then(() => {
          setPassengers(passengers.filter(passenger => passenger._id !== id));
        })
        .catch(error => console.error('Error deleting passenger:', error));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Passengers</h2>
      <ul>
        {passengers.map(passenger => (
          <li key={passenger._id} className="border p-2 mb-2">
            {passenger.firstName} {passenger.surname} - {passenger.email}
            <button
              onClick={() => onEdit(passenger)}
              className="ml-4 p-1 bg-yellow-500 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(passenger._id)}
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

export default PassengerList;
