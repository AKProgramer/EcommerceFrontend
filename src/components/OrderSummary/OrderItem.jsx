import React from 'react'
import styles from './ModuleCSS/OrderItem.module.css'
export default function OrderItem({productName, quantity, price,image}) {
  return (
    <div className={styles.orderItemContainer}>
    <div className={styles.orderItem}>
        <div className={styles['left']}>
            <img src={`${process.env.REACT_APP_BASE_URL}/${image.replace(/\\/g, '/').replace('uploads', '')}`} alt="Product" style={styles.productImage} />
            <div>
                <h4>{productName}</h4>
                <p>Qty : <strong>{quantity}</strong></p>
            </div>
        </div>
            <p>Rs : <strong>{price}</strong></p>
    </div>
    <div className={styles['line']}></div>
    </div>
  )
}
