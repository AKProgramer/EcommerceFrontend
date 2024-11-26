import React from 'react'
import styles from './ModuleCSS/Category.module.css'
import { useNavigate } from 'react-router-dom';
export default function Category({categoryName, categoryImage}) {
  const navigate = useNavigate();
  function handleOnClick(){
    navigate('/'+categoryName)
  }
  return (
    <div className={styles['categoryContainer']} onClick={handleOnClick}>
      <div className={styles['category-image']}>
        <img src={categoryImage} alt='category-img'></img>
      </div>
      <h1>{categoryName}</h1>
    </div>
  )
}
