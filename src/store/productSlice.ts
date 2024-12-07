import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  isCreated?: boolean; // Flag to identify created products
}

interface ProductState {
  products: Product[];
  likedProducts: number[];
}

const initialState: ProductState = {
  products: JSON.parse(localStorage.getItem("products") || "[]"),
  likedProducts: JSON.parse(localStorage.getItem("likedProducts") || "[]"),
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      state.products = action.payload;
      localStorage.setItem("products", JSON.stringify(state.products)); // Save to localStorage
    },
    toggleLike(state, action: PayloadAction<number>) {
      const productId = action.payload;
      if (state.likedProducts.includes(productId)) {
        state.likedProducts = state.likedProducts.filter((id) => id !== productId);
      } else {
        state.likedProducts.push(productId);
      }
      localStorage.setItem("likedProducts", JSON.stringify(state.likedProducts)); // Save likedProducts to localStorage

    },
    addProduct(state, action: PayloadAction<Product>) {
      const newProduct = { ...action.payload, isCreated: true }; // Set `isCreated` flag
      state.products.push(newProduct);
      localStorage.setItem("products", JSON.stringify(state.products)); // Save to localStorage
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter((product) => product.id !== action.payload);
      localStorage.setItem("products", JSON.stringify(state.products)); // Save to localStorage
    },
  },
});

export const { setProducts, addProduct, toggleLike, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
