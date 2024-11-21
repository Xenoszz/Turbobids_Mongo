"use client"
import React from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'

function RegisterPage() {
  return (
    <div className='font-happy min-h-screen flex flex-col'>    
        <Navbar />
        <div>
            <div className='py-20 flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Login Page</h2>
                <form action="">
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="email" placeholder='Email' />
                <input className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="password" placeholder='password' />
                    <div className='flex justify-center'>
                    <button type="submit" className="w-1/2 bg-orange-500 text-white py-3 text-lg rounded-full hover:bg-blue-600 mt-6">Login</button>
                    </div>
                </form>
                <div className='flex gap-20 py-5 mr-10'>
                    <p>Dont't have an Account </p>
                    <Link href="/auth/register"className='text-blue-700'>Register</Link>
                </div>
            </div>
        </div>
    </div>

  )
}

export default RegisterPage