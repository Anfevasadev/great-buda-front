import React from 'react';
import './Header.css';

function Header({onOpenAuthModal}) {
  return (
    <header className="header">
      <h1 className="header__title">El Bingo Gran Buda</h1>
      <button className="header__login-btn" onClick={onOpenAuthModal}>Iniciar sesión</button>
    </header>
  );
};

export default Header;