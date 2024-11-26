import { useRef } from 'react';
import styles from './ModuleCSS/ProductSlider.module.css';
import Card from '../ProductCard/Card';
import SlideContainer from './ProductSlider';
function Products({heading, products}){
        const containerRef = useRef();
  return (
    <>
    <div className={styles.heading}>
    <h1 className={styles.exp}>{heading}</h1>
    <div className={styles['div-design']}></div>
    </div>
    <SlideContainer containerRef= {containerRef}>
    <div className={styles["seller-menu"]} ref={containerRef}>
          {products.length ===0 ? <h1>No products available</h1> :
            products.map((product, index) => (
              <Card key={index} 
                productId={product._id}
                price= {product.price}
                name ={product.name} 
                imageUrl={`${process.env.REACT_APP_BASE_URL}${product.images[0].replace(/\\/g, '/').replace('uploads', '')}`}
                description={product.description} categoryName={product.category.name}
                 productImages={product.images}/>
            ))
          }  
        </div>
    </SlideContainer>
    </>
  );
}

export default Products;
