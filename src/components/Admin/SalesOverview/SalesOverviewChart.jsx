  import React, { useEffect, useRef } from 'react';
  import { Chart, registerables } from 'chart.js';
  import { Line } from 'react-chartjs-2';
  import styles from './CSSModules/SalesOverview.module.css';
  import { TbMoodEmpty } from "react-icons/tb";
  import { useState } from 'react';
import Indicator from '../Indicator';
  Chart.register(...registerables);

  const getData = (period, salesData) => {
    if (salesData.length === 0) {
      console.error("Invalid or empty sales data:", salesData);
      return { labels: [], datasets: [] };
    }
    if (period === 'Monthly') {
      return {
        labels: salesData && salesData.map(item => item.month),
        datasets: [
          {
            label: 'Sales',
            data:salesData.map(item => item.totalSales),
            borderColor: 'purple',
            backgroundColor: '#301934',
            fill: true,
          },
        ],
      };
    }
    return {
      labels: salesData && salesData.map(item => item.week?.substring(0, 5)),
      datasets: [
        {
          label: 'Sales',
          data: salesData.map(item => item.totalSales),
          borderColor: 'purple',
          backgroundColor: '#301934',
          fill: true,
        },
      ],
    };
  };
  const SalesOverview = () => {
    const mode = localStorage.getItem('darkMode');
    const [scaleColor, setScaleColor] = useState('white');
    const [salesDataByWeek, setSalesDataByWeek] = useState([]);
    const [salesDataByMonth, setSalesDataByMonth] = useState([]);
    const [loading , setLoading] = useState(false);
    const [data, setData] = useState([]);
    const handleClick = (button) => {
      setSelected(button);
    };
    useEffect(() => {
      const fetchData = async () => {
        try {
          const weekResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/salesOverviewByWeek`);
          const weekData = await weekResponse.json();
          setSalesDataByWeek(weekData);

          const monthResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/salesOverviewByMonth`);
          const monthData = await monthResponse.json();
          setSalesDataByMonth(monthData);
        } catch (err) {
          console.log(err.message);
        } finally {
          setLoading(false);
        }
      };

      fetchData();
    }, []);
    useEffect(() => {
      const chartInstance = chartRef.current;
      return () => {
        if (chartInstance && chartInstance.destroy) {
          chartInstance.destroy();
        }
      };
    }, []);
    useEffect(() => {
      if (mode === 'true') {
        setScaleColor('white');
      } else {
        setScaleColor('black');
      }
    }, [mode]);
    const chartRef = useRef(null);
    const [selected, setSelected] = useState('Monthly');
    useEffect(() => {
      if (selected === 'Monthly') {
        setData(getData(selected, salesDataByMonth));
      } else {
        setData(getData(selected, salesDataByWeek));
      }
    }, [selected, salesDataByMonth, salesDataByWeek]);
    const options = {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        x: {
          beginAtZero: true,
          type: 'category',
          ticks: {
            color: `${scaleColor}`, // Color of x-axis label
            font: {
              size: 14,
            },
          },
          
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: `${scaleColor}`, 
            font: {
              size: 14,
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    };
   
    return (
      <div className="w-11/12 bg-secondary dark:bg-light-sidebarBackground mt-5 p-4 rounded-xl m-auto md:mt-10 lg:w-2/3 lg:h-80 lg:mt-0">
        <div className=''>
            <h1 className="text-2xl font-bold text-subHeading dark:text-light-primaryText md:text-4xl lg:text-xl">Sales Overview</h1>
            <div className='flex gap-3 pt-3 pr-3 pb-3 md:justify-between'>
                <button
                className={`p-2 border-primary dark:border-light-background ${selected === 'Monthly' ? 'text-selected' : 'text-subHeading dark:text-light-primaryText'}
                rounded-lg text-xs md:p-4 md:w-1/5 md:text-xl md:font-bold lg:text-sm lg:p-2
                  ${selected === 'Monthly' ? 'bg-primary dark:bg-light-background' : 'border border-primary dark:border-light-background'}`} 
                  onClick={() => handleClick('Monthly')}
                  >Monthly</button>
                <button 
                className={`p-2
                border-primary rounded-lg text-xs md:p-4 md:w-1/5 md:text-xl md:font-bold lg:text-sm lg:p-2 ${selected === 'Weekly' ? 'text-selected' : 'text-subHeading dark:text-light-primaryText'}
                ${selected === 'Weekly' ? 'bg-primary dark:bg-light-background' : 'border border-primary dark:border-light-background'}`}
                onClick={() => handleClick('Weekly')} >Weekly</button>
            </div>
        </div>

        <div className={`w-full h-full lg:h-2/3 overflow-auto ${styles['hide-scrollbar']}`}>
          <div className=''>
           { loading ? <Indicator name = {'loading'}/> :
            salesDataByMonth.length===0 && salesDataByWeek.length===0 ? <Indicator name = {'empty'}/>
              :
            <Line ref={chartRef} data={data} options={options} className='text-light-primaryText'/>}
          </div>
        </div>
      </div>
    );
  };

  export default SalesOverview;
