import { useGame } from '../context/GameContext';
import BingoCell from './BingoCell';
import './BingoCard.css';

const BingoCard = () => {
  const { gameState } = useGame();
  const { bingoCards } = gameState;

  const userId = localStorage.getItem('userId');

  const userBingoCard = bingoCards ? bingoCards[userId] :[[1, 12, 10, 5, 15], [22, 25, 16, 24, 20], [44, 36, "FREE", 31, 38], [49, 46, 60, 55, 48], [74, 66, 63, 75, 69]];
  
  const bingoLetters = ['B', 'I', 'N', 'G', 'O'];


  return (
    <div className="bingo-table">
      <div className="bingo-header">
        {bingoLetters.map((letter, index) => (
          <div key={index} className="bingo-letter">{letter}</div>
        ))}
      </div>
      <div className="bingo-grid">
        {userBingoCard?.map((column, colIndex) => (
          <div key={colIndex} className="bingo-column">
            {column.map((number, rowIndex) => (
              <BingoCell key={rowIndex} number={number} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BingoCard;