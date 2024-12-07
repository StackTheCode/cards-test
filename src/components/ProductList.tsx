import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "./ProductCard";
import { RootState, AppDispatch } from "../store/productsStore";
import {fetchProducts} from '../../util/productService'
import { deleteProduct, toggleLike } from "../store/productSlice";
import { useNavigate } from "react-router-dom";


const ProductList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
const navigate = useNavigate();
  const products = useSelector((state: RootState) => state.products.products); // Fetch products from the store
  const likedProducts = useSelector((state:RootState)=> state.products.likedProducts)// For liked products
  const [filter, setFilter] = useState<"all" | "favorites" | "created">("all"); // Filter state


  useEffect(() => {
    // Fetch products when component mounts
    fetchProducts();
  }, [dispatch]);

  const handleLike = (id: number) => {
  dispatch(toggleLike(id));
  };

  const handleDelete = (id: number) => {

    dispatch(deleteProduct(id));
  };

  const redirect = () =>{
    navigate(`/create-product`)
  }
 

  const filteredProducts = 
  filter === "all"
    ? products // All products
    : filter === "favorites"
    ? products.filter((product) => likedProducts.includes(product.id))
    : filter === "created"
    ? products.filter((product) => product.isCreated === true) // Ensure true is explicitly checked
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

        <button
          onClick={redirect}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-200  "
          
        >
          Create a product
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
            isLiked={ likedProducts.includes(product.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default ProductList;