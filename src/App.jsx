import './App.css';
import HomePage from './views/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitingRoom from './views/WaitingRoom';
import Game from './views/Game';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/waiting-room/:roomID" element={<WaitingRoom />} />
        <Route path="/game/:gameId" element={<Game />} />
      </Routes>
    </Router>
  );
}

export default App;
