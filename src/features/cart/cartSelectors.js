import { createSelector } from '@reduxjs/toolkit';

export const selectCartItems = (state) => state.cart.items;

export const selectCartTotals = createSelector(
  [selectCartItems],
  (items) => {
    const totalCount = items.reduce((acc, item) => acc + item.quantity, 0);
    const subtotal = items.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0);
    const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 49;
    const taxes = Math.round(subtotal * 0.05); // 5% GST
    const grandTotal = subtotal + deliveryFee + taxes;

    return {
      totalCount,
      subtotal,
      deliveryFee,
      taxes,
      grandTotal,
      isCartEmpty: items.length === 0,
    };
  }
);