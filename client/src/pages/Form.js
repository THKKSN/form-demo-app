import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from '../styles/scss/formPage/FormPage.module.scss'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';  
import RadioOption from "../components/RadioOption";
import EvaluatorSelection from "../components/EvaluatorSelectors"; 
import useForm from "../hooks/userForm";
import { submitFormData } from '../api/api.js';

const Form = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem('userId');

  const { formValues, setFormValues, handleChange, validateForm } = useForm({
    evaluators: '',
    evaluation: userId,
    quantity: 0,
    achievement: 0,
    reliability: 0,
    justinTime: 0,
    saving: 0,
    finallyscore: 0,
    qualityOfWork: 0,
    reliabilityOfWork: 0,
    timeliness: 0,
    personality: 0,
    maintaining: 0,
    communication: 0,
    relationship: 0,
    sacrifice: 0,
    cooperation: 0,
    conduct: 0,
    punctuality: 0,
    focused: 0,
    initiative: 0,
    knowledge: 0,
    sense: 0,
    development: 0,
    vision: 0,
  });

  const quantityOptions = [
    { value: 20, label: "ปริมาณงานที่ทำได้มากกว่าที่ได้รับตามหน้าที่เป็นอย่างมาก (20)" },
    { value: 17, label: "ปริมาณงานที่ทำได้มากกว่าที่ได้รับตามหน้าที่ (17)" },
    { value: 14, label: "ปริมาณงานที่ทำได้เป็นไปตามที่ได้รับตามหน้าที่ (14)" },
    { value: 10, label: "ปริมาณงานที่ทำได้ต่ำกว่าที่ได้รับตามหน้าที่เล็กน้อย (10)" },
    { value: 6, label: "ปริมาณงานที่ทำได้ต่ำกว่าที่ได้รับตามหน้าที่เป็นอย่างมาก (6)"},
  ];

  const achievementOptions = [
    { value: 20, label: "ผลงานสำเร็จตามเป้าหมายโดยสมบูรณ์ (20)" },
    { value: 17, label: "ผลงานส่วนใหญ่สำเร็จตรงตามเป้าหมาย (17)" },
    { value: 14, label: "ผลงานโดยเฉลี่ยตรงตามเป้าหมาย (14)" },
    { value: 10, label: "ผลงานส่วนน้อยที่ตรงตามเป้าหมาย (10)" },
    { value: 6, label: "ผลงานไม่สำเร็จหรือผิดเป้าหมาย (6)" },
  ];

  const reliabilityOptions = [
    { value: 20, label: "ผลงานเชื่อถือได้และถูกต้องตามหลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่งทั้งหมด (20)" },
    { value: 17, label: "ผลงานส่วนใหญ่เชื่อถือได้และถูกต้องตามหลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่ง (17)" },
    { value: 14, label: "ผลงานเชื่อถือได้พอสมควรและค่อนข้างจะถูกต้องตามหลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่ง (14)"},
    { value: 10, label: "ผลงานส่วนน้อยเชื่อถือได้ และใช้หลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่งบ้าง (10)"},
    { value: 6, label: "ผลงานเชื่อถือไม่ค่อยได้ ไม่ใช้หลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่งใด ๆ (6)"},
  ];

  const justinTimeOptions = [
    { value: 20, label: "ทำงานสำเร็จก่อนเวลาที่กำหนดมาก และมีเวลาเหลือเพื่อพิจารณาทบทวน (20)" },
    { value: 17, label: "ทำงานสำเร็จก่อนเวลาที่กำหนด (17)" },
    { value: 14, label: "ทำงานสำเร็จตามระยะเวลาที่กำหนด (14)" },
    { value: 10, label: "ทำงานโดยใช้ระยะเวลาเกินกว่าเวลาที่กำหนดเล็กน้อย (10)" },
    { value: 6, label: "ทำงานโดยใช้ระยะเวลานาน เกินกว่าเวลาที่กำหนดเป็นอย่างมาก (6)",},
  ];

  const savingOptions = [
    { value: 20, label: "ใช้ทรัพยากรอย่างประหยัดและคุ้มค่าเป็นอย่างมาก (20)" },
    { value: 17, label: "ใช้ทรัพยากรอย่างประหยัดและคุ้มค่า (17)" },
    { value: 14, label: "ใช้ทรัพยากรอย่างประหยัดตามที่ได้รับการแจกจ่าย (14)" },
    { value: 10, label: "ใช้ทรัพยากรเกินกว่าที่ได้รับการแจกจ่ายเล็กน้อย (10)" },
    { value: 6, label: "ใช้ทรัพยากรมาก เกิดการสูญเสียโดยไม่จำเป็น (6)" },
  ];

  const finallyOptions = [
    { value: 100, label: "ผลงานสำเร็จตามเป้าหมายโดยสมบูรณ์ (100)" },
    { value: 85, label: "ผลงานส่วนใหญ่สำเร็จตรงตามเป้าหมาย (85)" },
    { value: 70, label: "ผลงานสำเร็จตามเป้าหมายโดยสมบูรณ์ (70)" },
    { value: 50, label: "ผลงานส่วนน้อยที่ตรงตามเป้าหมาย (50)" },
    { value: 30, label: "ผลงานไม่สำเร็จหรือผิดเป้าหมาย (30)" },
  ];

  const qualityOfWorkOptions = [
    { value: 50, label: "ผลงานมีความละเอียดรอบคอบ สมบูรณ์ครบถ้วนเกินกว่าที่คาดหวังเป็นอย่างมาก (50)" },
    { value: 43, label: "ผลงานมีความละเอียดรอบคอบ สมบูรณ์ครบถ้วนเกินกว่าที่คาดหวัง (43)" },
    { value: 35, label: "ผลงานมีความละเอียดรอบคอบ สมบูรณ์ครบถ้วนเป็นไปตามมาตรฐานที่คาดหวัง (35)" },
    { value: 25, label: "ผลงานมีบกพร่องเพียงเล็กน้อย (25)" },
    { value: 15, label: "ผลงานมีข้อบกพร่อง ต่ำกว่าเกณฑ์มาตรฐานในระดับต่ำสุดที่ยอมรับได้ และไม่ทำให้เกิดความเสียหายต่องาน (15)"},
  ];

  const reliabilityOfWorkOptions = [
    { value: 50, label: "ผลงานเชื่อถือได้ และถูกต้องตามหลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่งทั้งหมด (50)" },
    { value: 43, label: "ผลงานส่วนใหญ่เชื่อถือได้ และถูกต้องตามหลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่ง (43)" },
    { value: 35, label: "ผลงานเชื่อถือได้พอสมควร และค่อนข้างจะถูกต้องตามหลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่ง (35)" },
    { value: 25, label: "ผลงานส่วนน้อยเชื่อถือได้ และใช้หลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่ง บ้าง (25)" },
    { value: 15, label: "ผลงานผลงานเชื่อถือไม่ค่อยได้ ไม่ใช้หลักการ/แบบธรรมเนียม/ระเบียบ/คำสั่งใด ๆ (15)" },
  ];

  const timelinessOptions = [
    { value: 50, label: "ทำงานสำเร็จก่อนเวลาที่กำหนดมาก และมีเวลาเหลือเพื่อพิจารณาทบทวน (50)"},
    { value: 43, label: "ทำงานสำเร็จก่อนเวลาที่กำหนด (43)"},
    { value: 35, label: "ทำงานสำเร็จตามระยะเวลาที่กำหนด (35)"},
    { value: 25, label: "ทำงานโดยใช้ระยะเวลาเกินกว่าเวลาที่กำหนดเล็กน้อย (25)"},
    { value: 15, label: "ทำงานโดยใช้ระยะเวลานาน เกินกว่าเวลาที่กำหนดเป็นอย่างมาก (15)"},
  ] ;

  const personalityOptions = [
    { value: 15, label: "ปริมาณงานที่ทำได้มากกว่าที่ได้รับตามหน้าที่เป็นอย่างมาก (15)" },
    { value: 13, label: "มีการแสดงออก ทางกาย วาจา และอารมณ์ ดี (13)" },
    { value: 11, label: "มีการแสดงออก ทางกาย วาจา และอารมณ์ เหมาะสม (11)" },
    { value: 8, label: "มีการแสดงออก ทางกาย วาจา และอารมณ์ เหมาะสมบางส่วนและบางส่วนต้องได้รับการปรับปรุงแก้ไข (8)" },
    { value: 5, label: "มีการแสดงออก ทางกาย วาจา และอารมณ์ ต้องได้รับการปรับปรุง (5)" },
  ];

  const maintainingOptions = [
    { value: 15, label: "เข้าใจคำสั่ง และปฏิบัติตามได้เป็นอย่างเคร่งครัด ด้วยความเต็มใจ และถูกต้องเสมอ (15)" },
    { value: 13, label: "เข้าใจคำสั่ง และปฏิบัติตาม ด้วยความเต็มใจ และถูกต้อง (13)" },
    { value: 11, label: "ปฏิบัติตามคำสั่ง ด้วยความเต็มใจ (11)" },
    { value: 8, label: "ปฏิบัติตามคำสั่ง คำแนะนำตามสมควร (8)" },
    { value: 5, label: "ไม่ใส่ใจต่อคำสั่งเท่าที่ควร ทำให้เกิดความผิดพลาดบ่อยครั้ง (5)" },
  ];

  const communicationOptions = [
    { value: 10 , label: "มีทักษะในการสื่อความหมายได้อย่างกระชับชัดเจนดีเยี่ยม จนเป็นตัวอย่างที่ดีต่อเพื่อนร่วมงาน (10)"},
    { value: 9 , label: "มีทักษะในการสื่อความหมายได้อย่างกระชับ ชัดเจนดี (9)"},
    { value: 7 , label: "มีทักษะในการสื่อความหมายได้ชัดเจน (7)"},
    { value: 5 , label: "สื่อความหมายได้ แต่บางครั้งต้องมีการอธิบายเพิ่ม (5)"},
    { value: 3 , label: "มีปัญหาในการสื่อความหมาย ต้องได้รับคำแนะนำให้ปรับปรุง (3)"},
  ];

  const relationshipOptions = [
    { value: 10 , label: "มีมนุษยสัมพันธ์ดีเยี่ยมและสามารถสร้างความสัมพันธ์ที่ดีกับเพื่อนร่วมงาน (10)"},
    { value: 9 , label: "มีมนุษยสัมพันธ์ดีและสามารถทำงานร่วมกับผู้อื่นได้ดี (9)"},
    { value: 7 , label: "มีมนุษยสัมพันธ์ที่ดี แต่ยังสามารถปรับปรุงได้ (7)"},
    { value: 5 , label: "มีมนุษยสัมพันธ์ที่พอใช้ แต่บางครั้งมีปัญหาในการทำงานร่วมกัน (5)" },
    { value: 3 , label: "มีปัญหาในการสร้างความสัมพันธ์ที่ดีและทำงานร่วมกัน (3)" },

  ];

  const secrificeOptions = [
    { value: 10 , label: "อาสาสมัครเข้าปฏิบัติงานในทุกโอกาสด้วยความเต็มใจ (10)"},
    { value: 9 , label: "ยินดีที่จะปฏิบัติงานเมื่อไม่มีคนสมัครใจ (9)"},
    { value: 7 , label: "ยินดีปฏิบัติงานตามคำสั่งทั้งในและนอกเวลางาน (7)"},
    { value: 5 , label: "ยินดีปฏิบัติงานถ้าไม่กระทบเรื่องส่วนตัว (5)"},
    { value: 3 , label: "มีพฤติกรรมในการหลบเลี่ยงงาน (3)"},
  ]

  const cooperationOptions = [
    { value: 10 , label: "มีความตั้งใจและเต็มใจให้ความร่วมมือในการปฏิบัติงานร่วมกันจนบรรลุผลอย่างมีประสิทธิภาพอย่างเต็มที่ (10)"},
    { value: 9 , label: "มีความตั้งใจและให้ความร่วมมือในการปฏิบัติงานร่วมกันจนบรรลุผลอย่างมีประสิทธิภาพ (9)"},
    { value: 7 , label: "มีความตั้งใจที่จะทำงานและร่วมมือปฏิบัติงานร่วมกับผู้อื่น (7)"},
    { value: 5 , label: "มีความร่วมมือในการปฏิบัติงานตามหน้าที่พอสมควร (5)"},
    { value: 3 , label: "มักมีข้อขัดแย้งในการร่วมมือกับผู้อื่นอย่างไม่มีเหตุผล (3)"},
  ]

  const conductOptions = [
    { value: 10, label: "มีการประพฤติปฏิบัติตนตามระเบียบคำสั่งของหน่วยงาน มีคุณธรรมซื่อสัตย์สุจริต เชื่อถือได้และเป็นแบบอย่างที่ดีให้แก่ผู้อื่น (10)" },
    { value: 9, label: "มีการประพฤติปฏิบัติตนตามระเบียบคำสั่งของหน่วยงาน มีคุณธรรม ซื่อสัตย์สุจริต เชื่อถือได้ (9)" },
    { value: 7, label: "มีการประพฤติปฏิบัติตนตามระเบียบคำสั่งของหน่วยงาน มีคุณธรรม ซื่อสัตย์สุจริต (7)" },
    { value: 5, label: "มีการประพฤติปฏิบัติตนตามระเบียบคำสั่งของหน่วยงาน มีคุณธรรม ซื่อสัตย์สุจริต โดยมีการว่ากล่าว ตักเตือนบ้างเป็นบางครั้ง (5)" },
    { value: 3, label: "มีการประพฤติปฏิบัติตนไม่เหมาะสม มีการว่ากล่าวตักเตือนเป็นประจำ (3)" }
  ];

  const punctualityOptions = [
    { value: 10, label: "มาทำงานก่อนเวลาและทำงานจนเสร็จ แม้จะเลยเวลาปฏิบัติงานไปแล้วเป็นประจำ (10)" },
    { value: 9, label: "มาทำงานก่อนเวลาและทำงานจนเสร็จ แม้จะเลยเวลาปฏิบัติงานบางโอกาส (9)" },
    { value: 7, label: "มาทำงานสม่ำเสมอตลอดเวลา เริ่มและเลิกงานตามเวลาที่ทางหน่วยงานกำหนด (7)" },
    { value: 5, label: "มาทำงานตามเวลาเป็นส่วนใหญ่ มีการมาสาย และกลับก่อนในบางโอกาส (5)" },
    { value: 3, label: "มาทำงานต่ำกว่ามาตรฐาน มาสาย หรือกลับก่อนเวลาเป็นประจำ (3)" }
  ];

  const focusedOptions = [
    { value: 10, label: "มีความมุ่งมั่นปฏิบัติหน้าที่จนบรรลุผลอย่างมีประสิทธิภาพอย่างเต็มที่ (10)" },
    { value: 9, label: "มีความมุ่งมั่นปฏิบัติงานจนบรรลุผลอย่างมีประสิทธิภาพ (9)" },
    { value: 7, label: "มีความตั้งใจที่จะทำงาน และร่วมมือปฏิบัติงานร่วมกับผู้อื่น (7)" },
    { value: 5, label: "มีความตั้งใจในการปฏิบัติงานตามหน้าที่พอสมควร (5)" },
    { value: 3, label: "ละเลยการปฏิบัติหน้าที่ (3)" },
  ];

  const initiativeOptions = [
    { value: 10, label: "คิดและวางแผนการปฏิบัติงานได้เอง ไม่ต้องรอรับคำสั่ง/คำแนะนำจากผู้ใด (10)" },
    { value: 9, label: "ปฏิบัติงานในความรับผิดชอบตามลำพังได้ดี (9)" },
    { value: 7, label: "ปฏิบัติงานในความรับผิดชอบของตนเองได้พอใช้ (7)" },
    { value: 5, label: "ปฏิบัติงานในความรับผิดชอบของตนเองได้เล็กน้อย (5)" },
    { value: 3, label: "ต้องมีผู้แนะนำจึงทำงานได้ภายในกรอบ (3)" },
  ];

  const senseOptions = [
    { value: 10, label: "มีความรับผิดชอบสูงในหน้าที่ งานสำเร็จโดยไม่ต้องกำกับดูแล (10)" },
    { value: 9, label: "มีความรับผิดชอบต่องานในหน้าที่ งานสำเร็จโดยกำกับดูแลเล็กน้อย (9)" },
    { value: 7, label: "มีความรับผิดชอบต่องานส่วนใหญ่ในหน้าที่ ต้องกำกับดูแลตามสมควร (7)" },
    { value: 5, label: "มีความรับผิดชอบต่องานในหน้าที่บางเรื่อง งานสำเร็จถ้ามีการกำกับดูแล (5)" },
    { value: 3, label: "ไม่มีความรับผิดชอบ งานไม่สำเร็จเป็นประจำ (3)" },
  ];

  const knowledgeOptions = [
    { value: 10, label: "มีความรู้ความสามารถปฏิบัติงานในหน้าที่อย่างดียิ่ง (10)" },
    { value: 9, label: "ความรู้ความสามารถปฏิบัติงานในหน้าที่เป็นอย่างดี (9)" },
    { value: 7, label: "มีความรู้ความสามารถปฏิบัติงานในหน้าที่พอสมควร (7)" },
    { value: 5, label: "มีความรู้ความสามารถปฏิบัติงานในหน้าที่น้อยมาก (5)" },
    { value: 3, label: "ไม่มีความรู้ความสามารถปฏิบัติงานในหน้าที่ (3)" },
  ];

  const developmentOptions = [
    { value: 10, label: "มีการเรียนรู้อยู่ตลอดเวลา และแนะนำผู้ใต้บังคับบัญชา หรือเพื่อนร่วมงานได้อย่างดีเยี่ยม (10)" },
    { value: 9, label: "มีการเรียนรู้อยู่ตลอดเวลา และแนะนำผู้ใต้บังคับบัญชา หรือเพื่อนร่วมงานได้อย่างดี (9)" },
    { value: 7, label: "มีการเรียนรู้อยู่ตลอดเวลา และแนะนำผู้ใต้บังคับบัญชา หรือเพื่อนร่วมงาน (7)" },
    { value: 5, label: "มีความสนใจพัฒนาตนเอง และแนะนำผู้ใต้บังคับบัญชา หรือเพื่อนร่วมงานพอสมควร (5)" },
    { value: 3, label: "ไม่แสดงคุณลักษณะด้านนี้อย่างชัดเจน (3)" },
  ];

  const visionOptions = [
    { value: 10, label: "มีการวางแผนจัดระบบงาน ก่อนการปฏิบัติงานทุกครั้ง (10)" },
    { value: 9, label: "มีการวางแผนจัดระบบงาน ก่อนการปฏิบัติงานเป็นส่วนใหญ่ (9)" },
    { value: 7, label: "มีการวางแผนจัดระบบงานพอสมควร และมีการแก้ไขเพิ่มเติม เป็นบางครั้ง (7)" },
    { value: 5, label: "มีการวางแผนจัดระบบงานบ้าง และผู้บังคับบัญชาแนะนำเป็นครั้งคราว (5)" },
    { value: 3, label: "ผู้บังคับบัญชาแนะนำและจัดระบบงานให้ทุกครั้ง (3)" },
  ];

  
  const [formError, setFormError] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateForm(formValues)) {
      setFormError(true);
      console.error("โปรดกรอกข้อมูลให้ครบถ้วน");
      return;
    }

    setFormError(false);

    const formData = { ...formValues };
    console.log("ฟอร์มที่ส่ง :", formData);

    try {
      const response = await submitFormData(formData);
      if (response.status === 200) {
        console.log("การประเมินถูกบันทึกเรียบร้อยแล้ว");
        navigate("/success");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการส่งข้อมูล:", error.message);
      setError(error.message);
    }
  };
  

  
    return (
      <div>
        <button className={styles.backButton} onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>{" "}
        <div>
          <form onSubmit={handleSubmit} className={styles.formContainer}>
            <h1 className="header">
              แบบประเมินผลการปฏิบัติงานของพนักงาน อผศ.
              และลูกจ้างประจำหน่วยงานกิจการพิเศษ
            </h1>
            <br></br>

            <h2 className="center-point">ตอนที่ 3 การประเมินค่า ฯ</h2>
            <br></br>
            <EvaluatorSelection formValues={formValues} setFormValues={setFormValues} />
            <br></br>
            <h3>1. ผลสัมฤทธิ์ของงาน</h3>
            <br></br>
            <p className="form-group">1.1 กลุ่มงานประจำ</p>

            <p>1.1.1 ปริมาณงาน</p>
            <RadioOption
              options={quantityOptions}
              name="quantity"
              value={formValues.quantity}
              onChange={handleChange}
            />

            <p>1.1.2 ผลสำเร็จของงาน</p>
            <RadioOption
              options={achievementOptions}
              name="achievement"
              value={formValues.achievement}
              onChange={handleChange}
            />

            <p>1.1.3 ความเชื่อถือได้ของผลงาน</p>
            <RadioOption
              options={reliabilityOptions}
              name="reliability"
              value={formValues.reliability}
              onChange={handleChange}
            />

            <p>1.1.4 ความทันเวลา</p>
            <RadioOption
              options={justinTimeOptions}
              name="justinTime"
              value={formValues.justinTime}
              onChange={handleChange}
            />

            <p>1.1.5 การประหยัด</p>
            <RadioOption
              options={savingOptions}
              name="saving"
              value={formValues.saving}
              onChange={handleChange}
            />

            <p className="form-group">1.2 กลุ่มงานมอบหมาย</p>
            <p>1.2.1 ผลสำเร็จของงาน</p>
            <RadioOption
              options={finallyOptions}
              name="finallyscore"
              value={formValues.finallyscore}
              onChange={handleChange}
            />
            <p>1.2.2 คุณภาพผลงาน</p>
            <RadioOption
              options={qualityOfWorkOptions}
              name="qualityOfWork"
              value={formValues.qualityOfWork}
              onChange={handleChange}
            />
            <p>1.2.3 ความเชื่อถือได้ของผลงาน</p>
            <RadioOption
              options={reliabilityOfWorkOptions}
              name="reliabilityOfWork"
              value={formValues.reliabilityOfWork}
              onChange={handleChange}
            />

            <p>1.2.4 ความทันเวลา</p>
            <RadioOption
              options={timelinessOptions}
              name="timeliness"
              value={formValues.timeliness}
              onChange={handleChange}
            />
            <br></br>
            <h3>2. สมรรถนะกำลังพล</h3>
            <p className="form-group">2.1 คุณลักษณะ</p>

            {/* 2.1.1 บุคลิกภาพ */}
            <p>2.1.1 บุคลิกภาพ</p>
            <RadioOption
              options={personalityOptions}
              name="personality"
              value={formValues.personality}
              onChange={handleChange}
            />

            <p>2.1.2 การรักษาวินัย</p>
            <RadioOption
              options={maintainingOptions}
              name="maintaining"
              value={formValues.maintaining}
              onChange={handleChange}
            />

            <p className="form-group">2.2 การทำงานเป็นทีม</p>

            <p>2.2.1 ความสามารถในการติดต่อสื่อสาร</p>
            <RadioOption
              options={communicationOptions}
              name="communication"
              value={formValues.communication}
              onChange={handleChange}
            />

            <p>2.2.2 มนุษยสัมพันธ์</p>
            <RadioOption
              options={relationshipOptions}
              name="relationship"
              value={formValues.relationship}
              onChange={handleChange}
            />

            <p>2.2.3 ความเสียสละ</p>
            <RadioOption
              options={secrificeOptions}
              name="sacrifice"
              value={formValues.sacrifice}
              onChange={handleChange}
            />

            <p>2.2.4 ความร่วมมือ</p>
            <RadioOption
              options={cooperationOptions}
              name="cooperation"
              value={formValues.cooperation}
              onChange={handleChange}
            />

            <p className="form-group">2.3 คุณธรรมและจริยธรรม</p>
            <p>2.3.1 การปฏิบัติตน</p>
            <RadioOption
              options={conductOptions}
              name="conduct"
              value={formValues.conduct}
              onChange={handleChange}
            />

            <p>2.3.2 การตรงต่อเวลา</p>
            <RadioOption
              options={punctualityOptions}
              name="punctuality"
              value={formValues.punctuality}
              onChange={handleChange}
            />

            <p className="form-group">2.4 มุ่งเน้นผลสัมฤทธิ์</p>
            <p>2.4.1 ความมุ่งเน้นผลสัมฤทธิ์</p>
            <RadioOption
              options={focusedOptions}
              name="focused"
              value={formValues.focused}
              onChange={handleChange}
            />

            <p>2.4.2 ความริเริ่ม</p>
            <RadioOption
              options={initiativeOptions}
              name="initiative"
              value={formValues.initiative}
              onChange={handleChange}
            />

            <p className="form-group">
              2.5 ความรู้ความสามารถการปฏิบัติงานในหน้าที่
            </p>

            <p>2.5.1 ความรอบรู้งานในหน้าที่</p>
            <RadioOption
              options={knowledgeOptions}
              name="knowledge"
              value={formValues.knowledge}
              onChange={handleChange}
            />

            <p>2.5.2 ความสำนึกในหน้าที่</p>
            <RadioOption
              options={senseOptions}
              name="sense"
              value={formValues.sense}
              onChange={handleChange}
            />

            <p className="form-group">2.6 การบริหารจัดการ</p>

            <p>2.6.1 การพัฒนาตนและผู้ใต้บังคับบัญชาหรือเพื่อนร่วมงาน</p>
            <RadioOption
              options={developmentOptions}
              name="development"
              value={formValues.development}
              onChange={handleChange}
            />

            <p>2.6.2 วิสัยทัศน์และความคิดในภาพรวม</p>
            <RadioOption
              options={visionOptions}
              name="vision"
              value={formValues.vision}
              onChange={handleChange}
            />
            {formError && (
              <p style={{ color: "red" }}>กรุณากรอกข้อมูลให้ครบทุกข้อ</p>
            )}
            <button className={styles.submit} type="submit">
              Submit
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </form>
        </div>
      </div>
    );
};

export default Form;
