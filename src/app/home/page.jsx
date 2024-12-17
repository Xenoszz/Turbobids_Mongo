"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import { Star } from 'lucide-react';
import axios from 'axios';

export const carData = {
  brands: ["Toyota", "Honda", "BMW", "Mercedes", "Tesla"],
  types: ["Sedan", "SUV", "Sports Car", "Truck", "Van"],
  models: ["Model 3", "Camry", "X5", "Civic", "C-Class"],
  colors: ["Black", "White", "Red", "Blue", "Silver"]
};

function Page() {
  const router = useRouter();
  const [cars, setCars] = useState([]);
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [searchParams, setSearchParams] = useState({});

  const handleSearch = () => {
    const query = new URLSearchParams(searchParams).toString();
    router.push(`/auction/today?${query}`);
  };

  useEffect(() => {
    axios
      .post('http://localhost:9500/cars')
      .then((response) => {
        setCars(response.data);
      })
      .catch((err) => {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      });
  }, []);

  const sortedCars = cars.sort((a, b) => b.rating - a.rating);
  const topCars = sortedCars.slice(0, 4);

  const handleFavoriteToggle = (car_ID, isFavorited) => {
    setFavorites((prev) => ({
      ...prev,
      [car_ID]: isFavorited,
    }));
  };

  return (
    <div className='font-happy'>
      <Navbar />
      <div className='p-4 md:p-8'>
        <h2 className='max-w-5xl mx-auto text-3xl mt-10'>Search Your Car!</h2>
        <div className='flex justify-center rounded-3xl max-w-6xl mx-auto bg-blue-300 p-6 space-x-4'>
          {Object.keys(carData).map((key) => (
            <div
              key={key}
              className="bg-gray-300 rounded-full px-6 py-3 flex items-center justify-center"
            >
              <select
                className="bg-transparent font-bold"
                onChange={(e) => setSearchParams({ ...searchParams, [key]: e.target.value })}
              >
                <option value="">{key.charAt(0).toUpperCase() + key.slice(1)}</option>
                {carData[key].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white px-6 py-3 rounded-full"
          >
            SEARCH
          </button>
        </div>
      </div>
      <div className="flex justify-center gap-20 mt-12 mb-24">
        {topCars.map((car) => (
          <CarCard
            key={car.car_ID}
            carImage={`https://via.placeholder.com/400x300?text=Car+Image`}
            carModel={`${car.car_brand} ${car.car_model} ${car.car_rear}`}
            status={"Current Bid : Start the bidding"}
            countdownTime={3600}
            detailsLink={`/car-details/${car.car_ID}`}
            car_ID={car.car_ID}
            onFavoriteToggle={handleFavoriteToggle}
          />
        ))}
      </div>
      <div className='flex justify-center bg-[#2A2F6E] rounded-3xl mt-10 mb-10 ml-40 mr-40'>
        <div className='bg-white mt-8 mb-8 ml-6 px-6 py-4 rounded-3xl flex-col flex-1'>
          <h2>What is Turbobids?</h2>
          <h2>
          Copart is a global leader in 100% online car auctions featuring used, wholesale and repairable vehicles. 
                We make it easy for Members to find, bid on, and win vehicles like classic car, boats, repo cars, ATVs, exotics, motorcycles and more. 
                Copart car auctions have something for everyone — used car buyers, dismantlers, dealers, body shops and individuals. We even have “No License Required” 
                vehicles available to individuals in public_auto auctions. We feature clean & salvage title cars, trucks, SUVs, motorcycles, heavy equipment & more in live 
                online auto auctions every weekday. As a global used car auction company, Copart puts the power to bid and win into your hands. Sign up for a Basic or Premier 
                Membership to start bidding and winning used car auctions.
          </h2>
        </div>
        <div className='bg-white mt-10 mb-10 ml-20 mr-20 px-6 py-4 rounded-3xl flex-col flex-1'>
          <h2>ตัวอย่างรีวิวที่เราได้รับจากลูกค้าจริง</h2>
          <div className='bg-orange-200 rounded-3xl mt-2 mb-10 px-6 py-2'>
            <div className='flex'>
              <h2>เสนอส สุดหล่อท่อดัง</h2>
              <div className='flex ml-10'>
                <Star size={20} color="#f27f21" strokeWidth={3} absoluteStrokeWidth />
                <Star size={20} color="#f27f21" strokeWidth={3} absoluteStrokeWidth />
                <Star size={20} color="#f27f21" strokeWidth={3} absoluteStrokeWidth />
                <Star size={20} color="#f27f21" strokeWidth={3} absoluteStrokeWidth />
                <Star size={20} color="#f27f21" strokeWidth={3} absoluteStrokeWidth />
              </div>
            </div>
            <div className='mt-4 space-y-4'>
              <h2>Honda Accord 2021</h2>
              <h2>13 OCT 2024</h2>
              <h2>บริการดีมากครับ รถสวยถูกใจ เงินในเป๋าแห้งเหือด ผมซื้อรถคันนี้แล้วชอบมากเลยครับ</h2>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;