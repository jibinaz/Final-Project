"use client";
import React from 'react';
import { useRouter } from 'next/navigation'

const Header = () => {
     const router = useRouter()
 
  return (
    <header className="w-full bg-opacity-60 text-[#F5F5DC] p-4 flex justify-between items-center fixed top-0 left-0 z-50">
      <div className="text-2xl font-bold hover:text-gray-400 cursor-pointer" onClick={() => router.push('/')}>WildEye</div>
      <nav>
        <ul className="flex space-x-10 font-bold">
          <li>
            <div onClick={() => router.push('/aboutus')} className="hover:text-gray-400 cursor-pointer">About Us</div>
          </li>
          <li>
            <div onClick={() => router.push('/help')} className="hover:text-gray-400 cursor-pointer">Help</div>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;