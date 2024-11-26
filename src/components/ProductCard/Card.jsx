import React from 'react'
import styles from './ModuleCSS/Card.module.css'
import { FaCartPlus } from "react-icons/fa6";
import { createPortal } from 'react-dom';
import { useState} from 'react';
import ProductDetails from '../ProductDetails';
import DesignBox from './DesignBox';
import { toast } from 'react-toastify';
import useGlobalModals from '../../store/globalModals';

export default function Card({price,productId, name, imageUrl,description, categoryName,productImages}) {
   
    const [showDetails, setShowDetails] = useState(false);
    const [isLoading, setIsLoading]= useState(false);
    const fetchCartItems = useGlobalModals((state) => state.fetchCartItems);
    const userId = sessionStorage.getItem('userId');
    async function addItemInDB(){
        try{
            setIsLoading(true);
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/add`,{
                method : 'post',
                headers : {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({productId, userId,quantity : 1})
            }); 
           const data = await res.json();
           setIsLoading(false);
           if (data.isAdded) {
            toast.info('Quantity is updated by 1', {
              position: 'top-center',
              autoClose: 1000,
              theme: 'dark',
            });
          } else {
            toast.info(`${name} added to cart`, {
              position: 'top-center',
              autoClose: 1000,
              theme: 'dark',
            });
         }
           fetchCartItems(userId);
        }
        catch(e)
        {
            console.log(e.message);
        } 
    }
    function handleOnClick() {
        setShowDetails(!showDetails);
    }
    // whenever user clicks on card it add the product in cart in db side its quanity is 1 as we cannot change the quanity from card component 
    
    function handleAddToCart(e) {
        addItemInDB();
    }
  return (
    <>
     <div className={styles.cardContainer}>
    <button className={styles.addToCart} onClick={handleAddToCart}>
        {
         !isLoading ? (<>
            <FaCartPlus className={styles['cart-icon']}/>Add to Cart
          </>) : (<p>Loading...</p>)
        }
    </button>
        <div className={styles.card} onClick={handleOnClick}>
            <DesignBox/>
            <div className={styles['price-div']}>
                <div>
                <p>Rs</p>
                {price}
                </div> 
            </div>
            <div className={styles['img-div']}>
                <img src={imageUrl} alt='product-img'/>
            </div>
            <div>
                <h2>{name}</h2>
            </div>
        </div>
  </div>
  {showDetails && createPortal(<ProductDetails setShowDetails={setShowDetails} name={name} productPrice={price} productImages={productImages} categoryName={categoryName} description={description} handleAddToCart={handleAddToCart}/>, document.getElementById('portal-root'))}
    </>
   
  )
}
