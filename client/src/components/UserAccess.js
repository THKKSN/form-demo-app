import React from "react";
import { useNavigate } from "react-router-dom";

const UserAccess = ({ user }) => {
  const navigate = useNavigate();

  if (user.isAdmin) {
    return (
      <div>
        <h1>สวัสดีคุณ {user.first_name} {user.last_name}</h1>
        <p>ตำแหน่ง: {user.position}</p>
        <p>สิทธิ์การเข้าถึง: ผู้ดูแลระบบ (Admin)</p>
        <p>คุณสามารถดูผลการประเมินทั้งหมดได้</p>
        <button onClick={() => navigate("/")}>กลับไปหน้าหลัก</button>
      </div>
    );
  } else {
    return (
      <div>
        <h1>สวัสดีคุณ {user.first_name} {user.last_name}</h1>
        <p>ตำแหน่ง: {user.position}</p>
        <p>สิทธิ์การเข้าถึง: ผู้ใช้งานทั่วไป</p>
        <p>คุณสามารถดูเฉพาะผลการประเมินของคุณเท่านั้น</p>
        <button onClick={() => navigate("/")}>กลับไปหน้าหลัก</button>
      </div>
    );
  }
};

export default UserAccess;