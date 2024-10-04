import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from '../styles/css/formPage/SelectionEvaluator.module.css';

const EvaluatorSelection = ({ formValues = { evaluators: [] }, setFormValues }) => {
  const [evaluators, setEvaluators] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvaluators = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No token found. Please log in.');
        setLoading(false);
        return;
      }
      try {
        const response = await axios.get('http://localhost:3001/user/evaluations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setEvaluators(response.data.sort((a, b) => a.first_name.localeCompare(b.first_name)));
        } else {
          setError('Unexpected response format.');
        }

        setLoading(false);
      } catch (error) {
        setError('Error fetching evaluators.');
        setLoading(false);
      }
    };

    fetchEvaluators();
  }, []);

  const handleSelectChange = (event) => {
    const selectedEvaluatorId = event.target.value;
  
    // Find the selected evaluator object from the evaluators array
    const selectedEvaluator = evaluators.find(user => user._id === selectedEvaluatorId);
  
    if (selectedEvaluator) {
      setFormValues((prevValues) => ({
        ...prevValues,
        evaluators: selectedEvaluatorId, // Store the selected evaluator ID
        evaluators_first_name: selectedEvaluator.first_name, // Store the first name
        evaluators_last_name: selectedEvaluator.last_name, // Store the last name
      }));
  
      console.log('Evaluator selected successfully:', selectedEvaluator.first_name, selectedEvaluator.last_name);
    }
  };  
  
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.evaluators}>
      <label htmlFor="evaluatorSelect">เลือกผู้ได้รับการประเมิน:</label>
      <select className={styles.evaluator_select} id="evaluatorSelect" onChange={handleSelectChange}>
        <option value="">-- โปรดเลือกผู้ได้รับการประเมิน --</option>
        {evaluators.map((user) => (
          <option key={user._id} value={user._id}>
            {`${user.first_name} ${user.last_name}`}
          </option>
        ))}
      </select>
    </div>
  );
};

export default EvaluatorSelection;