import React, { useState, useMemo } from "react";
import { Ordercard } from "../components/index.js";

const initialOrders = [
  {
    id: "ORD7412",
    customerName: "Alice Johnson",
    date: "2025-09-13T14:30:00Z",
    items: [
      { name: "Ergonomic Mouse", quantity: 1, price: 75.0 },
      { name: "Mechanical Keyboard", quantity: 1, price: 120.0 },
    ],
    status: "new",
  },
  {
    id: "ORD3958",
    customerName: "Bob Williams",
    date: "2025-09-13T12:15:00Z",
    items: [{ name: "4K Monitor", quantity: 1, price: 450.0 }],
    status: "new",
  },
  {
    id: "ORD6249",
    customerName: "Charlie Brown",
    date: "2025-09-12T18:45:00Z",
    items: [
      { name: "USB-C Hub", quantity: 2, price: 45.0 },
      { name: "Laptop Stand", quantity: 1, price: 55.0 },
    ],
    status: "new",
  },
  {
    id: "ORD1023",
    customerName: "Diana Prince",
    date: "2025-09-12T11:00:00Z",
    items: [{ name: "Webcam", quantity: 1, price: 90.0 }],
    status: "fulfilled",
  },
  {
    id: "ORD8854",
    customerName: "Ethan Hunt",
    date: "2025-09-11T09:20:00Z",
    items: [
      { name: "Noise-Cancelling Headphones", quantity: 1, price: 250.0 },
      { name: "Mouse Pad", quantity: 1, price: 20.0 },
    ],
    status: "fulfilled",
  },
];

const CheckCircleIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const ClockIcon = ({ className = "w-6 h-6" }) => (
  <svg
    className={className}
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
);

const Neworders = () => {
  const [orders, setOrders] = useState(initialOrders);

  const handleFulfillOrder = (orderId) => {
    setOrders((currentOrders) =>
      currentOrders.map((order) =>
        order.id === orderId ? { ...order, status: "fulfilled" } : order
      )
    );
  };

  const newOrders = useMemo(
    () =>
      orders
        .filter((o) => o.status === "new")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [orders]
  );

  const fulfilledOrders = useMemo(
    () =>
      orders
        .filter((o) => o.status === "fulfilled")
        .sort((a, b) => new Date(b.date) - new Date(a.date)),
    [orders]
  );
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
  <div className="max-w-7xl mx-auto">
    <section className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-6">
        <ClockIcon className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          New Orders ({newOrders.length})
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {newOrders.length > 0 ? (
          newOrders.map((order) => (
            <div
              key={order.id}
              className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <Ordercard
                key={order.id}
                order={order}
                onFulfill={handleFulfillOrder}
              />
            </div>
          ))
        ) : (
          <div className="text-center py-10 px-6 w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md">
            <p className="text-gray-600 dark:text-gray-400">
              All caught up! No new orders.
            </p>
          </div>
        )}
      </div>
    </section>
  </div>
</div>

  );
};

export default Neworders;
