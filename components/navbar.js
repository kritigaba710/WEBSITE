'use client';
import React, { useState } from 'react';
import UserButton from '@/components/userButton';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav
      className="z-50 relative m-2 rounded-full backdrop-blur-md shadow-lg bg-transparent"
    >
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4 text-[#3f3b2dcc]">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <svg width="32" height="40" viewBox="0 0 91 220" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="48.5" cy="27.5" r="27.5" fill="#40412E" />
            <path d="M0 27L33 76L91 59L55 105L63 167L33 123L9 220L15 105L0 27Z" fill="#40412E" />
          </svg>
          <span className="text-2xl font-serif font-bold">NeoFit</span>
        </div>

        {/* Hamburger button */}
        <button
          className="md:hidden text-[#3f3b2dcc]"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg className="w-6 bg-amber-200 h-6" viewBox="0 0 20 20" fill="#fff">
            {isOpen ? (
              <path fillRule="evenodd" d="M4 5h12M4 10h12M4 15h12" clipRule="evenodd" />
            ) : (
              <path fillRule="evenodd" d="M3 5h14M3 10h14M3 15h14" clipRule="evenodd" />
            )}
          </svg>
        </button>

        <div className={`${isOpen ? 'block' : 'hidden'} w-full md:block md:w-auto`}>
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0 items-start md:items-center">
            <li>
              <Link href="/" className="block py-2 px-3 text-[#3f3b2dcc] hover:text-blue-700">
                Home
              </Link>
            </li>
            <li>
              <Link href="/main" className="block py-2 px-3 text-[#3f3b2dcc] hover:text-blue-700">
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
