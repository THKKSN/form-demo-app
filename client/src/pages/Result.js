import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import CircularGraph from "../components/CircularGraph";
import styles from "../styles/css/resultPage/Result.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';


const Result = () => {
    const navigate = useNavigate();
    const { id } = useParams(); // รับ id จาก URL
    const [formData, setFormData] = useState(null); // กำหนดค่าเริ่มต้นเป็น null
    const [evaluators, setEvaluators] = useState([]);
    const [userNames, setUserNames] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEvaluation = async () => {
            try {
                const response = await axios.get(`http://localhost:3001/evaluations`);
                if (response.status === 200) {
                    setFormData(response.data);
                    
                    // ดึงข้อมูลผู้ประเมินจาก formData.evaluators
                    const evaluator = response.data.evaluators;
                    if (evaluator) {
                        const evaluatorResponse = await axios.get(`http://localhost:3001/evaluations`);
                        if (evaluatorResponse.status === 200) {
                            setEvaluators([evaluatorResponse.data]);
                            setUserNames({[evaluatorResponse.data._id]: `${evaluatorResponse.data.first_name} ${evaluatorResponse.data.last_name}`});
                        }
                    }
                } else {
                    setError('ไม่พบข้อมูลการประเมิน');
                }
            } catch (error) {
                console.error('Error fetching evaluation:', error);
                setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
            } finally {
                setLoading(false);
            }
        };

        fetchEvaluation();
    }, [id]);

    if (loading) return <p>กำลังโหลดข้อมูล...</p>;
    if (error) return (
        <div>
            <p>{error}</p>
            <button onClick={() => navigate('/')}>กลับไปที่หน้าหลัก</button>
        </div>
    );

    if (!formData) return <p>ไม่มีข้อมูลการประเมิน</p>;

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
    } = formData;

    // ฟังก์ชันการคำนวณคะแนนรวม
    const calculateTotal = (values) => values.reduce((acc, value) => acc + Number(value), 0);
    const calculateAverage = (total, count) => total / count;

    // คำนวณคะแนนของกลุ่มงานประจำ
    const dataQuantity = calculateTotal([quantity, achievement, reliability, justinTime, saving]);
    const performanceQuantity = calculateTotal([finallyscore, qualityOfWork, reliabilityOfWork, timeliness]);
    const combinedTotal = dataQuantity + performanceQuantity;
    const combinedAverage = calculateAverage(combinedTotal, 5);

    // คำนวณคะแนนสมรรถนะ
    const competencyQuantity = calculateTotal([personality, maintaining, communication, relationship, sacrifice, cooperation, conduct, punctuality, focused, initiative, knowledge, sense, development, vision]);
    const competencyAverage = calculateAverage(competencyQuantity, 5);

    // สร้างข้อมูลสำหรับการประเมิน
    const data = [combinedAverage, competencyAverage];
    const evaluation = data.reduce((acc, value) => acc + value, 0).toFixed(2);

    // ฟังก์ชันการประเมินเกณฑ์
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
              <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          <div>
              <h1>ผลการประเมินของ</h1>   
              <h2>ผู้ประเมิน</h2>
              <ul>
                  {evaluators.map((evaluators) => (
                      <li key={evaluators._id}>
                          {userNames[evaluators._id] || 'ไม่พบชื่อผู้ประเมิน'}
                      </li>
                  ))}
              </ul>
          </div>
          <h2>ผลการประเมิน</h2>
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
                              <td>2.1.2 การรักษาวินัย</td>
                              <td className={styles.rightContainer}>{maintaining}</td>
                          </tr>
                          <tr>
                              <td>2.2.1 ความสามารถในการติดต่อสื่อสาร</td>
                              <td className={styles.rightContainer}>{communication}</td>
                          </tr>
                          <tr>
                              <td>2.2.2 มนุษยสัมพันธ์</td>
                              <td className={styles.rightContainer}>{relationship}</td>
                          </tr>
                          <tr>
                              <td>2.2.3 ความเสียสละ</td>
                              <td className={styles.rightContainer}>{sacrifice}</td>
                          </tr>
                          <tr>
                              <td>2.2.4 ความร่วมมือ</td>
                              <td className={styles.rightContainer}>{cooperation}</td>
                          </tr>
                          <tr>
                              <td>2.3.1 การปฏิบัติตน</td>
                              <td className={styles.rightContainer}>{conduct}</td>
                          </tr>
                          <tr>
                              <td>2.3.2 การตรงต่อเวลา</td>
                              <td className={styles.rightContainer}>{punctuality}</td>
                          </tr>
                          <tr>
                              <td>2.4.1 ความมุ่งเน้นผลสัมฤทธิ์</td>
                              <td className={styles.rightContainer}>{focused}</td>
                          </tr>
                          <tr>
                              <td>2.4.2 ความริเริ่ม</td>
                              <td className={styles.rightContainer}>{initiative}</td>
                          </tr>
                          <tr>
                              <td>2.5.1 ความรอบรู้อย่างกว้างขวาง</td>
                              <td className={styles.rightContainer}>{knowledge}</td>
                          </tr>
                          <tr>
                              <td>2.5.2 สำนึกในหน้าที่</td>
                              <td className={styles.rightContainer}>{sense}</td>
                          </tr>
                          <tr>
                              <td>2.6.1 การพัฒนาตนเอง</td>
                              <td className={styles.rightContainer}>{development}</td>
                          </tr>
                          <tr>
                              <td>2.6.2 วิสัยทัศน์</td>
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
