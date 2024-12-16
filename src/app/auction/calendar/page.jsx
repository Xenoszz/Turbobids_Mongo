"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../globals.css";

const Auctions = () => {
  const [cars, setCars] = useState([]); // เก็บข้อมูลรถยนต์ทั้งหมด

  // ดึงข้อมูลทั้งหมดจาก API เมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    const loadCars = async () => {
      // สมมติว่าคุณดึงข้อมูลจาก API ผ่าน fetch หรือ axios
      const response = await fetch('http://localhost:9500/api/calendar'); // เปลี่ยนเป็น URL ที่ดึงข้อมูลจาก API ของคุณ
      const data = await response.json();
      setCars(data); // เก็บข้อมูลใน state
    };
    loadCars();
  }, []); // useEffect จะทำงานแค่ครั้งเดียวเมื่อโหลดคอมโพเนนต์

  return (
    <div className="bg-gray-100 min-h-screen font-happy">
      <Navbar />
      <div className="mx-auto p-4 flex justify-between bg-white mb-4">
        <h1 className="text-2xl font-bold ml-24 ">Auctions Calendar</h1>
        <input
          type="text"
          placeholder="Search Keywords..."
          className="border border-gray-300 rounded-lg px-4 py-2 mr-24"
        />
      </div>

      <div className="container mx-auto py-8 px-4">
        <div className="space-y-6">
          {cars.map((car, index) => (
            <div
              key={index}
              className="bg-white shadow-md rounded-3xl overflow-hidden flex flex-col md:flex-row"
            >
              {/* รูปภาพ */}
              <img src={car.image} alt={car.car_model} className="w-full md:w-1/3 object-cover" />

              {/* ข้อมูลรถ */}
              <div className="relative p-4 flex-1">
                <p className="text-sm text-gray-500 mb-2">{car.date}</p>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start text-lg mb-2">
                    {/* Left Group */}
                    <div className="w-1/2">
                      <p>
                        <strong>Brand:</strong> {car.car_brand}
                      </p>
                      <p>
                        <strong>Model:</strong> {car.car_model}
                      </p>
                      <p>
                        <strong>Year:</strong> {car.car_year}
                      </p>
                    </div>

                    {/* Right Group */}
                    <div className="w-1/2 pl-4">
                      <p>
                        <strong>Car ID:</strong> {car.car_ID}
                      </p>
                      <p>
                        <strong>Starting Price: $</strong> {car.auction_starting_price}
                      </p>
                    </div>
                  </div>
                </div>
                {/* View Details Button */}
                <button className="absolute bottom-4 right-4 px-4 py-2 bg-blue-500 text-white rounded-2xl hover:bg-blue-600 ">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auctions;
