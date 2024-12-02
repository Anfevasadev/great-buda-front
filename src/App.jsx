import { useState } from 'react';
import './App.css';
import HomePage from './components/HomePage';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className="app">
      <HomePage 
        isAuthenticated={isAuthenticated} 
        onLogin={handleLogin} 
        onLogout={handleLogout} 
      />
    </div>
  );
}

export default App;
