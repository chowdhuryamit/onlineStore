import React, { useState, useEffect } from "react";
import { PurchaseFormModal } from "../components/index.js";
import { useSelector } from "react-redux";
import { Plus, Minus, Trash2 } from "lucide-react";

const Cart = () => {
  // const [cartItems, setCartItems] = useState([
  //   {
  //     id: 1,
  //     name: "Eco-Friendly Water Bottle",
  //     description: "1L, BPA-free",
  //     price: 25.0,
  //     quantity: 2,
  //     imageUrl: "https://placehold.co/100x100/A7D3A1/435C41?text=Bottle",
  //   },
  //   {
  //     id: 2,
  //     name: "Organic Cotton Tote Bag",
  //     description: "Natural canvas",
  //     price: 15.5,
  //     quantity: 1,
  //     imageUrl: "https://placehold.co/100x100/F4D8A2/7D5A2C?text=Tote+Bag",
  //   },
  //   {
  //     id: 3,
  //     name: "Wireless Bluetooth Headphones",
  //     description: "Noise-cancelling",
  //     price: 120.0,
  //     quantity: 1,
  //     imageUrl: "https://placehold.co/100x100/AEC9E0/3E5A74?text=Headphones",
  //   },
  // ]);
  const cartFromRedux = useSelector((state) => state.auth.cart);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    setCartItems(cartFromRedux.map((item) => ({ ...item, quantity: 1 })));
  }, [cartFromRedux]);

  const handleQuantityChange = (id, delta) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) } // min 1
          : item
      )
    );
  };

  //console.log(product);;
  // --- Event Handlers ---

  /**
   * Removes an item from the cart.
   * @param {number} productId - The ID of the product to remove.
   */
  const handleRemoveItem = (productId) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== productId)
    );
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleBuyNow = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div
        className={`bg-gray-100 dark:bg-gray-900 min-h-screen font-sans antialiased transition-filter duration-300 ${
          isModalOpen ? "blur-md" : ""
        }`}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
              Your Shopping Cart
            </h1>

            {/* Cart Items Section */}
            <div className="bg-white dark:bg-gray-800 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden">
              {cartItems.length === 0 ? (
                <div className="p-8 text-center">
                  <h2 className="text-2xl font-semibold text-gray-700 dark:text-white">
                    Your cart is empty.
                  </h2>
                  <p className="text-gray-500 dark:text-slate-300 mt-2">
                    Looks like you haven't added anything yet.
                  </p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200 dark:divide-slate-700">
                  {cartItems.map((item) => (
                    <li
                      key={item.id}
                      className="flex flex-col sm:flex-row items-center p-6 gap-6"
                    >
                      <img
                        src={item.imageUrl}
                        alt={item.name}
                        className="w-28 h-28 rounded-lg object-cover flex-shrink-0 shadow-sm"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/100x100/CCCCCC/FFFFFF?text=Error";
                        }}
                      />
                      <div className="flex-grow text-center sm:text-left">
                        <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-slate-400">
                          {item.description}
                        </p>
                        <p className="text-md font-bold text-teal-600 dark:text-teal-400 mt-2">
                          ${item.price}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        {/* Quantity Controls */}
                        <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-md">
                          <button
                            onClick={() => handleQuantityChange(item.id, -1)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-l-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <Minus />
                          </button>
                          <span className="px-4 py-1 text-center font-medium w-12 text-gray-800 dark:text-white">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.id, 1)}
                            className="p-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-r-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                          >
                            <Plus />
                          </button>
                        </div>
                        {/* Remove Button */}
                        <button
                          onClick={() => handleRemoveItem(item.id)}
                          className="text-gray-500 dark:text-slate-400 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-full p-2"
                          aria-label={`Remove ${item.name}`}
                        >
                          <Trash2 />
                        </button>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {cartItems.length > 0 && (
              <button
                className="w-full mt-6 bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/50 text-lg"
                onClick={() => handleBuyNow()}
              >
                Place Order
              </button>
            )}
          </div>
        </div>
      </div>
      {isModalOpen && cartItems.length > 0 && (
        <PurchaseFormModal product={cartItems} onClose={handleCloseModal} />
      )}
    </>
  );
};

export default Cart;
