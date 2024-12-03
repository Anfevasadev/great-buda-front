import { useEffect, useState } from 'react';
import BingoCard from '../components/BingoCard';
import WinnerModal from '../components/WinnerModal';
import './Game.css';
import { useGame } from '../context/GameContext';
import socket from '../services/socketService';
import { useNavigate, useParams } from 'react-router-dom';
import Ballots from '../components/Ballots';

const Game = () => {
  const { gameState, setGameState } = useGame();
  const gameId = useParams().gameId;
  const navigate = useNavigate();
  const [showWinnerModal, setShowWinnerModal] = useState(false);

  console.log('gameState', gameState);


  useEffect(() => {
    if (!gameState.gameId) {
      navigate('/');
    }

    if (gameState.gameFinished && gameState.winner_id === localStorage.getItem('userId')) {
      setShowWinnerModal(true);
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
      setShowWinnerModal(false);
      setGameState(prevState => ({
        ...prevState,
        gameFinished: false,
        winner_id: null,
        message: null,
        ballots: []
      }));
    };
  }, []);

  useEffect(() => {
    if (gameState.gameFinished && gameState.winner_id === localStorage.getItem('userId')) {
      setShowWinnerModal(true);
    }
  }, [gameState.gameFinished]);

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div className="game">
      <BingoCard />
      {showWinnerModal && <WinnerModal message={gameState.message} onGoHome={handleGoHome} />}
      <Ballots ballots={gameState.ballots} />
    </div>
  );
};

export default Game;