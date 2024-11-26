import { useRef } from 'react';
import styles from './ModuleCSS/ProductSlider.module.css';
import { MdOutlineKeyboardArrowLeft } from "react-icons/md";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

function SlideContainer({children, containerRef}){
        const btnLeftRef = useRef();
        const btnRightRef = useRef();
        function scrollLeft(){
          containerRef.current.scrollBy({
            left: -200, 
            behavior: 'smooth', 
          });
        };
        function scrollRight () {
          containerRef.current.scrollBy({
            left: 200, 
            behavior: 'smooth', 
          });
        };
        function handleMouseEnter(e)
        {
          btnLeftRef.current.style.display='block';
          btnRightRef.current.style.display='block';
        }
        function handleMouseLeave(e)
        {
          btnLeftRef.current.style.display='';
          btnRightRef.current.style.display='';
        }
  return (
      <div className={styles.productContainer} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} >
      <button ref={btnLeftRef} className={styles.scrollBtn}><MdOutlineKeyboardArrowLeft className={styles['btn-icon']} onClick={scrollLeft}/></button>
       {children}
        <button ref={btnRightRef} className={styles.scrollBtn}><MdOutlineKeyboardArrowRight className={styles['btn-icon']} onClick={scrollRight}/></button>
     </div>
  );
}

export default SlideContainer;
