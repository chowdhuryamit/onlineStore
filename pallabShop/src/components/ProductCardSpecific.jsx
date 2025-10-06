import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/authSlice.js";
import toast from "react-hot-toast";
import axios from "axios";

const ProductCardSpecific = ({ product,onDelete}) => {
  const authStatus = useSelector((state) => state.auth.status);
  const dispatch = useDispatch();

  const [isEditing, setIsEditing] = useState(false);
  const [editedPrice, setEditedPrice] = useState(product.price);
  const [editedDescription, setEditedDescription] = useState(
    product.description
  );
  const [editedAvailability, setEditedAvailability] = useState(
    product.availability
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.post(
        "/api/v1/product/editProduct",
        { id, editedPrice, editedDescription, editedAvailability },
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setIsEditing(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 border-2 border-amber-300 hover:shadow-lg hover:shadow-black">
      {/* Image Section */}
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

      {/* Content Section */}
      <div className="p-6 flex flex-col flex-grow">
        {isEditing ? (
          <div className="flex flex-col gap-4 mb-4">
            <input
              type="number"
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div className="flex items-center gap-2">
              <label className="text-gray-700 font-medium">Available:</label>
              <input
                type="checkbox"
                checked={editedAvailability}
                onChange={(e) => setEditedAvailability(e.target.checked)}
                className="w-5 h-5"
              />
            </div>
          </div>
        ) : (
          <p className="text-gray-600 mb-4 flex-grow">{product.description}</p>
        )}

        {/* Price and Buttons */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          {/* Price */}
          <p className="text-2xl font-bold text-green-500 flex">
            {"\u20B9"} {isEditing ? editedPrice : product.price}
          </p>

          {/* Buttons */}
          <div className="flex flex-wrap gap-2 justify-end w-full md:w-auto">
            {/* Admin Buttons */}
            {authStatus && (
              <>
                {isEditing ? (
                  <>
                    <button
                      onClick={() => handleSaveEdit(product._id)}
                      className="w-full md:w-auto bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-800 transition-colors duration-300"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="w-full md:w-auto bg-gray-400 text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-600 transition-colors duration-300"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="w-full md:w-auto bg-red-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-900 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setIsEditing(true)}
                      className="w-full md:w-auto bg-red-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-800 transition-colors duration-300"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => onDelete(product._id)}
                      className="w-full md:w-auto bg-red-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-900 transition-colors duration-300"
                    >
                      Delete
                    </button>
                  </>
                )}
              </>
            )}

            {/* User Button */}
            {isEditing ? null : editedAvailability ? (
              <button
                onClick={handleAddToCart}
                className="w-full md:w-auto bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition-colors duration-300"
              >
                Add to cart
              </button>
            ) : (
              <span className="w-full md:w-auto bg-gray-400 text-white font-semibold py-2 px-5 rounded-lg text-center">
                Product Unavailable
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardSpecific;
