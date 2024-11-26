import React from 'react'
import { IoMdSearch } from 'react-icons/io';

import { HiMenuAlt1 } from "react-icons/hi";
import ToggleButton from './ToggleButton';
import CurrentAdmin from './CurrentAdmin';
import { useState } from 'react';
export default function Navbar({isSideMenuVisible, setSideMenuVisible, whatSearch, isDarkMode, setIsDarkMode}) {
    const [searbarFocus, setSearbarFocus] = useState(false);
    const toggleSideMenu = () => {
      setSideMenuVisible(!isSideMenuVisible);
    };
  return (
    <div className='flex justify-between w-full p-4 bg-primary dark:bg-light-background'>
        <div className='flex items-center gap-3'>
              <HiMenuAlt1 size={30} onClick={toggleSideMenu} className='block lg:hidden text-subHeading dark:text-light-primaryText'/>
              <div className='relative flex items-center text-subHeading dark:text-light-primaryText'>
                  <IoMdSearch className='absolute left-3 h-6 w-6'/>
                  <input 
                      placeholder={`Search in ${whatSearch}`}
                      className={`pl-10 p-1  text-subHeading bg-primary dark:bg-light-background dark:text-light-primaryText border-none rounded-full placeholder:text-xs focus:outline-none md:placeholder:text-sm focus:ring-2 focus:ring-selected transition-all ease-in duration-300 ${searbarFocus ? 'w-40 md:w-60 lg:w-72 xl:w-80' : 'w-28 md:w-24 lg:w-28 xl:w-32'}`}
                      onFocus={() => setSearbarFocus(true)}
                    onBlur={() => setSearbarFocus(false)}
                  />
              </div>
        </div> 
        <div className='flex gap-3' style={{color : '#fff'}}>
            <ToggleButton isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
            <div className='w-0.5 h-12 rounded hidden md:block bg-subHeading dark:bg-light-secondaryText' ></div>
            <CurrentAdmin/>
        </div>
    </div>
  )
}
