import { createSlice } from '@reduxjs/toolkit';

const CART_KEY = 'pizza_app_cart_session';

const loadSavedCart = () => {
  try {
    const data = localStorage.getItem(CART_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
};

const initialState = {
  items: loadSavedCart(),
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addPizzaToCart: (state, action) => {
      const newItem = action.payload; // Contains unique configuration signature
      const existing = state.items.find((item) => item.configHash === newItem.configHash);
      if (existing) {
        existing.quantity += newItem.quantity;
      } else {
        state.items.push(newItem);
      }
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(state.items));
      } catch (err) {
        console.error('Storage error:', err);
      }
    },
    updateCartItemQuantity: (state, action) => {
      const { configHash, quantity } = action.payload;
      const target = state.items.find((item) => item.configHash === configHash);
      if (target) {
        if (quantity <= 0) {
          state.items = state.items.filter((item) => item.configHash !== configHash);
        } else {
          target.quantity = quantity;
        }
      }
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(state.items));
      } catch (err) {
        console.error('Storage error:', err);
      }
    },
    removeFromCart: (state, action) => {
      const configHash = action.payload;
      state.items = state.items.filter((item) => item.configHash !== configHash);
      try {
        localStorage.setItem(CART_KEY, JSON.stringify(state.items));
      } catch (err) {
        console.error('Storage error:', err);
      }
    },
    clearCart: (state) => {
      state.items = [];
      try {
        localStorage.removeItem(CART_KEY);
      } catch (err) {
        console.error('Storage error:', err);
      }
    },
  },
});

export const {
  addPizzaToCart,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;