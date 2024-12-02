import React from 'react';

function InputField({ type, name, placeholder, value, onChange, error, ariaLabel, required }) {
  return (
    <div className="auth-modal__input-group">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="auth-modal__input"
        value={value}
        onChange={onChange}
        aria-label={ariaLabel}
        required={required}
      />
      {error && <p className="auth-modal__error">{error}</p>}
    </div>
  );
}

export default InputField;