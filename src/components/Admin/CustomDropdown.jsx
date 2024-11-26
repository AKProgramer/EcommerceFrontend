import React, { useState } from 'react';

const CustomDropdown = ({dropdownOptions,selected, setSelected}) => {
  const [isOpen, setIsOpen] = useState(false);
  const options = dropdownOptions.map(option => option.name);
  const toggleDropdown = () => setIsOpen(!isOpen);
  const selectOption = (option) => {
    setSelected(option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full mt-3 text-subHeading  dark:text-light-primaryText">
      <div 
        style={{color : 'rgb(149 152 157)'}}
        className="bg-secondary dark:bg-light-sidebarBackground  rounded w-full cursor-pointer py-2 px-3 flex justify-between items-center" 
        onClick={toggleDropdown}
      >
       <p className=' italic'> {selected}</p>
        <span>{isOpen ? '▲' : '▼'}</span>
      </div>
      {isOpen && (
        <div className="max-h-52 overflow-auto absolute bg-white rounded bg-secondary dark:bg-light-sidebarBackground mt-2 w-full shadow-lg z-10">
          {options.map((option, index) => (
            <div 
              key={index} 
              className="cursor-pointer py-2 px-3 hover:dark:bg-light-background hover:bg-primary"
              onClick={() => selectOption(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomDropdown;
