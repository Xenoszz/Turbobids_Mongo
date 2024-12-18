"use client"
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import '../globals.css';
import { useRouter } from "next/navigation";
import { decodeToken } from '@/app/utils/auth';  

export function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(null); 
  const router = useRouter();
  const dropdownRef = useRef(null);


  useEffect(() => {
    const checkToken = () => {
      const decoded = decodeToken();  
      if (decoded) {
        // console.log('Token decoded:', decoded);
        setIsAuthenticated(true);  
      } else {
        // console.log('No valid token');
        setIsAuthenticated(false);  
      }
    };
    
    checkToken();
  }, []);  


  const handleNavigation = (path) => {
    if (isAuthenticated) {
      router.push(path); 
    } else {
      router.push('/auth/login'); 
    }
  };


  const toggleDropdown = (menu) => {
    setDropdownVisible((prev) => (prev === menu ? null : menu)); 
  };


  const handleSignOut = () => {
    localStorage.removeItem('token'); 
    setIsAuthenticated(false); 
    router.push('/auth/login'); 
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
                  onClick={() => handleNavigation('/support/HowTurboBidswork')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  How TurboBids work
                </button>
                <button
                  onClick={() => handleNavigation('/support/CommonQuession')}
                  className="block px-4 py-2 hover:bg-gray-200"
                >
                  Common Questions
                </button>
                <button
                  onClick={() => handleNavigation('/support/TermsofService')}
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
                    <button onClick={handleSignOut} className="block mt-2 px-4 py-2 bg-red-500 text-white rounded-md">Sign Out</button>
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
