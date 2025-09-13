import React,{useMemo} from "react";

const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
    <svg className={className} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);

const Ordercard = ({ order, onFulfill }) => {
  const { id, customerName, date, items, status } = order;

  const total = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items]
  );

  const formattedDate = new Date(date).toLocaleString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 ease-in-out overflow-hidden">
      <div
        className={`p-4 border-l-4 ${
          status === "new" ? "border-blue-500" : "border-green-500"
        }`}
      >
        {/* Card Header */}
        <div className="flex justify-between items-start mb-3">
          <div>
            <p className="font-bold text-lg text-gray-800 dark:text-white">
              {id}
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {customerName}
            </p>
          </div>
          <div
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              status === "new"
                ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
            }`}
          >
            {status.toUpperCase()}
          </div>
        </div>

        {/* Date and Time */}
        <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
          {formattedDate}
        </p>

        {/* Items List */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-300 mb-2">
            Items
          </h4>
          <ul className="space-y-2 text-sm">
            {items.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center text-gray-600 dark:text-gray-400"
              >
                <span>
                  {item.name}{" "}
                  <span className="text-gray-400 dark:text-gray-500">
                    x{item.quantity}
                  </span>
                </span>
                <span className="font-medium text-gray-700 dark:text-gray-300">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Divider */}
        <hr className="border-gray-200 dark:border-gray-700 my-3" />

        {/* Card Footer */}
        <div className="flex justify-between items-center">
          <p className="text-lg font-bold text-gray-800 dark:text-white">
            Total: ${total.toFixed(2)}
          </p>
          {status === "new" && (
            <button
              onClick={() => onFulfill(id)}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-offset-gray-900 transition-colors duration-300"
            >
              <CheckCircleIcon className="w-5 h-5" />
              <span>Fulfill Order</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Ordercard;
