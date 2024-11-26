
import React from 'react';

export default function NavButton({ icon: Icon, title, isSelected, onClick, isSideMenuVisible }) {
  
  return (
    <div className={`flex ${title==='Logout' ?'text-logoutBtnColor' : isSelected ? 'dark:bg-light-background bg-primary' : 'bg-transparent'} cursor-pointer transition-transform duration-300 ease-in-out ${isSideMenuVisible ? 'visible' : 'invisible'}`} onClick={onClick}>
      <div
        className='w-1'
        style={{
          backgroundColor: 'purple',
          visibility: isSelected ? 'visible' : 'hidden',
        }}
      ></div>
      <div className='flex w-full dark:text-light-primaryText items-center gap-2 p-4 pl-5 text-1xl font-bold'>
        <Icon size={30} className={`${ title==='Logout' ?'text-logoutBtnColor' : isSelected ? 'text-selected' : 'text-subHeading dark:text-light-primaryText'}`} />
        <p className={`${title==='Logout' ?'text-logoutBtnColor' : isSelected ? 'text-selected' : 'text-subHeading dark:text-light-primaryText' }`}>{title}</p>
      </div>
    </div>
  );
}
