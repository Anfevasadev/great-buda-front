import axios from 'axios';

export const registerUser = async (dataToSend) => {
  const response = await axios.post(`${process.env.API_URL}/api/auth/register`, dataToSend, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};

export const loginUser = async (dataToSend) => {
  const response = await axios.post(`${process.env.API_URL}/api/auth/login`, dataToSend, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
};