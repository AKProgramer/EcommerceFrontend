import React from 'react';
import styles from './ModuleCSS/EmailEditCard.module.css';
import { useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { setUserEmail } from '../../features/Checkout/checkoutSlice';
import useGlobalModals from '../../store/globalModals';
export default function EmailEditCard({ setShowEmailEditCard}) {
//  const userEmail = useSelector((state)=> state.user.userEmail);
const userEmail = useGlobalModals((state) =>(state.userEmail));
const setUserEmail = useGlobalModals((state) => state.setUserEmail);

  const [email, setEmail] = useState(userEmail);
  const [error, setError] = useState('');
 // const dispatch = useDispatch();
 

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleEmailChange = (e) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    if (validateEmail(newEmail)) {
      setError('');
    } else {
      setError('Please enter a valid email address');
    }
  };
  const onConfirmClick = () => {
    if (validateEmail(email)) {
        setUserEmail(email);
        setShowEmailEditCard(false);
    } else {
      setError('Please enter a valid email address');
    }
  }

  return (
    <div className={styles.detailsModal}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.head}>
          <h3>{'Edit your email'}</h3>
          <button className={styles.closeButton} onClick={() => setShowEmailEditCard(false)}>X</button>
        </div>
        <div className={styles['email-div']}>
          <input
            type="email"
            placeholder="Enter your email"
            className={styles.emailInput}
            value={email}
            onChange={handleEmailChange}
          />
          {error && <p className={styles.errorText}>{error}</p>}
        </div>
        <div className={styles.button}>
          <button className={styles.confirmButton} onClick={onConfirmClick}>Confirm</button>
        </div>
      </div>
    </div>
  );
}
