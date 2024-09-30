import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../styles/css/resultPage/EvaluationSelect.css';

const EvaluationSelect = () => {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  // ใช้สำหรับการนำทาง

  useEffect(() => {
    const fetchEvaluators = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/user/evaluations', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setEvaluators(response.data);
        setLoading(false);
      } catch (error) {
        setError("Error fetching evaluators");
        setLoading(false);
      }
    };

    fetchEvaluators();
  }, []);

  const handleEvaluatorSelect = () => {
    if (selectedEvaluator) {
      navigate('/dashboard', { state: { evaluatorId: selectedEvaluator } });
    }
  };

  if (loading) return <p>Loading evaluators...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <label htmlFor="evaluator-select">เลือกผู้ได้รับการประเมิน:</label>
      <select 
        id="evaluator-select" 
        value={selectedEvaluator} 
        onChange={(e) => setSelectedEvaluator(e.target.value)}
      >
        <option value="">-- เลือกผู้ได้รับการประเมิน --</option>
        {evaluators.map((evaluator) => (
          <option key={evaluator._id} value={evaluator._id}>
            {`${evaluator.first_name} ${evaluator.last_name}`}
          </option>
        ))}
      </select>
      
      <button onClick={handleEvaluatorSelect}>ยืนยัน</button>
    </div>
  );
};

export default EvaluationSelect;
