'use client';
import React from 'react';
import UserButton from '@/components/userButton';
import Link from 'next/link';

const Navbar = () => {
  return (
    <nav className="z-50 relative m-2 rounded-full backdrop-blur-md shadow-lg bg-transparent">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between p-4 text-[#3f3b2dcc]">
        {/* Logo/Brand - Hidden on mobile */}
        <div className="hidden md:flex items-center gap-2">
          <svg width="32" height="40" viewBox="0 0 91 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="48.5" cy="27.5" r="27.5" fill="#40412E" />
            <path d="M0 27L33 76L91 59L55 105L63 167L33 123L9 220L15 105L0 27Z" fill="#40412E" />
          </svg>
          <span className="text-xl sm:text-2xl font-serif font-bold">NeoFit</span>
        </div>

        {/* Navigation Links - Always visible */}
        <div className="w-full md:w-auto">
          <ul className="flex items-center justify-between md:justify-normal md:space-x-6 lg:space-x-8 space-x-4">
            <li>
              <Link 
                href="/" 
                className="block py-2 px-2 text-sm font-semibold sm:text-base text-[#3f3b2dcc] hover:text-blue-700 rounded hover:bg-amber-50 transition-colors"
              >
                Home
              </Link>
            </li>
            <li>
              <Link 
                href="/main" 
                className="block py-2 px-2 text-sm font-semibold sm:text-base text-[#3f3b2dcc] hover:text-blue-700 rounded hover:bg-amber-50 transition-colors"
              >
                Services
              </Link>
            </li>
            <li>
              <UserButton />
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;