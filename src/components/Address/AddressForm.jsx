import React, { useEffect } from 'react'
import { useReducer } from 'react';
import styles from './ModuleCSS/AddressFrom.module.css';
import { useState } from 'react';
const initialState = {
  fullName: '',
  mobileNumber: '',
  province: '',
  city: '',
  area: '',
  address: '',
  landmark: '',
  label: 'Home',
  isDefault: false,
  errors: {
    fullName: '',
    mobileNumber: '',
    province: '',
    city: '',
    area: '',
    address: '',
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_ERROR':
      return {
        ...state,
        errors: { ...state.errors, [action.field]: action.error },
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        errors: initialState.errors,
      };
    default:
      throw new Error('Unknown action type');
  }
}

export default function AddressForm({setAddNewAddress}) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [isActive, setIsActive] = useState('Home');
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    dispatch({ type: 'SET_FIELD', field: name, value: fieldValue });
  };
  useEffect(()=>{
    validate();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[state.fullName, state.mobileNumber, state.province, state.city, state.area, state.address]);
  const validate = () => {
    let valid = true;
    const errors = {};

    if (!state.fullName) {
      errors.fullName = "You can't leave this empty.";
      valid = false;
    }
    else if(state.fullName.length < 3 || state.fullName.length > 50){
      errors.fullName = 'The name length should be 3 - 50 characters';
      valid = false;
    }
    if (!state.mobileNumber || !/^\d{11}$/.test(state.mobileNumber)) {
      errors.mobileNumber = 'Please provide a valid phone number.';
      valid = false;
    }
    if (!state.province) {
      errors.province = "You can't leave this empty.";
      valid = false;
    }
    if (!state.city) {
      errors.city = "You can't leave this empty.";
      valid = false;
    }
    if (!state.area) {
      errors.area = "You can't leave this empty.";
      valid = false;
    }
    if (!state.address) {
      errors.address = "You can't leave this empty.";
      valid = false;
    }

    dispatch({ type: 'SET_ERROR', field: 'fullName', error: errors.fullName });
    dispatch({
      type: 'SET_ERROR',
      field: 'mobileNumber',
      error: errors.mobileNumber,
    });
    dispatch({ type: 'SET_ERROR', field: 'province', error: errors.province });
    dispatch({ type: 'SET_ERROR', field: 'city', error: errors.city });
    dispatch({ type: 'SET_ERROR', field: 'area', error: errors.area });
    dispatch({ type: 'SET_ERROR', field: 'address', error: errors.address });

    return valid;
  };
  const saveOnClick= async()=>{
        if(validate()){
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/address/create`,{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                userId : sessionStorage.getItem('userId'),
                fullName: state.fullName,
                mobileNumber: state.mobileNumber,
                province: state.province,
                city: state.city,
                area: state.area,
                address: state.address,
                landmark: state.landmark,
                label: state.label,
                isDefault: state.isDefault,
              
              }),
            });
            if(res.status === 201){
              setAddNewAddress(false);
              }
        }
    }

  const handleLabelBtnClick = (val) => {
    dispatch({ type: 'SET_FIELD', field: 'label', value: val });
    setIsActive(val);
  };
  return (
    <div className={styles['formContainer']}>
      <div className={styles.form}>
          <div className='left'>
              <div className={styles.formGroup}>
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={state.fullName}
                  onChange={handleChange}
                  placeholder='Input full name'
                />
                {state.errors.fullName && <p className={styles.error}>{state.errors.fullName}</p>}
              </div>
              <div className={styles.formGroup}>
                  <label>Mobile Number</label>
                  <input
                    type="text"
                    name="mobileNumber"
                    value={state.mobileNumber}
                    onChange={handleChange}
                    placeholder='Input moblie number'
                  />
                  {state.errors.mobileNumber && <p className={styles.error}>{state.errors.mobileNumber}</p>}
              </div>
              <div className={styles.formGroup}>
                <label>Province</label>
                <select name="province" value={state.province} onChange={handleChange}>
                  <option value="">Please choose your province</option>
                  <option value="province1">Province 1</option>
                  <option value="province2">Province 2</option>
                </select>
                
                {state.errors.province && <p className={styles.error}>{state.errors.province}</p>}
          </div>
          <div className={styles.formGroup}>
            <label>City</label>
            <select name="city" value={state.city} onChange={handleChange}>
              <option value="">Please choose your city/municipality</option>
              <option value="city1">City 1</option>
              <option value="city2">City 2</option>
            </select>
            {state.errors.city && <p className={styles.error}>{state.errors.city}</p>}
          </div>

          <div className={styles.formGroup}>
            <label>Area</label>
            <select name="area" value={state.area} onChange={handleChange}>
              <option value="">Please choose your area</option>
              <option value="area1">Area 1</option>
              <option value="area2">Area 2</option>
            </select>
            {state.errors.area && <p className={styles.error}>{state.errors.area}</p>}
          </div>

          </div>
          <div className='right'>
              <div className={styles.formGroup}>
                <label>Address</label>
                <input
                  type="text"
                  name="address"
                  value={state.address}
                  onChange={handleChange}
                  placeholder='House no. / building / street / area'
                />
                {state.errors.address && <p className={styles.error}>{state.errors.address}</p>}
              </div>

              <div className={styles.formGroup}>
                <label>Landmark (Optional)</label>
                <input
                  type="text"
                  name="landmark"
                  value={state.landmark}
                  placeholder='E.g. beside train station'
                  onChange={handleChange}
                />
              </div>

              <div className={styles.addressBtn}>
                    <p className={styles['title']}>Select a label for effective delivery:</p>
                    <div>
                        <button
                          type="button"
                          onClick={()=>handleLabelBtnClick('Home')}
                          className={isActive==='Home' ? styles.active : ''}
                        >
                          Home
                        </button>
                        <button
                          type="button"
                          onClick={() => handleLabelBtnClick('Office')}
                          className={isActive==='Office' ? styles.active : ''}
                        >
                          Office
                        </button>
                    </div>
              </div>

              <div className={styles.optional}>
                <p className={styles['title']}>Default Address (Optional)</p>
                    <div className={styles['checkboxs']}>
                        <div className={styles.checkboxGroup}>
                              <input
                                type="checkbox"
                                name="isDefault"
                                checked={state.isDefault}
                                onChange={handleChange}
                              />
                              <p>Default delivery address</p>
                        </div>
                        <div className={styles.defaultSettings}>
                          <p>Your existing default address setting will be replaced if you<br/> make some changes here.</p>
                        </div>
                    </div>
              </div>
              <div className={styles.saveBtn}>
                  <button type="submit" className={styles.submitButton} onClick={saveOnClick}>Save</button>
              </div>
          </div>
      </div>
    </div>
  );
}