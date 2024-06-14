import React from 'react'

// import assets from utils and constants
import { appleImg, bagImg, searchImg } from '../utils';
import { navLists } from '../constants';

const Navbar = () => {
  return (
    // Header section
    <header className='w-full py-5 sm:px-10 px-5 flex justify-between items-center'>

      {/* navigation */}
      <nav className='flex w-full screen-max-width'>
        <img src={appleImg} alt="Apple" width={15} height={18} />

        {/* div for navigation */}
        <div className='flex flex-1 justify-center max-sm:hidden'>
          {/* map over navLists from the constants and display them on the page */}
          {navLists.map((nav,i) => (
            <div key={nav} className='px-5 text-sm cursor-pointer text-gray hover:text-white transition-all'>
              {nav}
            </div>
          ))}
        </div>

        {/* right icon items */}
        <div className='flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1'>
          <img src={searchImg} alt="search" width={18} height={18} />
          <img src={bagImg} alt="bag" width={18} height={18} />
        </div>
      </nav>
    </header>
  )
}

export default Navbar