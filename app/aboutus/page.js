import React from "react";
import Header from "../components/header.js";
const AboutUs = () => {
  return (
    <div className="h-screen w-screen overflow-hidden">
       <Header/>
      <div
        className="h-1/2 w-full bg-cover text-white flex  flex-col items-center justify-center relative text-6xl md:text-8xl font-extrabold drop-shadow-lg"
        style={{ backgroundImage: "url('/assets/aboutus.svg')" }}
      >

        <span className= " flex items-center justify-center text-6xl md:text-8xl font-extrabold z-50 ">About Us</span>
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80 z-10"></div>
      </div>
      <div className="h-1/2 flex flex-col items-center  bg-white text-gray-800 p-8">
        <h1 className="text-4xl font-bold mb-8">Protecting Lives, Preserving Wildlife!</h1>
        <p className="text-lg max-w-4xl text-center ">
        Our mission is to bridge the gap between technology and nature, creating a safer environment for both humans and animals.We are dedicated to provide the best wildlife tracking and alert
        system.Our platform helps you stay one step ahead of the wild by
          detecting, tracking, and alerting you about wildlife activities in
          your area.</p><p className="text-lg max-w-4xl text-center ">We combine expertise in engineering, software development, and conservation to create practical solutions. At our core, we’re problem-solvers who believe technology can make life better—not just for humans, but for the animals we share this planet with.</p>
          <br></br><p className="text-lg max-w-4xl text-center ">Join us in making a difference. Explore how our system can keep you safe and contribute to a better future for wildlife and humans alike.</p>
        
      </div>
    </div>
  );
};

export default AboutUs;
