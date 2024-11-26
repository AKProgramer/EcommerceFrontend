import React from 'react'
import { FaSearch } from "react-icons/fa";
import styles from './ModuleCSS/MessageBox.module.css'
export default function MessageBox({message}) {
  return (
    <div className={styles.messagebox}>
        <h1>{message}</h1>
        { message==="Search Not Found" ? <p>We 're sorry. We cannot find any matches for your search term.</p>
         : <p>We're sorry. There are no items available in this category at the moment. Please check back later.</p>}
        <FaSearch style={{fontSize : '50px', color : '#4481eb'}}/>
    </div>
  )
}
