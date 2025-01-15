import React from "react";

const AboutUs = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <div
        className="h-1/2 w-full bg-cover text-white flex  flex-col items-center justify-center relative text-6xl md:text-8xl font-extrabold drop-shadow-lg"
        style={{ backgroundImage: "url('/assets/aboutus.svg')" }}
      >

        <span className= " flex items-center justify-center text-6xl md:text-8xl font-extrabold z-50 ">About Us</span>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      </div>
      <div className="h-1/2 flex flex-col items-center justify-center bg-white text-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-8">Welcome to WildEye</h1>
        <p className="text-lg max-w-3xl text-center">
          We are dedicated to providing the best wildlife tracking and alert
          system. Our platform helps you stay one step ahead of the wild by
          detecting, tracking, and alerting you about wildlife activities in
          your area. Our mission is to ensure your safety and awareness through
          advanced technology and reliable data.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
