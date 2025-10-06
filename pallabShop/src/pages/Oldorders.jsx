import React, { useState, useMemo, useEffect } from "react";
import { Ordercard } from "../components/index.js";
import { CheckCircle } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";

const getOldOrders = async (setOrders,page,setTotalPages) => {
  try {
    const response = await axios.get(
      "/api/v1/order/oldOrders",
      { params: { page: page},
        withCredentials: true
      }
    );
    if (response.data.success) {
      toast.success(response.data.message);
      setOrders(response.data.orders);
      setTotalPages(response.data.totalPages);
    } else {
      toast.error(response.data.message);
      setOrders([]);
    }
  } catch (error) {
    toast.error(error.response?.data?.message || error.message);
  }
};

const Oldorders = () => {
  const [orders, setOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [serial, setSerial] = useState(0);

  useEffect(() => {
    getOldOrders(setOrders,page,setTotalPages);
  }, [page]);

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

          <div
            className="flex flex-col items-center gap-6 w-full max-w-lg"
            id="scrollableDiv"
          >
            {orders.length > 0 ? (
              orders.map((order,index) => (
                <div
                  key={order._id}
                  className="w-full bg-white dark:bg-gray-800 p-5 rounded-xl shadow-md border border-gray-200 dark:border-gray-700 hover:shadow-lg hover:scale-[1.02] transition-all"
                >
                  <Ordercard order={order} serialNo={serial+index} onDelete={handleDelete}/>
                </div>
              ))
            ) : (
              <div className="text-center py-10 px-6 w-full bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700 rounded-lg shadow-md">
                <p className="text-gray-600 dark:text-gray-400">
                  No orders have been fulfilled yet.
                </p>
              </div>
            )}
            <div className="flex justify-end mt-4 gap-2">
              <button
                onClick={() => {
                  if (page > 1) {
                    setPage(page - 1),
                    setSerial((prev)=>prev-5);
                  }
                }}
                disabled={page === 1}
                className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => {
                  setPage(page + 1),
                  setSerial((prev)=>prev+5);
                }}
                disabled={page === totalPages}
                className="px-3 py-1 border rounded-md text-gray-600 hover:bg-gray-100 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Oldorders;
