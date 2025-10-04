import React, { useMemo } from "react";
import { CheckCircle } from "lucide-react";

const Ordercard = ({ order, onFulfill,serialNo }) => {
  const {
    _id,
    customerName,
    customerAddress,
    customerPhone,
    fullfilled,
    products,
    createdAt,
  } = order;

  const total =
    products?.reduce((acc, item) => acc + item.price * item.quantity, 0) || 0;

  const formattedDate = new Date(createdAt).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
      <p className="text-violet-400">Order No - {serialNo+1}</p>
      <div
        className={`p-4 border-l-4 ${
          fullfilled === false ? "border-blue-500" : "border-green-500"
        }`}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start mb-3">
          {/* Left side: Customer info */}
          <div className="flex flex-col text-left">
            <p className="font-bold text-lg text-gray-800 dark:text-white">
              {customerName}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {customerAddress}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {customerPhone}
            </p>
          </div>

          {/* Right side: Status badge */}
          <div
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              fullfilled === false
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            }`}
          >
            {fullfilled === false ? "New" : "Fulfilled"}
          </div>
        </div>

        {/* Date */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {formattedDate}
        </p>

        {/* Items List */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Items
          </h4>
          <ul className="space-y-2 text-sm">
            {products.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-orange-300"
              >
                <span>
                  {item.name} ₹{item.price}
                  <span className="p-1">
                    x{item.quantity}
                  </span>
                </span>
                <span className="font-medium text-green-500">
                 ₹{(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <hr className="border-gray-200 dark:border-gray-700 my-3" />

        {/* Footer */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-green-400">
            Total: ₹{total.toFixed(2)}
          </p>
          {fullfilled === false && (
            <button
              onClick={() => onFulfill(_id)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors duration-300"
            >
              <CheckCircle className="w-5 h-5" />
              <span>Fulfill Order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ordercard;
