import React from 'react'
import styles from './ModuleCSS/AddressDetailsCard.module.css'
import { MdDelete } from "react-icons/md";
export default function AddressDetailsCard({handleOnClick,name, mobileNumber, province,city, area, address, label, isDefault, isSelected,handleClickOnAddressCard, index, addressId}) {
    
    return (
    <div className={`${styles.storedAddress} ${isSelected ? styles.selected : ''}`} onClick={()=>handleClickOnAddressCard(index)}>
        <div className={styles['address']}>
            <div>
                <p>{name}</p> 
                <p>{mobileNumber}</p>
                <p>{`${province},${city} - ${area},${address}, ${city}`}</p>
            </div>
            <div>
                <button onClick={()=>handleOnClick(addressId)}><MdDelete className={styles.deleteIcon}/></button>
            </div>
        </div>
        <div className={styles['officeOrDefault']}>
            <div>
                <p>{label}</p>
            </div>
           {isDefault && <div>
                <p>DEFAULT SHIPPING ADDRESS</p>
            </div>}
        </div>
</div>
  )
}
