import axios from 'axios';

export const submitFormData = async (formValues) => {
  try {
    const response = await axios.post('http://localhost:3001/evaluations', formValues);
    return response.data;
  } catch (error) {
    console.error('Error in submitting form data:', error.response ? error.response.data : error.message);
    throw new Error(error.response?.data?.message || 'Error in submitting form data');
  }
};