"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "../../../components/Navbar";
import Footer from "../../../components/Footer";
import { useParams, useRouter } from "next/navigation";
import { getUserIdFromToken } from '@/app/utils/auth';


const VehicleDetail = () => {
  const [car, setCar] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null);
  const [bidAmount, setBidAmount] = useState(""); 
  const [isAuctionEnded, setIsAuctionEnded] = useState(false); 
  const [isAuctionStarted, setIsAuctionStarted] = useState(false); 
  const [bidStatus, setBidStatus] = useState("Open"); 
  const params = useParams();
  const userID = getUserIdFromToken(); 
  const router = useRouter();
  

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
    if (!car || !car.auction_end_date) return;

    let auctionstartdate = car.auction_start_date;
    if (auctionstartdate.includes('T')) {
      auctionstartdate = auctionstartdate.split('T')[0];
    }
    if (auctionstartdate.includes('Z')) {
      auctionstartdate = auctionstartdate.replace('Z', '');
    }
  
    let auctionStarttime= car.auction_start_time;
    if (auctionStarttime.includes('T')) {
      auctionStarttime = auctionStarttime.replace('T', '');
    }
    if (auctionStarttime.includes('Z')) {
      auctionStarttime = auctionStarttime.replace('Z', '');
    }

    const auctionStartDateTimeString = `${auctionstartdate}T${auctionStarttime}`;
    console.log('Auction End Date and Time:', auctionStartDateTimeString);
  
    const auctionStartDateTime = new Date(auctionStartDateTimeString);
    console.log('Auction End DateTime Object:', auctionStartDateTime);

    let auctionEndDate = car.auction_end_date;
    if (auctionEndDate.includes('T')) {
      auctionEndDate = auctionEndDate.split('T')[0];
    }
    if (auctionEndDate.includes('Z')) {
      auctionEndDate = auctionEndDate.replace('Z', '');
    }
  
    let auctionEndTime = car.auction_end_time;
    if (auctionEndTime.includes('T')) {
      auctionEndTime = auctionEndTime.replace('T', '');
    }
    if (auctionEndTime.includes('Z')) {
      auctionEndTime = auctionEndTime.replace('Z', '');
    }

    const auctionEndDateTimeString = `${auctionEndDate}T${auctionEndTime}`;
    console.log('Auction End Date and Time:', auctionEndDateTimeString);
  
    const auctionEndDateTime = new Date(auctionEndDateTimeString);
    console.log('Auction End DateTime Object:', auctionEndDateTime);
  
    // เพิ่ม 1 วันเข้าไปใน Date object
    auctionEndDateTime.setDate(auctionEndDateTime.getDate() + 1);
  
    
    const now = new Date();
    console.log('Current Date and Time:', now);

    
    // เปรียบเทียบเวลาปัจจุบันกับเวลาสิ้นสุดการประมูล
    if (now >= auctionEndDateTime) {
      setBidStatus("Closed");
      setIsAuctionEnded(true);
      setTimeLeft("00:00:00");
      return; // การประมูลสิ้นสุดแล้ว ไม่ต้องตั้งค่าตัวนับเวลา
    } else if (now < auctionStartDateTime) {
      // การประมูลยังไม่เริ่ม
      setIsAuctionStarted(false);
      setBidStatus("Coming Soon");
      setTimeLeft("Coming Soon");
      return;
    } else {
      // การประมูลกำลังดำเนินอยู่
      setIsAuctionStarted(true);
      setBidStatus("Open");
      setIsAuctionEnded(false);
    }

    
  
    const calculateTimeLeft = () => {
      const now = new Date(); 
      const [endHours, endMinutes, endSeconds] = car.auction_end_time.split(':').map(Number);
      const auctionEndTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), endHours, endMinutes, endSeconds);
      
      if (auctionEndTime <= now) {
        auctionEndTime.setDate(auctionEndTime.getDate() + 1);
      }
  
      const totalSecondsLeft = Math.max(0, Math.round((auctionEndTime - now) / 1000));
      const hours = Math.floor(totalSecondsLeft / 3600);
      const minutes = Math.floor((totalSecondsLeft % 3600) / 60);
      const seconds = totalSecondsLeft % 60;
  
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };
  
    const updateTimer = () => {
      const timeRemaining = calculateTimeLeft();
      setTimeLeft(timeRemaining);
  
      // ตรวจสอบว่าการประมูลสิ้นสุดหรือยัง
      if (timeRemaining === "00:00:00") {
        setIsAuctionEnded(true);
        clearInterval(timerId); // Stop the timer
      }
    };
  
    const timerId = setInterval(updateTimer, 1000);
    updateTimer();
  
    return () => clearInterval(timerId);
  }, [car]);

  const handleBidSubmit = async () => {
    if (!bidAmount) {
      alert("Please enter a bid amount.");
      return;
    }

    const carID = params.carID;
    try {
      await axios.post('http://localhost:9500/api/bid', { carID, userID, bidAmount });
      alert("Bid submitted successfully!");

      const carResponse = await axios.get(`http://localhost:9500/api/detail/${carID}`);
      setCar(carResponse.data);

      // Optionally refresh bid history or other relevant data after submitting
      const historyResponse = await axios.get(`http://localhost:9500/api/bidhistory/${carID}`);
      setHistory(historyResponse.data);

    } catch (error) {
      console.error("Error submitting bid:", error);
      alert("Failed to submit bid.");
    }
  };

  const handleCompleteAuction = async () => {
    try {
      const carID = params.carID;
      const response = await axios.post(`http://localhost:9500/api/completeAuction`,{ carID, userID } );
      const data = response.data;

  
      if (data.success) {
        // ผู้ใช้ปัจจุบันเป็นผู้ประมูลสูงสุด
        alert(data.message || "Complete");
        router.push('/auction/completed'); // เปลี่ยน URL ตามต้องการ
      } else {
        // ผู้ใช้ปัจจุบันไม่ใช่ผู้ประมูลสูงสุด หรือเกิดข้อผิดพลาด
        alert(data.message || "เกิดข้อผิดพลาด");
        router.back(); // ย้อนกลับไปหน้าก่อนหน้า (ถ้าต้องการ)
      }
    } catch (error) {
      console.error("Error completing auction:", error);
      alert("เกิดข้อผิดพลาดในการตรวจสอบผู้ประมูลสูงสุด");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

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
            <img
              src={car?.car_image || "/IMG/byd.JPG"}
              alt={car?.car_model || "Car Image"}
              className="w-full h- object-cover rounded-md"
            />
          </div>


            <div className="flex gap-2 overflow-x-auto">
              {[...Array(8)].map((_, index) => (
                <img
                  key={index}
                  src={car?.car_image || "/IMG/byd.JPG"}
                  alt={`Thumbnail ${index}`}
                  className="w-24 h-16 object-cover rounded-md cursor-pointer"
                />
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3 space-y-6">
            <div className="bg-white p-4 rounded-md shadow">
              <h2 className="text-lg font-semibold border-b pb-2">Vehicle Details</h2>
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
              <h2 className="text-lg font-semibold border-b pb-2">Bid Information</h2>
              <p className="text-sm mt-2">
                Bid Status: <span className={`text-${bidStatus === "Closed" ? "red" : "green"}-500`}>{bidStatus}</span>
              </p>
              <p className="text-sm text-red-500">Time Left: {timeLeft}</p>
              <p className="text-sm">
                Current Bid: <span className="font-bold">{car?.current_bid} USD</span>
              </p>

              <div className="mt-4">
                {isAuctionEnded ? (
                  <button
                    className="w-full bg-blue-500 text-white py-2 rounded-md mt-2 hover:bg-blue-600"
                    onClick={handleCompleteAuction}
                  >
                    Complete Auction
                  </button>
                ) : bidStatus === "Coming Soon" ? (
                  <button
                    className="w-full bg-gray-500 text-white py-2 rounded-md mt-2 cursor-not-allowed"
                    disabled
                  >
                    Coming Soon
                  </button>
                ) :(
                  <>
                    <label className="block text-sm font-semibold mb-1">Your Bid:</label>
                    <input
                      type="number"
                      value={bidAmount}
                      onChange={(e) => setBidAmount(e.target.value)}
                      placeholder="Enter Number"
                      className="w-full border rounded-md px-2 py-1 mt-2"
                    />
                    <p className="text-sm text-gray-500 mt-1">{car?.bid_increment} USD Bid Increment</p>
                    <button
                      className="w-full bg-orange-500 text-white py-2 rounded-md mt-2 hover:bg-orange-600"
                      onClick={handleBidSubmit}
                    >
                      Bid Now!
                    </button>
                  </>
                )}
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
