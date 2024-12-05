import { useParams, useNavigate} from "react-router-dom"
import { useState,useEffect } from "react";
import React from "react";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
}
const ProductDetailsPage:React.FC  = () => {

  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);


  useEffect(() => {
    const fetchProducts= async() =>{
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        
        const data =await response.json();
        setProduct(data)
        if(!response.ok){
          throw new Error("Fetching failure")
        }
    
      } catch (error) { 
       console.log(error)
      }
      finally{
        setLoading(false)
      }

    }
    
  fetchProducts();
  }, []);
  if(loading){
    return <div>Loading...</div>
  }
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
    <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
      <button
        onClick={() => navigate("/products")}
        className="mb-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg shadow-md transition-all duration-200"
      >
        Back to Products
      </button>
      {product && (
        <>
          <div className="flex justify-center mb-6">
            <img
              src={product.image}
              alt={product.title}
              className="w-48 h-60 object-cover rounded-lg shadow-sm border border-gray-200"
            />
          </div>
          <h1 className="text-4xl font-extrabold mb-4 text-center text-gray-800">
            {product.title}
          </h1>
          <p className="text-gray-600 leading-relaxed mb-6 text-center">
            {product.description}
          </p>
          <p className="text-2xl text-green-600 font-bold text-center">
            ${product.price.toFixed(2)}
          </p>
        </>
      )}
    </div>
  </div>
  
  
  
      
  ) 

}


export default ProductDetailsPage
