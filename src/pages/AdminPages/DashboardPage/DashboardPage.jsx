
import OverviewPanel from '../../../components/Admin/OverviewPanel/OverviewPanel';
import SalesOverviewChart from '../../../components/Admin/SalesOverview/SalesOverviewChart';
import OrderStatusChart from '../../../components/Admin/OrderStatusChart';

import TopProductsScroller from '../../../components/Admin/TopProductsScroller';
import CustomerReviewChart from '../../../components/Admin/CustomerReviewChart';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
export default function DashboardPage() {
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalCustomers, setTotalCustomers] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);  
  const navigate = useNavigate();
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedToken || !storedUserId) {
      navigate('/login');
    }
    }, [navigate]);
  useEffect(()=>{
    async function fetchTotalOrders(){
      const res =  await fetch(`${process.env.REACT_APP_BASE_URL}/totalOrders`);
      const data = await res.json();
     
      setTotalOrders(data.totalOrders);
    }
    async function fetchTotalSales(){
      const res =  await fetch(`${process.env.REACT_APP_BASE_URL}/totalSales`);
      const data = await res.json();
    
      setTotalSales(data.totalSales);
    }
    async function fetchTotalCustomers(){
      const res =  await fetch(`${process.env.REACT_APP_BASE_URL}/totalUserCount`);
      const data = await res.json();
    
      setTotalCustomers(data.count);
    }
    async function fetchTotalProducts(){
      const res =  await fetch(`${process.env.REACT_APP_BASE_URL}/totalProducts`);
      const data = await res.json();
     
      setTotalProducts(data.count);
    }
    async function fetchTotalCategories(){
      const res =  await fetch(`${process.env.REACT_APP_BASE_URL}/totalCategories`);
      const data = await res.json();

      setTotalCategories(data.count);
    }
    fetchTotalCategories();
    fetchTotalProducts();
    fetchTotalCustomers();
    fetchTotalSales();
    fetchTotalOrders();
  },[]);
  return (
 
      <div>
          <OverviewPanel totalOrders = {totalOrders} totalSales = {totalSales} totalCustomers = {totalCustomers} totalProducts = {totalProducts} totalCategories = {totalCategories}/>
          <div className='lg:flex lg:mt-5'>
          <SalesOverviewChart />
          <OrderStatusChart/>
          </div>
          <div className='lg:flex lg:mt-5'>
          <TopProductsScroller/>
          <CustomerReviewChart/>
          </div>
      </div>
  );
}
