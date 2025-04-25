import React from 'react'
import Link from 'next/link'

const ProfileCard = () => {
    return (
        <div className='flex flex-col lg:flex-row gap-5 lg:gap-10 items-center justify-center my-8 lg:my-16 rounded-3xl py-6 px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl bg-[#e6dcb4cc]'>
            {/* Image - Shows first on mobile, left on desktop */}
            <div className='w-40 sm:w-48 md:w-56 lg:w-64'>
                <img 
                    src="/weight.gif" 
                    alt="Weight tracking animation" 
                    className='w-full h-auto'
                />
            </div>
            
            {/* Text Content */}
            <div className='flex flex-col gap-2 sm:gap-3 items-center justify-center text-center lg:text-left'>
                <div className='text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#4f4a36cc]'>
                    Dive Deeper
                </div>
                <div className='text-xl sm:text-2xl md:text-3xl font-bold text-[#4f4a36cc]'>
                    Maybe you'd want to start tracking your progress
                </div>
                <div className='text-lg sm:text-xl md:text-2xl font-semibold text-[#4f4a36cc]'>
                    Explore more features with us
                </div>
                <Link href='/main'>
                    <button
                        type="button"
                        className="mt-2 text-gray-900 cursor-pointer bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    >
                        Get Started
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default ProfileCard