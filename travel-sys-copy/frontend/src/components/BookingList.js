import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookingList({ onEdit }) {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/bookings')
      .then(response => setBookings(response.data))
      .catch(error => console.error('Error fetching bookings:', error));
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      axios.delete(`http://localhost:5000/api/bookings/${id}`)
        .then(() => {
          setBookings(bookings.filter(booking => booking._id !== id));
        })
        .catch(error => console.error('Error deleting booking:', error));
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">Bookings</h2>
      <ul>
        {bookings.map(booking => (
          <li key={booking._id} className="border p-2 mb-2">
            Booking Date: {new Date(booking.bookingDate).toLocaleDateString()}, 
            Flight: {booking.flight.flightNumber}, 
            Passengers: {booking.passengers.map(p => `${p.firstName} ${p.surname}`).join(', ')}
            <button
              onClick={() => onEdit(booking)}
              className="ml-4 p-1 bg-yellow-500 text-white"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(booking._id)}
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

export default BookingList;
