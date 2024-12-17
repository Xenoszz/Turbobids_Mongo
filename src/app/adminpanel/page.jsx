"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [cars, setCars] = useState([]); // State สำหรับข้อมูลรถยนต์
  const [newCar, setNewCar] = useState({
    car_brand: '',
    car_model: '',
    car_rear: '',
    car_color: '',
    car_status: '',
    car_details: '',
    car_year: '',
    car_price: '',
    odometer: '',
    primary_damage: '',
    cylinders: '',
    transmission: '',
    drive: '',
    fuel: '',
    auction_start_date: '',
    auction_end_date: '',
    auction_start_time: '',
    auction_end_time: '',
    auction_status: '',
    auction_starting_price: '',
    auction_minimum_price: '',
    auction_current_price: '',
    current_bid: '',
    bid_increment: ''
  }); 

  // ดึงข้อมูลผู้ใช้
  useEffect(() => {
    fetchUsers();
    fetchCars(); // เรียกใช้ฟังก์ชันดึงข้อมูลรถยนต์
  }, []);

  // ฟังก์ชันดึงข้อมูลผู้ใช้
  const fetchUsers = () => {
    fetch('http://localhost:9500/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  };

  const fetchCars = async () => {
    try {
      const response = await axios.post('http://localhost:9500/cars');
      console.log('Fetched cars:', response.data);
      setCars(response.data);
    } catch (error) {
      console.error('Error fetching cars:', error);
    }
  };

  // ฟังก์ชันลบผู้ใช้
  const deleteUser = (userID) => {
    console.log(userID);
    if (confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:9500/api/deleteusers/${userID}`, {
        method: 'DELETE',
      })
        .then(() => {
          window.location.reload(); // รีเฟรชหน้าเว็บเมื่อการลบเสร็จสิ้น
        })
        .catch(err => console.error('Error deleting user:', err));
    }
  };

  // ฟังก์ชันเพิ่มรถยนต์
  const addCar = () => {
    fetch('http://localhost:9500/api/addCar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newCar),
    })
      .then(() => {
        alert('Car added successfully!');
        fetchCars(); // ดึงข้อมูลรถใหม่
      })
      .catch(err => console.error('Error adding car:', err));
  };

  // ฟังก์ชันอัพเดตค่าใน state เมื่อมีการกรอกข้อมูลในฟอร์ม
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-bold mb-4">Admin Panel</h1>

      {/* ส่วนจัดการผู้ใช้ */}
      <div className="grid grid-cols-3 gap-4 border-b-2 pb-2">
        <div className="font-bold">Username</div>
        <div className="font-bold">Email</div>
        <div className="font-bold">Actions</div>
      </div>
      {users.map((user) => (
        <div key={user.UserID} className="grid grid-cols-3 gap-4 items-center border-b py-2">
          <div>{user.Username}</div>
          <div>{user.email}</div>
          <div>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => deleteUser(user.UserID)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
        {/* ส่วนจัดการรถยนต์ */}
        <h2 className="text-xl font-bold mt-8 mb-4">Cars List</h2>

        {/* Header Section */}
        <div className="grid grid-cols-3 gap-4 border-b-2 pb-2"> 
          <div className="font-bold col-span-1">Car Brand</div>
          <div className="font-bold col-span-1">Car Model</div>
          <div className="font-bold col-span-1">Actions</div>
        </div>

        {/* Content Section */}
        {cars.map((car) => (
          <div key={car.car_ID} className="grid grid-cols-3 gap-4 items-center border-b py-2">
           <div className="col-span-1">{car.car_brand}</div>
            <div className="col-span-1">{car.car_model}</div>
            <div className="col-span-1">
             <button
               className="bg-red-500 text-white px-4 py-1 rounded"
               onClick={() => deleteCar(car.car_ID)} // คุณต้องสร้างฟังก์ชัน deleteCar
             >
               Delete
             </button>
                 </div>
         </div>
        ))}

      {/* ฟอร์มสำหรับเพิ่มรถยนต์ */}
      <h3 className="text-lg font-bold mt-8 mb-4">Add New Car</h3>
<div className="grid grid-cols-8 gap-4">
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="car_brand"
      placeholder="Car Brand"
      value={newCar.car_brand}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="car_model"
      placeholder="Car Model"
      value={newCar.car_model}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="car_rear"
      placeholder="Car Rear"
      value={newCar.car_rear}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="car_color"
      placeholder="Car Color"
      value={newCar.car_color}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="car_status"
      placeholder="Car Status"
      value={newCar.car_status}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8">
    <textarea
      name="car_details"
      placeholder="Car Details"
      value={newCar.car_details}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="number"
      name="car_year"
      placeholder="Car Year"
      value={newCar.car_year}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="number"
      name="car_price"
      placeholder="Car Price"
      value={newCar.car_price}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="odometer"
      placeholder="Odometer"
      value={newCar.odometer}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="primary_damage"
      placeholder="Primary Damage"
      value={newCar.primary_damage}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="number"
      name="cylinders"
      placeholder="Cylinders"
      value={newCar.cylinders}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="transmission"
      placeholder="Transmission"
      value={newCar.transmission}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="drive"
      placeholder="Drive"
      value={newCar.drive}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>
  <div className="col-span-8 md:col-span-4">
    <input
      type="text"
      name="fuel"
      placeholder="Fuel"
      value={newCar.fuel}
      onChange={handleInputChange}
      className="p-2 border rounded w-full"
    />
  </div>



  {/* Auction Fields */}
  <div className="col-span-8 md:col-span-4">
          <input
            type="date"
            name="auction_start_date"
            placeholder="Auction Start Date"
            value={newCar.auction_start_date}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="date"
            name="auction_end_date"
            placeholder="Auction End Date"
            value={newCar.auction_end_date}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="time"
            name="auction_start_time"
            placeholder="Auction Start Time"
            value={newCar.auction_start_time}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="time"
            name="auction_end_time"
            placeholder="Auction End Time"
            value={newCar.auction_end_time}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="text"
            name="auction_status"
            placeholder="Auction Status"
            value={newCar.auction_status}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="number"
            name="auction_starting_price"
            placeholder="Auction Starting Price"
            value={newCar.auction_starting_price}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="number"
            name="auction_minimum_price"
            placeholder="Auction Minimum Price"
            value={newCar.auction_minimum_price}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="number"
            name="auction_current_price"
            placeholder="Auction Current Price"
            value={newCar.auction_current_price}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        {/* New Inputs for current_bid and bid_increment */}
        <div className="col-span-8 md:col-span-4">
          <input
            type="number"
            name="current_bid"
            placeholder="Current Bid"
            value={newCar.current_bid}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8 md:col-span-4">
          <input
            type="number"
            name="bid_increment"
            placeholder="Bid Increment"
            value={newCar.bid_increment}
            onChange={handleInputChange}
            className="p-2 border rounded w-full"
          />
        </div>
        <div className="col-span-8">
          <button
            onClick={addCar}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full">
      Add Car
    </button>
  </div>
</div>

    </div>
  );
}
