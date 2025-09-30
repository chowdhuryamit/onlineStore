import React, { useState, useMemo, useEffect } from "react";
import { Ordercard } from "../components/index.js";
import { CheckCircle} from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const getOldOrders = async (setOrders) =>{
  try {
    const response = await axios.get("/api/v1/order/oldOrders",{withCredentials:true});
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

const Oldorders = () => {
  const [orders, setOrders] = useState([]);
 
  useEffect(()=>{
    getOldOrders(setOrders);
  },[])

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <section className="flex flex-col items-center justify-center">
          <div className="flex items-center gap-3 mb-6">
            <CheckCircle className="w-8 h-8 text-green-500" />
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">
              Fulfilled Orders ({orders.length})
            </h2>
          </div>

          <div className="flex flex-col items-center gap-6 w-full max-w-lg">
            {orders.length > 0 ? (
              orders.map((order) => (
                <div
                  key={order._id}
                  className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <Ordercard order={order} />
                </div>
              ))
            ) : (
              <div className="text-center py-10 px-6 w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md">
                <p className="text-gray-600 dark:text-gray-400">
                  No orders have been fulfilled yet.
                </p>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Oldorders;
