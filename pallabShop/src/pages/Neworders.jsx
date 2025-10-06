import React, { useState, useMemo, useEffect } from "react";
import { Ordercard } from "../components/index.js";
import { Clock } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const getNewOrders = async (setOrders) => {
  try {
    const response = await axios.get("/api/v1/order/newOrders",{withCredentials:true});
    if(response.data.success){
      toast.success(response.data.message);
      setOrders(response.data.orders);
    }
    else{
      toast.error(response.data.message);
      setOrders([]);
    }
  } catch (error) {
    toast.error(error.response?.data?.message||error.message);
  }
} 

const Neworders = () => {
  const [orders, setOrders] = useState([]);
  

  const handleFulfillOrder = async (orderId) => {
    try {
      const response = await axios.patch("/api/v1/order/fullfillOrder",{orderId},{withCredentials:true});
      if(response.data.success){
        toast.success(response.data.message);
        setOrders((prevOrders) => prevOrders.filter((o) => o._id !== orderId));
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message||error.message);
    }
  };

  const handleDelete = async (id)=>{
    if(!id.trim()){
      toast.error("product id is required");
      return;
    }
    try {
      const response = await axios.delete('/api/v1/order/deleteOrder',{data:{id},withCredentials:true});
      if(response.data.success){
       toast.success(response.data.message);
       setOrders((prevOrders) => prevOrders.filter((o) => o._id !== id));
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
     toast.error(error.response?.data?.message || error.message);
    }
 }

  // const newOrders = useMemo(
  //   () =>
  //     orders
  //       .filter((o) => o.fullfilled === false)
  //       .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)),
  //   [orders]
  // );

  useEffect(()=>{
    getNewOrders(setOrders);
  },[])
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
  <div className="max-w-7xl mx-auto">
    <section className="flex flex-col items-center justify-center">
      <div className="flex items-center gap-3 mb-6">
        <Clock className="w-8 h-8 text-blue-500" />
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
          New Orders ({orders.length})
        </h2>
      </div>

      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {orders.length > 0 ? (
          orders.map((order) => (
            <div
              key={order._id}
              className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all"
            >
              <Ordercard
                key={order._id}
                order={order}
                onFulfill={handleFulfillOrder}
                onDelete={handleDelete}
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
