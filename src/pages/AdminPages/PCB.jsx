import { useEffect, useState } from 'react';
import Layout from '../../components/Admin/Layout';
import { useLocation } from 'react-router-dom';
import CategoryForm from './CategoryForm';
import BrandForm from './BrandForm';
import ProductForm from './ProductForm';
import Popup from '../../components/Admin/Popup';
import { createPortal } from 'react-dom';
import { TbMoodEmpty } from "react-icons/tb";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
export default function PCB() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [allCategories, setAllCategories] = useState([]);
  const [allBrands, setAllBrands] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [fetchTrigger, setFetchTrigger] = useState(false);
  const location = useLocation();

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        const categoryResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllCategories`);
        if (!categoryResponse.ok) throw new Error('Failed to fetch categories');
        const data = await categoryResponse.json();
        
        const brandResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllBrands`);
        if (!brandResponse.ok) throw new Error('Failed to fetch brands');
        const brandData = await brandResponse.json();
        
        const productResponse = await fetch(`${process.env.REACT_APP_BASE_URL}/getAllProducts`);
        if (!productResponse.ok) throw new Error('Failed to fetch products');
        const productData = await productResponse.json();
        
        setAllProducts(productData);
        setAllBrands(brandData);
        setAllCategories(data);
      } catch (err) {
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [fetchTrigger]);

  const handleDeleteOnClick = (item) => {
    setItem(item);
    setShowPopup(true);
  };

  const handleEditOnClick = (item) => {
    setItem(item);
    toggleForm();
  };

  const renderFormContent = () => {
    switch (true) {
      case location.pathname.includes('/categories'):
        return <CategoryForm item={item} setFetchTrigger={setFetchTrigger}/>;
      case location.pathname.includes('/brands'):
        return <BrandForm item={item} setFetchTrigger={setFetchTrigger}/>;
      case location.pathname.includes('/products'):
        return <ProductForm item={item} allCategories={allCategories} allBrands={allBrands} setFetchTrigger={setFetchTrigger}/>;
      default:
        return null;
    }
  };

  const toggleForm = () => {
    setIsFormOpen((prevState) => !prevState);
  };
  useEffect(() => {
    if (isFormOpen) {
     toggleForm();
    }
    setCurrentPage(getLastPathSegment().charAt(0).toUpperCase() + getLastPathSegment().slice(1));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionStorage.getItem('selectedMenuButton')]);

  const getLastPathSegment = () => {
    const segments = location.pathname.split('/').filter(Boolean);
    return segments[segments.length - 1];
  };

  

  if (loading) {
    return <p className='h-full text-subHeading flex items-center justify-center dark:text-light-primaryText'><AiOutlineLoading3Quarters className='animate-spin' size={40}/></p>;
  }
  return (
    <div>
      <div className="flex justify-between items-center text-subHeading dark:text-light-primaryText pl-4 pr-4">
        <p className="text-xl font-bold">{currentPage}</p>
        <button
          onClick={toggleForm}
          className="font-bold bg-secondary dark:bg-light-sidebarBackground p-2 w-20 rounded-md"
          style={{ color: 'purple' }}
        >
          {isFormOpen ? 'Discard' : 'Add'}
        </button>
      </div>

      {
        (allCategories.length === 0 && currentPage ==='Categories' && !isFormOpen) || (allBrands.length === 0 && currentPage ==='Brands' && !isFormOpen) || (allProducts.length === 0 && currentPage === 'Products' && !isFormOpen) ?   
           <div className='w-full flex justify-center gap-1 items-center text-lg text-light-white  dark:text-light-primaryText'><TbMoodEmpty className='animate-bounce' size={25}/><p className='animate-pulse'> No data available</p></div>
        :
        <>
          <div className='h-[1px] rounded-lg mt-2 mb-2' style={{ backgroundColor: '#ccc' }}></div>
          {isFormOpen ? (
            renderFormContent()
          ) : (
            <div className="lg:grid lg:grid-cols-4 lg:gap-4 lg:p-4 lg:w-full">
              {currentPage === 'Categories' &&
                allCategories.map((item, index) => (
                  <div className="w-full" key={index}>
                    <Layout handleDeleteOnClick={handleDeleteOnClick} currentPage={currentPage} onEdit={handleEditOnClick} item={item} />
                  </div>
                ))
              }
              {currentPage === 'Brands' &&
                allBrands.map((item, index) => (
                  <div className="w-full" key={index}>
                    <Layout handleDeleteOnClick={handleDeleteOnClick} currentPage={currentPage} onEdit={handleEditOnClick} item={item} />
                  </div>
                ))
              }
              {currentPage === 'Products' &&
                allProducts.map((item, index) => (
                  <div className="w-full" key={index}>
                    <Layout handleDeleteOnClick={handleDeleteOnClick} currentPage={currentPage} onEdit={handleEditOnClick} item={item} />
                  </div>
                ))
              }
            </div>
          )}
          {showPopup && createPortal(<Popup showPopup={setShowPopup} item={item} currentPage={currentPage} setFetchTrigger = {setFetchTrigger} />, document.getElementById('portal-root'))}
      </>}
    </div>
  );
}
