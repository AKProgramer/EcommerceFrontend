import React, { useState, useEffect } from 'react';
import { FaImage } from 'react-icons/fa6';
import { IoAdd } from 'react-icons/io5';
import { IoClose } from 'react-icons/io5'; // Import the close icon
import CustomDropdown from '../../components/Admin/CustomDropdown';
import { toast } from 'react-toastify';
export default function ProductForm({ item, allCategories, allBrands, setFetchTrigger }) {
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({}); // To store error messages
  const [name, setName] = useState('');
  const [price, setPrice] = useState(100);
  const [stock, setStock] = useState(1);
  const [description, setDescription] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Select Category');
  const [selectedBrand, setSelectedBrand] = useState('Select Brand');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };
  
  // To remove images
  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };
  // Validate name field
  useEffect(() => {
    if (!name.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, name: 'Product name is required' }));
    } else {
      setErrors((prevErrors) => {
        const { name, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [name]);

  // Validate price field
  useEffect(() => {
    if (!price || price <= 0) {
      setErrors((prevErrors) => ({ ...prevErrors, price: 'Price must be greater than 0' }));
    } else {
      setErrors((prevErrors) => {
        const { price, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [price]);

  useEffect(() => {
    if (!stock || stock <= 1) {
      setErrors((prevErrors) => ({ ...prevErrors, stock: 'Stock must be greater than 1' }));
    } else {
      setErrors((prevErrors) => {
        const { stock, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [stock]);

  // Validate description field
  useEffect(() => {
    if (!description.trim()) {
      setErrors((prevErrors) => ({ ...prevErrors, description: 'Description is required' }));
    } else {
      setErrors((prevErrors) => {
        const { description, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [description]);

  // Validate category field
  useEffect(() => {
    if (selectedCategory.includes('Select')) {
      setErrors((prevErrors) => ({ ...prevErrors, category: 'Category is required' }));
    } else {
      setErrors((prevErrors) => {
        const { category, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [selectedCategory]);

  // Validate brand field
  useEffect(() => {
    if (selectedBrand.includes('Select')) {
      setErrors((prevErrors) => ({ ...prevErrors, brand: 'Brand is required' }));
    } else {
      setErrors((prevErrors) => {
        const { brand, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [selectedBrand]);

  // Validate images field
  useEffect(() => {
    if (images.length === 0) {
      setErrors((prevErrors) => ({ ...prevErrors, images: 'At least one image is required' }));
    } else {
      setErrors((prevErrors) => {
        const { images, ...rest } = prevErrors;
        return rest;
      });
    }
  }, [images]);
  const resetForm = () => {
    setName('');
    setDescription('');
    setPrice(100);
    setStock(1);
    setSelectedCategory('Select Category');
    setSelectedBrand('Select Brand');
    setImages([]);
    toast.info('Form reset');
  }
  const handleSubmit = () => {
      if(Object.keys(errors).length > 0) {
        toast.error('Please fill in all required fields');
        return;
      }
      const formData = new FormData();
      formData.append('name', name);
      formData.append('price', price);
      formData.append('description', description);
      formData.append('category', selectedCategory);
      formData.append('brand', selectedBrand);
      formData.append('stock', 1);
      images.forEach((image, index) => {
        formData.append('images', image);
      });
      

      // Send the form data to the server
      fetch(`${process.env.REACT_APP_BASE_URL}/product/create`, {
        method: 'POST',
        body: formData,
      })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        toast.success('Product added successfully');
        setFetchTrigger(prev => !prev);
        resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <div className='flex flex-col items-center p-4'>
      <h2 className='text-subHeading dark:text-light-primaryText text-xl mb-2'>Product Form</h2>

      <div className="w-full max-w-md">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={`placeholder:italic placeholder:text-slate-400
            block bg-secondary dark:bg-light-sidebarBackground w-full rounded-md p-3 mb-4 text-subHeading dark:text-light-primaryText
            focus:outline-none focus:ring-blue-600 focus:ring-1 mt-3
            sm:text-sm ${errors.name ? 'border-red-500' : ''}`}
          required
          placeholder='Enter Product Name'
        />
        {errors.name && <p className='text-light-danger text-sm'>{errors.name}</p>}

        <input
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className={`placeholder:italic placeholder:text-slate-400
            block bg-secondary dark:bg-light-sidebarBackground w-full rounded-md p-3 mb-4 text-subHeading dark:text-light-primaryText
            focus:outline-none focus:ring-blue-600 focus:ring-1 mt-3
            sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
          min="100" step="1" required
          placeholder='Enter Price'
        />
        {errors.price && <p className='text-light-danger text-sm'>{errors.price}</p>}
        <input
          type="number"
          value={stock}
          onChange={(e) => setStock(e.target.value)}
          className={`placeholder:italic placeholder:text-slate-400
            block bg-secondary dark:bg-light-sidebarBackground w-full rounded-md p-3 mb-4 text-subHeading dark:text-light-primaryText
            focus:outline-none focus:ring-blue-600 focus:ring-1 mt-3
            sm:text-sm ${errors.price ? 'border-red-500' : ''}`}
          min="1" step="1" required
          placeholder='Enter Stock'
        />
        {errors.price && <p className='text-light-danger text-sm'>{errors.stock}</p>}

        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`placeholder:italic
            block bg-secondary dark:bg-light-sidebarBackground w-full rounded-md py-3 pl-3 mb-4
            focus:outline-none focus:ring-blue-600 focus:ring-1 mt-3
            sm:text-sm text-subHeading dark:text-light-primaryText ${errors.description ? 'border-red-500' : ''}`}
          required
          placeholder='Enter Description'
        ></textarea>
        {errors.description && <p className='text-light-danger text-sm'>{errors.description}</p>}

        <CustomDropdown 
          
          dropdownOptions={allCategories} 
          selected={selectedCategory}
          setSelected={setSelectedCategory}
        />
        {errors.category && <p className='text-light-danger text-sm'>{errors.category}</p>}

        <CustomDropdown 
          
          dropdownOptions={allBrands} 
          selected={selectedBrand}
          setSelected = {setSelectedBrand}
        />
        {errors.brand && <p className='text-light-danger text-sm'>{errors.brand}</p>}

        <div className='flex flex-col items-center mt-3'>
          <div className='flex gap-2 overflow-x-auto w-full'>
            {images.map((src, index) => (
              <div key={index} className='relative w-40 h-40 rounded-lg bg-secondary dark:bg-light-sidebarBackground flex justify-center items-center'>
                <img src={URL.createObjectURL(src)} alt={`Selected ${index}`} className="w-full h-full object-cover rounded-lg" />
                <button
                  type="button"
                  onClick={() => handleImageRemove(index)}
                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1"
                >
                  <IoClose size={20} />
                </button>
              </div>
            ))}
          </div>
          <div className='p-3 mt-3 rounded-lg bg-secondary dark:bg-light-sidebarBackground flex justify-center  items-center relative cursor-pointer mb-4'>
            <div className='flex items-center gap-3 text-sm justify-between cursor-pointer'>
              <FaImage className='text-subHeading dark:text-light-primaryText' size={20} />
              <p className='text-subHeading dark:text-light-primaryText'>Select Image</p>
            </div>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              multiple
            />
          </div>
          {errors.images && <p className='text-light-danger text-sm'>{errors.images}</p>}
        </div>

        <div className='flex justify-evenly mt-3'>
          <button 
            onClick={handleSubmit}
            className='bg-secondary text-subHeading dark:bg-light-sidebarBackground dark:text-light-primaryText p-2 rounded-md w-1/3 ml-2 flex items-center justify-center gap-3 font-bold'
          >
            <IoAdd size={25} /> Add
          </button>
          <button 
            className='bg-light-danger text-subHeading p-2 rounded-md w-1/3 ml-2' 
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}
