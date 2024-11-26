import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from './ModuleCSS/SimpleSlider.module.css';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from 'react-router-dom';

const SimpleSlider = () => {
  // const arrowIconRef = useRef(null);
  
  // function handleMouseEnter(){
  //   arrowIconRef.current.style.display = 'block';
  // };
  // function handleMouseLeave(){
  //   arrowIconRef.current.style.display = '';
  // }
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  const baseAddress = process.env.REACT_APP_BASE_URL;
  const settings = {

    autoplay: true,
    autoplaySpeed: 5000,
    pauseOnFocus: true,
    pauseOnHover: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  useEffect(()=>{
    async function fetchCategories(){
        try{
          const res =await fetch(`${baseAddress}/getAllCategories`);
          const data = await res.json();
          if (Array.isArray(data)) {
            setCategories(data);
          } else {
            console.error("Fetched data is not an array:", data);
          }
        }
        catch(e)
        {
          console.log(e.message);
        }
    }
    fetchCategories();
      
  },[]);
  const handleOnClick=(e)=>{
    navigate('/'+e.target.innerText);
  }
  return (
    <div className={styles["categoryAndSliderContainer"]}>
        <div className={styles["categoryList"]}>
            {categories.map((category, index) => (
            <div key={index} className={styles.categoryItem} onClick={handleOnClick}>
                <div className={styles.left}>
                    <img src={`${baseAddress}${category.image.replace(/\\/g, '/').replace('uploads', '')}`} alt='' className={styles.categoryIcon} />
                    <span className={styles.categoryName}>{category.name}</span>
                </div>
                <div className={styles.right}>
                    <MdOutlineKeyboardArrowRight className={styles.arrowIcon} />
                </div>
            </div>
          ))}
        </div>
        <div className={styles.sliderContainer} style={{color : '#ccccc'}}>
          <Slider {...settings}>
            <div>
              <img src="/img1.png" alt="Slide 1"/>
            </div>
            <div>
              <img src="/img2.jpg" alt="Slide 2"/>
            </div>
            <div>
              <img src="/img3.jpg" alt="Slide 3"/>
            </div>
            <div>
              <img src="/img4.png" alt="Slide 4"/>
            </div>
            <div>
              <img src="/img5.png" alt="Slide 5"/>
            </div>
            <div>
              <img src="/img6.jpg " alt="Slide 6"/>
            </div>
          </Slider>
        </div>
    </div>
    
  );
};

export default SimpleSlider;
