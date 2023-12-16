import { configureStore } from '@reduxjs/toolkit';
import user from './slice/userSlice';
import cart from './slice/cartSlice';

const store = configureStore({
  reducer: {
    user,
    cart,
  },
});

export default store;
