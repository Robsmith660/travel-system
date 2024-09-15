import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookingForm({ selectedBooking, onBookingUpdated }) {
  const [formData, setFormData] = useState({
    bookingDate: '',
    departureCountry: '',
    arrivalCountry: '',
    passengers: [],
    flight: '',
    estimatedLengthOfFlight: '',
    flightType: 'Domestic',
    numberOfCrewMembers: '',
    complimentaryDrink: 'Water',
    otherDrink: '' 
  });

  const [errors, setErrors] = useState({});
  const [passengers, setPassengers] = useState([]);
  const [flights, setFlights] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/passengers')
      .then(response => setPassengers(response.data))
      .catch(error => console.error('Error fetching passengers:', error));

    axios.get('http://localhost:5000/api/flights')
      .then(response => setFlights(response.data))
      .catch(error => console.error('Error fetching flights:', error));

    if (selectedBooking) {
      setFormData(selectedBooking);
    }
  }, [selectedBooking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePassengersChange = (e) => {
    const selectedPassengers = Array.from(e.target.selectedOptions, option => option.value);
    setFormData({ ...formData, passengers: selectedPassengers });
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.bookingDate) {
      newErrors.bookingDate = 'Booking Date is required';
    }
    if (!formData.departureCountry) {
      newErrors.departureCountry = 'Departure Country is required';
    }
    if (!formData.arrivalCountry) {
      newErrors.arrivalCountry = 'Arrival Country is required';
    }
    if (formData.passengers.length === 0) {
      newErrors.passengers = 'At least one passenger is required';
    }
    if (formData.passengers.length > 10) {
      newErrors.passengers = 'No more than 10 passengers are allowed';
    }
    if (!formData.flight) {
      newErrors.flight = 'Flight selection is required';
    }
    if (!formData.estimatedLengthOfFlight) {
      newErrors.estimatedLengthOfFlight = 'Estimated Length of Flight is required';
    }
    if (!formData.complimentaryDrink || (formData.complimentaryDrink === 'Other' && !formData.otherDrink)) {
      newErrors.complimentaryDrink = 'Complimentary Drink is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const dataToSubmit = {
      ...formData,
      complimentaryDrink: formData.complimentaryDrink === 'Other' ? formData.otherDrink : formData.complimentaryDrink,
    };

    if (selectedBooking) {
      axios.put(`http://localhost:5000/api/bookings/${selectedBooking._id}`, dataToSubmit)
        .then(response => {
          onBookingUpdated(response.data);
        })
        .catch(error => console.error('Error updating booking:', error));
    } else {
      axios.post('http://localhost:5000/api/bookings', dataToSubmit)
        .then(response => {
          onBookingUpdated(response.data);
          setFormData({
            bookingDate: '',
            departureCountry: '',
            arrivalCountry: '',
            passengers: [],
            flight: '',
            estimatedLengthOfFlight: '',
            flightType: 'Domestic',
            numberOfCrewMembers: '',
            complimentaryDrink: 'Water',
            otherDrink: ''
          });
        })
        .catch(error => console.error('Error adding booking:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Booking Date*</label>
        <input
          type="date"
          name="bookingDate"
          value={formData.bookingDate}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.bookingDate && <p className="text-red-600">{errors.bookingDate}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Departure Country*</label>
        <input
          type="text"
          name="departureCountry"
          value={formData.departureCountry}
          onChange={handleChange}
          placeholder="Departure Country"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.departureCountry && <p className="text-red-600">{errors.departureCountry}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Arrival Country*</label>
        <input
          type="text"
          name="arrivalCountry"
          value={formData.arrivalCountry}
          onChange={handleChange}
          placeholder="Arrival Country"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.arrivalCountry && <p className="text-red-600">{errors.arrivalCountry}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Passenger(s)*</label>
        <select
          multiple
          name="passengers"
          value={formData.passengers}
          onChange={handlePassengersChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          {passengers.map(passenger => (
            <option key={passenger._id} value={passenger._id}>
              {passenger.firstName} {passenger.surname}
            </option>
          ))}
        </select>
        {errors.passengers && <p className="text-red-600">{errors.passengers}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Flight*</label>
        <select
          name="flight"
          value={formData.flight}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Flight</option>
          {flights.map(flight => (
            <option key={flight._id} value={flight._id}>
              {flight.flightNumber} - {flight.aircraftType}
            </option>
          ))}
        </select>
        {errors.flight && <p className="text-red-600">{errors.flight}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Estimated Length of Flight (Hrs)*</label>
        <input
          type="number"
          name="estimatedLengthOfFlight"
          value={formData.estimatedLengthOfFlight}
          onChange={handleChange}
          placeholder="Estimated Length of Flight"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.estimatedLengthOfFlight && <p className="text-red-600">{errors.estimatedLengthOfFlight}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Flight Type*</label>
        <select
          name="flightType"
          value={formData.flightType}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="Domestic">Domestic</option>
          <option value="International">International</option>
          <option value="Intercontinental">Intercontinental</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Number of Crew Members</label>
        <input
          type="number"
          name="numberOfCrewMembers"
          value={formData.numberOfCrewMembers}
          onChange={handleChange}
          placeholder="Number of Crew Members"
          className="block w-full p-2 border border-gray-300 rounded"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Complimentary Drink*</label>
        <select
          name="complimentaryDrink"
          value={formData.complimentaryDrink}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="Water">Water</option>
          <option value="Blueberry">Blueberry</option>
          <option value="Strawberry">Strawberry</option>
          <option value="Other">Other (specify)</option>
        </select>
        {formData.complimentaryDrink === 'Other' && (
          <input
            type="text"
            name="otherDrink"
            value={formData.otherDrink}
            onChange={handleChange}
            placeholder="Specify Drink"
            className="mt-2 block w-full p-2 border border-gray-300 rounded"
          />
        )}
        {errors.complimentaryDrink && <p className="text-red-600">{errors.complimentaryDrink}</p>}
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {selectedBooking ? 'Update Booking' : 'Add Booking'}
      </button>
    </form>
  );
}

export default BookingForm;
