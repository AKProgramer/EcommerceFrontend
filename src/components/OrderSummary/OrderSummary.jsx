import React, { useState, useEffect } from 'react';
import styles from './ModuleCSS/OrderSummary.module.css';
import OrderItem from './OrderItem';
import { useSearchParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { setOrderSummaryData, setTotalPayment } from '../../features/Checkout/checkoutSlice';
// import { useNavigate } from 'react-router-dom';
import SpinnerFullPage from '../Spinner/SpinnerFullPage';
import useGlobalModals from '../../store/globalModals';
export default function OrderSummary({spm}) {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
 // const dispatch = useDispatch();
  // const orderSummaryData = useSelector(state=>state.checkout.orderSummaryData);
  // const totalPayment = useSelector(state=>state.checkout.totalPayment);
  // const data =useSelector(state=>state.cart.items)
  const orderSummaryData = useGlobalModals((state) => state.checkout.orderSummaryData);
  const totalPayment = useGlobalModals((state) => state.checkout.totalPayment);
  const data = useGlobalModals((state) => state.cart.items);
  const setOrderSummaryData = useGlobalModals((state) => state.setOrderSummaryData);
  const setTotalPayment = useGlobalModals((state) => state.setTotalPayment);


  useEffect(() => {
    setIsLoading(true);
    async function fetchProductsInOrderSummary() {
      try {
        if (spm === 'proceed_to_checkout') {
          setIsLoading(true);
          setOrderSummaryData(data);
          setIsLoading(false);
        } 
        else if (spm === 'buy_now') {
          setIsLoading(true);
          const productName = searchParams.get('name');
          const productQuantity = searchParams.get('quantity');
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product/${productName}`);
          if (!res.ok) {
            throw new Error(`HTTP error! Status: ${res.status}`);
          }
          const data = await res.json();
          data.quantity = productQuantity;
          setOrderSummaryData(data);
          setIsLoading(false);
        }
      } catch (error) {
        setIsLoading(false);
        setIsError(true);
        console.error('Error fetching data:', error);
      }
      
    }
    fetchProductsInOrderSummary();
  }, [spm, searchParams, setOrderSummaryData, data]);
  useEffect(()=>{
      if(spm === 'proceed_to_checkout' && orderSummaryData.items){
        const total = orderSummaryData.items.reduce((acc, cur) => acc + cur.productId.price, 0);
       setTotalPayment(total);
      }else{
        setTotalPayment(orderSummaryData.price);
      }
  },[orderSummaryData.items, orderSummaryData.price, setTotalPayment, spm]);

  if (isLoading) {
    return <SpinnerFullPage/>;
  }

  if (isError) {
    return <h1>Error...</h1>;
  }

  return (
    <div className={styles.summaryContainer}>
      <h2>Order Summary</h2>
      <div className={styles.orderItems}>
        {spm === 'proceed_to_checkout' ? (
          orderSummaryData.items && orderSummaryData.items.length > 0 ? (
            orderSummaryData.items.map((cartItem, index) => (
              <OrderItem
                productName={cartItem.productId.name}
                quantity={cartItem.quantity}
                price={cartItem.productId.price}
                image={cartItem.productId.images[0]}
                key={index}
              />
            ))
          ) : (
            <p style={{textAlign : 'center'}}>Cart is empty</p>
          )
        ) : (
          <OrderItem
            productName={orderSummaryData.name}
            quantity={orderSummaryData.quantity}
            price={orderSummaryData.price}
            image={orderSummaryData.images ? orderSummaryData.images[0] : ''}
          />
        )}
      </div>
      <div className={styles.billing}>
        <div className={styles.billingItem}>
          <h4>Items Total</h4>
          <p>Rs: <strong>{totalPayment}</strong></p>
        </div>
        <div className={styles.billingItem}>
          <h4>Delivery Fee</h4>
          <p>Rs: <strong>50</strong></p>
        </div>
        <div className={styles.billingItem}>
          <h4>Delivery Discount</h4>
          <p>Rs: <strong>-50</strong></p>
        </div>
        <div className={styles.billingItem} style={{ color: '#4481eb', fontSize: '24px' }}>
          <h4>Total Payment</h4>
          <p>{totalPayment}</p>
        </div>
      </div>
    </div>
  );
}
