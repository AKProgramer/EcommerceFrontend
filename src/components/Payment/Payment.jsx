import React, { useState } from 'react';
import styles from './ModuleCSS/Payment.module.css';
import PaymentOptionBtn from './PaymentOptionBtn';
import { useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { setMakeOrder } from '../../features/Checkout/checkoutSlice';
// import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import useGlobalModals from '../../store/globalModals';
export default function Payment({ createOrder }) {
  const [selectedBtn, setSelectedBtn] = useState('Easypaisa');
  const [jazzError, setJazzError] = useState('');
  const [easyError, setEasyError] = useState('');
  const [jazzNo, setJazzNo] = useState('');
  const [easyNo, setEasyNo] = useState('');
  // const addressError = useSelector((state) => state.checkout.addressError);
  // const defaultAddress = useSelector((state) => state.checkout.defaultAddress);
  const addressError = useGlobalModals((state) => state.checkout.addressError);
  const defaultAddress = useGlobalModals((state) => state.checkout.defaultAddress);
  const setMakeOrder = useGlobalModals((state) => state.setMakeOrder);
  
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  const validate = (number) => {
    const regex = /^[0-9]{11}$/;
    return regex.test(number);
  };

  const handleInputChange = (setter, errorSetter, value) => {
    setter(value);
    errorSetter(validate(value) ? '' : 'Please enter a valid mobile number');
  };

  const handlePayNowClick = (type) => {
    if (!defaultAddress.address) {
      setMakeOrder(true);
      if(addressError.length > 0){
        toast.error(addressError,{
          position: "top-center",
          autoClose: 1000,
        });
      }
    } else {
      if (type === 'Easypaisa' && validate(easyNo)) {
        const id = createOrder('EASYPAISA');
        navigate(`/order/success/${id}`);
      } else if (type === 'Jazzcash' && validate(jazzNo)) {
        const id = createOrder('JAZZCASH');
        navigate(`/order/success/${id}`);
      } else {
        type === 'Easypaisa' ? setEasyError('Please enter a valid mobile number') : setJazzError('Please enter a valid mobile number');
      }
    }
  };

  const handleCashOnClick = () => {
    if (!defaultAddress.address) {
      setMakeOrder(true);
      if(addressError.length > 0){
        toast.error(addressError,{
          position: "top-center",
          autoClose: 1000,
        });
      }
   } else {
     const id= createOrder('CASH');
      setMakeOrder(false);
      navigate(`/order/success/${id}`);
    }
  };

  return (
    <div>
      <div className={styles.paymentHeader}>
        <h2>Payment Method</h2>
        <div className={styles.buttons}>
          <PaymentOptionBtn icon={'/easypaisa.png'} name={'Easypaisa'} selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
          <PaymentOptionBtn icon={'/jazzcash.png'} name={'JazzCash'} selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
          <PaymentOptionBtn icon={'/cash.png'} name={'Cash On Delivery'} selectedBtn={selectedBtn} setSelectedBtn={setSelectedBtn} />
        </div>
      </div>

      {selectedBtn === 'Easypaisa' && (
        <div className={styles.easypaisa}>
          <h3>Please Read this before moving forward</h3>
          <p>Experience easy payments – save your Easypaisa account as default method to pay!</p>
          <p>Please ensure your Easypaisa account is Active and has sufficient balance.</p>
          <p>To confirm your payment after providing OTP:</p>
          <p> USSD prompt for Telenor Customers Only</p>
          <p> Unlock your phone and enter 5 digit PIN in the prompt to pay</p>
          <p>OR</p>
          <p>Approve Payment in your Easypaisa App (Telenor and Other Networks)</p>
          <p>Login to Easypaisa App and tap on payment notification to approve</p>
          <p>If you miss the notification, go to My Approvals in side menu to confirm</p>
          <h3 className={styles.label}>Easypaisa Account Number</h3>
          <input
            className={styles.accountNo}
            onChange={(e) => handleInputChange(setEasyNo, setEasyError, e.target.value)}
            value={easyNo}
          />
          <p className={styles.error}>{easyError}</p>
          <div>
            <button className={styles.payNowBtn} onClick={() => handlePayNowClick('Easypaisa')}>
              Pay Now
            </button>
          </div>
        </div>
      )}

      {selectedBtn === 'JazzCash' && (
        <div className={styles.jazzcash}>
          <h3>Please Read this before moving forward</h3>
          <p><strong>FOR JAZZ/WARID</strong></p>
          <p className={styles.text}>Unlock your phone and you will receive a MPIN Input Prompt</p>
          <p><strong>FOR OTHER NETWORKS</strong></p>
          <p className={styles.text}>Log-in to your JazzCash App and enter your MPIN</p>
          <p><strong>Note: </strong>Ensure your JazzCash account is Active and has sufficient balance.</p>
          <h3 className={styles.label}>Jazzcash Account Number</h3>
          <input
            className={styles.accountNo}
            onChange={(e) => handleInputChange(setJazzNo, setJazzError, e.target.value)}
            value={jazzNo}
          />
          <p className={styles.error}>{jazzError}</p>
          <div>
            <button className={styles.payNowBtn} onClick={() => handlePayNowClick('Jazzcash')}>
              Pay Now
            </button>
          </div>
        </div>
      )}

      {selectedBtn === 'Cash On Delivery' && (
        <div className={styles.cashOnDelivery}>
          <h3>Please Read this before moving forward</h3>
          <p>You may pay in cash to our courier upon receiving your parcel at the doorstep</p>
          <p>Before agreeing to receive the parcel, check if your delivery status has been updated to 'Out for Delivery'</p>
          <p>Before receiving, confirm that the airway bill shows that the parcel is from Daraz</p>
          <p>Before you make payment to the courier, confirm your order number, sender information and tracking number on the parcel</p>
          <div>
            <button className={styles.payNowBtn} onClick={handleCashOnClick}>
              Confirm Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
