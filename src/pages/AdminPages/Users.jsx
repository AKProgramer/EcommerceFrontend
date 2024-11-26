import React, { useEffect, useState } from 'react';
import UserLayout from '../../components/Admin/UserLayout';
import Popup from '../../components/Admin/Popup';
import { createPortal } from 'react-dom';
import { TbMoodEmpty } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Users() {
  const [usersData, setUsersData] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [loading, setLoading] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);  
  const [fetchTrigger, setFetchTrigger] = useState(false);

  const handleDeleteOnClick = (user) => {
    setSelectedUser(user);
    setShowPopup(true);
  };

  useEffect(() => {
    setLoading(true);
    const fetchUsers = async () => {
      try {
        const res = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllUsers`, {
          method: 'GET',
        });
        const data = await res.json();
        setUsersData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
        setLoading(false);
      }
    };
    fetchUsers();
  }, [fetchTrigger]);

  if (loading) {
    return <p className='h-full text-subHeading flex items-center justify-center dark:text-light-primaryText'><AiOutlineLoading3Quarters className='animate-spin' size={40} /></p>;
  }

  return (
    <div>
      <div className="flex justify-between items-center text-subHeading dark:text-light-primaryText pl-4 pr-4">
        <p className="text-xl font-bold">Users</p>
      </div>
      <div className='w-full h-[1px] rounded-lg mt-2 mb-2' style={{ backgroundColor: '#ccc' }}></div>
      <div className="lg:grid lg:grid-cols-4 lg:gap-4 lg:p-4 lg:w-full">
        {usersData.length === 0 ?  
          <div className='w-full flex justify-center gap-1 items-center text-lg text-light-white dark:text-light-primaryText'>
            <TbMoodEmpty className='animate-bounce' size={25} />
            <p className='animate-pulse'> No data available</p>
          </div>
          : usersData.map((user, index) => {
            const imageUrl = user.image && user.image.includes('upload') 
              ? `${process.env.REACT_APP_BASE_URL}${user.image.replace(/\\/g, '/').replace('uploads', '')}` 
              : user.image;

            console.log('Image URL:', imageUrl); // Debugging: Check the constructed image URL

            return (
              <div className="w-full" key={index}>
                <UserLayout
                  handleDeleteOnClick={handleDeleteOnClick}
                  id={user._id}
                  image={imageUrl}
                  name={user.username}
                  email={user.email}
                  orderCount={user.orderCount}
                  cartItemCount={user.cartItemCount}
                />
              </div>
            );
          })
        }
      </div>
      {showPopup && createPortal(
        <Popup
          showPopup={setShowPopup}
          currentPage={"Users"}
          item={selectedUser}
          setFetchTrigger={setFetchTrigger}
        />, document.getElementById('portal-root'))
      }
    </div>
  );
}
