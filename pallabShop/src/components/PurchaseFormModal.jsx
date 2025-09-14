import React from 'react'

const PurchaseFormModal = ({ product, onClose }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(product);
        
        // In a real app, you would handle form submission here (e.g., API call)
        alert(`Thank you for your interest in the ${product.name}! Your order has been submitted.`);
        onClose(); // Close modal after submission
      };
      
      // This stops the modal from closing when you click inside the form content
      const handleModalContentClick = (e) => {
        e.stopPropagation();
      };
  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-50 p-4"
      onClick={onClose} // Close modal when clicking on the overlay
    >
      <div 
        className="bg-white rounded-lg shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-scale"
        onClick={handleModalContentClick}
      >
        <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Complete Your Purchase</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800 text-3xl">&times;</button>
        </div>
        <p className="text-gray-600 mb-6">You're buying the <span className="font-semibold">{product.name}</span>. Please provide your shipping details.</p>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
            <input type="text" id="name" name="name" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" />
          </div>
          <div className="mb-4">
            <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Shipping Address</label>
            <input type="text" id="address" name="address" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" />
          </div>
          <div className="mb-6">
            <label htmlFor="phone" className="block text-gray-700 font-medium mb-2">Phone Number</label>
            <input type="tel" id="phone" name="phone" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-shadow" />
          </div>
          <button type="submit" className="w-full bg-green-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300">
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
  )
}

export default PurchaseFormModal
