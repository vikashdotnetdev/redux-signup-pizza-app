import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeTab: 'menu', // 'menu' | 'signup' | 'checkout'
  isCartOpen: false,
  notification: null, // { type: 'success' | 'error' | 'info', message: string }
  isLoading: false,
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setActiveTab: (state, action) => {
      state.activeTab = action.payload;
    },
    toggleCartDrawer: (state) => {
      state.isCartOpen = !state.isCartOpen;
    },
    setCartDrawerOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
    showNotification: (state, action) => {
      state.notification = {
        type: action.payload.type || 'info',
        message: action.payload.message,
      };
    },
    clearNotification: (state) => {
      state.notification = null;
    },
    setGlobalLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const {
  setActiveTab,
  toggleCartDrawer,
  setCartDrawerOpen,
  showNotification,
  clearNotification,
  setGlobalLoading,
} = uiSlice.actions;

export default uiSlice.reducer;