import React, { useState } from 'react';
import BookingForm from '../components/BookingForm';
import BookingList from '../components/BookingList';

function Bookings() {
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [bookings, setBookings] = useState([]);

  const handleBookingUpdated = (updatedBooking) => {
    if (selectedBooking) {
      setBookings(bookings.map(b => (b._id === updatedBooking._id ? updatedBooking : b)));
      setSelectedBooking(null); // Clear form after update#
    } else {
      setBookings([...bookings, updatedBooking]);
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">Manage Bookings</h1>
      <BookingForm selectedBooking={selectedBooking} onBookingUpdated={handleBookingUpdated} />
      <BookingList onEdit={handleEdit} />
    </div>
  );
}

export default Bookings;
