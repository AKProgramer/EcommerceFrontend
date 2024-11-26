
import { create } from 'zustand';

const useGlobalModals = create((set) => ({
  // --------------------------------------------------
  // User State
  // --------------------------------------------------
  user: {
    status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
    userName: '',
    userEmail: '',
    image: '',
    role: '',
    userId: '',
    error: null,
  },
  fetchUser: async (userId) => {
    set((state) => ({
      user: { ...state.user, status: 'loading', error: null },
    }));
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/user/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user data');
      }
      const data = await response.json();
      console.log('zustand user', data);

      set((state) => ({
        user: {
          ...state.user,
          userName: data.username,
          userEmail: data.email,
          image: data.image,
          role: data.role,
          userId: data._id,
          status: 'succeeded',
        },
      }));
    } catch (err) {
      set((state) => ({
        user: { ...state.user, error: err.message, status: 'failed' },
      }));
    }
  },
  setUserEmail: (email) =>
    set((state) => ({
      user: { ...state.user, userEmail: email },
    })),

  clearUser: () =>
    set(() => ({
      user: {
        status: 'idle',
        userName: '',
        userEmail: '',
        image: '',
        role: '',
        userId: '',
        error: null,
      },
    })),

  // --------------------------------------------------
  // Cart State
  // --------------------------------------------------
  cart: {
    items: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  fetchCartItems: async (userId) => {
    set((state) => ({
      cart: { ...state.cart, loading: true, error: null },
    }));
    try {
      const response = await fetch(`${process.env.REACT_APP_BASE_URL}/cart/${userId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch cart items');
      }
      const data = await response.json();
      console.log('zustand cart', data);

      set((state) => ({
        cart: {
          ...state.cart,
          items: data.items, // Assuming `data.items` is the array of items
          totalCount: data.items.length,
          loading: false,
        }
      }));
    } catch (err) {
      set((state) => ({
        cart: { ...state.cart, error: err.message, loading: false },
      }));
    }
  },
  clearCart: () =>
    set(() => ({
      cart: {
        items: [],
        totalCount: 0,
        loading: false,
        error: null,
      },
    })),

  // --------------------------------------------------
  // Checkout State
  // --------------------------------------------------
  checkout: {
    addressError: '',
    defaultAddress: '',
    orderSummaryData: {},
    makeOrder: false,
    totalPayment: 0,
    userEmail: '',
  },
  setDefaultAddress: (address) =>
    set((state) => ({
      checkout: { ...state.checkout, defaultAddress: address
        },
    })),
  setCheckoutState: (key, value) =>
    set((state) => ({
      checkout: { ...state.checkout, [key]: value },
    })),
  resetCheckout: () =>
    set(() => ({
      checkout: {
        addressError: '',
        defaultAddress: '',
        orderSummaryData: {},
        makeOrder: false,
        totalPayment: 0,
        userEmail: '',
      },
    })),
    setTotalPayment: (total) =>
    set((state) => ({
      checkout: { ...state.checkout, totalPayment: total },
    })),
    setOrderSummaryData: (data) =>
    set((state) => ({
      checkout: { ...state.checkout, orderSummaryData: data },
    })),
    setAddressError: (error) =>
    set((state) => ({
      checkout: { ...state.checkout, addressError: error },
    })),
    setMakeOrder: (value) =>
    set((state) => ({
      checkout: { ...state.checkout, makeOrder: value },
    })),
}));

export default useGlobalModals;
