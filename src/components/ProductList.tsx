import React, { useState,useEffect } from "react";
import ProductCard from "./ProductCard"; // Импортируйте компонент карточки

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}

const ProductList: React.FC = () => {

  const [products, setProducts] = useState<Product[]>([]); // Загрузка продуктов с API
  const [createdProducts, setCreatedProducts] = useState<Product[]>([]); // Для созданных продуктов
  const [likedProducts, setLikedProducts] = useState<number[]>([]); // Храним ID лайкнутых продуктов
  const [filter, setFilter] = useState<"all" | "favorites" | "created">("all"); // Фильтр
  useEffect(() => {
    const fetchProducts= async() =>{
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        
        const data =await response.json();
        setProducts(data)
        if(!response.ok){
          throw new Error("Fetching failure")
        }
       
      } catch (error) {
        console.log(error)
      }

    }
    
  fetchProducts();
  }, []);

  

  const handleLike = (id: number) => {
    setLikedProducts((prevLiked) =>
      prevLiked.includes(id) ? prevLiked.filter((productId) => productId !== id) : [...prevLiked, id]
    );
  };

  const handleDelete = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
    setLikedProducts((prevLiked) => prevLiked.filter((productId) => productId !== id)); // Удаляем из избранного, если удалена карточка
    setCreatedProducts((prevProducts) => prevProducts.filter((product) => product.id !== id))
  };

  const handleAddProduct = (newProduct:Product) =>{
setProducts((prevProducts) => [newProduct,...prevProducts])
setCreatedProducts((prevCreated) => [newProduct,...prevCreated])
  } 

  const filteredProducts =
  filter === "all"
    ? products
    : filter === "favorites"
    ? products.filter((product) => likedProducts.includes(product.id))
    : createdProducts;

  return (
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
