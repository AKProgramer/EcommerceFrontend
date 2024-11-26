import React, { useState } from 'react';
import currencyFormatter from './currencyFormatter';
export default function OrderLayout({name, address, date,status, totalCost, paymentMethod}) {
  // Define dropdown options
  const dropdownOptions = [
   {name : 'PENDING'}, {name : 'CONFIRMED'}, {name:'READY FOR PICKUP'},{ name:'CANCELLED'}
  ];
  const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('en-GB', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });

  // State for selected option
  const [selected, setSelected] = useState(dropdownOptions[0].name);

  const handleSelectChange = (event) => {
    setSelected(event.target.value);
  };

  return (
    <>
      <div className="flex items-center justify-between p-4 lg:hidden">
        <div className="flex items-center gap-3">
          <img className="w-16 h-16 rounded-sm" src="/order.webp" alt="order-img" />
          <div >
            <select
              value={selected}
              onChange={handleSelectChange}
              className="bg-secondary outline-none dark:bg-light-sidebarBackground text-subHeading dark:text-light-primaryText p-2 rounded-md"
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={option.name}>
                  {option.name}
                </option>
              ))}
            </select>
            <p className="text-subHeading dark:text-light-primaryText mt-1 text-xs">User Name : {name}</p>
            <p className="text-subHeading dark:text-light-primaryText mt-1 text-xs">Payment Method : {paymentMethod}</p>
            <p className="text-subHeading dark:text-light-primaryText mt-1 text-xs">Total Cost {currencyFormatter.format(totalCost)}</p>
          </div>
        </div>
      </div>
      <div className='hidden lg:block'>
        <div className='text-subHeading bg-secondary dark:bg-light-sidebarBackground rounded-md pt-3 pb-3'>
          <div className='flex justify-center'>
            <img src='/order.webp' alt='' className='h-28 w-11/12 rounded-md' />
          </div>
          <div className='pl-2 pt-4'>
            <select
              value={selected}
              onChange={handleSelectChange}
              className="w-11/12 bg-primary outline-none dark:bg-light-sidebarBackground text-subHeading dark:text-light-primaryText p-1 rounded-md"
            >
              {dropdownOptions.map((option, index) => (
                <option key={index} value={status}>
                  {option.name}
                </option>
              ))}
            </select>
            <div className='mt-2 text-sm'>
                <p className='text-subHeading dark:text-light-primaryText   pt-1'>User Name : {name}</p>
                <p className='text-subHeading dark:text-light-secondaryText pt-1'>Payment Method : {paymentMethod}</p>
                <p className='text-subHeading dark:text-light-secondaryText pt-1'>Date : {formattedDate}</p>
                <p className='text-subHeading dark:text-light-secondaryText pt-1'>Total Cost {currencyFormatter.format(totalCost)}</p>
                <p className='text-subHeading dark:text-light-secondaryText pt-1'>Address : {address}</p>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}
