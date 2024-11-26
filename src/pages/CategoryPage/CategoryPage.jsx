import React from 'react'
import Footer from '../../components/Footer/Footer'
import Navbar from '../../components/Navbar/Navbar'
import ProductList from '../../components/ProductList/ProductList'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import { fetchProductsByCategory, useAuth } from '../../services'
export default function CategoryPage() {
  
  const [products, setProducts] = useState([]);
  const categoryName = useParams().categoryName;
  const query = new URLSearchParams(window.location.search).get('q');
  const navigate = useNavigate();
  useAuth();
  useEffect(() => {
    const storedToken = sessionStorage.getItem('token');
    const storedUserId = sessionStorage.getItem('userId');
    if (!storedToken || !storedUserId) {
      navigate('/login');
    }
    }, [navigate]);
    useEffect(() => {
      const fetchCategoryProducts = async () => {
        const fetchedProducts = await fetchProductsByCategory(categoryName, query);
        setProducts(fetchedProducts);
      };
  
      fetchCategoryProducts();
    }, [query, categoryName]);
  return (
    <div>
        <Navbar />
        <ProductList  products={products} setProducts={setProducts} url={categoryName} message={`${categoryName} Unavailable`}/>
        <Footer/>
    </div>
  )
}
