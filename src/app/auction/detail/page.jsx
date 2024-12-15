"use client";

import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

const VehicleDetail = () => {
  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-4">
          <h1 className="text-2xl font-bold">2022 BMW X4M</h1>
          <p className="text-sm text-gray-500">
            Home &gt; Search Results &gt; BMW &gt; 2022 BMW X4M
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          {/* Left Section */}
          <div className="w-full lg:w-2/3">
            {/* Image Slider */}
            <div className="relative bg-white p-4 rounded-md shadow">
              <img
                src="/car-image-main.jpg"
                alt="BMW X4M"
                className="w-full h-64 object-cover rounded-md"
              />
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow">
                &lt;
              </button>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow">
                &gt;
              </button>
            </div>
            {/* Thumbnail List */}
            <div className="mt-4 flex gap-2 overflow-x-auto">
              {[...Array(8)].map((_, idx) => (
                <img
                  key={idx}
                  src={`/car-thumb-${idx + 1}.jpg`}
                  alt={`Thumbnail ${idx + 1}`}
                  className="w-24 h-16 object-cover rounded-md border"
                />
              ))}
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full lg:w-1/3 space-y-6">
            {/* Vehicle Details */}
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold border-b pb-2">
                Vehicle Details
              </h2>
              <ul className="text-sm mt-2 space-y-1 text-gray-700">
                <li>Car ID: <span className="font-medium">0123456789</span></li>
                <li>Odometer: <span className="font-medium">18,525 mi (ACTUAL)</span></li>
                <li>Primary Damage: <span className="font-medium">Water/Flood</span></li>
                <li>Cylinders: <span className="font-medium">6</span></li>
                <li>Color: <span className="font-medium">BLACK</span></li>
                <li>Type: <span className="font-medium">SUV</span></li>
                <li>Transmission: <span className="font-medium">AUTOMATIC</span></li>
                <li>Drive: <span className="font-medium">All wheel drive</span></li>
                <li>Fuel: <span className="font-medium">Diesel</span></li>
                <li>Keys: <span className="font-medium">YES</span></li>
              </ul>
            </div>

            {/* Bid Section */}
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold border-b pb-2">
                Bid Information
              </h2>
              <p className="text-sm mt-2">
                Bid Status: <span className="text-green-500">Open</span>
              </p>
              <p className="text-sm">Sale Status: Minimum Bid</p>
              <p className="text-sm text-red-500">Time Left: 2D 1H 57min</p>
              <p className="text-sm">
                Current Bid: <span className="font-bold">$30,250.00 USD</span>
              </p>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">Your Bid:</label>
                <div className="flex items-center gap-4">
                  <input type="radio" name="bid-type" id="normal-bid" />
                  <label htmlFor="normal-bid" className="text-sm">Normal Bid</label>
                  <input type="radio" name="bid-type" id="auto-bid" />
                  <label htmlFor="auto-bid" className="text-sm">Auto Bid</label>
                </div>
                <input
                  type="number"
                  placeholder="Enter Number"
                  className="w-full border rounded-md px-2 py-1 mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">$250.00 USD Bid Increment</p>
                <button className="w-full bg-orange-500 text-white py-2 rounded-md mt-2 hover:bg-orange-600">
                  Bid Now!
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* History Bid & Scale Info */}
        <div className="mt-6 flex flex-wrap lg:flex-nowrap gap-6">
          {/* History Bid */}
          <div className="w-full lg:w-2/3 bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold border-b pb-2">History Bid</h2>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              {[...Array(4)].map((_, idx) => (
                <li key={idx}>
                  User: XX Offer <span className="font-medium">$30,250.00 USD</span> ON 10 Oct 4:25 AM
                </li>
              ))}
            </ul>
          </div>

          {/* Scale Information */}
          <div className="w-full lg:w-1/3 bg-white p-4 rounded-md shadow">
            <h2 className="text-lg font-semibold border-b pb-2">
              Scale Information
            </h2>
            <ul className="text-sm text-gray-600 mt-2 space-y-1">
              <li>Sale Date: Thu. Oct 3, 2024, 12:00 PM ICT</li>
              <li>Last Updated: 10/10/2024 4:25 AM</li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;
