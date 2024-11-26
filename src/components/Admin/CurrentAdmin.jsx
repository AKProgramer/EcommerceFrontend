import React from 'react'
import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { IoMdArrowDropdown } from "react-icons/io";
import { IoPersonOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';
import Indicator from './Indicator';
import useGlobalModals from '../../store/globalModals';
export default function CurrentAdmin() {
    // const userName = useSelector((state) => state.user.userName);
    // const userEmail = useSelector((state) => state.user.userEmail);
    const userName = useGlobalModals((state) => state.user.userName);
    const userEmail = useGlobalModals((state) => state.user.userEmail);
    const image = useGlobalModals((state) => state.user.image);    
    // const image = useSelector((state) => state.user.image);
    const [isUserActionVisible, setIsUserActionVisible] = useState(false);
    const [userImageUrl, setUserImageUrl] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    useEffect(() => {
        const fetchUserImage = () => {
          try {
            if (image) {
              if (image.includes('uploads')) {
                const img = process.env.REACT_APP_BASE_URL + image.replace(/\\/g, '/').replace('uploads', '');
                setUserImageUrl(img);
              } else {
                setUserImageUrl(image);
              }
            }
          } catch (error) {
            console.error('Error fetching user data:', error.message);
          }
        };
  
        fetchUserImage();
      }, [image]);
    function handleMouseClick(){
        setIsUserActionVisible(!isUserActionVisible);
      }
      function handleMouseLeave(){
        setIsUserActionVisible(!isUserActionVisible);
      }
      function handleDivClick() {
        fileInputRef.current.click();
    };
    const handleFileChange =async (event) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('image', file);
            formData.append('userId', userId);
    
          try {
                const res = await fetch(`${process.env.REACT_APP_BASE_URL}/upload/image`, {
                method: 'POST',
                body: formData,
                });
        
                const data = await res.json();
                if (data.image) {
                    setUserImageUrl(process.env.REACT_APP_BASE_URL+ data.image.replace(/\\/g, '/').replace('uploads', ''));
                }
             } catch (error) {
                     console.error('Error uploading user image:', error);
             }
        }
    };
    const handleLogout= ()=>{
        sessionStorage.clear();
        localStorage.clear();
        navigate('/login');
    }
  return (
    <div className='relative'>
        <div onClick={handleMouseClick}>
            {image ?
                <div className='flex items-center justify-center md:flex-row md:gap-3 ' >
                        <div className={'w-12 h-12 flex items-center justify-center'}>
                            {userImageUrl ? (
                                <img src={userImageUrl} alt="User" className='rounded-full object-cover cursor-pointer' />
                            ) : (
                                <IoPersonOutline size={25} />
                            )}
                        </div>
                    <div div className='flex items-center gap-2 cursor-pointer text-subHeading dark:text-light-primaryText'>
                            <div>
                                <p>{userName}</p>
                                <p className='hidden md:block'>{userEmail}</p>
                            </div>
                            <IoMdArrowDropdown className='h-5 w-5 hidden md:block'/>
                        </div>
                </div>
            : <Indicator name='loading'/>}
        </div>
        <div onMouseLeave={handleMouseClick} className={`absolute p-3 gap-3 flex flex-col items-center justify-around rounded-lg bg-subHeading z-10 top-16 right-14 shadow-md ${!isUserActionVisible ? 'invisible' : ''}` }>
                <div className='flex flex-col items-center justify-center text-primary'>
                            <div className={'w-16 h-16 rounded-full text-subHeading flex items-center justify-center cursor-pointer '} style={{backgroundColor: 'black'}} onClick={handleDivClick}>
                                {userImageUrl ? (
                                <img src={userImageUrl} alt="User" className='w-full h-full rounded-full' />
                                ) : (
                                <IoPersonOutline size={30} />
                                )}
                            </div>
                            <p>{userName}</p>
                            <p className='text-sm'>{userEmail}</p>
                            <input  
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                accept="image/*"
                                onChange={handleFileChange}
                                />
                            <div className='w-full h-0.5 mt-1 rounded-2xl bg-light-primaryText'></div>
                    </div>
                    <button className={'p-1 w-28 text-subHeading dark:text-light-primaryText bg-light-danger rounded-lg'} onClick={handleLogout}>Logout</button>
            </div>
    </div>
  )
}
