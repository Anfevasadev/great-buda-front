import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import AuthModal from './AuthModal';
import buddhaImg from '../assets/goldenBuddhaImg.png';
import './HomePage.css';
import { useAuth } from '../context/AuthContext';
import { startGame } from '../api/api';

function HomePage() {
  const { isAuthenticated, token } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleOpenAuthModal = () => setIsAuthModalOpen(true);
  const handleCloseAuthModal = () => setIsAuthModalOpen(false);

  const handlePlayNow = async () => {
    if (isAuthenticated) {
      try {
        const data = await startGame(token);
        const roomId = data.id;
        navigate(`/waiting-room/${roomId}`);
      } catch (error) {
        console.error('Error starting the game:', error.response.data);
      }
    } else {
      handleOpenAuthModal();
    }
  };

  return (
    <div className="home-page">
      <Header 
        onOpenAuthModal={handleOpenAuthModal} 
      />
      <main className="home-page__main">
        <img src={buddhaImg} alt="Buda Dorado" className="home-page__image" />
        <button className="home-page__cta" onClick={handlePlayNow}>Jugar ahora</button>
      </main>
      <Footer />
      <AuthModal 
        isOpen={isAuthModalOpen} 
        onClose={handleCloseAuthModal} 
      />
    </div>
  );
}

export default HomePage;
