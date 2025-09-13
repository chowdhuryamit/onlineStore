import React from "react";
import { shopImage } from "../assets/index.js";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <div className="relative bg-gray-900 ">
      {/* Background Image */}
      <div aria-hidden="true" className="absolute inset-0 ">
        <img
          src={shopImage}
          alt="Modern living space"
          className="h-full w-full object-cover object-center"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative mx-auto flex max-w-4xl flex-col items-center py-32 px-6 text-center lg:py-48">
        <h1 className="text-4xl font-extrabold tracking-tight text-yellow-200 drop-shadow-md lg:text-6xl">
          <Typewriter
            words={[
              "Fresh Everyday",
              "Healthy Choices",
              "Quality You Can Trust",
              "From Farm to Home",
              "Essentials Made Easy",
            ]}
            loop={false}
            cursor
            cursorStyle="_"
            typeSpeed={150}
            deleteSpeed={100}
            delaySpeed={2000}
          />
        </h1>
        <p className="mt-6 text-lg text-blue-100 max-w-2xl font-bold">
          Where quality meets your daily needs.Freshness you can trust, for
          every meal.Bringing nature’s best to your basket. Your trusted source
          for everyday goodness.
        </p>
        <a
          href="#productGrid"
          className="mt-10 inline-block rounded-lg bg-white px-8 py-3 text-base font-semibold text-gray-900 shadow-md hover:bg-gray-100 transition-colors"
        >
          Shop The Collection
        </a>
      </div>
    </div>
  );
};

export default HeroSection;
