import React, { useRef, useState } from 'react';
import styles from './ProductDetails.module.css';
import DesignBox from './ProductCard/DesignBox';
import { FaCartPlus } from "react-icons/fa6";
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


export default function ProductDetails({ setShowDetails, name, productPrice, productImages, categoryName, description, handleAddToCart}) {
  const [quantity, setQuantity] = useState(0);
  const [price, setPrice] = useState(productPrice);
  const [currentImage, setCurrentImage] = useState(productImages[0]);
  const navigate = useNavigate();
  function buyNowOnClick(){
    if(quantity === 0){
        toast.error('Please select quantity',{
          position: "top-center",
          autoClose: 1000,
        });
      return ;
    }
    navigate(`/checkout?spm=buy_now&name=${name}&quantity=${quantity}`);
  }
  const handleDecrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      setPrice((quantity - 1) * productPrice);
    }
  };

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    setPrice((quantity + 1) * productPrice);
  };
 
  return (
    <div className={styles.detailsModal} onClick={() => setShowDetails(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <DesignBox />

        <button className={styles.closeButton} onClick={() => setShowDetails(false)}>X</button>
        <div className={styles['container']}>
              <div className={styles['product-image']}>
                      <img src={`${process.env.REACT_APP_BASE_URL}${currentImage.replace(/\\/g, '/').replace('uploads', '')}`} alt='product-img'></img> 
                    <div className={styles['thumbnail-div']} >
                        {productImages.map((image, index) => (
                          <img key={index} src={`${process.env.REACT_APP_BASE_URL}${image.replace(/\\/g, '/').replace('uploads', '')}`}  alt='product-img' onClick={()=>setCurrentImage(image)}></img>
                        ))}
                    </div>
              </div>
              <div className='right'>
                    <div className={styles['product-details']}>
                        <div>
                            <p>Name : <strong>{name}</strong></p>
                            <p>Category : <strong>{categoryName}</strong></p>
                            <p>Description : <strong>{description}</strong></p>
                            <p>Price : <strong>{price}</strong></p>
                            <div className={styles['product-quantity']}>
                              <button onClick={handleDecrement} disabled={quantity === 0}>-</button>
                              {quantity}
                              <button onClick={handleIncrement}>+</button>
                            </div>
                        </div>
                      </div>
              </div>
        </div>
        <div className={styles['btn-div']}>
          <button className={styles.buyNow} onClick={buyNowOnClick}>Buy Now</button>
          <button className={styles.addToCart} onClick={handleAddToCart}><FaCartPlus className={styles['cart-icon']} />Add to Cart</button>
        </div>
       
      </div>
    </div>
  );
}
