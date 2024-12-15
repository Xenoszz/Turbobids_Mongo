"use client";
import { useState, useEffect } from "react";
import axios from "axios";

const CarCard = ({ id, carImage, carModel, status, countdownTime, detailsLink }) => {
  const [timeLeft, setTimeLeft] = useState(countdownTime);
  const [isFavorited, setIsFavorited] = useState(false); // เพิ่ม state สำหรับ Favorite

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  };

  const handleFavoriteClick = async () => {
    setIsFavorited(!isFavorited); // เปลี่ยนสถานะ favorite ก่อน
    try {
      // ส่งข้อมูล id ของรถไปยังเซิร์ฟเวอร์
      const response = await axios.post('http://localhost:9500/favorites', {
        id,
      });
      console.log(response.data); // Log การตอบกลับจากเซิร์ฟเวอร์ หากต้องการ
    } catch (error) {
      console.error("Error updating favorite status", error);
    }
  };

  return (
    <div className="relative border rounded-3xl shadow-lg overflow-hidden max-w-sm bg-white">
      {/* ปุ่ม Favorite */}
      <div className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-6 w-6 ${
            isFavorited ? "text-red-500" : "text-gray-500"
          } transition-colors duration-300`}
          fill={isFavorited ? "currentColor" : "none"}
          viewBox="0 0 24 24"
          stroke="currentColor"
          onClick={handleFavoriteClick}
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
        {/* เวลาเหลือ */}
        <p className="text-lg font-semibold mt-4">Time left: {formatTime(timeLeft)}</p>
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
