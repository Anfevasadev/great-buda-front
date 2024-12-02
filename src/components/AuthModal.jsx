import React, { useState, useEffect } from 'react';
import InputField from './InputField';
import { validateForm } from '../utils/validation';
import { useAuthService } from '../services/authService';
import './AuthModal.css';

function AuthModal({ isOpen, onClose }) {
  const { handleRegister, handleLogin } = useAuthService();
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
  const [loading, setLoading] = useState(false);
  const [serverErrors, setServerErrors] = useState([]);

  useEffect(() => {
    if (isFormSubmitted) {
      setErrors(validateForm(formData, isLogin));
    }
  }, [formData, isLogin, isFormSubmitted]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const newErrors = validateForm(formData, isLogin);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoading(true);
      setServerErrors([]);

      try {
        if (isLogin) {
          await handleLogin(formData, onClose, setFormData);
        } else {
          await handleRegister(formData, onClose, setFormData);
        }
      } catch (error) {
        if (error.response && error.response.data && error.response.data.error && error.response.data.error.errors) {
          setServerErrors(error.response.data.error.errors.map(err => err.message || err.msg));
        } else if (error.response?.data?.errors?.length > 0) {
          setServerErrors(error.response.data.errors.map(err => err.message || err.msg));
        } else {
          setServerErrors(['Upss, algo salió mal, inténtalo más tarde']);
        }
      } finally {
        setLoading(false);
      }
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
              <InputField
                type="text"
                name="name"
                placeholder="Nombre"
                value={formData.name}
                onChange={handleInputChange}
                error={isFormSubmitted && errors.name}
                ariaLabel="Nombre"
                required
              />
              <InputField
                type="text"
                name="username"
                placeholder="Nombre de usuario"
                value={formData.username}
                onChange={handleInputChange}
                error={isFormSubmitted && errors.username}
                ariaLabel="Nombre de usuario"
                required
              />
              <InputField
                type="number"
                name="age"
                placeholder="Edad"
                value={formData.age}
                onChange={handleInputChange}
                error={isFormSubmitted && errors.age}
                ariaLabel="Edad"
                min="18"
                required
              />
            </>
          )}
          <InputField
            type="email"
            name="email"
            placeholder="Correo electrónico"
            value={formData.email}
            onChange={handleInputChange}
            error={isFormSubmitted && errors.email}
            ariaLabel="Correo electrónico"
            required
          />
          <InputField
            type="password"
            name="password"
            placeholder="Contraseña"
            value={formData.password}
            onChange={handleInputChange}
            error={isFormSubmitted && errors.password}
            ariaLabel="Contraseña"
            required
          />
          {!isLogin && (
            <InputField
              type="password"
              name="confirmPassword"
              placeholder="Confirmar contraseña"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              error={isFormSubmitted && errors.confirmPassword}
              ariaLabel="Confirmar contraseña"
              required
            />
          )}
          {serverErrors.length > 0 && (
            <div className="auth-modal__server-errors">
              {serverErrors.map((error, index) => (
                <p key={index} className="auth-modal__error">{error}</p>
              ))}
            </div>
          )}
          <button type="submit" className="auth-modal__submit" disabled={loading}>
            {loading ? 'Autenticando...' : (isLogin ? 'Iniciar sesión' : 'Registrarse')}
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
}

export default AuthModal;

