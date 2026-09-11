import { createSelector } from '@reduxjs/toolkit';

export const selectCart = (state) => state.cart.cart;

export const selectTotal = createSelector([selectCart], (cart) =>
  cart.reduce((acc, item) => acc + item.totalPrice, 0),
);

export const selectQuantity = createSelector([selectCart], (cart) =>
  cart.reduce((sum, item) => sum + item.quantity, 0),
);

export const selectGetQuantityById = createSelector(
  [selectCart, (state, id) => id],
  (cart, id) => cart.find((item) => item.pizzaId === id)?.quantity ?? 0,
);
