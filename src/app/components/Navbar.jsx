"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import '../globals.css';
import { useRouter } from "next/navigation";

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null); // สำหรับจัดการ dropdown
  const router = useRouter();
  const dropdownRef = useRef(null);


  //ตรวจสอบสถานะการล็อกอิน
  useEffect(() => {
    //Mongo
//     const checkAuth = async () => {
//       try {
//         const res = await fetch('http://localhost:5000/api/protected', {
//           method: 'GET',
//           credentials: 'include',
//         });

//         if (res.ok) {
//           const data = await res.json();
//           console.log('User authenticated:', data.user);
//           setIsAuthenticated(true);
//         } else {
//           console.log('Authentication failed');
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error('Error verifying auth:', error);
//         setIsAuthenticated(false);
//       }
//     };
// }, []);

    //Sql
    const checkAuth = async () => {
      try {
        const res = await fetch('http://localhost:9500/api/protected', {
          method: 'GET',
          credentials: 'include',
        });

        if (res.ok) {
          const data = await res.json();
          console.log('User authenticated:', data.user);
          setIsAuthenticated(true);
        } else {
          console.log('Authentication failed');
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error('Error verifying auth:', error);
        setIsAuthenticated(false);
      }
    };
    checkAuth();
  }, []);

  const handleNavigation = (path) => {
    if (isAuthenticated) {
      router.push(path);
    } else {
      // router.push('/auth/login');
      router.push(path); //Bypass
      
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownVisible((prev) => (prev === menu ? null : menu)); // เปิด/ปิด dropdown
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setDropdownVisible(null);
    }
  };

  return (
    <nav className="font-happy bg-[#2A2F6E] text-white py-2 border-b-8 border-orange-500 relative">
      <div className="container mx-auto px-4 flex items-center justify-start">
        <button onClick={() => handleNavigation('/home')} className="flex items-center gap-2 text-4xl font-bold mr-8 mt-2 z-20">
          TurboBids
        </button>

        <div className="flex gap-6 text-2xl mt-3 ml-6 relative">
          <button
            onClick={() => handleNavigation('/home')}
            className="hover:text-orange-400"
          >
            Home
          </button>

          <button
            onClick={() => handleNavigation('/favourite')}
            className="hover:text-orange-400"
          >
            Favourite
          </button>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('auction')}
              className="hover:text-orange-400"
            >
              Auction
            </button>
            {dropdownVisible === 'auction' && (
              <div className="absolute top-full left-0 bg-white text-black rounded-md shadow-md p-2 z-20">
                <button
                  onClick={() => handleNavigation('/auction/today')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Today's Auctions
                </button>
                <button
                  onClick={() => handleNavigation('/auction/calendar')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Auctions Calendar
                </button>
              </div>
            )}
          </div>

          <div className="relative">
            <button
              onClick={() => toggleDropdown('support')}
              className="hover:text-orange-400"
            >
              Support
            </button>
            {dropdownVisible === 'support' && (
              <div className="absolute top-full left-0 bg-white text-black rounded-md shadow-md p-2 z-20">
                <button
                  onClick={() => handleNavigation('/support/how-it-works')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  How TurboBids work
                </button>
                <button
                  onClick={() => handleNavigation('/support/faq')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Common Questions
                </button>
                <button
                  onClick={() => handleNavigation('/support/terms')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Terms of Service
                </button>
              </div>
            )}
          </div>
        </div>
        <div ref={dropdownRef} className="flex items-center ml-auto">
        {isAuthenticated && (
          <div className="flex items-center ml-auto relative">
            <div className="relative">
              <button onClick={() => toggleDropdown('notifications')} className="mr-4 hover:text-orange-400">
                <img src="/IMG/Noti.png" alt="Notifications" className="h-12 w-12" />
              </button>
              {dropdownVisible === 'notifications' && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-100 text-black rounded-md shadow-md p-4 z-20">
                  <h3 className="font-bold">Latest notification</h3>
                  {/* รายการ Notification */}
                  <div>Your notifications here...</div>
                </div>
              )}
            </div>
            <div className="relative">
              <button onClick={() => toggleDropdown('profile')} className="hover:text-orange-400">
                <img src="/IMG/Profile.png" alt="Profile" className="h-12 w-12" />
              </button>
              {dropdownVisible === 'profile' && (
                <div className="absolute top-full right-0 mt-2 w-64 bg-gray-100 text-black rounded-md shadow-md p-4 z-20">
                  <h3 className="font-bold">Profile</h3>
                  <button onClick={() => handleNavigation('/account')} className="block px-4 py-2 hover:bg-gray-200">Account</button>
                  <button onClick={() => handleNavigation('/settings')} className="block px-4 py-2 hover:bg-gray-200">Setting</button>
                  <button onClick={() => { router.push('/auth/signout'); }} className="block mt-2 px-4 py-2 bg-red-500 text-white rounded-md">Sign Out</button>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
