import React from "react";
import { useState } from "react";
import { Search, LogIn, X, Menu, ShoppingCart, LogOut,ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/authSlice.js";
import axios from "axios";
import toast from "react-hot-toast";
import { logo } from "../assets/index.js";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  //   const product = useSelector((state) => state.auth.cart);
  //  console.log(product);;

  const [showSearch, setShowSearch] = useState(false);
  const [query, setQuery] = useState("");
  const categories = [
    "Rice",
    "Biscuit",
    "Wheat",
    "Ghee",
    "Oil",
    "Bread",
    "Cakes",
    "Snacks",
    "Drinks",
    "Toothpaste",
    "Cosmetics",
    "Sanitation & Hygiene Products",
    "Grains",
    "Spices & Masalas",
    "Pooja Samagri",
    "Vegetables & Herbs",
    "Hardware & Tools",
    "Books & Stationery",
    "Sports"
  ];

  const handleLogout = async () => {
    try {
      const response = await axios.post(
        "/api/v1/user/logout",
        {},
        { withCredentials: true }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        dispatch(logout());
        navigate("/login");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  const handleSearch = (q) => {
    //if (!q.trim()) return;
    const match = categories.find(
      (cat) => cat.toLowerCase() === q.toLowerCase()
    );
    if (match) {
      navigate(`/product?category=${encodeURIComponent(match)}`);
      setShowSearch(false);
      setQuery("");
    } else {
      toast.error("Category not found");
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-gradient-to-r from-indigo-500 via-pink-500 to-yellow-400 backdrop-blur-md shadow-lg opacity-90 mb-1">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}

          <div
            className="flex items-center cursor-pointer"
            onClick={() => navigate("/")}
          >
            <img
              src={logo}
              alt="ShankarShop Logo"
              className="h-12 w-auto object-contain "
            />
            <span className="ml-2 text-white font-bold text-xl">
              ShankarShop
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <button
              className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <button
              className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => navigate("/manualOrder")}
            >
              Manual Order
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
            
          </div>

          {/* Icons + Mobile Toggle */}
          <div className="flex items-center">
            <button
              className="text-blue-400 hover:text-white transition-colors duration-300 mx-2"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search />
            </button>
            {showSearch && (
              <div className="absolute top-16 left-0 w-full bg-white shadow-md px-4 py-2 z-50">
                <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search according product categories..."
                    className="flex-1 px-3 py-2 focus:outline-none"
                  />
                  <button
                    onClick={() => handleSearch(query)}
                    className="w-10 h-10 flex items-center justify-center bg-green-500 text-white hover:bg-blue-400 rounded-full m-1"
                  >
                   <ArrowRight/>
                  </button>
                </div>

                {/* Suggestions */}
                {query && (
                  <div className="mt-2 bg-white border rounded-md shadow">
                    {categories
                      .filter((cat) =>
                        cat.toLowerCase().includes(query.toLowerCase())
                      )
                      .map((cat) => (
                        <div
                          key={cat}
                          onClick={() => setQuery(cat)}
                          className="px-3 py-2 cursor-pointer hover:bg-gray-100"
                        >
                          {cat}
                        </div>
                      ))}
                  </div>
                )}
              </div>
            )}

            <button
              className="text-blue-400 hover:text-white transition-colors duration-300 mx-2"
              onClick={() => navigate("/cart")}
            >
              <ShoppingCart />
            </button>
            {!authStatus && (
              <button
                className="text-blue-400 hover:text-white transition-colors duration-300 mx-2"
                onClick={() => navigate("/login")}
              >
                <LogIn />
              </button>
            )}
            {authStatus && (
              <button
                className="text-white/90 hover:text-white transition-colors duration-300 mx-2"
                onClick={handleLogout}
              >
                <LogOut />
              </button>
            )}
            <button
              className="md:hidden text-white/90 hover:text-white transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="text-blue-400" />
              ) : (
                <Menu className="text-blue-400" />
              )}
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
            <button
              className="block px-3 py-2 rounded-md text-base font-semibold text-white bg-white/20 hover:bg-white/30 transition-colors"
              onClick={() => navigate("/manualOrder")}
            >
              Manual Order
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
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
