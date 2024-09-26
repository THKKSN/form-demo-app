import { useState } from 'react';

const useForm = (initialValues) => {
  const [formValues, setFormValues] = useState(initialValues);

  const handleChange = (event) => {
    setFormValues({
      ...formValues,
      [event.target.name]: parseInt(event.target.value),
    });
  };

  const validateForm = () => {
    return Object.values(formValues).every((value) => value !== '');
  };

  return {
    formValues,
    setFormValues,
    handleChange,
    validateForm,
  };
};

export default useForm;