import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface shippedCountState {
  shippedCount: number;
}
const initialState: shippedCountState = {
  shippedCount: 0,
};

const shippedCountSlice = createSlice({
  name: "shippedCount",
  initialState,
  reducers: {
    setShippedCount: (state, action: PayloadAction<number>) => {
      state.shippedCount = action.payload;
    },
  },
});

export const { setShippedCount } = shippedCountSlice.actions;
export default shippedCountSlice.reducer;
