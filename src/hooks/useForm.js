import { useState } from 'react';

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e, callback) => {
    e.preventDefault();
    setIsFormSubmitted(true);
    const newErrors = validate(formData);
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      callback();
    }
  };

  return {
    formData,
    setFormData,
    errors,
    isFormSubmitted,
    setIsFormSubmitted,
    handleInputChange,
    handleSubmit,
    setErrors
  };
};

export default useForm;