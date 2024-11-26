import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
// Fetch products by category
export const fetchProductsByCategory = async (categoryName, query) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/product/category/${categoryName}`);
      const data = await res.json();
  
      if (query) {
        return data.filter(product => product.name.toLowerCase().includes(query.toLowerCase()));
      }
  
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  };
  export const useAuth = () => {
    const navigate = useNavigate();
  
    useEffect(() => {
      const storedToken = sessionStorage.getItem('token');
      const storedUserId = sessionStorage.getItem('userId');
      if (!storedToken || !storedUserId) {
        navigate('/login');
      }
    }, [navigate]);
  };
// Function to create an order
export const createOrder = async (paymentMethod, defaultAddress, userEmail, totalPayment, orderSummaryData, spm) => {
    try {
      const addressId = defaultAddress._id;
      const email = userEmail;
      const totalCost = totalPayment;
      const status = "PENDING";
      
      let items = [];
      if (spm === 'proceed_to_checkout') {
        items = orderSummaryData.items.map(item => ({
          productId: item.productId._id,
          quantity: item.quantity
        }));
      } else {
        items = [{
          productId: orderSummaryData._id,
          quantity: orderSummaryData.quantity
        }];
      }
  
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/order/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          addressId,
          email,
          totalCost,
          status,
          items,
          paymentMethod
        })
      });
      
      const data = await res.json();
      return data.order._id;
    } catch (error) {
      console.error("Error creating order:", error);
    }
  };


const fetchData = async (url) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

// Custom hooks to fetch data for new arrivals and best sellers
export const useNewArrivals = () => {
  return useQuery(['newArrivals'], () => fetchData(`${process.env.REACT_APP_BASE_URL}/newArrivals`));
};

export const useBestSellers = () => {
  return useQuery(['bestSellers'], () => fetchData(`${process.env.REACT_APP_BASE_URL}/bestSeller`));
};
