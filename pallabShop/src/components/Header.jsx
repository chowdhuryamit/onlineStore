import React from "react";
import { useState } from "react";
import { Search, LogIn, X, Menu, ShoppingCart, LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import {logout} from '../store/authSlice.js';
import axios from "axios"
import toast from "react-hot-toast";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
//   const product = useSelector((state) => state.auth.cart);
//  console.log(product);;
 
  const handleLogout = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/v1/user/logout",{}, { withCredentials: true });
      if(response.data.success){
        toast.success(response.data.message);
        dispatch(logout());
        navigate("/login");
      }
      else{
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message||error.message);
    }
    
  }

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
            <button
              className="text-white/90 hover:text-white font-medium transition-colors duration-300"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            {authStatus && (
              <>
                <button
                  className="text-white/90 hover:text-white font-medium transition-colors duration-300"
                  onClick={() => navigate("/addProduct")}
                >
                  Add Product
                </button>
                <button
                  className="text-white/90 hover:text-white font-medium transition-colors duration-300"
                  onClick={() => navigate("/newOrders")}
                >
                  New Orders
                </button>
                <button
                  className="text-white/90 hover:text-white font-medium transition-colors duration-300"
                  onClick={() => navigate("/oldOrders")}
                >
                  Old Orders
                </button>
              </>
            )}
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
            <button
              className="text-white/90 hover:text-white transition-colors duration-300"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart />
            </button>
            {!authStatus && (
              <button
                className="text-white/90 hover:text-white transition-colors duration-300"
                onClick={() => navigate("/login")}
              >
                <LogIn />
              </button>
            )}
            {authStatus && (
              <button
                className="text-white/90 hover:text-white transition-colors duration-300"
                onClick={handleLogout}
              >
                <LogOut />
              </button>
            )}
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
            <button
              className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            {authStatus && (
              <>
                <button
                  className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
                  onClick={() => navigate("/addProduct")}
                >
                  Add Product
                </button>
                <button
                  className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
                  onClick={() => navigate("/newOrders")}
                >
                  New Orders
                </button>
                <button
                  className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
                  onClick={() => navigate("/oldOrders")}
                >
                  Old Orders
                </button>
              </>
            )}
            {/* <button
              className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => navigate("/oldOrders")}
            >
              Journal
            </button> */}
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
