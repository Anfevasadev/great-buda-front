import React, { createContext, useState, useContext } from 'react';
import { initializeSocket } from '../services/socketManager';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameId, setGameId] = useState(null);
  const [playersCount, setPlayersCount] = useState(0);

  const joinGameRoom = (roomId) => {
    setGameId(roomId);
    return initializeSocket(setPlayersCount);
  };

  return (
    <GameContext.Provider value={{ gameId, playersCount, joinGameRoom }}>
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);