"use client"
import jwt from 'jsonwebtoken';

// ฟังก์ชันสำหรับดึง token จาก localStorage
export const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// ฟังก์ชันสำหรับ decode token
export const decodeToken = () => {
  const token = getToken();
  if (!token) return null; // ถ้าไม่มี token ให้คืนค่า null
  
  try {
    // ใช้ jwt.decode เพื่อ decode token
    const decoded = jwt.decode(token);
    // ตรวจสอบว่า token หมดอายุหรือไม่
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000); // เวลาปัจจุบันในหน่วยวินาที
      if (decoded.exp < currentTime) {
          // console.error('Token has expired');
        return null; // คืนค่า null ถ้า token หมดอายุ
      }
    }
    return decoded; // คืนค่า decoded token
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = getToken(); // ดึง token จาก localStorage
  if (token) {
    const decoded = jwt.decode(token); // ถอดรหัส token
    const id = decoded?.id;
    return id; // ดึง user_id จาก decoded token (สมมุติว่า 'id' คือ key ที่เก็บ user_id)

  }
  return null; // ถ้าไม่มี token ให้คืนค่า null
};