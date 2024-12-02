import React from 'react';
import './App.css';
import HomePage from './views/HomePage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import WaitingRoom from './views/WaitingRoom';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage  />} />
        <Route path="/waiting-room/:roomID" element={<WaitingRoom />} />
      </Routes>
    </Router>
  );
}

export default App;
