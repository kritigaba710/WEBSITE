import React from 'react'
import Link from 'next/link'

const ProfileCard = () => {
    return (
        <div className='flex gap-10 items-center justify-center my-16 rounded-3xl py-6 mx-10 bg-[#e6dcb4cc]'>
            <div><img src="/weight.gif" alt="" /></div>
            <div className='flex flex-col gap-2 items-center justify-center'>
            <div className='text-5xl font-extrabold text-[#4f4a36cc]'>Dive Deeper</div>
            <div className='text-3xl font-bold text-[#4f4a36cc]'>Maybe You would want to start tracking your progress</div>
            <div className='text-2xl font-semibold text-[#4f4a36cc]'>Explore more Features with us</div>
            <Link href='/main'><button
                type="button"
                className="text-gray-900 cursor-pointer bg-gradient-to-r from-red-200 via-red-300 to-yellow-200 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-100 dark:focus:ring-red-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Get Started
              </button></Link>
            </div>
        </div>
    )
}

export default ProfileCard
