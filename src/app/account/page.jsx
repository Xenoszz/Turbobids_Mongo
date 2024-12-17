"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../globals.css";
import { getUserIdFromToken } from "@/app/utils/auth";

export default function AccountSetting() {
  const userID = getUserIdFromToken(); // ดึง user_id ออกจาก token

  const [formData, setFormData] = useState({
    UserID: userID,
    firstName: "",
    lastName: "",
    Username: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState(""); // สำหรับแสดงผลข้อความสำเร็จหรือข้อผิดพลาด

  // ฟังก์ชันที่ใช้สำหรับอัปเดตค่าในฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // ฟังก์ชันที่ใช้ส่งข้อมูลเมื่อกดปุ่ม "Save Changes"
  const handleSubmit = async (e) => {
    e.preventDefault();  // หยุดการทำงานของ form default

    // ตรวจสอบว่า password ใหม่กับการยืนยันตรงกันหรือไม่
    if (formData.newPassword !== formData.confirmPassword) {
      setMessage("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:9500/api/user/userupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),  // ส่งข้อมูลทั้งหมดใน formData
      });

      const result = await res.json();  // แปลง response เป็น JSON
      if (res.ok) {
        setMessage("Profile updated successfully.");
      } else {
        setMessage(result.error || "An error occurred during update.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-happy text-lg">
      {/* Navbar */}
      <Navbar />
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          {/* Profile Image */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            {message && (
              <div className="mb-4 text-center text-red-500 font-bold">
                {message}
              </div>
            )}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-gray-700 mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange} // อัปเดตค่าฟอร์ม
                  className="w-full border rounded-lg p-3 focus:outline-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange} // อัปเดตค่าฟอร์ม
                  className="w-full border rounded-lg p-3 focus:outline-blue-400"
                />
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Display Name</label>
              <input
                type="text"
                name="Username"
                value={formData.Username}
                onChange={handleChange} // อัปเดตค่าฟอร์ม
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>

            {/* Password Change Section */}
            <h2 className="font-bold text-xl mb-4">Password Change</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange} // อัปเดตค่าฟอร์ม
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleChange} // อัปเดตค่าฟอร์ม
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange} // อัปเดตค่าฟอร์ม
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>

            {/* Save Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-600 text-white py-3 px-8 rounded-lg hover:bg-blue-700 transition"
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}
