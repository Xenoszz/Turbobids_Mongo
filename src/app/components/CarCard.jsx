"use client";
import { useState, useEffect } from 'react';

const CarCard = ({ carImage, carModel, status, countdownTime, detailsLink }) => {
  const [timeLeft, setTimeLeft] = useState(countdownTime);

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
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  return (
    <div className="border rounded-3xl shadow-lg overflow-hidden max-w-sm bg-white">
      <img src={carImage} alt={carModel} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-2xl font-semibold">{carModel}</h2>
        <p className="text-lg text-gray-500 mt-2">{status}</p>
        <p className="text-lg font-semibold mt-4">Time left: {formatTime(timeLeft)}</p>
        <div className="flex justify-center mt-6">
          <a
            href={detailsLink}
            className="bg-[#76A0FF] text-white py-2 px-12 rounded-xl hover:bg-blue-700 transition duration-300 "
          >
            View Details
          </a>
        </div>
      </div>
    </div>
  );
};

export default CarCard;
