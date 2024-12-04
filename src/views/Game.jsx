import { useEffect, useState } from 'react';
import BingoCard from '../components/BingoCard';
import Modal from '../components/Modal';
import './Game.css';
import { useGame } from '../context/GameContext';
import socket from '../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import Ballots from '../components/Ballots';

const Game = () => {
  const { gameState, setGameState } = useGame();
  const gameId = useParams().gameId;
  const username = localStorage.getItem('username');
  const navigate = useNavigate();
  const [showWinnerModal, setShowWinnerModal] = useState(false);
  const [showDisqualificationModal, setShowDisqualificationModal] = useState(false);

  console.log('gameState', gameState);

  useEffect(() => {
    if (!gameState.gameId) {
      navigate('/');
    }

    if (gameState.gameFinished && gameState.winner_id === localStorage.getItem('userId')) {
      setShowWinnerModal(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }

    const handleUnload = () => {
      socket.emit('playerLeft', { userId: localStorage.getItem('userId'), gameId: gameId });
    };

    window.addEventListener('beforeunload', handleUnload);
    window.addEventListener('unload', handleUnload);

    return () => {
      socket.emit('playerLeft', { userId: localStorage.getItem('userId'), gameId: gameId });
      window.removeEventListener('beforeunload', handleUnload);
      window.removeEventListener('unload', handleUnload);
      setShowDisqualificationModal(false);
      setShowWinnerModal(false);
      setGameState(prevState => ({
        ...prevState,
        gameFinished: false,
        winner_id: null,
        message: null,
        ballots: [],
        disqualified: false,
        disqualificationMessage: null
      }));
    };
  }, []);

  useEffect(() => {
    if (!gameState.gameId) {
      navigate('/');
    }

    if (gameState.gameFinished) {
      setShowWinnerModal(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
    if (gameState.disqualified) {
      setShowDisqualificationModal(true);
      setTimeout(() => {
        navigate('/');
      }, 5000);
    }
  }, [gameState]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="game">
      <BingoCard />
      {showWinnerModal && (
        <Modal
          title={`Fin del juego`}
          message={gameState.message}
          onGoHome={handleGoHome}
        />
      )}
      {showDisqualificationModal && (
        <Modal
          title="Descalificado"
          message={gameState.disqualificationMessage || 'Has sido descalificado.'}
          onGoHome={handleGoHome}
        />
      )}
      <Ballots ballots={gameState.ballots} />
    </div>
  );
};

export default Game;