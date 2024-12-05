import { useNavigate } from "react-router-dom";

const HomePage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4" >
      <h1 className="text-4xl font-extrabold text-gray-800 mb-8">Welcome to the Product Manager</h1>
      <div className="space-x-4">
        <button
          onClick={() => navigate("/products")}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg shadow-md transition-all duration-200"
        >
          Products
        </button>
        <button
          onClick={() => navigate("/create-product")}
          className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg shadow-md transition-all duration-200"
        >
          Create Product
        </button>
      </div>
    </div>
  );
};

export default HomePage;
