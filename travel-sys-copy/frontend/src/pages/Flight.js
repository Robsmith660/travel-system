import React from 'react';
import FlightList from '../components/FlightList';
import FlightForm from '../components/FlightForm';

function Flights() {
  return (
    <div>
      <h1>Manage Flights</h1>
      <FlightForm />
      <FlightList />
    </div>
  );
}

export default Flights;
