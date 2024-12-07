import Reac  from "react";
import { useNavigate } from "react-router-dom";
interface ProductCardProps {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  onLike: (id: number) => void;
  onDelete: (id: number) => void;
  isLiked:boolean
}

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  title,
  price,
  description,
  image,
  onLike,
  onDelete,
  isLiked
}) => {
  
const navigate = useNavigate();

  const handleLike = () => {
    
    onLike(id); // Уведомляем родителя о клике
  };
  

  const handleDelete = () => {
    onDelete(id);
  };
  const handleCardClick = () =>{
navigate(`/products/${id}`);
  }

  return (
    <div className="border p-4 rounded-lg shadow-md ">
      <img src={image} alt={title} className="w-full h-48 object-cover mb-4 rounded"  onClick={handleCardClick}/>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-600 text-sm">{description.slice(0, 100)}...</p>
      <div className="mt-2 flex justify-between items-center">
        <span className="text-lg font-bold">${price}</span>
        <div className="flex items-center">
          <button
            onClick={handleLike}
            className={`text-xl transition-transform duration-200 ${
              isLiked ? "text-red-500 scale-110" : "text-gray-500"
            }`}
          >
               {isLiked ? "❤️" : "🤍"} 
          </button>
          <button
            onClick={handleDelete}
            className="ml-2 text-xl "
          >
            🗑️
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
