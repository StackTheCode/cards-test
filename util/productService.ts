import { useDispatch } from "react-redux";
import {setProducts} from '../src/store/productSlice'
export const createProduct = async (productData:{
    title: string;
    price: number;
    description: string;
    image: string;
    isCreated: boolean;
}) => {
    try {
      const response = await fetch("https://fakestoreapi.com/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      const createdProduct = await response.json();
      return createdProduct;
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  };
  export const fetchProducts = async () => {
    const dispatch =useDispatch();
    try {
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      if (response.ok) {
        dispatch(setProducts(data)); // Dispatch products to Redux store
      } else {
        throw new Error("Failed to fetch products");
      }
    } catch (error) {
      console.log(error);
    }
  };