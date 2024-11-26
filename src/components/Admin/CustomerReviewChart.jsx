import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);
const data = {
  labels: ['5 stars', '4 stars', '3 stars', '2 stars', '1 star'],
  datasets: [
    {
      label: 'Customer Reviews',
      data: [43, 28, 15, 8, 6],
      backgroundColor: '#301934',
      borderColor: 'purple',
      borderWidth: 1,
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
      labels: {
        color: 'black',
        font: {
          size: 14,
        }
      },
    },
  },
  label: {
    display : false
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        color: 'black', // Color of x-axis labels
      },
    },
    x: {
      ticks: {
        color: 'black', // Color of y-axis labels
      },
    },
  },
};



export default function CustomerReviewChart() {
  return (
    <div className="w-11/12 bg-secondary dark:bg-light-sidebarBackground p-4 rounded-xl m-auto mt-5 lg:w-1/4 lg:mt-0 lg:p-2 ">
          <h1 className="text-2xl text-subHeading dark:text-light-primaryText font-bold md:text-4xl md:p-3 lg:text-xl">Customer Review</h1>
          <div className=''>
               <Bar data={data} options={options} height={250}/>
          </div>
    </div>
  )
}
