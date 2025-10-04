import React from "react";
import { Link, useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleNavigate = (path) => {
    navigate(path);
    window.scrollTo(0, 0);
  };

  const productCategories = ["Rice", "Wheat", "Oil", "Cakes", "Drinks", "Biscuit", "Ghee", "Snacks","Toothpaste",
    "Cosmetics",
    "Sanitation & Hygiene Products",
    "Grains",
    "Spices & Masalas",
    "Pooja Samagri",
    "Vegetables & Herbs",
    "Hardware & Tools",
    "Books & Stationery",
    "Sports"];
  const aboutLinks = [
    { name: "Sign In", path: "/login" },
    { name: "Your Cart", path: "/cart" },
    { name: "Home", path: "/" },
  ];
  return (
    <footer className="bg-gray-100 border-t border-gray-800">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {/* Product Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Our Product Categories
            </h3>
            <ul className="space-y-2">
              {productCategories.map((cat) => (
                <li key={cat}>
                  <Link
                    to={`/product?category=${encodeURIComponent(cat)}`}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* About */}
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              About
            </h3>
            <ul className="space-y-2">
              {aboutLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    onClick={() => window.scrollTo(0, 0)}
                    className="text-base text-gray-500 hover:text-gray-900"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase mb-4">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li>
                <p className="text-base text-gray-500">Dighaliya, Mohanpur, West Tripura</p>
              </li>
              <li>
                <p className="text-base text-gray-500">Get support: 9378098656</p>
              </li>
              <li>
                <p className="text-base text-gray-500">India, 799211</p>
              </li>
              <li>
                <a href="mailto:support@example.com" className="text-base text-gray-500 hover:text-gray-900">
                  pallabacharjee2020@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-2 border-t border-gray-300 pt-2 text-center">
          <p className="text-base text-gray-400">
            &copy; {new Date().toLocaleDateString()} Amit Chowdhury. All rights reserved.
          </p>
        </div>
      </div>
    </footer>

  );
};

export default Footer;
