
import Navbar from '../../components/Navbar/Navbar'
import Footer from '../../components/Footer/Footer'
import ShippingAddress from '../../components/Address/ShippingAddress'
import OrderSummary from '../../components/OrderSummary/OrderSummary'
import styles from './CheckoutPage.module.css'
import Payment from '../../components/Payment/Payment'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import useGlobalModals from '../../store/globalModals'
import { createOrder, useAuth } from '../../services'
export default function CheckoutPage() {
  const defaultAddress = useGlobalModals(state => state.checkout.defaultAddress);
  const orderSummaryData = useGlobalModals(state => state.checkout.orderSummaryData);
  const totalPayment = useGlobalModals(state => state.checkout.totalPayment);
  const userEmail = useGlobalModals(state => state.user.userEmail);
  const setUserEmail = useGlobalModals(state => state.setUserEmail);

  const [searchParams] = useSearchParams();
  const spm = searchParams.get('spm');

  useAuth(); // Handle authentication

  // Set the user email when the component mounts
  useEffect(() => {
    setUserEmail(userEmail);
  }, [userEmail, setUserEmail]);

  // Handle the order creation function
  const handleCreateOrder = async (paymentMethod) => {
    const orderId = await createOrder(paymentMethod, defaultAddress, userEmail, totalPayment, orderSummaryData, spm);
    console.log('Order ID:', orderId);
  };

  return (
    <>
      <Navbar/>
          <div className={styles['container']}>
            <div className={styles['left']}>
              <ShippingAddress  />
              <Payment createOrder={handleCreateOrder}/>
            </div>
            <OrderSummary spm={spm} /> 
          </div>
      <Footer/>
    </>
  )
}
