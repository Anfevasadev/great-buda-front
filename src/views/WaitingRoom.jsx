import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import './WaitingRoom.css';
import socket from '../services/socketService';

function WaitingRoom() {
  const { token } = useAuth();
  const { roomID } = useParams();
  const { playersCount, joinGameRoom, setPlayersCount } = useGame();

  useEffect(() => {
    if (token && roomID) {
      socket.emit('joinRoom', {roomID, token});
      const cleanup = joinGameRoom(setPlayersCount);
      return cleanup;
    }
  }, [token, roomID, joinGameRoom]);

  return (
    <div className="waiting-room">
      <h2>Esperando a otros jugadores...</h2>
      <p>Jugadores en la sala: {playersCount}</p>
    </div>
  );
}

export default WaitingRoom;