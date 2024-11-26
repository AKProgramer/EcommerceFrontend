import Card from '../ProductCard/Card'
import styles from './ModuleCSS/ProductList.module.css'
import { useNavigate, useLocation } from 'react-router-dom';
import PriceRange from '../Filter/PriceRange';
import MessageBox from '../Toastify/MessageBox';
export default function SearchedProducts({ products, setProducts,url,message}) {
    // const [products, setProducts] = useState([]);
    // const categoryName = useParams().categoryName;
    const uniqueCategories = [...new Set(products && products.map(product => product.category.name))];
    //specfic for search
    const location = useLocation();
    const query = new URLSearchParams(location.search).get('q');
    
    const navigate = useNavigate();
    function handleHomeOnClick(){
      navigate('/');
    }
    const handleOnChange = (event) => {
        const sortType = event.target.value;
        let sortedArray = [...products];
        if (sortType === 'Price Low to High') {
            sortedArray.sort((a, b) => a.price - b.price);
        } else if (sortType === 'Price High to Low') {
            sortedArray.sort((a, b) => b.price - a.price);
        }
        else if(sortType === 'Newest Arrivals'){
            sortedArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        }

        setProducts(sortedArray);
    };
    const categoryOnClick = (category) => {
        if(query)
        {
            navigate(`/${category}?q=${query}`);
            return;
        }
        navigate(`/${category}`);
    };
  return (
    <div className={styles['productGridContainer']}>
          <div className={styles['upper']}>
              <div className={styles['url']}>
                 
                    <ul>
                        <li onClick={handleHomeOnClick}>Home</li>
                        <span>/</span>
                        <li  style={{color : '#4481eb'}}>{url}</li>
                  </ul>
              </div>
              <div className={styles['line-div']}>
                  <div className={styles.line}></div>
              </div>
              <div className={styles['sort-view-container']}>
                <p>{products && products.length} items found for <strong>{`"${!query ? url : query}"`}</strong></p>
                <div className={styles['sort-view']}>
                    <div className={styles['sort-by']}>
                        <label htmlFor="sort-options">Sort By:</label>
                        <select className={styles['sort-options']} onChange={handleOnChange}>
                            <option>Best Match</option>
                            <option>Newest Arrivals</option>
                            <option >Price Low to High</option>
                            <option >Price High to Low</option>
                        </select>
                    </div>
                </div>
              </div>
          </div>
          {products && products.length ? <div className={styles['bottom']}>
            <div className = {styles['filterContainer']}>
                <div className={styles['filter']}>
                    <h1>Filter</h1>
                    <div className={styles['filter-options']}>
                        <h3>Category</h3>
                        <ul>
                            { uniqueCategories && uniqueCategories.map((category, index)=>(
                                <li key={index} onClick={()=>categoryOnClick(category)}>{category}</li>
                            ))}
                        </ul>
                    </div>
                    <div className={styles['filter-options']}>
                        <h3>Brand</h3>
                        <ul>
                            <li><input type='checkbox'/>Philips</li>
                            <li><input type='checkbox'/>LG</li>
                            <li><input type='checkbox'/>Samsung</li>
                            <li><input type='checkbox'/>Apple</li>
                        </ul>
                    </div>
                    <div className={styles['filter-options']}>
                        <h3>Price</h3>
                        <PriceRange products={products} setProducts={setProducts}/>
                    </div>
                </div>
            </div>
               <div className={styles['gridContainer']}>
                    {products && products.map((product, index) => (
                        <Card key={index} price={product.price} name={product.name}
                           imageUrl={`${process.env.REACT_APP_BASE_URL}${product.images[0].replace(/\\/g, '/').replace('uploads', '')}`}
                            description={product.description} productImages={product.images}
                             categoryName={product.category.name} productId={product._id}
                        />
                    ))}
                </div> : 
          </div> : <MessageBox message={message}/>}
    </div>
  )
}
