import axios from 'axios';

const API_URL = 'http://localhost:5000';

export const getPassengers = () => {
  return axios.get(`${API_URL}/passengers`);
};

