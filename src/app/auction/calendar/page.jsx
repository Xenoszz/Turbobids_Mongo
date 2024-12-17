"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";  
import { useRouter } from "next/navigation";  
import "../../globals.css";

const Auctions = () => {
  const [cars, setCars] = useState([]); // เก็บข้อมูลรถยนต์ทั้งหมด
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const router = useRouter(); // Initialize useRouter hook

  // ดึงข้อมูลทั้งหมดจาก API เมื่อโหลดคอมโพเนนต์
  useEffect(() => {
    const loadCars = async () => {
      try {
        // ดึงข้อมูลจาก API
        const response = await fetch('http://localhost:9500/api/calendar'); // เปลี่ยน URL ให้ตรงกับ API ของคุณ
        const data = await response.json();

        // กรองข้อมูลให้แสดงเฉพาะวันที่เป็นพรุ่งนี้หรือหลังจากนั้น
        const filteredData = data.filter((car) => {
          const carDate = new Date(car.auction_start_date); // ใช้ auction_start_date ตรงจากฐานข้อมูล
          const today = new Date();
          today.setHours(0, 0, 0, 0); // รีเซ็ตเวลาเป็น 00:00:00
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1);

          // Return true ถ้า carDate เป็นพรุ่งนี้หรือหลังจากนั้น
          return carDate >= tomorrow;
        });

        setCars(filteredData); // เก็บข้อมูลที่กรองแล้วใน state
      } catch (error) {
        console.error('Error loading cars:', error);
      }
    };

    loadCars();
  }, []); // useEffect ทำงานครั้งเดียวตอนโหลดคอมโพเนนต์


   // Fetch auction data based on search term
   useEffect(() => {
    if (searchTerm.length > 0) {
      axios.get(`http://localhost:9500/api/othersearch`, {
        params: { searchTerm } // Pass searchTerm as a query parameter
      })
        .then(response => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const tomorrow = new Date(today);
          tomorrow.setDate(today.getDate() + 1); 
          const filteredData = response.data.filter((car) => {
            const auctionDate = new Date(car.auction_start_date);
            return auctionDate >= tomorrow; 
          });

          setCars(filteredData);
        })
        .catch(error => {
          console.error("Error fetching auction data:", error);
        });
    } else {
      // If no search term is provided, clear the auction data
      setCars([]);
    }
  }, [searchTerm]); // This runs every time the search term changes
  



  const handleBidNow = (carID) => {
    router.push(`/auction/detail/${carID}`); // Navigate ไปที่หน้ารายละเอียดพร้อม carID
  };

  return (
    <div className="bg-gray-100 min-h-screen font-happy">
      <Navbar />
      <div className="mx-auto p-4 flex justify-between bg-white mb-4">
        <h1 className="text-2xl font-bold ml-24">Auctions Calendar</h1>
        <input
          type="text"
          placeholder="Search Keywords..."
          className="border border-gray-300 rounded-lg px-4 py-2 mr-24"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="space-y-6 max-w-7xl mx-auto mb-8">
        {/* Check if there are any auctions */}
        {cars.length === 0 ? (
          <div className="text-center text-2xl text-gray-700 font-bold mt-8 bg-white rounded-3xl p-4">
            No auctions found matching your search.
          </div>
        ) : (
          cars.map((cars) => (
            <div
              key={cars.auction_id}
              className="relative flex flex-col bg-white shadow-lg rounded-3xl p-4"
            >
              {/* Date */}
              <div className="text-xl font-bold text-gray-700 mb-2">
                {cars.formatted_auction_start_date}
              </div>

              {/* Auction Content */}
              <div className="flex justify-between items-center">
                {/* Image Section */}
                <img
                  src="/IMG/byd.JPG"  // Replace with auction-specific car image URL
                  alt="Car"
                  className="w-1/3 h-1/2 object-cover rounded-md"
                />

                {/* Text Section */}
                <div className="flex flex-col w-full ml-6">
                  <div className="flex justify-between text-lg mb-2">
                    {/* Left Group */}
                    <div>
                      <p><strong>Car ID:</strong> {cars.car_ID}</p>
                      <p><strong>Brand:</strong> {cars.car_brand}</p>
                      <p><strong>Model:</strong> {cars.car_model}</p>
                      <p><strong>Year:</strong> {cars.car_year}</p>
                    </div>

                    {/* Right Group */}
                    <div className="text-left mr-24">
                      <p><strong>Sale Highlights:</strong> {cars.car_details}</p>
                      <p><strong>Sale Time:</strong> {cars.formatted_auction_start_time}</p>
                      <p><strong>Current Bid:</strong> ${cars.auction_current_price}</p>
                    </div>
                  </div>
                </div>

                {/* Bid Now Button */}
                <div className="absolute bottom-4 right-4">
                  <button className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-2xl hover:bg-blue-700" onClick={() => handleBidNow(cars.car_ID)} >
                  View Details
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      <Footer />
    </div>
  );
};

export default Auctions;
