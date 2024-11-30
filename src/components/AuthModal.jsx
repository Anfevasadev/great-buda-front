import React, { useState, useEffect } from 'react';
import './AuthModal.css';

function AuthModal ({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    age: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  useEffect(() => {
    if (isFormSubmitted) {
      validateForm();
    }
  }, [formData, isLogin, isFormSubmitted]);

  const validateForm = () => {
    const newErrors= {};
    
    if (!isLogin) {
      if (!formData.name.trim()) newErrors.name = 'El nombre es requerido';
      
      if (!formData.username.trim()) {
        newErrors.username = 'El nombre de usuario es requerido';
      } else if (!/^[a-zA-Z]+$/.test(formData.username)) {
        newErrors.username = 'El nombre de usuario solo puede contener letras';
      }
      
      if (!formData.age) {
        newErrors.age = 'La edad es requerida';
      } else if (parseInt(formData.age) < 18) {
        newErrors.age = 'Debes ser mayor de 18 años';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'El correo electrónico es requerido';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Ingresa un correo electrónico válido';
    }

    if (!formData.password) {
      newErrors.password = 'La contraseña es requerida';
    } else if (formData.password.length < 8) {
      newErrors.password = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!isLogin && formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    if (validateForm()) {
      // Aquí se enviaría la información del formulario
      console.log('Formulario enviado:', formData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="auth-modal">
      <div className="auth-modal__content">
        <button className="auth-modal__close" onClick={onClose} aria-label="Cerrar">×</button>
        <h2 className="auth-modal__title">{isLogin ? 'Iniciar sesión' : 'Registrarse'}</h2>
        <form className="auth-modal__form" onSubmit={handleSubmit} noValidate>
          {!isLogin && (
            <>
              <div className="auth-modal__input-group">
                <input
                  type="text"
                  name="name"
                  placeholder="Nombre"
                  className="auth-modal__input"
                  value={formData.name}
                  onChange={handleInputChange}
                  aria-label="Nombre"
                  required
                />
                {isFormSubmitted && errors.name && <p className="auth-modal__error">{errors.name}</p>}
              </div>
              <div className="auth-modal__input-group">
                <input
                  type="text"
                  name="username"
                  placeholder="Nombre de usuario"
                  className="auth-modal__input"
                  value={formData.username}
                  onChange={handleInputChange}
                  aria-label="Nombre de usuario"
                  required
                />
                {isFormSubmitted && errors.username && <p className="auth-modal__error">{errors.username}</p>}
              </div>
              <div className="auth-modal__input-group">
                <input
                  type="number"
                  name="age"
                  placeholder="Edad"
                  className="auth-modal__input"
                  value={formData.age}
                  onChange={handleInputChange}
                  aria-label="Edad"
                  min="18"
                  required
                />
                {isFormSubmitted && errors.age && <p className="auth-modal__error">{errors.age}</p>}
              </div>
            </>
          )}
          <div className="auth-modal__input-group">
            <input
              type="email"
              name="email"
              placeholder="Correo electrónico"
              className="auth-modal__input"
              value={formData.email}
              onChange={handleInputChange}
              aria-label="Correo electrónico"
              required
            />
            {isFormSubmitted && errors.email && <p className="auth-modal__error">{errors.email}</p>}
          </div>
          <div className="auth-modal__input-group">
            <input
              type="password"
              name="password"
              placeholder="Contraseña"
              className="auth-modal__input"
              value={formData.password}
              onChange={handleInputChange}
              aria-label="Contraseña"
              required
            />
            {isFormSubmitted && errors.password && <p className="auth-modal__error">{errors.password}</p>}
          </div>
          {!isLogin && (
            <div className="auth-modal__input-group">
              <input
                type="password"
                name="confirmPassword"
                placeholder="Confirmar contraseña"
                className="auth-modal__input"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                aria-label="Confirmar contraseña"
                required
              />
              {isFormSubmitted && errors.confirmPassword && <p className="auth-modal__error">{errors.confirmPassword}</p>}
            </div>
          )}
          <button type="submit" className="auth-modal__submit">
            {isLogin ? 'Iniciar sesión' : 'Registrarse'}
          </button>
        </form>
        <p className="auth-modal__switch">
          {isLogin ? '¿No tienes una cuenta?' : '¿Ya tienes una cuenta?'}
          <button 
            onClick={() => {
              setIsLogin(!isLogin);
              setIsFormSubmitted(false);
              setErrors({});
            }} 
            className="auth-modal__switch-btn"
          >
            {isLogin ? 'Regístrate' : 'Inicia sesión'}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;

