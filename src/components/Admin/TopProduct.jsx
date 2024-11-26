import React from 'react'
import currencyFormatter from './currencyFormatter'
export default function TopProduct({name, image, price, index}) {
  return (
    <>
    <div className='bg-primary dark:bg-light-background w-11/12 rounded-lg p-2 md:h-full lg:hidden'>
        <div className='flex items-center justify-between p-1 rounded-full '>
            <div className='text-subHeading dark:text-light-primaryText'>
            <h1 className='font-bold text-lg'>Camera</h1>
            <h1  className='font-bold text-lg'>{currencyFormatter.format(345)}</h1>
            </div>
            <img src={`${process.env.REACT_APP_BASE_URL}${image.replace(/\\/g, '/').replace('uploads', '')}`} alt='top-product' className='w-20 h-20 rounded-md '/>
        </div>
        <div className='flex justify-between mt-4 text-subHeading dark:text-light-primaryText '>
            <h1 className='font-bold text-lg' style={{color : 'purple'}}>Amount Sold: <strong className={`text-lg text-subHeading dark:text-light-primaryText`}>23234</strong>  </h1>
            <h1 className='font-bold text-sm hidden' style={{color : 'purple'}}>Sales : <strong className='text-lg text-subHeading dark:text-light-primaryText'>{currencyFormatter.format(345)}</strong></h1>
        </div>
    </div>
    <div className='hidden lg:block text-subHeading dark:text-light-primaryText'>
  <div className='lg:flex items-center gap-5 pt-2 pb-2'>
    <div className='w-1/12'>
      <p>{index}</p>
    </div>
    <div className='flex items-center gap-2 w-1/3'>
      <img 
        src={`${process.env.REACT_APP_BASE_URL}${image.replace(/\\/g, '/').replace('uploads', '')}`} 
        alt='top-product' 
        className='w-10 h-10 rounded-md'
      />
      <p>{name}</p>
    </div>
    <div className='w-1/4'>
      <p>{currencyFormatter.format(price)}</p>
    </div>
    <div className='w-1/6'>
      <p>23234</p>
    </div>
    <div className='w-1/6'>
      <p>{currencyFormatter.format(345)}</p>
    </div>
  </div>
</div>

    
    </>
  )
}
