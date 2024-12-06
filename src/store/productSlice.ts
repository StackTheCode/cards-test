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
}

const initialState: ProductState = {
  products: [], // Store products here
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts(state, action: PayloadAction<Product[]>) {
      // Merge new fetched products with existing ones
      const fetchedProducts = action.payload;
      const existingProductIds = state.products.map((p) => p.id);

      // Add only new products that aren't already in the state
      const newProducts = fetchedProducts.filter(
        (p) => !existingProductIds.includes(p.id)
      );

      state.products = [...state.products, ...newProducts];
    },
    addProduct(state, action: PayloadAction<Product>) {
      state.products = [{ ...action.payload, isCreated: true }, ...state.products];
    },
    deleteProduct(state, action: PayloadAction<number>) {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  }
});
export const { setProducts, addProduct, deleteProduct } = productSlice.actions;
export default productSlice.reducer;
