'use client'
import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "../globals.css";
import { getUserIdFromToken } from "@/app/utils/auth";

export default function AccountSetting() {
  const userID = getUserIdFromToken();


  if (!userID) {
    return <div>User not logged in or invalid user ID</div>;
  }

  const [formData, setFormData] = useState({
    id: userID,
    username: "",
    firstName: "",
    lastName: "",
    password: "",
    currentPassword: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();


    if (formData.password !== formData.confirmPassword) {
      setMessage("New Password and Confirm Password do not match.");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/api/user/userupdate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("Profile updated successfully.");
      } else {
        setMessage(result.message || "An error occurred during update.");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 font-happy text-lg">
      <Navbar />
      <div className="flex justify-center items-center py-10">
        <div className="w-full max-w-3xl bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <div className="w-24 h-24 bg-gray-300 rounded-full"></div>
          </div>
          <form onSubmit={handleSubmit}>
            {message && (
              <div className="mb-4 text-center text-orange-500 font-bold">
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
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3 focus:outline-blue-400"
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
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
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>
            <h2 className="font-bold text-xl mb-4">Password Change</h2>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Current Password</label>
              <input
                type="password"
                name="currentPassword"
                value={formData.currentPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">New Password</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>
            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full border rounded-lg p-3 focus:outline-blue-400"
              />
            </div>
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
      <Footer />
    </div>
  );
}
