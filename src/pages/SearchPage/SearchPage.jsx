import React from 'react';
import Navbar from '../../components/Navbar/Navbar';
import ProductList from '../../components/ProductList/ProductList';
import Footer from '../../components/Footer/Footer';
import { useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

export default function SearchPage() {
  const location = useLocation();

  // Extract the search query from the URL
  const query = new URLSearchParams(location.search).get('q');

  // Use useQuery to fetch products based on the query
  const { data: products, error, isLoading } = useQuery({
    queryKey: ['searchProducts', query],  
    queryFn: async () => {
      if (!query) return [];  

      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products?q=${query}`);
      if (!response.ok) throw new Error('Error fetching products');
      return response.json();
    },
    enabled: !!query,  
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <Navbar />
      <ProductList
        products={products}
        url={"Search Results"}
        message={products.length === 0 ? "Search Not Found" : ""}
      />
      <Footer />
    </div>
  );
}
