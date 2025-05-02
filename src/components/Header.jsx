import React from 'react'

const Header = () => {
  return (
    <nav className='bg-slate-700 text-white'>
      <div className="mycontainer flex items-center justify-between h-15 p-5">
        <div className="logo font-bold text-2xl">
          <span className='text-green-400'>port</span>
          
          <span className='text-green-700'>PASS</span>
        </div>
        <button className="bg-[#3f8269] justify-center items-center rounded-full flex gap-3">
        <img className='invert w-8 py-1' src="/icons/github.svg" alt="github logo" />
        <span className='font-bold px-4'>GitHub</span>
        </button>
      </div>
    </nav>
  )
}

export default Header
