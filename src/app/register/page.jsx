"use client"
import React, { useState } from 'react'
import Navbar from '../components/Navbar'
import Link from 'next/link'

function RegisterPage() {

    const [firstname,setfirstname] = useState("");
    const [lastname,setlastname] = useState("");
    const [email,setemal] = useState("");
    const [type,settype] = useState("");
    const [password,setpassword] = useState("");
    const [confirmpassword,setconfirmpassword] = useState("");
    const [error,seterror] = useState("");



  return (
    <div className='min-h-screen flex flex-col'>    
        <Navbar />
        <div>
            <div className='py-20 flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Register Page</h2>
                <form action="">
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="text" placeholder='First name' />
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="text" placeholder='Last name' />
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="email" placeholder='Email' />
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="text" placeholder='Type' />
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="password" placeholder='password' />
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="password" placeholder='Confirm password' />
                    <div className='flex justify-center'>
                    <button type="submit" className="w-1/2 bg-orange-500 text-white py-3 text-lg rounded-full hover:bg-blue-600 mt-6">Register</button>
                    </div>
                </form>
                <div className='flex gap-20 py-5'>
                    <p>Already have an account? </p>
                    <Link href="/login"className='text-blue-700'>Login Here</Link>
                </div>
            </div>
        </div>
    </div>

  )
}

export default RegisterPage