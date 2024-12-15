"use client"
import React, { useState } from 'react';
import Navbar from '../../components/Navbar';
import Link from 'next/link';
import { useRouter } from "next/navigation";

function RegisterPage() {
    const [firstname, setfirstname] = useState("");
    const [lastname, setlastname] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [confirmpassword, setconfirmpassword] = useState("");
    const [error, seterror] = useState("");
    const [success, setSuccess] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmpassword) {
            seterror("Passwords do not match!");
            return;
        }

        if (!firstname || !lastname || !email || !password || !confirmpassword) {
            seterror("Please complete all inputs!");
            return;
        }
            //Mongo
        try {
            // First, check if the user already exists on localhost:5000
            const resCheckUser = await fetch("http://localhost:5000/api/auth/checkuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const { user } = await resCheckUser.json();

            if (user) {
                seterror("User already exists on 5000!");
                return;
            }

            // Register new user on localhost:5000
            const resRegister5000 = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstname, lastname, email, password })
            });

            if (!resRegister5000.ok) {
                console.log("User registration failed on 5000.");
                seterror("Registration failed on 5000, please try again.");
                return;
            }
            
            //Sql
            // Now, perform the same check and register on localhost:6000
            const resCheckUser6000 = await fetch("http://localhost:9500/api/auth/checkuser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            const { user: user6000 } = await resCheckUser6000.json();

            if (user6000) {
                seterror("User already exists on 6000!");
                return;
            }

            // Register new user on localhost:6000
            const resRegister6000 = await fetch("http://localhost:9500/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ firstname, lastname, email, password })
            });

            if (!resRegister6000.ok) {
                console.log("User registration failed on 6000.");
                seterror("Registration failed on 6000, please try again.");
                return;
            }

            // If both registrations are successful
            seterror(""); // Clear any previous errors
            setSuccess("User registration successful on both servers!");
            router.push('/auth/login');

        } catch (error) {
            console.log("Error during registration: ", error);
            seterror("An error occurred during registration.");
        }
    }

    return (
        <div className='font-happy min-h-screen flex flex-col'>
            <Navbar />
            <div>
                <div className='py-20 flex flex-col justify-center items-center'>
                    <h2 className='text-4xl'>Register Page</h2>
                    <form onSubmit={handleSubmit}>
                        {error && (
                            <div className='bg-red-500 text-xl text-white py-2 px-3 rounded-xl mt-4'>
                                {error}
                            </div>
                        )}
                        {success && (
                            <div className='bg-green-500 text-xl text-white py-2 px-3 rounded-xl mt-4'>
                                {success}
                            </div>
                        )}
                        <input onChange={(e) => setfirstname(e.target.value)} className='block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl' type="text" placeholder='First name' />
                        <input onChange={(e) => setlastname(e.target.value)} className='block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl' type="text" placeholder='Last name' />
                        <input onChange={(e) => setemail(e.target.value)} className='block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl' type="email" placeholder='Email' />
                        <input onChange={(e) => setpassword(e.target.value)} className='block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl' type="password" placeholder='password' />
                        <input onChange={(e) => setconfirmpassword(e.target.value)} className='block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl' type="password" placeholder='Confirm password' />
                        <div className='flex justify-center'>
                            <button type="submit" className="w-1/2 bg-orange-500 text-white py-3 text-lg rounded-full hover:bg-blue-600 mt-6">Register</button>
                        </div>
                    </form>
                    <div className='flex gap-20 py-5'>
                        <p>Already have an account? </p>
                        <Link href="/auth/login" className='text-blue-700'>Login Here</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RegisterPage;