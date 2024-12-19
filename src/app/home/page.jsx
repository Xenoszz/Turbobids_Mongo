"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import CarCard from '../components/CarCard';
import { CarSearchForm } from "../components/Car_Home/CarSearchForm";
import { SearchButton } from "../components/Car_Home/SearchButton";
import { Star } from 'lucide-react';
import axios from 'axios';
import { getUserIdFromToken } from "@/app/utils/auth";

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


  useEffect(() => {
    axios.post('http://localhost:8000/cars').then((response) => {
    setCars(response.data);
  
  
    })
      .catch((err) => {
        setError('เกิดข้อผิดพลาดในการดึงข้อมูล');
      });
  }, []);

  const sortedCars = cars.sort((a, b) => b.car_rating - a.car_rating);
  const topCars = sortedCars.slice(0, 4);

  
  const userid = getUserIdFromToken(); 

  const handleFavoriteToggle = async (car_ID, isFavorited) => {
    try {

      const user_ID = userid; 
      
      await axios.post('http://localhost:8000/favorites', {
        user_ID,
        car_ID,
        isFavorited
      });

      // อัพเดทสถานะ favorite ใน state
      setFavorites((prev) => ({
        ...prev,
        [car_ID]: isFavorited,
      }));
    } catch (err) {
      console.error("Error while toggling favorite:", err);
    }
  };

  

  return (
    <div className='font-happy'>
      <Navbar />
      <div className='p-4 md:p-8'>
          <div className='max-w-5xl mx-auto text-3xl mt-10 '>
            <h2>Search Your Car!</h2>
          </div>
          <div className='flex justify-center rounded-3xl max-w-6xl mx-auto bg-[#76A0FF]'>
            <div className='text-4xl mt-8 mb-8'>
                <CarSearchForm />
            </div>
          </div>
          <div className="mt-6 flex justify-center">
              <SearchButton onClick={null} />
          </div>



</div>

      <div className="flex justify-center gap-20 mt-12 mb-24">
        {topCars.map((car) => (
          <CarCard
            key={car._ID}
            carImage={`/IMG/byd.JPG`}
            carModel={`${car.car_brand} ${car.car_model} ${car.car_rear}`}
            status={`Current Bid : $ ${car.current_bid} `}
            detailsLink={`/auction/detail/${car.car_ID}`}
            car_ID={car._id}
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