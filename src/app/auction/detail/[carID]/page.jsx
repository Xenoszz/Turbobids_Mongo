"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useParams } from "next/navigation";
import { getUserIdFromToken } from '@/app/utils/auth';  

const VehicleDetail = () => {
  const [car, setCar] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [bidAmount, setBidAmount] = useState(""); // State to store user's bid input
  const params = useParams();
  const userID = getUserIdFromToken(); // ดึง user_id ออกจาก token


  useEffect(() => {
    if (!params.carID) return;

    const fetchCarData = async () => {
      setLoading(true);
      try {
        const carResponse = await axios.get(`http://localhost:9500/api/detail/${params.carID}`);
        setCar(carResponse.data);

        const historyResponse = await axios.get(`http://localhost:9500/api/bidhistory/${params.carID}`);
        setHistory(historyResponse.data);

        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to fetch data.");
        setLoading(false);
      }
    };

    fetchCarData();
  }, [params.carID]);

  useEffect(() => {
    if (!car || !car.auction_end_time) return;

    const calculateTimeLeft = () => {
      const [endHours, endMinutes, endSeconds] = car.auction_end_time.split(':').map(Number);
      const now = new Date();
      const auctionEndTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes, endSeconds);

      if (auctionEndTime < now) {
        auctionEndTime.setDate(auctionEndTime.getDate() + 1);
      }

      const totalSecondsLeft = Math.max(0, Math.round((auctionEndTime - now) / 1000));
      const hours = Math.floor(totalSecondsLeft / 3600);
      const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
      const seconds = totalSecondsLeft % 60;

      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const updateTimer = () => {
      setTimeLeft(calculateTimeLeft());
    };

    updateTimer();
    const timerId = setInterval(updateTimer, 1000);

    return () => clearInterval(timerId);
  }, [car]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const handleBidSubmit = async () => {
    if (!bidAmount) {
      alert("Please enter a bid amount.");
      return;
    }

    const carID = params.carID;
    try {
      await axios.post('http://localhost:9500/api/bid', { carID, userID, bidAmount });
      alert("Bid submitted successfully!");

      // Optionally refresh bid history or other relevant data after submitting
      const historyResponse = await axios.get(`http://localhost:9500/api/bidhistory/${carID}`);
      setHistory(historyResponse.data);

    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid.");
    }
  };

  return (

    <div className="bg-gray-100 min-h-screen flex flex-col">
          <Navbar />
      <main className="flex-1 max-w-7xl mx-auto px-4 py-6">
        <div className="mb-4">
          <h1 className="text-2xl font-bold">{car?.car_brand} {car?.car_model}</h1>
        </div>

        <div className="flex flex-wrap lg:flex-nowrap gap-6">
          <div className="w-full lg:w-2/3 space-y-4">
            <div className="relative bg-white p-4 rounded-md shadow">
              {car?.car_image && (
                <img
                  src={car.car_image}
                  alt={car.car_model}
                  className="w-full h-64 object-cover rounded-md"
                />
              )}
            </div>

            <div className="flex gap-2 overflow-x-auto">
              {[...Array(8)].map((_, index) => (
                <img
                  key={index}
                  src={car?.car_image || ""}
                  alt={`Thumbnail ${index}`}
                  className="w-24 h-16 object-cover rounded-md cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold border-b pb-2">
                Vehicle Details
              </h2>
              <ul className="text-sm mt-2 space-y-1 text-gray-700">
                <li>Car ID: <span className="font-medium">{car?.car_ID}</span></li>
                <li>Odometer: <span className="font-medium">{car?.odometer} mi</span></li>
                <li>Primary Damage: <span className="font-medium">{car?.primary_damage}</span></li>
                <li>Cylinders: <span className="font-medium">{car?.cylinders}</span></li>
                <li>Color: <span className="font-medium">{car?.car_color}</span></li>
                <li>Type: <span className="font-medium">{car?.car_rear}</span></li>
                <li>Transmission: <span className="font-medium">{car?.transmission}</span></li>
                <li>Drive: <span className="font-medium">{car?.drive}</span></li>
                <li>Fuel: <span className="font-medium">{car?.fuel}</span></li>
              </ul>
            </div>

            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold border-b pb-2">
                Bid Information
              </h2>
              <p className="text-sm mt-2">
                Bid Status: <span className="text-green-500">{car?.bid_status}</span>
              </p>
              <p className="text-sm text-red-500">Time Left: {timeLeft}</p>
              <p className="text-sm">
                Current Bid: <span className="font-bold">{car?.current_bid} USD</span>
              </p>

              <div className="mt-4">
                <label className="block text-sm font-semibold mb-1">Your Bid:</label>
                <input
                  type="number"
                  value={bidAmount}
                  onChange={(e) => setBidAmount(e.target.value)}
                  placeholder="Enter Number"
                  className="w-full border rounded-md px-2 py-1 mt-2"
                />
                <p className="text-sm text-gray-500 mt-1">{car?.bid_increment} USD Bid Increment</p>
                <button className="w-full bg-orange-500 text-white py-2 rounded-md mt-2 hover:bg-orange-600" onClick={handleBidSubmit}>
                  Bid Now!
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-4 rounded-md shadow mt-6">
          <h2 className="text-lg font-semibold border-b pb-2">History Bid</h2>
          <ul className="text-sm mt-2 space-y-2">
          {history.length > 0 ? (
          history
            .sort((a, b) => b.bid_amount - a.bid_amount) // เรียงจากมากไปหาน้อย
            .slice(0, 4) // เลือก 4 รายการล่าสุดหลังจากเรียง
            .map((bid) => (
      <li key={bid.history_id}>
        <span className="font-medium">User ID: {bid.Username} </span>
        offered <span className="font-bold">{bid.bid_amount} USD</span> on {new Date(bid.bid_time).toLocaleString()}
      </li>
            ))
          ) : (
            <li>No bid history available.</li>
          )}
          </ul>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VehicleDetail;