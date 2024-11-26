import React, { useEffect, useState } from 'react'
export default function PriceRange({products, setProducts}) {
    const [priceRanges, setPriceRanges] = useState([]);
    useEffect(()=>{
        // Determine minimum and maximum prices
        const minPrice = Math.min(...products.map(product => product.price));
        const maxPrice = Math.max(...products.map(product => product.price));
    
        // Number of ranges desired
        const numberOfRanges = 4;
        // Calculate range interval
        const rangeInterval = Math.ceil((maxPrice - minPrice) / numberOfRanges);
    
        // Function to create dynamic price ranges
        const createPriceRanges = (min, max, interval) => {
            const ranges = [];
            for (let i = min; i < max; i += interval) {
                ranges.push({ min: i, max: i + interval });
            }
            setPriceRanges(ranges);
        };
        createPriceRanges(minPrice, maxPrice, rangeInterval);
    },[])
    
    const handlePriceRangeOnClick = (event) => {
        const priceRange = event.target.innerText.split(' - ');
        const minPrice = parseInt(priceRange[0].split(' ')[1]);
        const maxPrice = parseInt(priceRange[1].split(' ')[1]);
        const filteredProducts = products.filter(product => product.price >= minPrice && product.price <= maxPrice);
        setProducts(filteredProducts);
    }
    // Create price ranges
   

    return (
        <ul>
            {priceRanges.map((range, index) => {
                return <li  key={index} onClick={handlePriceRangeOnClick}>Rs {range.min} - Rs {range.max}</li>
            })}
        </ul>
    );
}
