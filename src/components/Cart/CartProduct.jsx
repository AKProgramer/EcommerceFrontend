import React from 'react'
import styles from './ModuleCSS/CartProduct.module.css';
import { useState } from 'react';
export default function CartProduct({name, description,price,image, initialQuantity, productId, removeCartProductOnClick}) {
  const baseAddress = process.env.REACT_APP_BASE_URL;
    const [quantity, setQuantity] = useState(initialQuantity);
    const handleDecrement = () => {
        if (quantity > 0) {
          setQuantity(quantity - 1);
        }
      };
    
      const handleIncrement = () => {
        setQuantity(quantity + 1);
      };
     
  return (
    <div className={styles['cartProduct']}>
    <img src={`${baseAddress}${image.replace(/\\/g, '/').replace('uploads', '')}`} alt="product-img" />
    <div>
        <h3>{name}</h3>
        <p>{description}</p>
    </div>
    <div>
        <div className={styles['product-quantity']}>
        <button onClick={handleDecrement} disabled={quantity === 0}>-</button>
        {quantity}
        <button onClick={handleIncrement}>+</button>
        </div>
    </div>
    <div>
        <div className={styles['price-div']}>
                <div>
                <p>Rs</p>
                {price}
                </div> 
        </div>
        <button className={styles['removeBtn']} onClick={()=>removeCartProductOnClick(productId, name)}>Remove</button>
    </div>
</div>
  )
}
