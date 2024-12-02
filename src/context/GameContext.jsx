import React, { createContext, useContext, useState } from 'react';
import { initializeSocket } from '../services/socketManager';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [gameState, setGameState] = useState({
    gameId: null,
    playersCount: 0,
    waitingTime: 0,
    isRoomClosed: false
  });

  const joinGameRoom = () => {
    return initializeSocket(setGameState);
  };
  

  return (
    <GameContext.Provider value={{ gameState, setGameState, joinGameRoom }}>
      {children}
    </GameContext.Provider>
  );
};
export const useGame = () => useContext(GameContext);