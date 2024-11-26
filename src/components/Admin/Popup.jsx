import React from 'react';
const Popup = ({ showPopup, item, currentPage, setFetchTrigger }) => {
  const handleDelete =async () => {

    if(currentPage === 'Products'){
        await fetch(`${process.env.REACT_APP_BASE_URL}/product/delete/${item._id}`, {
        method: 'DELETE',
      });
    }
    else if(currentPage === 'Brands'){
        await fetch(`${process.env.REACT_APP_BASE_URL}/brand/delete/${item._id}`, {
        method: 'DELETE',
      });
    
     
    }
    else if(currentPage === 'Categories'){
      await fetch(`${process.env.REACT_APP_BASE_URL}/category/delete/${item._id}`, {
        method: 'DELETE',
      });
    }
    else if(currentPage === 'Users'){
        await fetch(`${process.env.REACT_APP_BASE_URL}/user/delete/${item._id}`, {
        method: 'DELETE',
      });
     
    }
    setFetchTrigger(prev => !prev);
    showPopup(false);
  };
  const closePopup = () => {
    showPopup(false);
  }

  return (
    <div className="fixed inset-0 bg-light-primaryText bg-opacity-50 flex items-center justify-center z-50 text-subHeading dark:text-light-primaryText">
      <div className="bg-secondary dark:bg-light-sidebarBackground p-5 rounded-lg shadow-lg w-80 max-w-full">
        <h2 className="text-xl font-bold mb-4">Confirmation</h2>
        <p className='text-sm' style={{color: '#FF0000'}}>{currentPage==='Users' ? "Note: Deleting a user will delete all addresses, orders and cart related to that user.": "Note: Deleting a category or brand will delete all products in that category or brand."}</p>
        <p className="mb-4">Are you sure you want to delete {item.name}?</p>
        <div className="flex justify-end space-x-4">
          <button
            style={{color : 'grey'}}
            className="bg-gray-200 px-4 py-2 rounded"
            onClick={closePopup}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 px-4 py-2 rounded"
            onClick={handleDelete} 
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
