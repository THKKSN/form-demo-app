import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import styles from '../styles/css/resultPage/EvaluationSelect.css';

const EvaluationSelect = () => {
  const [evaluators, setEvaluators] = useState([]);
  const [selectedEvaluator, setSelectedEvaluator] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();  

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
      navigate(`/result/${encodeURIComponent(selectedEvaluator)}`);
    }
  };
  
  

  if (loading) return <p>Loading evaluators...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={styles.container}>
      <label htmlFor="evaluator-select">เลือกแสดงคะแนนผู้ได้รับการประเมิน</label>
      <br></br>
      <select 
        id="evaluator-select" 
        value={selectedEvaluator} 
        onChange={(e) => setSelectedEvaluator(e.target.value)}
      >
        <option value="">-- เลือกผู้ได้รับการประเมิน --</option>
        {evaluators.map((evaluators) => (
          <option key={evaluators._id} value={evaluators._id}>
            {`${evaluators.first_name} ${evaluators.last_name}`}
          </option>
        ))}
      </select>
      
      <button onClick={handleEvaluatorSelect}>ยืนยัน</button>
    </div>
  );
};

export default EvaluationSelect;
