import React from 'react';
import './Header.css';
import { useAuth } from '../context/AuthContext';

function Header({ onOpenAuthModal }) {
  const { isAuthenticated, user, logout } = useAuth();

  // Obtener el username del localStorage si no está disponible en el AuthContext
  const username = user?.username || localStorage.getItem('username');

  return (
    <header className="header">
      <h1 className="header__title">El Bingo Gran Buda</h1>
      {isAuthenticated ? (
        <div className="header__user-info">
          <span className="header__username">Bienvenido, {username}</span>
          <button className="header__login-btn" onClick={logout}>Cerrar sesión</button>
        </div>
      ) : (
        <button className="header__login-btn" onClick={onOpenAuthModal}>Iniciar sesión</button>
      )}
    </header>
  );
}

export default Header;