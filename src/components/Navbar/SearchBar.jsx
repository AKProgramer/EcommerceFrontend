import React, { useState, useRef, useEffect } from 'react';
import styles from './ModuleCSS/SearchBar.module.css';
import { FaSearch } from "react-icons/fa";
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SearchHistoryAndProducts() {
    const [searchParams, setSearchParams] = useSearchParams('');
   let query = searchParams.get('q');
   if(!query)
   {
    query='';
   }
    const [searchTerm, setSearchTerm] = useState(query);
    const [searchHistory, setSearchHistory] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const inputRef = useRef(null);
    const historyRef = useRef(null);
    const navigate = useNavigate();
   
    useEffect(() => {
        // Load search history from local storage on component mount
        const storedHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
        setSearchHistory(storedHistory);

        // Fetch all products from backend
        fetchAllProducts();
    }, []);

    const fetchAllProducts = async () => {
        try {
            const response = await fetch(`${process.env.REACT_APP_BASE_URL}/products`); 
            const products = await response.json();
            setAllProducts(products);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    useEffect(() => {
        if (searchTerm) {
            const filtered = allProducts.filter(product =>
                product.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setFilteredProducts(filtered);
        } else {
            setFilteredProducts([]);
        }
    }, [searchTerm, allProducts]);

    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearch = () => {
        if (searchTerm.trim()) {
            updateSearchHistory(searchTerm.trim());
            navigate(`/search?q=${searchTerm}`);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            handleSearch();
        }
    };

    const updateSearchHistory = (term) => {
        let updatedHistory = [...searchHistory];

        if (!updatedHistory.includes(term)) {
            if (updatedHistory.length >= 10) {
                updatedHistory.shift(); // Remove the oldest item if history is already 10 items long
            }
            updatedHistory.push(term);
        }

        setSearchHistory(updatedHistory);
        localStorage.setItem('searchHistory', JSON.stringify(updatedHistory));
    };

    const clearSearchHistory = () => {
        setSearchHistory([]);
        localStorage.removeItem('searchHistory');
    };

    const handleFocus = (e) => {
        if (!searchTerm) {
            historyRef.current.style.display = 'block';
        }
        if(!e.target.focus){
            historyRef.current.style.display = 'none';
        }
    };

    const handleClickOutside = (event) => {
        if (historyRef.current && !historyRef.current.contains(event.target) && !inputRef.current.contains(event.target)) {
            historyRef.current.style.display = 'none';
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    return (
        <div className={styles['searchContainer']}>
            <div className={styles['searchInputContainer']}>
                <input
                    type="text"
                    placeholder="Search"
                    className={styles['search-input']}
                    ref={inputRef}
                    value={searchTerm}
                    onChange={handleInputChange}
                    onKeyDown={handleKeyDown}
                    onFocus={handleFocus}
                    // onBlur={handleBlur}
                />
                <button onClick={handleSearch} className={styles['search-button']}><FaSearch /></button>
            </div>
            <div className={styles['search-div']} ref={historyRef}>
                {!searchTerm && (
                    <div className={styles['searchHistory']}>
                        <h5>Search History</h5>
                        <h4 onClick={clearSearchHistory}>Clear</h4>
                    </div>
                )}
                {!searchTerm && (
                    <div className={styles['history']}>
                        {searchHistory.map((item, index) => (
                            <p key={index} onClick={()=>{navigate(`/search?q=${item}`); setSearchTerm(`${item}`)}}>{item}</p>
                        ))}
                    </div>
                )}
                {searchTerm && (
                    <div className={styles['products']}>
                        {filteredProducts.map((product, index) => (
                            <p key={index} onClick={()=>{navigate(`/search?q=${product.name}`); setSearchTerm(`${product.name}`)}}>{product.name}</p>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
