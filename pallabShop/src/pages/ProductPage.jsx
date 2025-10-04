import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { ProductCardSpecific } from "../components/index.js";
import axios from "axios";
import { toast } from "react-hot-toast";


const getSpecificProducts = async (category,setProducts) => {
 try {
  
    const response = await axios.get(`/api/v1/product/getProducts?category=${encodeURIComponent(category)}`);
    if(response.data.success){
      setProducts(response.data.products);
      toast.success(response.data.message);
    }
    else{
      toast.error(response.data.message);
      setProducts([]);
    }
 } catch (error) {
    toast.error(error.response?.data?.message||error.message);
    setProducts([]);
 }
}

const ProductPage = () => {
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const category = query.get("category");
  const [products,setProducts] = useState([]);


  useEffect(()=>{
    getSpecificProducts(category,setProducts);
  },[category])

  return (
    <>
      <div className={`transition-filter duration-300`}>
        <div className="bg-gray-200 min-h-screen text-gray-800">
          <header>
            <div className="container mx-auto px-6 py-4">
              <h1 className="text-3xl font-bold text-center">
                Browse Our Products
              </h1>
            </div>
          </header>

          <main className="container mx-auto px-6 py-12">
            {
              products.length === 0 ? (
                <p className="text-center text-gray-500">No products found in this category.</p>
              ) : null
            }
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map((product) => (
                <ProductCardSpecific key={product._id} product={product} />
              ))}
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default ProductPage;
