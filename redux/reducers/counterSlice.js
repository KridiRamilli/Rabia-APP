import { createSlice } from "@reduxjs/toolkit";

const counterSlice = createSlice({
  name: "counter",
  initialState: {
    num: 0,
    // logCounter: {},
  },
  reducers: {
    addCounter(state, action) {
      state.num++;
    },
    resetCounter(state, action) {
      state.num = 0;
    },
  },
});

export const { addCounter, resetCounter } = counterSlice.actions;
export default counterSlice.reducer;
