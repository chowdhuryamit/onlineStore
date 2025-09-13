import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-100 border-t border-gray-200">
      <div className="mx-auto max-w-7xl py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Shop
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  New Arrivals
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Best Sellers
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  All Products
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              About
            </h3>
            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Our Story
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Sustainability
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base text-gray-500 hover:text-gray-900"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
          <div className="col-span-2 md:col-span-2">
            <h3 className="text-sm font-semibold text-gray-600 tracking-wider uppercase">
              Join our newsletter
            </h3>
            <p className="mt-4 text-base text-gray-500">
              Get the latest arrivals, special offers, and behind-the-scenes
              stories.
            </p>
            <form className="mt-4 flex sm:max-w-md">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                type="email"
                name="email-address"
                id="email-address"
                autoComplete="email"
                required
                className="w-full min-w-0 appearance-none rounded-md border border-gray-300 bg-white px-4 py-2 text-base text-gray-900 placeholder-gray-500 shadow-sm focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
                placeholder="Enter your email"
              />
              <div className="ml-4 flex-shrink-0">
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 py-2 px-4 text-base font-medium text-white shadow-sm hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="mt-12 border-t border-gray-300 pt-8 text-center">
          <p className="text-base text-gray-400">
            &copy; 2025 AETHER. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
