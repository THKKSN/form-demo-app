import React from 'react';
import FormPage from '../pages/Form';
import axios from 'axios';

const ParentComponent = () => {
  const handleSubmit = async (formValues) => {
    try {
      console.log("Sending data to backend:", formValues);
      await axios.post('http://localhost:3001/evaluations/submit', formValues);
      console.log('Form submitted successfully');
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return <FormPage handleSubmit={handleSubmit} />;
};

export default ParentComponent;