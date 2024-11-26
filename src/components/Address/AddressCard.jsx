
import styles from './ModuleCSS/AddressCard.module.css'
import AddressDetailsCard from './AddressDetailsCard'
import { IoAddOutline } from "react-icons/io5";
import { useState } from 'react';
import AddressFrom from './AddressForm';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useGlobalModals from '../../store/globalModals';
export default function AddressCard({setShowAddressCard}) {
  const [addNewAddress, setAddNewAddress] = useState(false);
  const userId = sessionStorage.getItem('userId');
  const [userAddresses, setUserAddresses] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [error, setError] = useState('');
  const [addressId, setAddressId] = useState('');
  const {setDefaultAddress} = useGlobalModals((state)=> state.setDefaultAddress);
  async function handleOnClick (addressId) {
    const res = await fetch(`${process.env.REACT_APP_BASE_URL}/address/delete/${addressId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    setAddressId(addressId);
    const data = await res.json();
    toast.success(data.message,{
      position: "top-center",
      autoClose: 1000,
    });

  }
  useEffect(()=>{
    setIsLoading(true);
    const fetchAddress = async()=>{
      const res =await fetch(`${process.env.REACT_APP_BASE_URL}/address/${userId}`);
      const data =await res.json();
      setUserAddresses(data);
      setSelectedAddress(data.reduce((acc, address, index)=>{
        if(address.isDefault){
          acc = index;
        }
        return acc;
      },false));
      if(selectedAddress === false){
        setDefaultAddress("");
      }
      setIsLoading(false);
    }
    fetchAddress();
  },[addNewAddress, addressId, userId, selectedAddress, setDefaultAddress]);
  const handleClickOnAddressCard=(index)=>{
    setDefaultAddress(userAddresses[index]);
    setSelectedAddress(index);
  }
  const onConfirmClick = ()=>{
    if(selectedAddress === false){
      setError('Please select an address');
      return;
    }
    setShowAddressCard(false);
  }
  const handleAddNewAddress = ()=>{
    setAddNewAddress(true);
  }
  const crossButtonOnClick = ()=>{
    if(addNewAddress){
      setAddNewAddress(false);
    }
    else{
      setShowAddressCard(false);
    }
  }
  return (
    <div className={styles.detailsModal} onClick={() => setShowAddressCard(false)}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles['head']}>
            <h2>{addNewAddress ? 'Add New Delivery Address' : 'My Billing Address'}</h2>
            <button className={styles.closeButton} onClick={crossButtonOnClick}>X</button>
        </div>
       {!addNewAddress ? isLoading ? <p>Loading...</p> :  <div className='addressDetailsCardContainer'>
            <div className={styles['addressDetailCards']}>
            {
            userAddresses.length > 0 && userAddresses.map((address, index) =>
            <AddressDetailsCard key={index} name={address.fullName}
          
              mobileNumber={address.mobileNumber}  province={address.province}
              city={address.city}  area={address.area} address={address.address} 
              label={address.label} isDefault={address.isDefault}
              index = {index}
              addressId = {address._id}
              handleClickOnAddressCard = {handleClickOnAddressCard}
              isSelected = {selectedAddress === index}
              handleOnClick={handleOnClick}/>)
            } 
            </div>
            <div className={styles['buttons']}>
                <button className={styles.addAddressButton} onClick={handleAddNewAddress}><IoAddOutline size={25}/> Add New Address</button>
                {userAddresses.length > 0 &&<div>
                  <button className={styles.confirmButton} onClick={onConfirmClick}>Confirm</button>
                  <p>{error}</p>
                </div> }
            </div>
       </div> : <AddressFrom setAddNewAddress={setAddNewAddress}/>}

      </div>
    </div>
  );
}

