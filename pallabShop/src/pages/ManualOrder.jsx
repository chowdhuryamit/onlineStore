import React from 'react'
import { Phone } from "lucide-react";

const ManualOrder = () => {
  return (
    <div className="flex justify-center items-center min-h-[70vh] bg-gradient-to-r from-teal-50 to-emerald-100 px-4">
      <div className="bg-white shadow-xl rounded-2xl p-8 max-w-md text-center border-t-4 border-teal-500">
        <Phone className="text-teal-600 w-12 h-12 mx-auto mb-4 animate-bounce" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Place a Manual Order
        </h2>
        <p className="text-gray-600 mb-6">
          Can’t order online? Don’t worry!  
          You can place your order directly by calling us on:
        </p>
        <a
          href="tel:9378098656"
          className="inline-block bg-teal-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-teal-700 transition-all shadow-md"
        >
          Call: 9378098656
        </a>
      </div>
    </div>
  )
}

export default ManualOrder
