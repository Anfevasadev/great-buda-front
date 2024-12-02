import { registerUser, loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';

export const useAuthService = () => {
  const { login } = useAuth();

  const handleRegister = async (formData, onClose, setFormData) => {
    const { confirmPassword, ...dataToSend } = formData;
    dataToSend.role = 'user';
    const data = await registerUser(dataToSend);
    login(data.user, data.token);
    setFormData({
      name: '',
      username: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    onClose();
  };

  const handleLogin = async (formData, onClose, setFormData) => {
    const data = await loginUser({ email: formData.email, password: formData.password });
    login(data.user, data.token);
    setFormData({
      name: '',
      username: '',
      age: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    onClose();
  };

  return { handleRegister, handleLogin };
};