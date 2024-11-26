import React from 'react'

import { MdDelete } from "react-icons/md";
export default function UserLayout({handleDeleteOnClick,image, name , email ,orderCount, cartItemCount, id}) {
    
    
  return (
    <>
    <div className="flex items-center justify-between p-4 lg:hidden">
    <div className="flex items-center gap-3">
        <img className="w-16 h-16 rounded-full" src="/women.jfif" alt="user-img"/>
        <div>
            <p className="text-subHeading text-lg ">{name}</p>
            <p className="text-subHeading text-xs">{email}</p>
        </div>
    </div>
      <div className="flex flex-col">
        <button className="font-bold" style={{color : 'rgb(241, 59, 59)'}} onClick={handleDeleteOnClick}>Delete</button>
      </div>
  </div>
  <div className='hidden lg:block'>
          <div className=' text-subHeading bg-secondary dark:bg-light-sidebarBackground rounded-md pt-3 pb-3'>
              <div className='flex justify-center'>
                <img src={image} alt='user-img' className='h-32 w-32 rounded-full'/>
              </div>
              <div>
                    <div className='pl-2 pt-4'>
                        <div className='flex justify-between'>
                          <p className='font-bold text-subHeading dark:text-light-primaryText'>{name}</p>
                          <button className="font-bold" style={{color : 'rgb(241, 59, 59)'}}  onClick={()=>handleDeleteOnClick({_id : id, name : name})}><MdDelete size={25}/></button>
                        </div>
                        <p className='text-subHeading dark:text-light-primaryText'>{email}</p>
                        <p className='text-subHeading dark:text-light-secondaryText'>Items in cart {cartItemCount}</p>
                        <p className='text-subHeading dark:text-light-secondaryText'>Orders {orderCount}</p>
                    </div>
                    
              </div>
          </div>
        </div>
    </>
  )
}
