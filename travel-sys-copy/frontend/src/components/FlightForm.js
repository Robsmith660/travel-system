import React, { useState, useEffect } from 'react';
import axios from 'axios';

function FlightForm({ selectedFlight, onFlightUpdated }) {
  const [formData, setFormData] = useState({
    aircraftType: '',
    otherAircraftType: '',
    pilotName: '',
    coPilotName: '',
    flightNumber: '',
    homeCountry: '',
    cabinCrew: {
      managerName: '',
      steward1Name: '',
      steward2Name: '',
      steward3Name: ''
    }
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (selectedFlight) {
      setFormData(selectedFlight);
    }
  }, [selectedFlight]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('cabinCrew.')) {
      const crewKey = name.split('.')[1];
      setFormData(prevState => ({
        ...prevState,
        cabinCrew: {
          ...prevState.cabinCrew,
          [crewKey]: value
        }
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.aircraftType || (formData.aircraftType === 'Other' && !formData.otherAircraftType)) {
      newErrors.aircraftType = 'Aircraft Type is required';
    }
    if (!formData.pilotName) {
      newErrors.pilotName = 'Pilot Name is required';
    }
    if (!formData.coPilotName) {
      newErrors.coPilotName = 'Co-pilot Name is required';
    }
    if (!formData.flightNumber) {
      newErrors.flightNumber = 'Flight Number is required';
    }
    if (!formData.homeCountry) {
      newErrors.homeCountry = 'Home Country is required';
    }
    if (!formData.cabinCrew.managerName) {
      newErrors.managerName = 'Manager Name is required';
    }
    if (!formData.cabinCrew.steward2Name) {
      newErrors.steward2Name = 'Steward 2 Name is required';
    }
    if (!formData.cabinCrew.steward3Name) {
      newErrors.steward3Name = 'Steward 3 Name is required';
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
      aircraftType: formData.aircraftType === 'Other' ? formData.otherAircraftType : formData.aircraftType,
    };

    if (selectedFlight) {
      axios.put(`http://localhost:5000/api/flights/${selectedFlight._id}`, dataToSubmit)
        .then(response => {
          onFlightUpdated(response.data);
        })
        .catch(error => console.error('Error updating flight:', error));
    } else {
      axios.post('http://localhost:5000/api/flights', dataToSubmit)
        .then(response => {
          onFlightUpdated(response.data);
          setFormData({
            aircraftType: '',
            otherAircraftType: '',
            pilotName: '',
            coPilotName: '',
            flightNumber: '',
            homeCountry: '',
            cabinCrew: {
              managerName: '',
              steward1Name: '',
              steward2Name: '',
              steward3Name: ''
            }
          });
        })
        .catch(error => console.error('Error adding flight:', error));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Aircraft Type*</label>
        <select
          name="aircraftType"
          value={formData.aircraftType}
          onChange={handleChange}
          className="block w-full p-2 border border-gray-300 rounded"
        >
          <option value="">Select Aircraft Type</option>
          <option value="LyonAir">LyonAir</option>
          <option value="Eire Airlines">Eire Airlines</option>
          <option value="Vector">Vector</option>
          <option value="Other">Other (specify)</option>
        </select>
        {formData.aircraftType === 'Other' && (
          <input
            type="text"
            name="otherAircraftType"
            value={formData.otherAircraftType}
            onChange={handleChange}
            placeholder="Specify Aircraft Type"
            className="mt-2 block w-full p-2 border border-gray-300 rounded"
          />
        )}
        {errors.aircraftType && <p className="text-red-600">{errors.aircraftType}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Pilot Name(s)*</label>
        <input
          type="text"
          name="pilotName"
          value={formData.pilotName}
          onChange={handleChange}
          placeholder="Pilot Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.pilotName && <p className="text-red-600">{errors.pilotName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Co-pilot Name*</label>
        <input
          type="text"
          name="coPilotName"
          value={formData.coPilotName}
          onChange={handleChange}
          placeholder="Co-pilot Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.coPilotName && <p className="text-red-600">{errors.coPilotName}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Flight Number*</label>
        <input
          type="text"
          name="flightNumber"
          value={formData.flightNumber}
          onChange={handleChange}
          placeholder="Flight Number"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.flightNumber && <p className="text-red-600">{errors.flightNumber}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Home Country*</label>
        <input
          type="text"
          name="homeCountry"
          value={formData.homeCountry}
          onChange={handleChange}
          placeholder="Home Country"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.homeCountry && <p className="text-red-600">{errors.homeCountry}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cabin Crew*</label>

        <input
          type="text"
          name="cabinCrew.managerName"
          value={formData.cabinCrew.managerName}
          onChange={handleChange}
          placeholder="Manager Name"
          className="block w-full p-2 border border-gray-300 rounded"
        />
        {errors.managerName && <p className="text-red-600">{errors.managerName}</p>}

        <input
          type="text"
          name="cabinCrew.steward1Name"
          value={formData.cabinCrew.steward1Name}
          onChange={handleChange}
          placeholder="Steward 1 Name"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />

        <input
          type="text"
          name="cabinCrew.steward2Name"
          value={formData.cabinCrew.steward2Name}
          onChange={handleChange}
          placeholder="Steward 2 Name"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />
        {errors.steward2Name && <p className="text-red-600">{errors.steward2Name}</p>}

        <input
          type="text"
          name="cabinCrew.steward3Name"
          value={formData.cabinCrew.steward3Name}
          onChange={handleChange}
          placeholder="Steward 3 Name"
          className="mt-2 block w-full p-2 border border-gray-300 rounded"
        />
        {errors.steward3Name && <p className="text-red-600">{errors.steward3Name}</p>}
      </div>

      <button type="submit" className="p-2 bg-blue-500 text-white rounded">
        {selectedFlight ? 'Update Flight' : 'Add Flight'}
      </button>
    </form>
  );
}

export default FlightForm;
