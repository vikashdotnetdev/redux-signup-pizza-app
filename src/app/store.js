import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user/userSlice';
import pizzaReducer from '../features/pizza/pizzaSlice';
import cartReducer from '../features/cart/cartSlice';
import uiReducer from '../features/ui/uiSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    pizza: pizzaReducer,
    cart: cartReducer,
    ui: uiReducer,
  },
});

export default store;