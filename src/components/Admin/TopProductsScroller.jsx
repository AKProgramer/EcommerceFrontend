import React, { useEffect } from 'react'
import TopProduct from './TopProduct'
import { TbMoodEmpty } from "react-icons/tb";
import Slider from 'react-slick';
import { useState } from 'react';
export default function TopProductsScroller() {
    const [topProductsData, setTopProductsData] = useState([]);
    useEffect(()=>{
        async function fetchTopProducts(){
          try{
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/topProductsBySales`);
            const data = await res.json();
            setTopProductsData(data);
          }
          catch(err){
            console.log(err.message);
          }
        }
        fetchTopProducts();
    },[]);
  const settings = {
    className: "center",
    centerMode: true,
    slidesToShow: 5,
    speed: 500,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "ease-in-out",
    arrow :false,
    responsive: [
      {
        breakpoint: 1024, // At 1024px width
        settings: {
          slidesToShow: 3, // Show 2 slides
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 820, // At 768px width
        settings: {
          slidesToShow: 2, // Show 1 slide
          slidesToScroll: 1,
          infinite: true,
          arrow :false,
        },
      },
      {
        breakpoint: 480, // At 480px width
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
          infinite: true,
        },
      } 
    ]
  };
  return (
    <div className="w-11/12 mt-5 p-4 m-auto rounded-md bg-secondary dark:bg-light-sidebarBackground  md-h-1/2  lg:w-2/3 lg:mt-0 lg:rounded-lg lg:p-1">
      <div className='flex justify-between lg:items-center lg:p-3'>
          <h1 className="text-2xl p-2 font-bold text-subHeading dark:text-light-primaryText md:text-4xl md:p-4 lg:text-xl lg:p-0">Top Selling Products</h1>
          <button className='hidden lg:block font-bold p-2 text-subHeading rounded-lg text-sm' style={{backgroundColor : 'purple',}}>See All</button>
      </div>
          <div className='slider-container overflow-hidden md:pb-5 md:pt-2 lg:hidden'>
            <Slider {...settings} >
             {
              topProductsData && topProductsData.map((product, index) => (
                
                <TopProduct key={index} name ={product.name} image={product.images[0]} price={product.price}/>
              ))
            }
             
            </Slider>
        </div>
        <div className='hidden lg:block'>
        <div className='flex justify-evenly text-subHeading dark:text-light-primaryText'>
            <div className='w-1/12 '>
              <p>Id</p>
            </div>
            <div className='w-1/3 '>
              <p>Product Name</p>
            </div>
            <div className='w-1/4 '>
              <p>Price</p>
            </div>
            <div className='w-1/6 '>
              <p>Category</p>
            </div>
            <div className='w-1/6'>
              <p>Sales</p>
            </div>
          </div>
        <div className='hidden lg:block w-full h-0.5 rounded-lg mt-2 mb-2 bg-subHeading dark:text-light-primaryText'></div>
       <div>
            {
              topProductsData.length===0 ?
              <div className='w-full flex justify-center gap-1 items-center text-lg text-light-white dark:text-light-primaryText'><TbMoodEmpty className='animate-bounce' size={25}/><p className='animate-pulse'> No data available</p></div>
                :
               topProductsData.map((product, index) => (
                
                <TopProduct key={index} name ={product.name} image={product.images[0]} index={index+1} price={product.price}/>
              ))
            }
       </div>
        </div>
    </div>
  )
}
