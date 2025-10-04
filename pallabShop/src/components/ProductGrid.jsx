import React from "react";
import ProductCard from "./ProductCard";
import { rice,biscuit,wheat,ghee,oil,bread,cakes,snacks,drinks,cosmetics,
  grains,
  hardware,
  poja,
  sanitation,
  sport,
  stationary,
  toothpaste,
  vegitables,
  spices } from "../assets/index.js";

const ProductGrid = () => {
  const products = [
    { id: 1, category: "Rice", image: rice },
    { id: 2, category: "Biscuit", image: biscuit },
    { id: 3, category: "Wheat", image: wheat },
    { id: 4, category: "Ghee", image: ghee },
    { id: 5, category: "Edible Oils", image: oil },
    { id: 6, category: "Bread", image: bread },
    { id: 7, category: "Cakes", image: cakes },
    { id: 8, category: "Snacks", image: snacks },
    { id: 9, category: "Drinks", image: drinks },
    { id: 10, category: "Toothpaste", image:toothpaste},
    { id: 11, category: "Cosmetics", image:cosmetics},
    { id: 12, category: "Sanitation & Hygiene Products", image: sanitation },
    { id: 13, category: "Grains", image: grains },
    { id: 14, category: "Spices & Masalas", image: spices },
    { id: 15, category: "Pooja Samagri", image: poja },
    { id: 16, category: "Vegetables & Herbs", image: vegitables },
    { id: 17, category: "Hardware & Tools", image: hardware },
    { id: 18, category: "Books & Stationery", image: stationary },
    { id: 19, category: "Sports", image: sport },
  ];

  return (
    <div className="bg-gray-200" id="productGrid">
    <div className="mx-auto max-w-2xl py-16 px-4 sm:py-24 sm:px-6 lg:max-w-7xl lg:px-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Categories</h2>
        <p className="mt-4 text-base text-gray-500">Thoughtfully designed objects for your daily life.</p>
      </div>
      <div className="mt-16 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default ProductGrid;
