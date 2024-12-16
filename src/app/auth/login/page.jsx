"use client"
import React, { useState, useEffect  } from 'react'
import Navbar from '../../components/Navbar'
import Link from 'next/link'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

function LoginPage() {

    const [email,setemail] = useState("");
    const [password,setpassword] = useState("");
    const [error,seterror] = useState("");

    const router = useRouter();

    useEffect(() => {
        // checkAuth();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
    //Mongo
    //     try {
    //         const res = await fetch("http://localhost:5000/api/auth/login", {
    //             method: "POST",
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //             body: JSON.stringify({ email: email, password }), // ส่งข้อมูลไปที่ API
    //             credentials: 'include',
    //         });

    //         const data = await res.json();
    //         if (res.ok) {

    //             router.push('/home');
    //         } else {
    //             // ถ้าเกิดข้อผิดพลาด, แสดงข้อความผิดพลาด
    //             seterror(data.message || "Login failed");
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         seterror("An error occurred during login.");
    //     } 
    // };

        //Sql
        try {
            const res = await fetch("http://localhost:9500/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email: email, password }), // ส่งข้อมูลไปที่ API
                credentials: 'include', // ส่งคุกกี้ (ถ้าจำเป็น)
            });
        
            const data = await res.json(); // รอให้ response กลับมาในรูปแบบ JSON
        
            if (res.ok) {
                // ถ้า login สำเร็จ และมี token ใน response
                const token = data.token; // ดึง token จาก data ที่ได้รับ
                console.log('Received token:', token);
        
                // เก็บ token ใน localStorage หรือ sessionStorage
                localStorage.setItem('token', token);
        
                // รีไดเรกต์ไปหน้า home
                router.push('/home');
            } else {
                // ถ้าเกิดข้อผิดพลาด, แสดงข้อความผิดพลาด
                seterror(data.message || "Login failed");
            }
        } catch (error) {
            console.log(error);
            seterror("An error occurred during login.");
        }
        
    };





  return (
    <div className='font-happy min-h-screen flex flex-col'>    
        <Navbar />
        <div>
            <div className='py-20 flex flex-col justify-center items-center'>
            <h2 className='text-4xl'>Login Page</h2>
                <form onSubmit={handleSubmit}>

                {error && (
                    <div className = 'bg-red-500 text-xl text-white py-2 px-3 rounded-xl mt-4'>
                        {error}
                    </div>
                )}

                <input onChange={(e) => setemail(e.target.value)} className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="email" placeholder='Email' />
                <input onChange={(e) => setpassword(e.target.value)} className = 'block border-b-2 border-gray-300 p-2 my-6 rounded-md text-3xl'type="password" placeholder='password' />
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

export default LoginPage