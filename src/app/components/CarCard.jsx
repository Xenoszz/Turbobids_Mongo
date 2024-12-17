"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import {getUserIdFromToken} from "@/app/utils/auth";

const CarCard = ({
  car_ID,
  carImage,
  carModel,
  status,
  countdownTime,
  detailsLink,
  onFavoriteToggle,
}) => {
  const [timeLeft, setTimeLeft] = useState(countdownTime);
  const [isFavorited, setIsFavorited] = useState(false); // สถานะสำหรับ Favorite
  const userID = getUserIdFromToken(); // ดึง user_id ออกจาก token


  const userToken = localStorage.getItem('token');

  // เช็คสถานะ Favorite จากเซิร์ฟเวอร์
  const checkFavoriteStatus = async (carID) => {
    try {
      const response = await axios.post(
        "http://localhost:9500/favorites/status",
        {
          car_ID: carID, // ส่ง car_ID ใน body
          userID: userID, // ส่ง user_id ที่ดึงมาจาก token
        },
      );
      
      // ตั้งค่า isFavorited จากข้อมูลที่ได้รับ
      setIsFavorited(response.data.favorite_status || false);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการดึงสถานะรายการโปรด", error);
      setIsFavorited(false); // รีเซ็ตสถานะเป็น false ในกรณีเกิดข้อผิดพลาด
    }
  };
  useEffect(() => {
    console.log("car_ID changed:", car_ID);
    console.log("userToken changed:", userToken);
  }, [car_ID, userToken]);
  
  // โหลดสถานะ Favorite เมื่อ `car_ID` หรือ `userToken` เปลี่ยน
  useEffect(() => {
    setIsFavorited(false); // รีเซ็ตสถานะเริ่มต้น
    if (userToken && car_ID) {
      checkFavoriteStatus(car_ID); // โหลดสถานะใหม่
    }
  }, [car_ID, userToken]);

  // จัดการ Favorite
  const handleFavoriteClick = async () => {
    const newFavoriteStatus = !isFavorited;
    setIsFavorited(newFavoriteStatus); // เปลี่ยนสถานะ favorite ก่อน

    try {
      // ส่ง car_ID และ user_id ไปพร้อมกับ request
      const response = await axios.post(
        "http://localhost:9500/favorites",
        {
          car_ID: car_ID, // ส่ง car_ID ที่ต้องการ favorite
          userID: userID, // ส่ง user_id ที่ดึงมาจาก token
        },
      );
      console.log(response.data); // Log การตอบกลับจากเซิร์ฟเวอร์ หากต้องการ
      // console.log(userID);

    } catch (error) {
      console.error("Error updating favorite status", error);
    }

    // เรียก onFavoriteToggle ถ้ามี
    if (onFavoriteToggle) {
      onFavoriteToggle(car_ID, newFavoriteStatus);
    }
  };


  return (
    <div className="relative border rounded-3xl shadow-lg overflow-hidden max-w-sm bg-white">
      {/* ปุ่ม Favorite */}
      <div
        className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer"
        onClick={handleFavoriteClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${isFavorited ? "text-red-500" : "text-gray-500"} transition-colors duration-300`}
          fill={isFavorited ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={isFavorited ? 0 : 2}
            d="M3.172 5.172a4.004 4.004 0 015.656 0L12 8.343l3.172-3.17a4.004 4.004 0 115.656 5.656L12 20.485 3.172 10.828a4.004 4.004 0 010-5.656z"
          />
        </svg>
      </div>

      {/* รูปภาพ */}
      <img src={carImage} alt={carModel} className="w-full h-48 object-cover" />
      <div className="p-4">
        {/* ชื่อรุ่น */}
        <h2 className="text-2xl font-semibold">{carModel}</h2>
        {/* สถานะ */}
        <p className="text-lg text-gray-500 mt-2">{status}</p>
        {/* ปุ่ม View Details */}
        <div className="flex justify-center mt-6">
          <a
            href={detailsLink}
            className="bg-[#76A0FF] text-white py-2 px-12 rounded-xl hover:bg-blue-700 transition duration-300"
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
