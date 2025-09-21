import React, { useState, useCallback } from "react";
import { Upload } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const AddProduct = () => {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [uniqueId, setUniqueId] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (setter) => (e) => setter(e.target.value);
  const handleFileChange = (files) => {
    if (files && files[0]) setImageFile(files[0]);
  };

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileChange(e.dataTransfer.files);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!productName || !description || !price || !category || !uniqueId) {
      toast.error("Please fill in all required fields");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", productName);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("uniqueId", uniqueId);
      if (imageFile) formData.append("image", imageFile);
      const response = await axios.post(
        "http://localhost:8000/api/v1/product/add",
        formData,
        {
          withCredentials: true,
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setProductName("");
        setDescription("");
        setPrice("");
        setCategory("");
        setUniqueId("");
        setImageFile(null);
        setIsDragging(false);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  const selectStyle = {
    backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 12a1 1 0 01-.707-.293l-3-3a1 1 0 111.414-1.414L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3A1 1 0 0110 12z" clip-rule="evenodd"/></svg>')`,
    backgroundSize: "1.25em",
  };

  const fileInputContainerClass = `mt-1 flex justify-center px-6 pt-8 pb-8 border-2 border-dashed rounded-lg transition-all duration-300 ${
    isDragging
      ? "border-indigo-600 bg-indigo-50"
      : "border-gray-300 hover:border-indigo-500"
  }`;

  return (
    <div className="relative min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4 font-sans antialiased">
      {/* Full-screen Loading Overlay */}
      {loading && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50 backdrop-blur-sm">
          <div className="w-16 h-16 border-4 border-t-indigo-600 border-gray-300 rounded-full animate-spin"></div>
        </div>
      )}

      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12 text-gray-900 dark:text-white">
        <div className="text-center md:text-left mb-10">
          <h1 className="text-3xl md:text-4xl font-bold">Add New Product</h1>
          <p className="mt-2 text-gray-700 dark:text-gray-300">
            Fill out the details below to add a new item to the catalog.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Name
            </label>
            <input
              type="text"
              value={productName}
              onChange={handleInputChange(setProductName)}
              placeholder="e.g., Wireless Bluetooth Headphones"
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Description
            </label>
            <textarea
              value={description}
              onChange={handleInputChange(setDescription)}
              rows="4"
              placeholder="Describe the product, its features, benefits, etc."
              className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Price (INR)
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500 dark:text-gray-300">
                  ₹
                </span>
                <input
                  type="number"
                  value={price}
                  onChange={handleInputChange(setPrice)}
                  placeholder="299.99"
                  className="w-full pl-8 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <select
                value={category}
                onChange={handleInputChange(setCategory)}
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg appearance-none bg-no-repeat bg-right-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
                style={selectStyle}
              >
                <option value="" disabled>
                  Select a category
                </option>
                <option value="Rice">Rice</option>
                <option value="Biscuit">Biscuit</option>
                <option value="Wheat">Wheat</option>
                <option value="Ghee">Ghee</option>
                <option value="Oil">Oil</option>
                <option value="Bread">Bread</option>
                <option value="Cake">Cake</option>
                <option value="Snack">Snack</option>
                <option value="Drink">Drink</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-2">
                Unique ID
              </label>
              <input
                type="text"
                value={uniqueId}
                onChange={handleInputChange(setUniqueId)}
                placeholder="uniqueId"
                className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium mb-2">
              Product Image
            </label>
            <div
              className={fileInputContainerClass}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="space-y-2 text-center text-gray-900 dark:text-white">
                <Upload className="mx-auto text-gray-400 dark:text-gray-200" />
                <div className="flex text-sm justify-center items-center gap-1">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white dark:bg-gray-700 rounded-md font-medium text-indigo-600 hover:text-indigo-500 px-2 py-1"
                  >
                    <span>Upload a file</span>
                    <input
                      id="file-upload"
                      type="file"
                      className="sr-only"
                      onChange={(e) => handleFileChange(e.target.files)}
                    />
                  </label>
                  <span>or drag and drop</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
            {imageFile && (
              <p className="text-sm mt-2">
                File selected:{" "}
                <span className="font-medium">{imageFile.name}</span>
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="border-t border-gray-200 dark:border-gray-600 pt-6 flex flex-col sm:flex-row sm:justify-end gap-4">
            <button
              type="button"
              className="px-6 py-3 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 transition duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
