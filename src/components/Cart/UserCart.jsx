import React, { useEffect } from 'react'
import styles from './ModuleCSS/UserCart.module.css';
import {useRef } from 'react';
import CartProduct from './CartProduct';
import { useNavigate } from 'react-router-dom';
import SpinnerFullPage from '../Spinner/SpinnerFullPage';
 
import { toast } from 'react-toastify';
import useGlobalModals from '../../store/globalModals';
export default function UserCart({setShowDetails}) {
    const test = useRef(null);
    const navigate = useNavigate();
    const userId = sessionStorage.getItem('userId');
    const isError = useGlobalModals((state) => state.cart.error);
    const isLoading = useGlobalModals((state) => state.cart.loading);
    const userCartData = useGlobalModals((state) => state.cart);
    const fetchCartItems = useGlobalModals((state) => state.fetchCartItems);
    console.log("user cart data", userCartData);
    
    useEffect(()=>{
        fetchCartItems(userId);
    },[userId, fetchCartItems]);

    function handleOnClick (){
        if(userCartData.items.length > 0){
       navigate(`/checkout?spm=proceed_to_checkout`);
       setShowDetails(false);
        }
        else{
            toast.error('Cart is empty',{
                autoClose : 1000
            });
        }
    }
    const removeAllOnClick = async () => {
        try {
            if(userCartData.items.length === 0){
                toast.error('Cart is already empty',{
                    position : 'top-center',
                    autoClose : 1000
                });
                return;
            }
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/removeAll`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId }),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            fetchCartItems(userId);
            toast.success('All items removed from cart',{
                position : 'top-center',
                autoClose : 1000
            });
        } catch (e) {
            console.log(e.message);
        }
    }
    const removeCartProductOnClick = async (productId, name)=>{
        try {
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ userId, productId }),
            });
            if (!res.ok) {
                throw new Error(`HTTP error! Status: ${res.status}`);
            }
            fetchCartItems(userId);
            toast.success(`${name} removed from cart`,{
                position : 'top-center',
                autoClose : 1000
            });
        } catch (e) {
            console.log(e.message);
        }
    }
    return (
        <>
        <div className={styles.userCartContainer} onClick={() => setShowDetails(false)} ref={test}>

            <div className={styles.userCart} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={() => setShowDetails(false)}>X</button>
                {isLoading ? (<SpinnerFullPage />) :
                    isError ? (<p>Error in loading user cart data</p>) :
                <>
                    <div className={styles['head']}>
                        <h2>Shopping Cart</h2>
                        <button onClick={removeAllOnClick}>Remove All</button>
                    </div>
                    <div className={styles['products']}>
                    {userCartData.items && userCartData.items.length > 0 ? (
                                    userCartData.items.map((cartItem, index) => (
                                        <CartProduct
                                            name={cartItem.productId.name}
                                            price={cartItem.productId.price}
                                            description={cartItem.productId.description}
                                            initialQuantity={cartItem.quantity}
                                            image={cartItem.productId.images[0]}
                                            key={index}
                                            removeCartProductOnClick={removeCartProductOnClick}
                                            productId={cartItem.productId._id}
                                        />
                                    ))
                                ) : (
                                    <p>Cart is empty</p>
                                )}
                        
                    </div>
                    <div className={styles['line-div']}>
                        <div className={styles['line']}></div>
                    </div>
                    <div className={styles['sub-total']}>
                        <div className={styles['left']}>
                            <h2>Subtotal</h2>
                            <p>{userCartData.items ? userCartData.items.length : 0} items</p>
                        </div>
                        <div className={styles['right']}>
                            <h1> {userCartData.items ? userCartData.items.reduce((pre, cur) => {
                                            return pre + cur.productId.price;
                                        }, 0) : 0}</h1>
                        </div>
                    </div>
                    <div className={styles['checkout-btn-div']}>
                        <button onClick={handleOnClick}>Proceed to Checkout</button>
                    </div>
                </>
                }
            </div>
        </div>
    </>
  )
}