import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    cartVisible: false,
    productVisible: true,
  },
  reducers: {
    show(state) {
      state.cartVisible = true;
      state.productVisible = false;
    },
    close(state) {
      state.cartVisible = false;
      state.productVisible = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
