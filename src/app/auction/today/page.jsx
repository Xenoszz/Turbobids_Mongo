"use client";
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import '../../globals.css';

export default function Home() {
  // ตัวแปรเก็บข้อมูลรายการประมูล (ในที่นี้ให้เป็น array ว่างเพื่อทดสอบ)
  const auctions = [1]; // แก้ไขเป็นข้อมูลการประมูลจริง หรือปล่อยไว้เป็น array ว่าง

  return (
    <div className="min-h-screen bg-gray-100 font-happy">
      {/* Navbar */}
      <div>
        <Navbar />
      </div>

      {/* Header Section */}
      <div className="mx-auto p-4 flex justify-between bg-white mb-4">
        <h1 className="text-2xl font-bold ml-24">Auctions Live Right Now</h1>
        <div>
          <input type="text" placeholder="Search Keywords..." className="border border-gray-300 rounded-lg px-4 py-2 mr-24"/>
        </div>
      </div>

      {/* Auctions Section */}
      <div className="space-y-6 max-w-7xl mx-auto mb-8">
        {/* ตรวจสอบว่ามีการประมูลหรือไม่ */}
        {auctions.length === 0 ? (
          <div className="text-center text-2xl text-gray-700 font-bold mt-8 bg-white rounded-3xl p-4">
            There are no auctions available at this time!
          </div>
        ) : (
          auctions.map((_, index) => (
            <div
              key={index}
              className="relative flex flex-col bg-white shadow-lg rounded-3xl p-4"
            >
              {/* Date */}
              <div className="text-sm font-bold text-gray-700 mb-2">
                3 OCT 2024
              </div>

              {/* Auction Content */}
              <div className="flex justify-between items-center">
                {/* Image Section */}
                <img
                  src="/IMG/byd.JPG"
                  alt="Car"
                  className="w-1/2 h-1/2 object-cover rounded-md"
                />

                {/* Text Section */}
                <div className="flex flex-col w-full ml-6">
                  <div className="flex justify-between text-lg mb-2">
                    {/* Left Group */}
                    <div>
                      <p>
                        <strong>Car ID:</strong> XXXXXXXX
                      </p>
                      <p>
                        <strong>Brand:</strong> BMW
                      </p>
                      <p>
                        <strong>Model:</strong> X4M
                      </p>
                      <p>
                        <strong>Year:</strong> 2023
                      </p>
                    </div>

                    {/* Right Group */}
                    <div className="text-left">
                      <p>
                        <strong>Sale Highlights:</strong> The car is in very good
                        condition.
                      </p>
                      <p>
                        <strong>Sale Time:</strong> 12:00 PM
                      </p>
                      <p>
                        <strong>Current Bid:</strong> 30,250 $
                      </p>
                    </div>
                  </div>
                </div>

                {/* Bid Now Button */}
                <div className="absolute bottom-4 right-4">
                  <button className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-3xl hover:bg-blue-700">
                    Bid Now!
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      <div>
        <Footer />
      </div>
    </div>
  );
}
