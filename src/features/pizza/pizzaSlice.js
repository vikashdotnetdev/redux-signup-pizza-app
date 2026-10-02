import { createSlice } from '@reduxjs/toolkit';
import { SIZES, CRUSTS, TOPPINGS } from './pizzaConstants';

const calculateUnitPrice = (config) => {
  const sizeObj = SIZES[config.size] || SIZES.regular;
  const crustObj = CRUSTS.find((c) => c.id === config.crust) || CRUSTS[0];
  
  const toppingsTotal = config.selectedToppings.reduce((acc, toppingId) => {
    const item = TOPPINGS.find((t) => t.id === toppingId);
    return acc + (item ? item.price : 0);
  }, 0);

  return Math.round((sizeObj.basePrice + crustObj.extraPrice + toppingsTotal));
};

const initialState = {
  customizingPizza: null, // Preset reference
  currentConfig: {
    size: 'regular',
    crust: 'classic-hand-tossed',
    selectedToppings: [],
    quantity: 1,
    unitPrice: 199,
  },
};

const pizzaSlice = createSlice({
  name: 'pizza',
  initialState,
  reducers: {
    initCustomizer: (state, action) => {
      const preset = action.payload;
      state.customizingPizza = preset;
      state.currentConfig = {
        size: preset.defaultSize || 'regular',
        crust: preset.defaultCrust || 'classic-hand-tossed',
        selectedToppings: [],
        quantity: 1,
        unitPrice: 0,
      };
      state.currentConfig.unitPrice = calculateUnitPrice(state.currentConfig);
    },
    setSize: (state, action) => {
      const newSize = action.payload;
      state.currentConfig.size = newSize;

      // Drop premium toppings if stepping down from 'large'
      if (newSize !== 'large') {
        state.currentConfig.selectedToppings = state.currentConfig.selectedToppings.filter(
          (tId) => {
            const item = TOPPINGS.find((t) => t.id === tId);
            return item && !item.isPremium;
          }
        );
      }
      state.currentConfig.unitPrice = calculateUnitPrice(state.currentConfig);
    },
    setCrust: (state, action) => {
      state.currentConfig.crust = action.payload;
      state.currentConfig.unitPrice = calculateUnitPrice(state.currentConfig);
    },
    toggleTopping: (state, action) => {
      const toppingId = action.payload;
      const topping = TOPPINGS.find((t) => t.id === toppingId);
      
      // Prohibit premium additions if not large
      if (topping?.isPremium && state.currentConfig.size !== 'large') {
        return;
      }

      const exists = state.currentConfig.selectedToppings.includes(toppingId);
      if (exists) {
        state.currentConfig.selectedToppings = state.currentConfig.selectedToppings.filter(
          (id) => id !== toppingId
        );
      } else {
        state.currentConfig.selectedToppings.push(toppingId);
      }

      state.currentConfig.unitPrice = calculateUnitPrice(state.currentConfig);
    },
    setQuantity: (state, action) => {
      const qty = Math.max(1, parseInt(action.payload, 10) || 1);
      state.currentConfig.quantity = qty;
    },
    closeCustomizer: (state) => {
      state.customizingPizza = null;
    },
  },
});

export const {
  initCustomizer,
  setSize,
  setCrust,
  toggleTopping,
  setQuantity,
  closeCustomizer,
} = pizzaSlice.actions;

export default pizzaSlice.reducer;