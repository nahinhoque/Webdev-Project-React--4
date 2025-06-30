import React from 'react'

const Navbar = () => {
  return (
    <nav className='flex justify-around bg-gray-800 text-white py-2'>
        <div className="logo">
            <div className="TaskMaster">
                <span className='font-bold text-xl mx-8'>TaskMaster</span>
            </div>

        </div>
        <ul className='flex md:gap-6 md:mx-9 gap-3 '>
            <li className='cursor-pointer text-lg hover:font-bold transition-all duration-50 ml-[-8%]'>Home</li>
            <li className='cursor-pointer text-lg hover:font-bold transition-all duration-50'>Your Tasks</li>
        </ul>
    </nav>
  )
}

export default Navbar