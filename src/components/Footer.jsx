import React from 'react'
import { FaHeart } from "react-icons/fa";

const Footer = () => {
  return (
    <div className='bg-slate-800 text-white flex flex-row gap-5 justify-center items-center w-full h-16'>
      <div>
        <div className="logo font-bold text text-2xl">

          <span className='text-green-400'>port</span>
          <span className='text-green-700'>PASS</span>

        </div>
      </div>
      <div className="flex gap-1 justify-center items-center">
        created with <FaHeart className='text-red-600' /> as a practice
      </div>
    </div>
  )
}

export default Footer
