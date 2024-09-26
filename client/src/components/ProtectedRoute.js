import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // ดึง token จาก localStorage

  if (!token) {
    return <Navigate to="/login" />; // ถ้าไม่มี token จะถูกนำทางไปที่หน้า login
  }

  return children; // ถ้ามี token ก็จะแสดง component ที่ถูกส่งผ่านมา
};

export default ProtectedRoute;