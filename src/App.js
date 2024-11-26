import React from 'react'
import LoginSignup from './pages/LoginSignupPage/LoginSignup'
import HomePage from './pages/HomePage/HomePage'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import CategoryPage from './pages/CategoryPage/CategoryPage'
import CheckoutPage from './pages/CheckoutPage/CheckoutPage'
import SearchPage from './pages/SearchPage/SearchPage'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DashboardPage from './pages/AdminPages/DashboardPage/DashboardPage'
import AdminLayout from './pages/AdminPages/AdminLayout'
import PCB from './pages/AdminPages/PCB'
import Users from './pages/AdminPages/Users'
import Orders from './pages/AdminPages/Orders'
import ErrorPage from './pages/ErrorPage'
export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/login' element={<LoginSignup/>}/>
        <Route path='/:categoryName' element={<CategoryPage />}/>
        <Route path='/search' element={<SearchPage />}/>
        <Route path='/checkout' element={<CheckoutPage />}/>
        <Route path='/order/success/:orderId' element={<h1>Order Placed Successfully</h1>}/>
         <Route path='*' element={<ErrorPage/>}/>
        <Route path='/admin' element={<AdminLayout/>}>
            <Route path='products' element={<PCB/>}/>
            <Route path='categories' element={<PCB/>}/>
            <Route path='brands' element={<PCB/>}/>
            <Route path='users' element={<Users/>}/>
            <Route path='orders' element={<Orders/>}/>

            <Route index element={<DashboardPage/>}/>
           
        </Route>
      </Routes>
      <ToastContainer />
    </BrowserRouter>
   

  )
}
