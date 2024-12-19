"use client";
import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://localhost:8000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      const data = await res.json();
      if (res.ok) {
        setIsModalOpen(true); 
        await handleSendOtp(); 
      } else {
        setError(data.message || "Login failed");
      }
    } catch (error) {
      console.log(error);
      setError("An error occurred during login.");
    }
  };

  const handleSendOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      setMessage(data.message || "OTP sent successfully.");
      setIsOtpSent(true);
    } catch (error) {
    console.log(error);
      setMessage("Error sending OTP.");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      const response = await fetch("http://localhost:8000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp, password }),
      });
      const data = await response.json();
      if (response.ok) {
        setMessage(data.message || "OTP verified successfully.");
        const token = data.token;
        console.log("Received token:", token);
        localStorage.setItem("token", token);
        setTimeout(() => {
            setIsModalOpen(false); 
          }, 2000);
          setTimeout(() => {
            router.push("/home"); 
          }, 2000);
        
      } else {
        setMessage(data.message || "Error verifying OTP."); 
      }
    } catch (error) {
      setMessage("Error verifying OTP.");
    }
  };

  return (
    <div className="font-happy min-h-screen flex flex-col">
      <Navbar />
      <div>
        <div className="py-20 flex flex-col justify-center items-center">
          <h2 className="text-4xl">Login Page</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 text-xl text-white py-2 px-3 rounded-xl mt-4">
                {error}
              </div>
            )}

            <input
              onChange={(e) => setEmail(e.target.value)}
              className="block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl"
              type="email"
              placeholder="Email"
            />
            <input
              onChange={(e) => setPassword(e.target.value)}
              className="block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl"
              type="password"
              placeholder="Password"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-orange-500 text-white py-3 text-lg rounded-full hover:bg-blue-600 mt-6"
              >
                Login
              </button>
            </div>
          </form>
          <div className="flex gap-20 py-5 mr-10">
            <p>Don't have an Account</p>
            <Link href="/auth/register" className="text-blue-700">
              Register
            </Link>
          </div>
        </div>
      </div>

        {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
            
            {message && (
                
                <div
                className={`text-xl text-center mb-4 ${message.includes('Invalid OTP') ? 'text-red-600' : 'text-green-600'}`}
                >
                {message}
                </div>
            )}

            <input
                onChange={(e) => setOtp(e.target.value)}
                className="block border p-2 my-4 rounded-md w-full"
                type="text"
                placeholder="Enter OTP"
            />
            <div className="flex gap-4">
                <button
                onClick={handleVerifyOtp}
                className="bg-orange-500 text-white py-2 px-4 rounded-2xl hover:bg-blue-600 "
                >
                Verify OTP
                </button>
                <button
                onClick={handleSendOtp}
                className="bg-blue-500 text-white py-2 px-4 rounded-2xl hover:bg-gray-600"
                >
                Resend OTP
                </button>
            </div>
            </div>
        </div>
        )}
    </div>
  );
}

export default LoginPage;
