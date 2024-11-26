import React from 'react'
import styles from './ModuleCSS/OverviewPanel.module.css'
import SummaryCard from '../SummaryCard'
import { GiTakeMyMoney } from "react-icons/gi";
import { IoMdArrowDropup } from "react-icons/io";
import {MdAssignment, MdPeople} from 'react-icons/md';
import { GrReturn } from "react-icons/gr";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
// import { useSelector } from 'react-redux';
import useGlobalModals from '../../../store/globalModals';

export default function   OverviewPanel({totalOrders, totalSales, totalCustomers, totalProducts, totalCategories}) {
 // const userName = useSelector((state)=> state.user.userName);
    const userName = useGlobalModals((state) => state.user.userName);
  const summaryCard =[
    {title : 'Total Sales', money : totalSales, value : 10, cardIcon : GiTakeMyMoney, arrowIcon : IoMdArrowDropup},
    {title : 'Total Orders', money : totalOrders, value : 10, cardIcon : MdAssignment, arrowIcon : IoMdArrowDropup},
    {title : 'Total Customers', money : totalCustomers, value : 10, cardIcon : MdPeople, arrowIcon : IoMdArrowDropup},
    {title : 'Total Products', money : totalProducts, value : 10, cardIcon : GrReturn, arrowIcon : IoMdArrowDropup},
    {title : 'Total Categories', money : totalCategories, value : 10, cardIcon : MdPeople, arrowIcon : IoMdArrowDropup},
  ]
  const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
      const settings = {
        className: "center",
        centerMode: true,
        slidesToShow: 5,
        speed: 500,
        infinite: true,
        autoplay: true,
        autoplaySpeed: 2000,
        cssEase: "ease-in-out",
        responsive: [
          {
            breakpoint: 1440, // At 1440px width
            settings: {
              slidesToShow: 4, // Show 3 slides
              slidesToScroll: 1,
              infinite: true,
          },
        },
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
    <div className='pl-2 pt-2 md:pt-6 lg:pt-0 text-subHeading dark:text-light-primaryText'>
        <div className='flex flex-col items-center lg:items-start'>
          <div>
            <h1 className={`font-bold text-xl ${styles.typingEffect} md:text-4xl lg:text-xl`}>Welcome back, {userName}</h1>
          </div>
            <p  className='md:text-xl lg:text-xs lg:ml-5 text-subHeading dark:text-light-secondaryText'>{formattedDate}</p>
        </div>
        <div className='slider-container overflow-hidden mt-5 '>
            <Slider {...settings}>
                        {summaryCard.map((card, index) => (
                          <SummaryCard
                            key={index}
                            title={card.title}
                            money={card.money}
                            value={card.value}
                            cardIcon={card.cardIcon}
                            arrowIcon={card.arrowIcon}
                          />
                        ))}
                  
            </Slider>
        </div>
    </div>
  )
}
