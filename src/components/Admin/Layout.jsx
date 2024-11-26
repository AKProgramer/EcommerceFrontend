  import React from 'react'
  import currencyFormatter from './currencyFormatter';
  export default function Layout({handleDeleteOnClick, currentPage,onEdit, item}) {
    return (
      <>
      <div className="flex items-center justify-between p-4 lg:hidden">
      <div className="flex items-center gap-3">
          {currentPage ==='Products' ? <img className="h-32 w-auto bg-contain" src={`${process.env.REACT_APP_BASE_URL}${item.images[0].replace(/\\/g, '/').replace('uploads', '')}`} alt=""/>
          :
          <img className="h-32 w-auto bg-contain" src={`${process.env.REACT_APP_BASE_URL}${item.image.replace(/\\/g, '/').replace('uploads', '')}`} alt=""/>}
          <p className="text-subHeading text-lg">{item.name}</p>
      </div>
        <div className="flex flex-col">
          <button className="font-bold" style={{color : '#FFFF00'}} onClick={()=>onEdit(item)}>Edit</button>
          <button className="font-bold" style={{color : 'rgb(241, 59, 59)'}} onClick={()=>handleDeleteOnClick(item)}>Delete</button>
        </div>
    </div>
      <div className='hidden lg:block'>
            <div className=' text-subHeading bg-secondary dark:bg-light-sidebarBackground rounded-md pt-3 pb-3'>
              
              {currentPage === 'Products' ? 
              <div>
                    <div className='flex justify-center'>
                      <img src={`${process.env.REACT_APP_BASE_URL}${item.images[0].replace(/\\/g, '/').replace('uploads', '')}`} alt='img' className='h-32 w-auto bg-contain'/>
                    </div>
                    <div className='pl-2 pt-4 pr-2'>
                        <p className='font-bold text-subHeading dark:text-light-primaryText'>{item.name}</p>
                        <div className='text-subHeading dark:text-light-primaryText'>
                            <p>{currencyFormatter.format(item.price)}</p>
                            <p>{item.category.name}</p>
                            <p>brand</p>
                            <p>Stock # {item.quantity}</p>
                        </div>
                    </div>
                </div>
                  :
                <div>
                    <div className='flex justify-center'>
                      <img src={`${process.env.REACT_APP_BASE_URL}${item.image.replace(/\\/g, '/').replace('uploads', '')}`} alt='img' className='h-32 w-auto bg-contain'/>
                    </div>
                    <p className='font-bold text-subHeading dark:text-light-primaryText pl-2 pt-3'>{item.name}</p>
                    <p className='text-whiteSubHeading dark:text-light-primaryText break-words pl-2 '> {item.description}</p>
                </div>}
                <div className="flex justify-evenly p-2 bg-secondary dark:bg-light-sidebarBackground">
                  <button className="font-bold hover:bg-primary p-1 pl-2 pr-2 rounded" style={{color : '#DAA520'}} onClick={()=>onEdit(item)}>Edit</button>
                  <button className="font-bold hover:bg-primary p-1 pl-2 pr-2 rounded" style={{color : 'rgb(241, 59, 59)'}} onClick={()=>handleDeleteOnClick(item)}>Delete</button>
                </div>
            </div>
          </div>
      </>
    ) 
  }
