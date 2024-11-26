import React from 'react'
import styles from './ModuleCSS/ShippingAddress.module.css'
import { createPortal } from 'react-dom';
import { useState, useEffect } from 'react';
import AddressCard from './AddressCard';
import EmailEditCard from './EmailEditCard';
// import { useDispatch, useSelector } from 'react-redux';
// import { setAddressError, setDefaultAddress } from '../../features/Checkout/checkoutSlice';
import useGlobalModals from '../../store/globalModals';
export default function ShippingAddress() {
    const [showAddressCard, setShowAddressCard] = useState(false);
    const [showEmailEditCard, setShowEmailEditCard] = useState(false);
    
    const userName = useGlobalModals((state) => state.user.userName);
    const defaultAddress = useGlobalModals((state) => state.checkout.defaultAddress);
    const makeOrder = useGlobalModals((state) => state.checkout.makeOrder);
    const addressError = useGlobalModals((state) => state.checkout.addressError);
    const updateEmail = useGlobalModals((state) => state.checkout.userEmail);
    const setAddressError = useGlobalModals((state) => state.setAddressError);
    const setDefaultAddress = useGlobalModals((state) => state.setDefaultAddress);

    // const userName = useSelector((state)=> state.user.userName);
    // const dispatch = useDispatch();
    // const defaultAddress = useSelector((state)=> state.checkout.defaultAddress);
    // const makeOrder = useSelector((state)=> state.checkout.makeOrder);
    // const addressError = useSelector((state)=> state.checkout.addressError);
    // const updateEmail = useSelector((state)=> state.checkout.userEmail);

    
    const handleOnClick= ()=>{
        setShowAddressCard(!showAddressCard);
    }
    const handleEmailEdit = ()=>{
        setShowEmailEditCard(!showEmailEditCard);
    }
    useEffect(()=>{
        const fetchAddress = async()=>{
          const res =await fetch(`${process.env.REACT_APP_BASE_URL}/defaultAddress/${sessionStorage.getItem('userId')}`);
          const data =await res.json();
          if(!data.length > 0)
            {
                setAddressError("Please add an address to proceed");
                setDefaultAddress("");
            }
          setDefaultAddress(data);
         
        }
        fetchAddress();
      },[setAddressError, setDefaultAddress]);
    
  return (
    <>
        <div className={styles['addressContainer']}>
            <div className={styles.userName}>
                <h3>Deliver to:</h3>
                <strong>{userName}</strong>
            </div>
            <div className={styles.address}>
           {defaultAddress.address ? 
           <p>{`${defaultAddress.mobileNumber} | ${defaultAddress.province},${defaultAddress.city} - ${defaultAddress.area},${defaultAddress.address}, ${defaultAddress.city}`}</p> : <p>{makeOrder ? addressError : 'Select or add new address'}</p>}
                <button onClick={handleOnClick}>Change</button>
            </div>
            {defaultAddress && <div className={styles['editAddress']}>
                <p>Bill to the same address</p>
                <button onClick={handleOnClick}>Edit</button>
            </div>}
            <div className={styles['editEmail']}>
                <h4>Email to : </h4>
                <p>{updateEmail}</p>
                <button onClick={handleEmailEdit}>Edit</button>
            </div>
        </div>
        {showAddressCard && createPortal(<AddressCard setShowAddressCard={setShowAddressCard} />, document.getElementById('portal-root'))}
        {showEmailEditCard && createPortal(<EmailEditCard setShowEmailEditCard={setShowEmailEditCard}/>, document.getElementById('portal-root'))}
    </>
  )
}
