import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  return (
    <div className="group relative w-full border p-4 rounded-lg hover:shadow-xl transition-shadow duration-300" onClick={()=>navigate(`/product?category=${product.category}`)}>
      <div className="w-full h-80 overflow-hidden rounded-lg bg-gray-100 cursor-pointer">
        <img
          src={product.image}
          alt={product.category}
          className="w-full h-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="mt-2 text-center">
        <h3 className="text-lg font-semibold text-gray-900">
          {product.category}
        </h3>
      </div>
    </div>
  );
};

export default ProductCard;
