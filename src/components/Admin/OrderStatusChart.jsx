import React, { useEffect, useState } from 'react'
import { Chart, registerables } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { TbMoodEmpty } from "react-icons/tb";
Chart.register(...registerables);


const options = {
  responsive: true,
  maintainAspectRatio: true,
  plugins: {
    legend: {
      position: 'bottom',
      labels: {
        color: 'black',
        font: {
          size: 14,
        }
      },
    },
    tooltip: {
      callbacks: {
        label: function (tooltipItem) {
          return `${tooltipItem.raw} orders`;
        },
      },
      backgroundColor : '#101828',
      titleColor: 'white',
      padding :'10',
      bodyColor: 'white',
      borderColor: 'rgba(255, 255, 255, 0.2)',
      borderWidth: 1,
    },
  },
};
export default function OrderStatusChart() {
  const [ordersData, setOrdersData] = useState([]);
  useEffect(()=>{
      async function fetchTotalOrdersByStatus(){
        try{
          const res = await fetch(`${process.env.REACT_APP_BASE_URL}/totalOrdersByStatus`);
          const data = await res.json();
          setOrdersData(data);
        }
        catch(err){
          console.log(err.message);
        }
      }
      fetchTotalOrdersByStatus();
  },[])
  const data = {
    labels: ['PEND', 'CONF', 'RFC', 'CANC'],
    datasets: [
      {
        data: ordersData.map(order => order.count), 
        backgroundColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56'],
        borderColor: ['#FF6384', '#36A2EB', '#4BC0C0', '#FFCE56'],
        borderWidth: 2,
        hoverOffset: 5
      },
    ],
  };
  return (
    <div className="w-11/12 bg-secondary dark:bg-light-sidebarBackground p-4 rounded-xl m-auto mt-5 lg:w-1/4 lg:mt-0 lg:h-80">
          <h1 className="text-2xl text-subHeading dark:text-light-primaryText md:text-4xl lg:text-xl font-bold">Order Status</h1>
          <div className="pt-4 lg:h-11/12">
            {ordersData.reduce((pre, cur)=>( pre + cur.count) ,0) ===0 ?
             (<div className='w-full flex justify-center gap-1 items-center text-lg text-light-white dark:text-light-primaryText'><TbMoodEmpty className='animate-bounce' size={25}/><p className='animate-pulse'> No data available</p></div>)
             :
              (<Doughnut data={data} options={options} />)}
        </div>
    </div>
  )
}
