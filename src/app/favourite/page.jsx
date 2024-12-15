'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios'; // ใช้ axios ในการดึงข้อมูลจาก Backend
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../globals.css';

export default function FavoritePage() {
  const [favorites, setFavorites] = useState([]); // สร้าง state สำหรับเก็บข้อมูล favorite
  const [sortOption, setSortOption] = useState(null);
  const [isSortingMenuOpen, setIsSortingMenuOpen] = useState(false);

  // ฟังก์ชันสำหรับการดึงข้อมูลจาก Backend
  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await axios.get('http://localhost:9500/favorites'); // ดึงข้อมูลจาก Backend
        setFavorites(response.data); // เก็บข้อมูลลงใน state
      } catch (error) {
        console.error("Error fetching favorites:", error);
      }
    };

    fetchFavorites(); // เรียกใช้ฟังก์ชันดึงข้อมูล
  }, []);

  // ฟังก์ชันสำหรับการจัดเรียง
  const getSortedCars = () => {
    let sortedCars = [...favorites]; // Copy the favorites array

    switch (sortOption) {
      case 'Year Ascending':
        sortedCars.sort((a, b) => a.year - b.year);
        break;
      case 'Year Descending':
        sortedCars.sort((a, b) => b.year - a.year);
        break;
      case 'Current Bid Ascending':
        sortedCars.sort((a, b) => {
          const bidA = a.currentBid === 'Start the bidding' ? 0 : parseFloat(a.currentBid.replace(/[^\d.-]/g, ''));
          const bidB = b.currentBid === 'Start the bidding' ? 0 : parseFloat(b.currentBid.replace(/[^\d.-]/g, ''));
          return bidA - bidB;
        });
        break;
      case 'Current Bid Descending':
        sortedCars.sort((a, b) => {
          const bidA = a.currentBid === 'Start the bidding' ? 0 : parseFloat(a.currentBid.replace(/[^\d.-]/g, ''));
          const bidB = b.currentBid === 'Start the bidding' ? 0 : parseFloat(b.currentBid.replace(/[^\d.-]/g, ''));
          return bidB - bidA;
        });
        break;
      default:
        break; // Default, no sorting
    }

    return sortedCars;
  };

  const sortedCars = getSortedCars(); // Calculate sorted cars only when needed

  return (
    <div className="min-h-screen bg-gray-50 font-happy">
      <div>
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto py-4">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Favourite ({favorites.length})</h1>

          <div className="relative">
            <button
              onClick={() => setIsSortingMenuOpen(!isSortingMenuOpen)}
              className="bg-gray-200 px-4 py-2 rounded-lg"
            >
              Sorting
            </button>

            {/* Dropdown เมนูการจัดเรียง */}
            {isSortingMenuOpen && (
              <div className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48">
                <button
                  onClick={() => setSortOption('Year Ascending')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Year Ascending
                </button>
                <button
                  onClick={() => setSortOption('Year Descending')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Year Descending
                </button>
                <button
                  onClick={() => setSortOption('Current Bid Ascending')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Current Bid Ascending
                </button>
                <button
                  onClick={() => setSortOption('Current Bid Descending')}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-100 w-full text-left"
                >
                  Current Bid Descending
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {sortedCars.map((car, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                className="w-full h-48 object-cover"
                src={car.image || "https://via.placeholder.com/400x250"} // ใช้ภาพจาก Backend หรือภาพ default
                alt={`Car ${car.year} ${car.model}`}
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900">{`${car.year} ${car.model}`}</h3>
                <p className="text-sm text-gray-500">Damage: {car.damage}</p>
                <p className="text-sm text-gray-500">Status: {car.status}</p>
                <p className="text-lg font-semibold text-gray-900">Current Bid: {car.currentBid}</p>
              </div>
              <div className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                <svg className="h-6 w-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='py-4'>
        <Footer />
      </div>
    </div>
  );
}
