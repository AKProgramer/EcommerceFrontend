import React, { useEffect } from 'react';
import SideMenu from '../../components/Admin/SideMenu';
import Navbar from '../../components/Admin/Navbar';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useGlobalModals from '../../store/globalModals';

export default function AdminLayout() {
  const [isSideMenuVisible, setSideMenuVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState(sessionStorage.getItem('selectedMenuButton') || 'dashboard');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const fetchUser = useGlobalModals((state) => state.fetchUser);
  const navigate = useNavigate();
  const storedToken = sessionStorage.getItem('token');
  const storedUserId = sessionStorage.getItem('userId');
  const role = sessionStorage.getItem('role');
  useEffect(() => {
    if (!storedToken || !storedUserId || role !== 'admin') {
      navigate('/login');
    }
    }, [navigate, storedToken, storedUserId, role]);
    useEffect(() => {
      if (storedUserId) {
        fetchUser(storedUserId);
      }
    }, [ storedUserId]);
  useEffect(() => {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      setIsDarkMode(JSON.parse(savedMode));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', isDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prevMode => !prevMode);
  };
  useEffect(() => {
    document.body.style.backgroundColor = `${!isDarkMode ? '#101828' : '#E5E7EB'}`;
    document.documentElement.style.setProperty('--blink-color', `${isDarkMode ? 'black' : 'white'}`);
  }, [isDarkMode]);
  return (
    <div className='flex'>
      <SideMenu isSideMenuVisible = {isSideMenuVisible} setSideMenuVisible={setSideMenuVisible} selectedButton={selectedButton} setSelectedButton={setSelectedButton} toggleDarkMode={toggleDarkMode}/>
      <div className='w-full lg:w-7/10'>
          <Navbar isSideMenuVisible={isSideMenuVisible} isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} setSideMenuVisible={setSideMenuVisible} whatSearch={selectedButton}/>
          <Outlet />
       </div>
    </div>
  );
}
