import React, { useEffect } from 'react'
import NavButton from './NavButton'
import { MdDashboard, MdShoppingCart, MdCategory, MdBrandingWatermark, MdPeople, MdAssignment} from "react-icons/md";
import { FaChevronLeft } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { BiLogOutCircle } from "react-icons/bi";

const buttons = [
    { icon: MdDashboard, title: "Dashboard" },
    { icon: MdShoppingCart, title: "Products" },
    { icon: MdCategory, title: "Categories" },
    { icon: MdBrandingWatermark, title: "Brands" },
    { icon: MdPeople, title: "Users" },
    { icon: MdAssignment, title: "Orders" },
  ];
export default function SideMenu({isSideMenuVisible, setSideMenuVisible, setSelectedButton, selectedButton}) {
    const navigate = useNavigate();
    const handleButtonClick = (btnName) => {
        sessionStorage.setItem('selectedMenuButton', btnName);
        setSelectedButton(btnName);
        if(btnName === 'Logout'){ navigate('/'); return;}
        if(btnName === 'dashboard'){ navigate('/admin'); return;}
        navigate(`/admin/${btnName}`)
    };
    const sidemeueCloseBtnOnClick = () => {
        setSideMenuVisible(isSideMenuVisible=>!isSideMenuVisible);
    }
    useEffect(() => {
        const handleResize = () => {
          
          if (window.innerWidth >= 768) {
            setSideMenuVisible(true); // Automatically show the menu on large screens
          } else {
            setSideMenuVisible(false); // Hide the menu initially on small screens
          }
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
      }, [setSideMenuVisible]);
  return (
    <div className={`bg-secondary dark:bg-light-sidebarBackground h-screen w-3/4 absolute top-0 left-0 z-10 rounded-r-xl transition-transform duration-300 ease-in-out  ${isSideMenuVisible ? 'translate-x-0' : '-translate-x-full'} md:w-1/2 md:fixed lg:w-1/5 lg:sticky lg:translate-x-0 lg:rounded-none`}>
            <div className='flex items-center justify-between gap-3 pt-8 pb-8 p-2 '>
                <div className='flex items-center gap-4'>
                    <img src='/fast.png' alt='logo' className='w-10 h-10 rounded-full object-cover'/>
                    <h2 className='text-2xl text-subHeading dark:text-light-primaryText' >FAST Mart</h2>
                </div>
                <button style={{backgroundColor : '#101828'}} className='rounded p-1 lg:hidden' onClick={sidemeueCloseBtnOnClick}><FaChevronLeft color='rgb(226 232 240)' size={25}/></button>
            </div>
            {/* <div className='w-full h-0.5 rounded mt-3' style={{backgroundColor : "#ccc"}}></div> */}
           
              <div>
                  {buttons.map((button, index) => (
                      <NavButton
                      key={index}
                      icon={button.icon}
                      title={button.title}
                      isSelected={selectedButton === button.title.toLowerCase()}
                      onClick={() => handleButtonClick(button.title.toLowerCase())}
                      isSideMenuVisible = {isSideMenuVisible}
                      />
                  ))}
              </div>
              <div>
                  <NavButton
                      icon={BiLogOutCircle}
                      title='Logout'
                      isSelected={selectedButton === 'Logout'}
                      onClick={() => handleButtonClick('Logout')}
                      isSideMenuVisible = {isSideMenuVisible}
                  />
              </div>   
    </div>
          
   
  )
}
