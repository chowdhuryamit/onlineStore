import React,{useState} from 'react'
import { useLocation } from "react-router-dom";
import { ProductCardSpecific,PurchaseFormModal } from '../components/index.js';

const products = [
  {
    id: 1,
    name: 'Velocity Runner',
    description: 'Lightweight and responsive, perfect for your daily runs. Features advanced cushioning and a breathable mesh upper.',
    price: '129.99',
    imageUrl: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=2070&auto=format&fit=crop',
  },
  {
    id: 2,
    name: 'Chronos Watch',
    description: 'A classic timepiece with a modern touch. Stainless steel case, sapphire crystal, and waterproof up to 50 meters.',
    price: '249.50',
    imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1999&auto=format&fit=crop',
  },
  {
    id: 3,
    name: 'Aura Sunglasses',
    description: 'Protect your eyes in style. These sunglasses feature polarized lenses with 100% UV protection and a durable frame.',
    price: '85.00',
    imageUrl: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?q=80&w=1780&auto=format&fit=crop',
  },
];


const ProductPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const category = query.get("category");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleBuyNow = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  
  return (
    <>
    <div className={`transition-filter duration-300 ${isModalOpen ? 'blur-md' : ''}`}>
        <div className="bg-gray-200 min-h-screen text-gray-800">
          <header>
            <div className="container mx-auto px-6 py-4">
              <h1 className="text-3xl font-bold text-center">Browse Our Products</h1>
            </div>
          </header>
          
          <main className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <ProductCardSpecific 
                  key={product.id} 
                  product={product} 
                  onBuyNowClick={handleBuyNow} 
                />
              ))}
            </div>
          </main>
        </div>
      </div>
      
      {isModalOpen && selectedProduct && (
        <PurchaseFormModal 
          product={selectedProduct} 
          onClose={handleCloseModal} 
        />
      )}
      </>
  )
}

export default ProductPage
