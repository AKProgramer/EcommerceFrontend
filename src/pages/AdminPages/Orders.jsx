import React from 'react'
import OrderLayout from '../../components/Admin/OrderLayout'
import { useState, useEffect } from 'react';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { TbMoodEmpty } from "react-icons/tb";
export default function Orders() {
      const [ordersData, setOrdersData] = useState([]);
      const [loading , setLoading] = useState(false);
      useEffect(()=>{
        setLoading(true);
        const fetchOrders = async () => {
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/orders`, {
            method: 'GET',
          });
          const data = await res.json();
          setOrdersData(data);
          setLoading(false);
        }
        fetchOrders();
        
      },[]);
      if(loading){
        return <p className='h-full text-subHeading flex items-center justify-center dark:text-light-primaryText'><AiOutlineLoading3Quarters className='animate-spin' size={40}/></p>;
      }
      return (
        <div>
            <div className="flex justify-between items-center text-subHeading dark:text-light-primaryText pl-4 pr-4">
            <p className="text-xl font-bold">Orders</p>
            </div>
            <div className='w-full h-[1px] rounded-lg mt-2 mb-2' style={{ backgroundColor: '#ccc' }}></div>
            <div className="lg:grid lg:grid-cols-4 lg:gap-4 lg:p-4 lg:w-full">
                  {ordersData.length===0 ?
                  <div className='w-full flex justify-center gap-1 items-center text-lg text-light-white  dark:text-light-primaryText'><TbMoodEmpty className='animate-bounce' size={25}/><p className='animate-pulse'> No data available</p></div>
                  : ordersData.map((order, index) => (
                    <div className="w-full" key={index}>
                    <OrderLayout name={order.username} address={order.address} date={order.date} status = {order.status} totalCost={order.totalCost} paymentMethod={order.paymentMethod}/>
                    </div>))}
            </div>
            
      </div>
      )
   
    
}
