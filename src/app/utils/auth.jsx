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
  if (!token) return null; 
  
  try {

    const decoded = jwt.decode(token);
    if (decoded && decoded.exp) {
      const currentTime = Math.floor(Date.now() / 1000); 
      if (decoded.exp < currentTime) {
          // console.error('Token has expired');
        return null; 
      }
    }
    return decoded; // คืนค่า decoded token
  } catch (error) {
    console.error('Invalid token:', error);
    return null;
  }
};

export const getUserIdFromToken = () => {
  const token = getToken(); 
  if (token) {
    const decoded = jwt.decode(token); 
    const id = decoded?.id;
    return id; 

  }
  return null; 
};