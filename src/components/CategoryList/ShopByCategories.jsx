import React from 'react'
import styles from './ModuleCSS/ShopByCategories.module.css';
import Category from './Category';
import { useEffect, useState } from 'react';
export default function ShopByCategories() {
  const [categories, setCategories] = useState([]);
  const baseAddress = process.env.REACT_APP_BASE_URL;
  useEffect(()=>{
    async function fetchCategories(){
        try{
          const res =await fetch(`${baseAddress}/getAllCategories`);
          const data = await res.json();
          setCategories(data);
        }
        catch(e)
        {
          console.log(e.message);
        }
    }
    fetchCategories();
      
  },[])
  
  return (
    <div>
            <div className={styles.heading}>
            <h1 className={styles.titleH1}>Shop by Categories</h1>
            <div className={styles['div-design']}></div>
            </div>
         <div className={styles['categoryContainer']}>
             {categories.map((category, index) => (
              <Category categoryName={category.name} categoryImage={`${baseAddress}${category.image.replace(/\\/g, '/').replace('uploads', '')}`} key={index}/> 
              ))}
            
            
         </div>  
    </div>
  )
}
