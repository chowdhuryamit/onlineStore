import React, { useState, useMemo } from "react";

const TrashIcon = () => (
  <svg
    xmlns="http://www.w.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
  >
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
    <line x1="10" y1="11" x2="10" y2="17"></line>
    <line x1="14" y1="11" x2="14" y2="17"></line>
  </svg>
);

const Cart = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Eco-Friendly Water Bottle",
      description: "1L, BPA-free",
      price: 25.0,
      quantity: 2,
      imageUrl: "https://placehold.co/100x100/A7D3A1/435C41?text=Bottle",
    },
    {
      id: 2,
      name: "Organic Cotton Tote Bag",
      description: "Natural canvas",
      price: 15.5,
      quantity: 1,
      imageUrl: "https://placehold.co/100x100/F4D8A2/7D5A2C?text=Tote+Bag",
    },
    {
      id: 3,
      name: "Wireless Bluetooth Headphones",
      description: "Noise-cancelling",
      price: 120.0,
      quantity: 1,
      imageUrl: "https://placehold.co/100x100/AEC9E0/3E5A74?text=Headphones",
    },
  ]);

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

  // --- Memoized Calculations ---

  // Calculate the subtotal whenever cartItems changes
  const subtotal = useMemo(() => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }, [cartItems]);

  const shippingFee = subtotal > 50 || subtotal === 0 ? 0.0 : 5.0;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shippingFee + tax;

  // --- Render Logic ---
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans antialiased">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-extrabold text-white mb-8 tracking-tight">
            Your Shopping Cart
          </h1>

          {/* Cart Items Section */}
          <div className="bg-gray-100 dark:bg-gray-800 backdrop-blur-xl rounded-xl shadow-lg overflow-hidden">
            {cartItems.length === 0 ? (
              <div className="p-8 text-center">
                <h2 className="text-2xl font-semibold text-white">
                  Your cart is empty.
                </h2>
                <p className="text-slate-300 mt-2">
                  Looks like you haven't added anything yet.
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-slate-200">
                {cartItems.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-col sm:flex-row items-center p-6 gap-6"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-28 h-28 rounded-lg object-cover flex-shrink-0 shadow-sm"
                    />
                    <div className="flex-grow text-center sm:text-left">
                      <h3 className="text-lg font-bold text-white">
                        {item.name}
                      </h3>
                      <p className="text-sm text-slate-200">
                        {item.description}
                      </p>
                      <p className="text-md font-bold text-teal-400 mt-2">
                        ${item.price.toFixed(2)}
                      </p>
                      <p className="text-sm text-slate-400 mt-1">
                        Quantity: {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center">
                      <button
                        onClick={() => handleRemoveItem(item.id)}
                        className="text-slate-500 hover:text-red-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500/50 rounded-full p-2"
                        aria-label={`Remove ${item.name}`}
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {cartItems.length > 0 && (
            <button className="w-full mt-6 bg-teal-600 text-white font-bold py-3 rounded-lg hover:bg-teal-700 transition-colors duration-300 focus:outline-none focus:ring-4 focus:ring-teal-500/50 text-lg">
              Place Order
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Cart;
