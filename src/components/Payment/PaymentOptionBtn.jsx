import React from 'react';
import styles from './ModuleCSS/PaymentOptionBtn.module.css';

export default function PaymentOptionBtn({ icon, name, selectedBtn, setSelectedBtn }) {
  const handleClick = () => {
    setSelectedBtn(name);
  };

  return (
    <div
      className={styles['btn']}
      style={{ backgroundColor: selectedBtn === name ? 'white' : '' }}
      onClick={handleClick}
    >
      <img src={`${icon}`} alt='' />
      <h4>{name}</h4>
    </div>
  );
}
