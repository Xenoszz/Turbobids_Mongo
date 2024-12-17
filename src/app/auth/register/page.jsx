"use client";
import React, { useState } from "react";
import Navbar from "../../components/Navbar";
import Link from "next/link";
import { useRouter } from "next/navigation";

function RegisterPage() {
  const [username, setUsername] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmpassword) {
      setError("Passwords do not match!");
      return;
    }

    if (!username || !firstname || !lastname || !email || !password || !confirmpassword) {
      setError("Please complete all inputs!");
      return;
    }

    try {
      // Check if user exists on localhost:5000
    //   const resCheckUser = await fetch("http://localhost:5000/api/auth/checkuser", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ email }),
    //   });

    //   const { user } = await resCheckUser.json();

    //   if (user) {
    //     setError("User already exists on 5000!");
    //     return;
    //   }

    //   // Register new user on localhost:5000
    //   const resRegister5000 = await fetch("http://localhost:5000/api/auth/register", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({ username, firstname, lastname, email, password }),
    //   });

    //   if (!resRegister5000.ok) {
    //     console.log("User registration failed on 5000.");
    //     setError("Registration failed on 5000, please try again.");
    //     return;
    //   }

      // Check if user exists on localhost:6000
      const resCheckUser6000 = await fetch("http://localhost:9500/api/auth/checkuser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const { user: user6000 } = await resCheckUser6000.json();

      if (user6000) {
        setError("User already exists on 6000!");
        return;
      }

      // Register new user on localhost:6000
      const resRegister6000 = await fetch("http://localhost:9500/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, firstname, lastname, email, password }),
      });

      if (!resRegister6000.ok) {
        console.log("User registration failed on 6000.");
        setError("Registration failed on 6000, please try again.");
        return;
      }

      // Success
      setError(""); // Clear any previous errors
      setSuccess("User registration successful on both servers!");
      router.push("/auth/login");
    } catch (error) {
      console.log("Error during registration: ", error);
      setError("An error occurred during registration.");
    }
  };

  return (
    <div className="font-happy min-h-screen flex flex-col">
      <Navbar />
      <div>
        <div className="py-20 flex flex-col justify-center items-center">
          <h2 className="text-4xl">Register Page</h2>
          <form onSubmit={handleSubmit}>
            {error && (
              <div className="bg-red-500 text-xl text-white py-2 px-3 rounded-xl mt-4">
                {error}
              </div>
            )}
            {success && (
              <div className="bg-green-500 text-xl text-white py-2 px-3 rounded-xl mt-4">
                {success}
              </div>
            )}
            <input
              onChange={(e) => setUsername(e.target.value)}
              className="block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl"
              type="text"
              placeholder="Username"
            />
            <input
              onChange={(e) => setFirstname(e.target.value)}
              className="block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl"
              type="text"
              placeholder="First name"
            />
            <input
              onChange={(e) => setLastname(e.target.value)}
              className="block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl"
              type="text"
              placeholder="Last name"
            />
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
            <input
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl"
              type="password"
              placeholder="Confirm Password"
            />
            <div className="flex justify-center">
              <button
                type="submit"
                className="w-1/2 bg-orange-500 text-white py-3 text-lg rounded-full hover:bg-blue-600 mt-6"
              >
                Register
              </button>
            </div>
          </form>
          <div className="flex gap-20 py-5">
            <p>Already have an account? </p>
            <Link href="/auth/login" className="text-blue-700">
              Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
