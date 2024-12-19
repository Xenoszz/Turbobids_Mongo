"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserIdFromToken } from "@/app/utils/auth";
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
  }, []);

  // ฟังก์ชันดึงข้อมูลผู้ใช้
  const fetchUsers = () => {
    fetch('http://localhost:8000/api/users')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error('Error fetching users:', err));
  };

  
  // ฟังก์ชันลบผู้ใช้
  const deleteUser = (userID) => {
    console.log(userID);
    if (confirm('Are you sure you want to delete this user?')) {
      fetch(`http://localhost:8000/api/deleteusers/${userID}`, {
        method: 'DELETE',
      })
        .then(() => {
          window.location.reload(); // รีเฟรชหน้าเว็บเมื่อการลบเสร็จสิ้น
        })
        .catch(err => console.error('Error deleting user:', err));
    }
  };

;


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
          <div>{user.username}</div>
          <div>{user.email}</div>
          <div>
            <button
              className="bg-red-500 text-white px-4 py-1 rounded"
              onClick={() => deleteUser(user._id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}


    </div>
  );
}
