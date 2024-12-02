import { registerUser, loginUser } from '../api/api';
import { useAuth } from '../context/AuthContext';

export const useAuthService = () => {
  const { login } = useAuth();

  const handleRegister = async (formData, onClose, setFormData) => {
    try {
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
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error && error.response.data.error.errors) {
        throw error.response.data.error.errors.map(err => err.message || err.msg);
      } else if (error.response?.data?.errors?.length > 0) {
        throw error.response.data.errors.map(err => err.message || err.msg);
      } else {
        throw ['Upss, algo salió mal, inténtalo más tarde'];
      }
    }
  };

  const handleLogin = async (formData, onClose, setFormData) => {
    try {
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
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        throw [error.response.data.message];
      } else {
        throw ['Upss, algo salió mal, inténtalo más tarde'];
      }
    }
  };

  return { handleRegister, handleLogin };
};