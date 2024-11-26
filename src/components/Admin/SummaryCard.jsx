import React from 'react'
import currencyFormatter from './currencyFormatter'
import { BiMoneyWithdraw } from 'react-icons/bi'
export default function SummaryCard({cardIcon : CardIcon, arrowIcon : ArrowIcon, title, value, money}) {
    
  return (
    <div className='bg-secondary dark:bg-light-sidebarBackground w-11/12 p-2 pl-4 rounded-lg md:p-4 md:pl-6 lg:w-[220px]'>
      <div className='flex items-center justify-center p-1 rounded-full bg-primary dark:bg-light-background  h-12 w-12 md:h-16 md:w-16 lg:h-9 lg:w-9'>
      <CardIcon size={25} className='text-subHeading dark:text-light-primaryText '/>
      </div>
      <p className='text-md text-subHeading dark:text-light-primaryText md:text-2xl md:pt-3  lg:text-sm lg:pt-1'>{title}</p>
      <h1 className='text-subHeading dark:text-light-primaryText text-2xl md:text-4xl md:pt-3 lg:text-xl lg:pt-1'>{title === 'Total Sales' ? currencyFormatter.format(money) : money}</h1>
      <div className=' flex text-sm items-center gap-1 md:text-2xl md:gap-3 md:pt-3 lg:text-xs lg:pt-1 ' style={{color : 'green'}}>
            <ArrowIcon size={25}/>
            <p>{value}%</p>
      </div>
    </div>
  )
}
