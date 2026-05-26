import { Product } from "@/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  product: Product;
  quantity: number;
}
interface CartState {
  items: CartItem[];
  subTotal: number;
}
const initialState: CartState = {
  items: [],
  subTotal: 0,
};
const calculateSubTotal = (items: CartItem[]) =>
  Number(
    items
      .reduce((acc, item) => acc + item.product.currentPrice * item.quantity, 0)
      .toFixed(2)
  );
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({ product, quantity });
      }
      state.subTotal = calculateSubTotal(state.items);
    },
    removeItem: (
      state,
      action: PayloadAction<{ product: Product; quantity?: number }>
    ) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find(
        (item) => item.product.id === product.id
      );
      if (!existingItem) return;
      if (existingItem.quantity > quantity) {
        existingItem.quantity -= quantity;
      } else {
        state.items = state.items.filter(
          (item) => item.product.id !== product.id
        );
      }
      state.subTotal = calculateSubTotal(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      state.subTotal = 0;
    },
  },
});
export const { addItem, removeItem, clearCart } = cartSlice.actions;
export default cartSlice.reducer;
