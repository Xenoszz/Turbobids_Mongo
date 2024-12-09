"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import "../../globals.css";

const Auctions = () => {
  const [currentPage, setCurrentPage] = useState(1); // เก็บเลขหน้าปัจจุบัน
  const [cars, setCars] = useState([]); // เก็บข้อมูลรถยนต์
  const itemsPerPage = 3; // จำนวนรถที่จะแสดงต่อหน้า

  // จำลองการดึงข้อมูลจาก API (อัปเดตข้อมูลใหม่ตามหน้าปัจจุบัน)
  const fetchCars = async (page) => {
    const allCars = [
      {
        id: `CAR-${page}1`,
        brand: "BMW",
        model: "X4M",
        year: "2023",
        startingPrice: "10,000 $",
        date: `Page ${page} - Date 1`,
        image: "/IMG/byd.JPG",
      },
      {
        id: `CAR-${page}2`,
        brand: "Audi",
        model: "Q5",
        year: "2022",
        startingPrice: "9,000 $",
        date: `Page ${page} - Date 2`,
        image: "/IMG/byd.JPG",
      },
      {
        id: `CAR-${page}3`,
        brand: "Mercedes",
        model: "GLC",
        year: "2021",
        startingPrice: "12,000 $",
        date: `Page ${page} - Date 3`,
        image: "/IMG/byd.JPG",
      },
    ];
    return new Promise((resolve) => setTimeout(() => resolve(allCars), 500));
  };

  useEffect(() => {
    const loadCars = async () => {
      const data = await fetchCars(currentPage);
      setCars(data);
    };
    loadCars();
  }, [currentPage]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

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
              <img src={car.image} alt={car.model} className="w-full md:w-1/3 object-cover" />

              {/* ข้อมูลรถ */}
              <div className="relative p-4 flex-1">
                <p className="text-sm text-gray-500 mb-2">{car.date}</p>
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-start text-lg mb-2">
                    {/* Left Group */}
                    <div className="w-1/2">
                      <p>
                        <strong>Brand:</strong> {car.brand}
                      </p>
                      <p>
                        <strong>Model:</strong> {car.model}
                      </p>
                      <p>
                        <strong>Year:</strong> {car.year}
                      </p>
                    </div>

                    {/* Right Group */}
                    <div className="w-1/2 pl-4">
                      <p>
                        <strong>Car ID:</strong> {car.id}
                      </p>
                      <p>
                        <strong>Starting Price:</strong> {car.startingPrice}
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

        {/* Pagination */}
        <div className="flex justify-center items-center mt-6 space-x-2">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className={`px-2 py-1 text-gray-500 hover:text-gray-700 ${
              currentPage === 1 ? "text-gray-300 cursor-not-allowed" : ""
            }`}
          >
            &laquo;
          </button>
          {Array(5)
            .fill()
            .map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 rounded ${
                  currentPage === i + 1
                    ? "bg-blue-500 text-white"
                    : "text-gray-700 hover:bg-gray-300"
                }`}
              >
                {i + 1}
              </button>
            ))}
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === 5}
            className={`px-2 py-1 text-gray-500 hover:text-gray-700 ${
              currentPage === 5 ? "text-gray-300 cursor-not-allowed" : ""
            }`}
          >
            &raquo;
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Auctions;
