import React from 'react';
import styles from './ModuleCSS/Navbar.module.css'; 
import { IoPersonOutline } from "react-icons/io5";
import { FaCartPlus } from "react-icons/fa6";
import {useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPortal } from 'react-dom';
import UserCart from '../Cart/UserCart';
import { useEffect } from 'react';
import SearchBar from './SearchBar';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchUser } from '../../features/User/UserSlice';
// import { fetchCartItems } from '../../features/Cart/cartSlice';
import useGlobalModals from '../../store/globalModals';

const Navbar = () => {
  //const dispatch = useDispatch();
  const image = useGlobalModals((state) => state.user.image);
  const userName = useGlobalModals((state) => state.user.userName);
  const itemsAddedToCart = useGlobalModals((state) => state.cart.totalCount);
  const fetchUser = useGlobalModals((state) => state.fetchUser);
  const fetchCartItems = useGlobalModals((state) => state.fetchCartItems);

  // const image = useSelector(state=> state.user.image);
  // const userName = useSelector(state=> state.user.userName);
  // const itemsAddedToCart = useSelector((state) =>{
  //   return state.cart.totalCount;
  // });
  const navigate = useNavigate();
  const userActionDivRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isUserActionVisible, setIsUserActionVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  
  const [userImageUrl, setUserImageUrl] = useState(null);
  const userId = sessionStorage.getItem('userId');
  const itemsInCartRef = useRef(null);
  useEffect(() => {
    if (userId) {
      fetchUser(userId);
      fetchCartItems(userId);
    }
  }, [fetchUser, fetchCartItems, userId]);
useEffect(() => {
 
  if (itemsAddedToCart === 0) {
    if (itemsInCartRef.current) {
      itemsInCartRef.current.style.visibility = 'hidden';
    }
  } else {
    if (itemsInCartRef.current) {
      itemsInCartRef.current.style.visibility = 'visible';
    }
  }
}, [itemsAddedToCart]); 
  
    useEffect(() => {
      const fetchUserImage = () => {
        try {
          if (image) {
            if (image.includes('uploads')) {
              const img = `${process.env.REACT_APP_BASE_URL}/` + image.replace(/\\/g, '/').replace('uploads', '');
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
    function handleDivClick() {
        fileInputRef.current.click();
    };
    function handleMouseEnter(){
      setIsUserActionVisible(!isUserActionVisible);
    }
    function handleMouseLeave(){
      setIsUserActionVisible(!isUserActionVisible);
    }
    function handleOnClick() {
        setShowDetails(!showDetails);
    }
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
                    setUserImageUrl(`${process.env.REACT_APP_BASE_URL}/` + data.image.replace(/\\/g, '/').replace('uploads', ''));
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
    <nav className={styles.navbar}>
      <div>
          <h1 className={styles['titleH1']}>FAST Mart</h1>
      </div>
      <SearchBar/>
        <div className={styles['right']}>
          <div onMouseLeave={handleMouseLeave} onMouseEnter={handleMouseEnter}>
                <div className={`${styles['user-action-div']} ${isUserActionVisible ? styles['active'] : ''}`} ref={userActionDivRef}>
                      <div className={styles['new-user-div']} onClick={handleDivClick}>
                                <div className={styles['new-user']}>
                                    {userImageUrl ? (
                                      <img src={userImageUrl} alt="User" className={styles.userImage} />
                                    ) : (
                                      <IoPersonOutline className={styles.userIcon} />
                                    )}
                                </div>
                                <p>{userName ? userName : 'Loading...'}</p>
                                <input  
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    />
                                <div className={styles.line}></div>
                        </div>
                        <button className={styles.logoutButton} onClick={handleLogout}>Logout</button>
                </div>
              <div className={styles['user-div']} >
                      <div className={styles['user']}>
                          {userImageUrl ? (
                              <img src={userImageUrl} alt="User" className={styles.userImage} />
                          ) : (
                              <IoPersonOutline className={styles.userIcon} />
                          )}
                      </div>
                      <p>{userName}</p>
              </div>
          </div>
            <div className={styles['cart-div']}>
                <span ref={itemsInCartRef}>{itemsAddedToCart}</span>
                <FaCartPlus className={styles['cart-icon']} onClick={handleOnClick}/>
            </div>
        </div>
        {showDetails && createPortal(<UserCart setShowDetails={setShowDetails}/>, document.getElementById('portal-root'))}
    </nav>
  );
}

export default Navbar;
