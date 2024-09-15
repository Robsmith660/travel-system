import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PassengerForm({ selectedPassenger, onPassengerUpdated }) {
  const [formData, setFormData] = useState({
    title: '',
    otherTitle: '', 
    firstName: '',
    surname: '',
    phoneNumber: '',
    email: '',
    homeAddress: {
      addressLine1: '',
      addressLine2: '',
      town: '',
      countyCity: '',
      eircode: ''
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedPassenger) {
      setFormData(selectedPassenger);
    }
  }, [selectedPassenger]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('homeAddress.')) {
      const addressKey = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        homeAddress: {
          ...prevState.homeAddress,
          [addressKey]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.title || (formData.title === 'Other' && !formData.otherTitle)) {
      newErrors.title = 'Title is required';
    }
    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
    }
    if (!formData.surname) {
      newErrors.surname = 'Surname is required';
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone Number is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email Address is required';
    }
    if (!formData.homeAddress.addressLine1) {
      newErrors.addressLine1 = 'Address Line 1 is required';
    }
    if (!formData.homeAddress.town) {
      newErrors.town = 'Town is required';
    }
    if (!formData.homeAddress.countyCity) {
      newErrors.countyCity = 'County/City is required';
    }
    if (!formData.homeAddress.eircode) {
      newErrors.eircode = 'EIRCODE is required';
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
      title: formData.title === 'Other' ? formData.otherTitle : formData.title,
    };

    if (selectedPassenger) {
      axios.put(`http://localhost:5000/api/passengers/${selectedPassenger._id}`, dataToSubmit)
        .then(response => {
          onPassengerUpdated(response.data);
        })
        .catch(error => console.error('Error updating passenger:', error));
    } else {
      axios.post('http://localhost:5000/api/passengers', dataToSubmit)
        .then(response => {
          onPassengerUpdated(response.data);
          setFormData({
            title: '',
            otherTitle: '',
            firstName: '',
            surname: '',
            phoneNumber: '',
            email: '',
            homeAddress: {
              addressLine1: '',
              addressLine2: '',
              town: '',
              countyCity: '',
              eircode: ''
            }
          });
        })
        .catch(error => console.error('Error adding passenger:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Title*</label>
        <select
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Title</option>
          <option value="Mx">Mx</option>
          <option value="Ms">Ms</option>
          <option value="Mr">Mr</option>
          <option value="Mrs">Mrs</option>
          <option value="Miss">Miss</option>
          <option value="Dr">Dr</option>
          <option value="Other">Other (specify)</option>
        </select>
        {formData.title === 'Other' && (
          <input
            type="text"
            name="otherTitle"
            value={formData.otherTitle}
            onChange={handleChange}
            placeholder="Specify Title"
            className="mt-2 block w-full p-2 border border-gray-300 rounded"
          />
        )}
        {errors.title && <p className="text-red-600">{errors.title}</p>}
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700">First Name(s)*</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          placeholder="First Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.firstName && <p className="text-red-600">{errors.firstName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Surname*</label>
        <input
          type="text"
          name="surname"
          value={formData.surname}
          onChange={handleChange}
          placeholder="Surname"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.surname && <p className="text-red-600">{errors.surname}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Phone Number*</label>
        <input
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          placeholder="Phone Number"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.phoneNumber && <p className="text-red-600">{errors.phoneNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Email Address*</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email Address"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.email && <p className="text-red-600">{errors.email}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Home Address*</label>
        <input
          type="text"
          name="homeAddress.addressLine1"
          value={formData.homeAddress.addressLine1}
          onChange={handleChange}
          placeholder="Address Line 1"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.addressLine1 && <p className="text-red-600">{errors.addressLine1}</p>}

        <input
          type="text"
          name="homeAddress.addressLine2"
          value={formData.homeAddress.addressLine2}
          onChange={handleChange}
          placeholder="Address Line 2"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="homeAddress.town"
          value={formData.homeAddress.town}
          onChange={handleChange}
          placeholder="Town"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />
        {errors.town && <p className="text-red-600">{errors.town}</p>}

        <input
          type="text"
          name="homeAddress.countyCity"
          value={formData.homeAddress.countyCity}
          onChange={handleChange}
          placeholder="County/City"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />
        {errors.countyCity && <p className="text-red-600">{errors.countyCity}</p>}

        <input
          type="text"
          name="homeAddress.eircode"
          value={formData.homeAddress.eircode}
          onChange={handleChange}
          placeholder="EIRCODE"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />
        {errors.eircode && <p className="text-red-600">{errors.eircode}</p>}
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {selectedPassenger ? 'Update Passenger' : 'Add Passenger'}
      </button>
    </form>
  );
}

export default PassengerForm;
