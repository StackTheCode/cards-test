import { useDispatch } from "react-redux";
import {setProducts} from '../src/store/productSlice'

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