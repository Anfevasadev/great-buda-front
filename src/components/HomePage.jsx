import { useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import AuthModal from './AuthModal';
import buddhaImg from '../assets/goldenBuddhaImg.png';
import './HomePage.css';

function HomePage() {
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleOpenAuthModal = () => setIsAuthModalOpen(true);
    const handleCloseAuthModal = () => setIsAuthModalOpen(false);

    return (
        <div className="home-page">
            <Header onOpenAuthModal={handleOpenAuthModal} />
            <main className="home-page__main">
                <img src={buddhaImg} alt="Buda Dorado" className="home-page__image" />
                <button className="home-page__cta" onClick={handleOpenAuthModal} >Jugar ahora</button>
            </main>
            <Footer />
            <AuthModal isOpen={isAuthModalOpen} onClose={handleCloseAuthModal} />
        </div>
    );
};

export default HomePage;
