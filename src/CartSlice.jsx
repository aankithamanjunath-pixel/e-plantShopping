import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find(
        (i) => i.name === item.name
      );

      state.totalQuantity += 1;
      state.totalAmount += item.cost;

      if (!existingItem) {
        state.items.push({
          ...item,
          quantity: 1,
          totalPrice: item.cost,
        });
      } else {
        existingItem.quantity += 1;
        existingItem.totalPrice += item.cost;
      }
    },

    removeItem: (state, action) => {
      const name = action.payload;
      const existingItem = state.items.find((i) => i.name === name);

      if (existingItem) {
        state.totalQuantity -= existingItem.quantity;
        state.totalAmount -= existingItem.totalPrice;
        state.items = state.items.filter((i) => i.name !== name);
      }
    },

    increaseQuantity: (state, action) => {
      const name = action.payload;
      const existingItem = state.items.find((i) => i.name === name);

      if (existingItem) {
        existingItem.quantity += 1;
        existingItem.totalPrice += existingItem.cost;
        state.totalQuantity += 1;
        state.totalAmount += existingItem.cost;
      }
    },

    decreaseQuantity: (state, action) => {
      const name = action.payload;
      const existingItem = state.items.find((i) => i.name === name);

      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1;
        existingItem.totalPrice -= existingItem.cost;
        state.totalQuantity -= 1;
        state.totalAmount -= existingItem.cost;
      }
    },
  },
});

export const {
  addItem,
  removeItem,
  increaseQuantity,
  decreaseQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
