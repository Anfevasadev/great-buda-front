export const validateForm = (formData, isLogin) => {
  const newErrors = {};

  if (!isLogin) {
    if (!formData.name.trim()) {
      newErrors.name = 'El nombre es requerido';
    } else if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(formData.name)) {
      newErrors.name = 'El nombre solo puede contener letras y tildes';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'El nombre de usuario es requerido';
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

  return newErrors;
};
