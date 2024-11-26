import React from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../components/Navbar/Navbar';
import SimpleSlider from '../../components/Slider/SimpleSlider';
import Products from '../../components/ProductSlider/Products';
import Footer from '../../components/Footer/Footer';
import ShopByCategories from '../../components/CategoryList/ShopByCategories';
import { useState, useEffect } from 'react';
import SpinnerFullPage from '../../components/Spinner/SpinnerFullPage';
import { useAuth } from '../../services';
import { useQuery } from '@tanstack/react-query'; // Import useQuery from Tanstack Query

export default function HomePage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const urlParams = new URLSearchParams(window.location.search);
  const token = urlParams.get('token');
  const userId = urlParams.get('userId');
  
  useAuth();

  // Use the new query format for fetching data
  const { data: newArrivals, error: newArrivalsError, isLoading: isNewArrivalsLoading } = useQuery({
    queryKey: ['newArrivals'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/newArrivals`);
      if (!res.ok) throw new Error('Error fetching new arrivals');
      return res.json();
    }
  });

  const { data: bestSellers, error: bestSellersError, isLoading: isBestSellersLoading } = useQuery({
    queryKey: ['bestSellers'],
    queryFn: async () => {
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/bestSeller`);
      if (!res.ok) throw new Error('Error fetching best sellers');
      return res.json();
    }
  });

  // Check for loading or error states
  const isLoading = isNewArrivalsLoading || isBestSellersLoading;
  const fetchError = newArrivalsError || bestSellersError;

  useEffect(() => {
    if (token && userId) {
      sessionStorage.setItem('token', token);
      sessionStorage.setItem('userId', userId);
      window.history.replaceState({}, document.title, "/"); // Remove the token and userId from the URL
    } else {
      const storedToken = sessionStorage.getItem('token');
      const storedUserId = sessionStorage.getItem('userId');

      if (!storedToken || !storedUserId) {
        navigate('/login');
      }
    }

    setLoading(false);
  }, [navigate, token, userId]);

  if (isLoading) {
    return <SpinnerFullPage />;
  }

  if (fetchError) {
    return <p>{fetchError.message}</p>;
  }

  return (
    <div>
      <Navbar />
      <SimpleSlider />
      <ShopByCategories />
      <Products heading={"Best Sellers"} products={bestSellers} />
      <Products heading={"New Arrivals"} products={newArrivals} />
      <Footer />
    </div>
  );
}
