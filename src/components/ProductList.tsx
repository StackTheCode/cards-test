import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { RootState, AppDispatch } from "../store/productsStore";
import { deleteProduct,setProducts } from "../store/productSlice";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;

}

const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const products = useSelector((state: RootState) => state.products.products); // Fetch products from the store
  const [likedProducts, setLikedProducts] = useState<number[]>([]); // For liked products
  const [filter, setFilter] = useState<"all" | "favorites" | "created">("all"); // Filter state


  useEffect(() => {
    // Fetch products when component mounts
    const fetchProducts = async () => {
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
    fetchProducts();
  }, [dispatch]);

  const handleLike = (id: number) => {
    setLikedProducts((prevLiked) =>
      prevLiked.includes(id) ? prevLiked.filter((productId) => productId !== id) : [...prevLiked, id]
    );
  };

  const handleDelete = (id: number) => {
    // Dispatch delete action to remove product from store
    dispatch(deleteProduct(id));
    setLikedProducts((prevLiked) => prevLiked.filter((productId) => productId !== id)); // Remove from favorites if deleted
  };

 

  const filteredProducts = 
  filter === "all"
    ? products // All products
    : filter === "favorites"
    ? products.filter((product) => likedProducts.includes(product.id))
    : filter === "created"
    ? products.filter((product) => product.isCreated) // Only "created" products
    : [];
    return(
    <div>
      <div className="mb-4 flex items-center justify-center mt-6 py-5 flex-row gap-6">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 mr-2 ${filter === "all" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          All Products
        </button>
        <button
          onClick={() => setFilter("favorites")}
          className={`px-4 py-2 ${filter === "favorites" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Favorites
        </button>
        <button
          onClick={() => setFilter("created")}
          className={`px-4 py-2 ${filter === "created" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        >
          Created
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
            image={product.image}
            onLike={handleLike}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;
