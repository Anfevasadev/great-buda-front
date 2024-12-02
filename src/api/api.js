import axios from 'axios';

export const registerUser = async (dataToSend) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/api/auth/register`, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error registering user:', error);
    throw error.response ? error.response.data : new Error('Error registering user');
  }
};

export const loginUser = async (dataToSend) => {
  try {
    const response = await axios.post(`${process.env.API_URL}/api/auth/login`, dataToSend, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error logging in user:', error);
    throw error.response ? error.response.data : new Error('Error logging in user');
  }
};

export const startGame = async (token) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BINGO_URL}/api/games/play`, {}, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error starting the game:', error);
    throw error.response ? error.response.data : new Error('Error starting the game');
  }
};

export const joinGame = async (token, game_id) => {
  try {
    const response = await axios.post(`${process.env.REACT_APP_API_BINGO_URL}/api/players/join`, { game_id }, {
      headers: {
        Authorization: token
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error joining the game:', error);
    throw error.response ? error.response.data : new Error('Error joining the game');
  }
};