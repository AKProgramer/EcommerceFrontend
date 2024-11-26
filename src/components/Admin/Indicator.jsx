import React from 'react';
import { TbMoodEmpty } from 'react-icons/tb';
import { AiOutlineLoading3Quarters } from 'react-icons/ai'; 

export default function Indicator({ name }) {
  return (
    <div>
      {name === "loading" ? (
        <p className='h-full text-subHeading flex items-center justify-center dark:text-light-primaryText'>
          <AiOutlineLoading3Quarters className='animate-spin' size={40} />
        </p>
      ) : (
        <div className='w-full flex justify-center gap-1 items-center text-lg text-light-white dark:text-light-primaryText'>
          <TbMoodEmpty className='animate-bounce' size={25} />
          <p className='animate-pulse'> No data available</p>
        </div>
      )}
    </div>
  );
}
