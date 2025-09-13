import React from "react";
import { useState } from "react";
import { Search,LogIn,X,Menu,ShoppingCart } from 'lucide-react';
import { useNavigate } from "react-router-dom";


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 backdrop-blur-md shadow-lg opacity-90 mb-1">
  <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
    <div className="flex h-16 items-center justify-between">
      {/* Logo */}
      <div className="flex items-center">
        <a
          href="#"
          className="text-2xl font-extrabold tracking-tight text-red-400 drop-shadow-lg"
        >
          SANKAR SHOP
        </a>
      </div>

      {/* Desktop Menu */}
      <div className="hidden md:flex md:items-center md:space-x-8">
        <a
          href="/"
          className="text-white/90 hover:text-white font-medium transition-colors duration-300"
        >
          Home
        </a>
        <a
          href="/newOrders"
          className="text-white/90 hover:text-white font-medium transition-colors duration-300"
        >
          New Orders
        </a>
        <a
          href="/oldOrders"
          className="text-white/90 hover:text-white font-medium transition-colors duration-300"
        >
          Old Orders
        </a>
        <a
          href="#"
          className="text-white/90 hover:text-white font-medium transition-colors duration-300"
        >
          Journal
        </a>
      </div>

      {/* Icons + Mobile Toggle */}
      <div className="flex items-center space-x-4">
        <button className="text-white/90 hover:text-white transition-colors duration-300">
          <Search />
        </button>
        <button className="text-white/90 hover:text-white transition-colors duration-300" onClick={()=>navigate('/cart')}>
          <ShoppingCart/>
        </button>
        <button className="text-white/90 hover:text-white transition-colors duration-300" onClick={()=>navigate('/login')}>
          <LogIn/>
        </button>
        <button
          className="md:hidden text-white/90 hover:text-white transition-colors duration-300"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X /> : <Menu />}
        </button>
      </div>
    </div>

    {/* Mobile Menu */}
    {isMenuOpen && (
      <div className="md:hidden pt-2 pb-4 space-y-2">
        <a
          href="/"
          className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
        >
          Home
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
        >
          Living
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
        >
          Kitchen
        </a>
        <a
          href="#"
          className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
        >
          Journal
        </a>
      </div>
    )}
  </nav>
</header>

  )
};

export default Header;
