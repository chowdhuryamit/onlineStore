import React from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../store/authSlice.js';
import toast from "react-hot-toast";

const ProductCardSpecific = ({ product}) => {
  const dispatch = useDispatch();
  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  }
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 border-2 border-amber-300 hover:shadow-lg hover:shadow-black">
      <div className="relative h-64">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
        <div className="absolute bottom-0 left-0 p-6">
          <h3 className="text-white text-2xl font-bold">{product.name}</h3>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        <div className="flex justify-between items-center">
          <p className="text-2xl font-bold text-green-500">{"\u20B9"} {product.price}</p>
          <button 
            onClick={handleAddToCart}
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-700 transition-colors duration-300"
          >
            Add to cart
          </button>
        </div>
      </div>
    </div>
  )
}

export default ProductCardSpecific
