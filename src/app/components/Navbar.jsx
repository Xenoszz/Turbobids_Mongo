import React from 'react'
import Link from 'next/link';

export function Navbar() {
  return (
    <nav className="bg-[#2A2F6E] text-white py-2 border-b-8 border-orange-500">
      <div className="container mx-auto px-4 flex items-center justify-start">
        <Link href="/" className="flex items-center gap-2 text-4xl font-bold mr-8 mt-2">
          <span>TurboBids</span>
        </Link>
        
        <div className="flex gap-6 text-2xl mt-3 ml-6">
          <Link href="/" className="hover:text-orange-400">Home page</Link>
          <Link href="/favourite" className="hover:text-orange-400">Favourite</Link>
          <Link href="/auction" className="hover:text-orange-400">Auction</Link>
          <Link href="/support" className="hover:text-orange-400">Support</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar