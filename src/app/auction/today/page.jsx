"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import axios from "axios";  // Add axios for fetching data
import { useRouter } from "next/navigation";  // Import useRouter
import '../../globals.css';

export default function Home() {
  const [auctions, setAuctions] = useState([]); // State to store auction data
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const router = useRouter();  // Initialize useRouter hook

  // Fetch today's auctions when component mounts
  useEffect(() => {
    axios.get('http://localhost:9500/api/Todayauctions')
      .then(response => {
        // Filter the data to only show today's auctions
        const today = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight

        // Filter auctions to show only those with today's date
        const todayAuctions = response.data.filter((auction) => {
          const auctionDate = new Date(auction.auction_start_date).setHours(0, 0, 0, 0);
          return auctionDate === today;
        });

        setAuctions(todayAuctions); // Set filtered auction data
      })
      .catch(error => {
        console.error("Error fetching auction data:", error);
      });
  }, []); // This runs once when the component mounts

  // Fetch auction data based on search term
  useEffect(() => {
    if (searchTerm.length > 0) {
      // Fetch auction data for the search term
      axios.get(`http://localhost:9500/api/TodaySearch`, {
        params: { searchTerm } // ส่ง searchTerm เป็น query parameter
      })
        .then(response => {
          // Filter the data to only show today's auctions based on the search term
          const today = new Date().setHours(0, 0, 0, 0); // Get today's date at midnight
          const todayAuctions = response.data.filter((auction) => {
            const auctionDate = new Date(auction.auction_start_date).setHours(0, 0, 0, 0);
            return auctionDate === today;
          });
          setAuctions(todayAuctions); // Set filtered auction data
        })
        .catch(error => {
          console.error("Error fetching auction data:", error);
        });
    } else {
      // If no search term is provided, clear auctions
      setAuctions([]);
    }
  }, [searchTerm]); // This runs every time the search term changes


  const handleBidNow = (carID) => {
    router.push(`/auction/detail/${carID}`);  // Navigate to the details page with the carID
  };

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
          <input
            type="text"
            placeholder="Search Keywords..."
            className="border border-gray-300 rounded-lg px-4 py-2 mr-24"
            value={searchTerm}  // Bind input field to state
            onChange={(e) => setSearchTerm(e.target.value)} // Update search term on input change
          />
          
        </div>
      </div>

      {/* Auctions Section */}
      <div className="space-y-6 max-w-7xl mx-auto mb-8">
        {/* Check if there are any auctions */}
        {auctions.length === 0 ? (
          <div className="text-center text-2xl text-gray-700 font-bold mt-8 bg-white rounded-3xl p-4">
            No auctions found for today.
          </div>
        ) : (
          auctions.map((auction) => (
            <div
              key={auction.auction_id}
              className="relative flex flex-col bg-white shadow-lg rounded-3xl p-4"
            >
              {/* Date */}
              <div className="text-xl font-bold text-gray-700 mb-2">
                {auction.formatted_auction_start_date}
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
                      <p><strong>Car ID:</strong> {auction.car_ID}</p>
                      <p><strong>Brand:</strong> {auction.car_brand}</p>
                      <p><strong>Model:</strong> {auction.car_model}</p>
                      <p><strong>Year:</strong> {auction.car_year}</p>
                    </div>

                    {/* Right Group */}
                    <div className="text-left mr-24">
                      <p><strong>Sale Highlights:</strong> {auction.car_details}</p>
                      <p><strong>Sale Time:</strong> {auction.formatted_auction_start_time}</p>
                      <p><strong>Current Bid:</strong> ${auction.auction_current_price}</p>
                    </div>
                  </div>
                </div>

                {/* Bid Now Button */}
                <div className="absolute bottom-4 right-4">
                  <button className="bg-blue-600 text-white text-sm font-bold py-2 px-4 rounded-3xl hover:bg-blue-700" onClick={() => handleBidNow(auction.car_ID)} >
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
