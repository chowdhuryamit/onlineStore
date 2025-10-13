import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../store/authSlice.js";
import toast from "react-hot-toast";
import axios from "axios";

const ProductCardSpecific = ({ product, onDelete }) => {
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
  const [editedDiscount, setEditedDiscount] = useState(
    product.discount ? product.discount : 2
  );

  const handleAddToCart = () => {
    dispatch(addToCart(product));
    toast.success("Product added to cart");
  };

  const handleSaveEdit = async (id) => {
    try {
      const response = await axios.post(
        "/api/v1/product/editProduct",
        {
          id,
          editedPrice,
          editedDescription,
          editedAvailability,
          editedDiscount,
        },
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
    <div className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col group hover:-translate-y-1 transition-all duration-300 border-2 border-amber-300 hover:shadow-black">
  {/* Image Section */}
  <div className="relative h-64">
    <img
      src={product.image}
      alt={product.name}
      className="w-full h-full object-fill"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
    <div className="absolute bottom-0 left-0 p-4">
      <h3 className="text-white text-2xl font-bold tracking-wide">
        {product.name}
      </h3>
    </div>
  </div>

  {/* Content Section */}
  <div className="p-6 flex flex-col flex-grow">
    {/* Description or Edit Fields */}
    {isEditing ? (
      <div className="flex flex-col gap-4 mb-4">
        <input
          type="number"
          value={editedPrice}
          onChange={(e) => setEditedPrice(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Price"
        />
        <input
          type="number"
          value={editedDiscount}
          onChange={(e) => setEditedDiscount(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter Discount %"
        />
        <textarea
          value={editedDescription}
          onChange={(e) => setEditedDescription(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Product Description"
        />
        <div className="flex items-center gap-2">
          <label className="text-gray-700 font-medium">Available:</label>
          <input
            type="checkbox"
            checked={editedAvailability}
            onChange={(e) => setEditedAvailability(e.target.checked)}
            className="w-5 h-5 accent-amber-500"
          />
        </div>
      </div>
    ) : (
      <p className="text-gray-600 mb-6 text-base leading-relaxed flex-grow">
        {product.description}
      </p>
    )}

    {/* Price Section */}
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
      {/* Price Display */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-2">
        {isEditing ? (
          <p className="text-2xl font-bold text-green-600">
            ₹{editedPrice}
          </p>
        ) : product.discount >= 0 ? (
          <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
            <p className="text-xl text-gray-400 line-through">
              ₹{product.price}
            </p>
            <p className="text-2xl font-bold text-green-600">
              ₹
              {(
                product.price -
                (product.price * product.discount) / 100
              ).toFixed(2)}
            </p>
            <span className="text-amber-600 font-semibold text-sm bg-amber-100 px-2 py-1 rounded-lg">
              {product.discount}% OFF
            </span>
          </div>
        ) : (
          <p className="text-2xl font-bold text-green-600">
            ₹{product.price}
          </p>
        )}
      </div>
    </div>

    {/* Buttons */}
    <div className="flex flex-wrap gap-2 justify-end mt-auto">
      {/* Admin Buttons */}
      {authStatus && (
        <>
          {isEditing ? (
            <>
              <button
                onClick={() => handleSaveEdit(product._id)}
                className="bg-green-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-green-800 transition-all"
              >
                Save
              </button>
              <button
                onClick={() => setIsEditing(false)}
                className="bg-gray-400 text-white font-semibold py-2 px-5 rounded-lg hover:bg-gray-600 transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="bg-red-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-900 transition-all"
              >
                Delete
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-red-500 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-700 transition-all"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(product._id)}
                className="bg-red-700 text-white font-semibold py-2 px-5 rounded-lg hover:bg-red-900 transition-all"
              >
                Delete
              </button>
            </>
          )}
        </>
      )}

      {/* User Button */}
      {!isEditing && (
        editedAvailability ? (
          <button
            onClick={handleAddToCart}
            className="bg-blue-600 text-white font-semibold py-2 px-5 rounded-lg hover:bg-blue-800 transition-all"
          >
            Add to Cart
          </button>
        ) : (
          <span className="bg-gray-400 text-white font-semibold py-2 px-5 rounded-lg text-center">
            Product Unavailable
          </span>
        )
      )}
    </div>
  </div>
</div>

  );
};

export default ProductCardSpecific;
