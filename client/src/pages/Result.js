import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import CircularGraph from "../components/CircularGraph"; 
import styles from '../styles/css/resultPage/Result.module.css';

const Result = () => {
  const { evaluators } = useParams(); 
  const [evaluationData, setEvaluationData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvaluationData = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`http://localhost:3001/evaluations/${evaluators}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
                 
        setEvaluationData(response.data); 
        setLoading(false);
      } catch (error) {
        console.error("Error fetching evaluation data:", error);
        setError("ไม่มีข้อมูลแสดงผล");
        setLoading(false);
      }
    };
  
    fetchEvaluationData();
  }, [evaluators]);
  

  if (loading) return <p>Loading evaluation data...</p>;
  if (error) return <p>{error}</p>;

  const evaluatorName = evaluationData
    ? `${evaluationData.evaluators_first_name} ${evaluationData.evaluators_last_name}`
    : "No evaluator data";

  const {
    quantity = 0,
    achievement = 0,
    reliability = 0,
    justinTime = 0,
    saving = 0,
    finallyscore = 0,
    qualityOfWork = 0,
    reliabilityOfWork = 0,
    timeliness = 0,
    personality = 0,
    maintaining = 0,
    communication = 0,
    relationship = 0,
    sacrifice = 0,
    cooperation = 0,
    conduct = 0,
    punctuality = 0,
    focused = 0,
    initiative = 0,
    knowledge = 0,
    sense = 0,
    development = 0,
    vision = 0
  } = evaluationData;

  const calculateTotal = (values) => values.reduce((acc, value) => acc + Number(value), 0);
  const calculateAverage = (total, count) => (count > 0 ? total / count : 0);

  const dataQuantity = calculateTotal([quantity, achievement, reliability, justinTime, saving]);
  const performanceQuantity = calculateTotal([finallyscore, qualityOfWork, reliabilityOfWork, timeliness]);
  const combinedTotal = dataQuantity + performanceQuantity;
  const combinedAverage = calculateAverage(combinedTotal, 5);

  const competencyQuantity = calculateTotal([personality, maintaining, communication, relationship, sacrifice, cooperation, conduct, punctuality, focused, initiative, knowledge, sense, development, vision]);
  const competencyAverage = calculateAverage(competencyQuantity, 12);

  const data = [combinedAverage, competencyAverage];
  const evaluation = data.reduce((acc, value) => acc + value, 0).toFixed(2);

  const getEvaluationCriteria = (score) => {
    if (score >= 90) return "ดีเด่น";
    if (score >= 80) return "ดีมาก";
    if (score >= 70) return "ดี";
    if (score >= 60) return "พอใช้";
    return "ต้องปรับปรุง";
  };

  const getEvaluationColor = (criteria) => {
    switch (criteria) {
      case "ดีเด่น": return "#108600c4";
      case "ดีมาก": return "#16be00c4";
      case "ดี": return "#f5c800";
      case "พอใช้": return "#ffa500";
      case "ต้องปรับปรุง": return "#f00";
      default: return "#000";
    }
  };

  const evaluationCriteria = getEvaluationCriteria(evaluation);
  const evaluationColor = getEvaluationColor(evaluationCriteria);

  return (
    <div className={styles.resultPage}>
      <button className={styles.backButton} onClick={() => navigate("/")}>
        Back
      </button>
      <h1>ผลการประเมิน</h1>
      <h2>การประเมินของคุณ : {evaluatorName}</h2>
      <div className={styles.container}>
        <div className={styles.graphContainer}>
          <CircularGraph data={data} labels={["ผลสัมฤทธิ์ของงาน", "สมรรถนะกำลังพล"]} evaluation={evaluation} />
          <div className={styles.evaluationText} style={{ color: evaluationColor }}>
                        <p>เกณฑ์การประเมิน:</p>
                        <h3>{evaluationCriteria}</h3>
                    </div>
                </div>
                <div className={styles.tableContainer}>
                    <table>
                        <thead>
                            <tr>
                                <th>แบบประเมินค่า</th>
                                <th>คะแนน</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan="2">ผลสัมฤทธิ์ของงาน</td>
                            </tr>
                            <tr>
                                <td colSpan="2">1.1 กลุ่มงานประจำ (เต็ม 100 คะแนน)</td>
                            </tr>
                            <tr>
                                <td>1.1.1 ปริมาณงาน</td>
                                <td className={styles.rightContainer}>{quantity}</td>
                            </tr>
                            <tr>
                                <td>1.1.2 ผลสำเร็จของงาน</td>
                                <td className={styles.rightContainer}>{achievement}</td>
                            </tr>
                            <tr>
                                <td>1.1.3 ความเร่งด่วนในการทำงาน</td>
                                <td className={styles.rightContainer}>{reliability}</td>
                            </tr>
                            <tr>
                                <td>1.1.4 ความทันเวลา</td>
                                <td className={styles.rightContainer}>{justinTime}</td>
                            </tr>
                            <tr>
                                <td>1.1.5 การประหยัด</td>
                                <td className={styles.rightContainer}>{saving}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">1.2 กลุ่มงานมอบหมาย (เต็ม 250 คะแนน)</td>
                            </tr>
                            <tr>
                                <td>1.2.1 ผลสำเร็จของงาน</td>
                                <td className={styles.rightContainer}>{finallyscore}</td>
                            </tr>
                            <tr>
                                <td>1.2.2 คุณภาพของผลงาน</td>
                                <td className={styles.rightContainer}>{qualityOfWork}</td>
                            </tr>
                            <tr>
                                <td>1.2.3 ความเชื่อถือได้ของผลงาน</td>
                                <td className={styles.rightContainer}>{reliabilityOfWork}</td>
                            </tr>
                            <tr>
                                <td>1.2.4 ความทันเวลา</td>
                                <td className={styles.rightContainer}>{timeliness}</td>
                            </tr>
                            <tr>
                                <td>รวมคะแนนผลสัมฤทธิ์ของงาน (เต็ม 350 คะแนน)</td>
                                <td className={styles.rightContainer}>{combinedTotal}</td>
                            </tr>
                            <tr>
                                <td colSpan="2">สมรรถนะกำลังพล</td>
                            </tr>
                            <tr>
                                <td>2.1.1 บุคลิกภาพ</td>
                                <td className={styles.rightContainer}>{personality}</td>
                            </tr>
                            <tr>
                                <td>2.1.2 ความสามารถในการทำงานร่วมกัน</td>
                                <td className={styles.rightContainer}>{maintaining}</td>
                            </tr>
                            <tr>
                                <td>2.1.3 ความสามารถในการสื่อสาร</td>
                                <td className={styles.rightContainer}>{communication}</td>
                            </tr>
                            <tr>
                                <td>2.1.4 ความสัมพันธ์</td>
                                <td className={styles.rightContainer}>{relationship}</td>
                            </tr>
                            <tr>
                                <td>2.1.5 การเสียสละ</td>
                                <td className={styles.rightContainer}>{sacrifice}</td>
                            </tr>
                            <tr>
                                <td>2.1.6 ความร่วมมือ</td>
                                <td className={styles.rightContainer}>{cooperation}</td>
                            </tr>
                            <tr>
                                <td>2.1.7 การปฏิบัติตน</td>
                                <td className={styles.rightContainer}>{conduct}</td>
                            </tr>
                            <tr>
                                <td>2.1.8 ความตรงต่อเวลา</td>
                                <td className={styles.rightContainer}>{punctuality}</td>
                            </tr>
                            <tr>
                                <td>2.1.9 ความมุ่งมั่น</td>
                                <td className={styles.rightContainer}>{focused}</td>
                            </tr>
                            <tr>
                                <td>2.1.10 ความคิดริเริ่ม</td>
                                <td className={styles.rightContainer}>{initiative}</td>
                            </tr>
                            <tr>
                                <td>2.1.11 ความรู้</td>
                                <td className={styles.rightContainer}>{knowledge}</td>
                            </tr>
                            <tr>
                                <td>2.1.12 ความรู้สึก</td>
                                <td className={styles.rightContainer}>{sense}</td>
                            </tr>
                            <tr>
                                <td>2.1.13 ความพัฒนา</td>
                                <td className={styles.rightContainer}>{development}</td>
                            </tr>
                            <tr>
                                <td>2.1.14 วิสัยทัศน์</td>
                                <td className={styles.rightContainer}>{vision}</td>
                            </tr>
                            <tr>
                                <td>รวมคะแนนสมรรถนะกำลังพล (เต็ม 150 คะแนน)</td>
                                <td className={styles.rightContainer}>{competencyQuantity}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Result;
