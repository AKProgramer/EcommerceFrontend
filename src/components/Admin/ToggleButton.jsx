import React, { useState } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa'; 

const ToggleButton = ({isDarkMode, setIsDarkMode}) => {
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'));
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <button
      onClick={toggleTheme}
      className={`flex items-center px-4 py-2 ${isDarkMode ? 'hover:bg-light-sidebarBackground' : 'hover:bg-secondary'} rounded-full focus:outline-none transition-colors duration-300 
      }`}
    >
      {theme === 'light' ? (
        <>
          <FaSun className="mr-2" size={25} />
          
        </>
      ) : (
        <>
          <FaMoon className="mr-2" color='black' size={(25)}/>
        </>
      )}
    </button>
  );
};

export default ToggleButton;
