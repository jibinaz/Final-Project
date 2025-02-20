import React from "react";
import Header from "./header.js";
import GetStarted from "./getStarted.js";

const HomePage = () => {
  return (
    <div
      className="h-screen text-[#F5F5DC] w-full bg-cover bg-center flex flex-col bg-fixed items-center justify-center relative"
      style={{ backgroundImage: "url('/assets/Homebg.svg')" }}
    >
      {/* Overlay for better readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      <Header />
      {/* Content Section */}
      <div className="z-20 text-center space-y-6">
        <div className="flex justify-center space-x-4">
          <h1 className="text-6xl md:text-8xl font-extrabold drop-shadow-lg transition-transform duration-700 ease-in-out hover:text-white hover:scale-110">Detect.</h1>
          <h1 className="text-6xl md:text-8xl font-extrabold drop-shadow-lg transition-transform duration-700 ease-in-out hover:text-white hover:scale-110">Track.</h1>
          <h1 className="text-6xl md:text-8xl font-extrabold drop-shadow-lg transition-transform duration-700 ease-in-out hover:text-white hover:scale-110">Alert.</h1>
        </div>
        <p className="text-lg md:text-2xl font-light max-w-3xl mx-auto">
          Welcome to WildEye! Keeping you one step ahead of the wild.
        </p>
        <div className="z-20 text-center space-y-6">
          <GetStarted/>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
