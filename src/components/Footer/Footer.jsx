import React from 'react'
import styles from './ModuleCSS/Footer.module.css'
import { FaFacebook } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { FaYoutube } from "react-icons/fa";

function Footer() {
  return (
    <footer className={styles.footerContainer}>
    <div className={styles.main}>
        <div className={styles.kfc}>
            <h1>FAST Mart</h1>
        </div>
        <div className={styles.icons}>
            <div className={styles.icon}>
                <FaFacebook className={styles['social-icon']} style={{color : '#1877F2'}}/>
            </div>
            <div className={styles.icon}>
                <IoLogoInstagram className={styles['social-icon']} style={{color : '#E4405F'}}/>
            </div>
            <div className={styles.icon}>
                <FaYoutube className={styles['social-icon']} style={{color : '#FF0000'}}/>
            </div>
        </div>  
    </div>      
    <div className={styles['below-main']}>
        <div className={styles['foot-left']}>
            <a href="https://github.com/AKProgramer"> About Us</a>
            <a href="https://github.com/AKProgramer"> Mitao Book</a>
            <a href="https://github.com/AKProgramer"> Mitao Book - Scholarship</a>
            <a href="https://github.com/AKProgramer"> Privacy Policy</a>
            <a href="https://github.com/AKProgramer"> Careers</a>
        </div>
        <div className={styles['foot-middle']}>
            <a href="https://github.com/AKProgramer"> Contact Us</a>
            <a href="https://github.com/AKProgramer"> Store Locator</a>
            <a href="https://github.com/AKProgramer"> Track Order</a>
           
        </div>
        <div className={styles['foot-middle-right']}>
            <a href="/">Term & Conditions</a>
        </div>
        <div className={styles['app-links']}>
            <img src="/apple.png" alt=""/>
            <img src="/play.png" alt=""/>
        </div>
    </div>
    <div className={styles.end}>
        <div className={styles['end-left']}>
            <h3>2024 FAST Mart. All rights reserved</h3>    
        </div>
        <div className={styles['end-right']}>
            <h2>Powered By</h2>
            <a href="/">AliHassan Technology Solutions</a>
        </div>
    </div>
    </footer>
  )
}
export default Footer;
