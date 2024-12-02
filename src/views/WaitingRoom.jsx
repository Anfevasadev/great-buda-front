import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useGame } from '../context/GameContext';
import socket from '../services/socketService';
import './WaitingRoom.css';

function WaitingRoom() {
  const navigate = useNavigate();
  const { token } = useAuth();
  const { roomID } = useParams();
  const { gameState, setGameState, joinGameRoom } = useGame();

  useEffect(() => {
    if (token && roomID) {
      const cleanup = joinGameRoom();
      const effect = async () => {
        await setGameState(prev => ({ ...prev, gameId: roomID }));
        await socket.emit('joinRoom', { roomID, token });
      }
      effect();
      return cleanup;
    }
  }, []);


  const handleGoHome = () => {
    setGameState({
      gameId: null,
      playersCount: 0,
      waitingTime: 0,
      isRoomClosed: false
    });
    navigate('/');
  };

  return (
    <div className="waiting-room">
      {gameState.isRoomClosed ? (
         <div className="close-room-message">
         <p>La sala se ha cerrado porque no se encontraron más jugadores.</p>
         <button onClick={handleGoHome}>Volver al inicio</button>
       </div>
     ) : (
       <>
         <h2>Esperando a otros jugadores...</h2>
         <p>Jugadores en sala: {gameState.playersCount}</p>
         <p>Tiempo de espera: {gameState.waitingTime} seg</p>
       </>
      )}
    </div>
  );
}

export default WaitingRoom;