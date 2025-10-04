import React, { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/authSlice.js";

const PurchaseFormModal = ({ product, onClose }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const order = {
      customerName: name,
      customerAddress: address,
      customerPhone: phone,
      products: product.map((item) => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity || 1,
      })),
    };
    try {
      const response = await axios.post("/api/v1/order/placeOrder", { order });
      if (response.data.success) {
        dispatch(clearCart());
        alert(
          `${response.data.messageText}.\n Take a screenShot of your order details for future reference.\nMaximum shipping charge will be ₹100 and it may vary according to your distance.\nTake a screenshot keep it safe and then click ok.`
        );
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false); // stop loading
      onClose();
    }
  };

  // This stops the modal from closing when you click inside the form content
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };
  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50 p-4"
      onClick={onClose}
    >
      {/* Blur background */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          loading ? "opacity-70 backdrop-blur-sm" : "opacity-60"
        }`}
      ></div>

      {/* Modal */}
      <div
        className="relative bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={handleModalContentClick}
      >
        {/* Loader overlay */}
        {loading && (
          <div className="absolute inset-0 flex flex-col justify-center items-center bg-white/70 z-50 rounded-lg">
            <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-green-600 font-semibold">
              Placing your order...
            </p>
          </div>
        )}

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Please provide your shipping details
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800 text-3xl"
            disabled={loading}
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-gray-700 font-medium mb-2"
            >
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              id="name"
              name="name"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="address"
              className="block text-gray-700 font-medium mb-2"
            >
              Shipping Address
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              id="address"
              name="address"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="phone"
              className="block text-gray-700 font-medium mb-2"
            >
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              id="phone"
              name="phone"
              required
              disabled={loading}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow"
            />
          </div>

          <div className="mb-6">
            <p className="text-red-500">
              A confirmation call will be made to the phone number you provided.
              Kindly pick up the call to confirm your order.
            </p>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Place Order
          </button>
        </form>
      </div>

      <style>{`
        @keyframes fade-in-scale {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-fade-in-scale {
          animation: fade-in-scale 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default PurchaseFormModal;
