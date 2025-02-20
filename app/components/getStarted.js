"use client";
import React from "react";
import { useRouter } from "next/navigation";

const getStarted = () => {
  const router = useRouter();
  return (
    <div className="flex justify-center items-center gap-12 h-full">
      <div className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px] ">
        <button
          onClick={() => router.push("/map")}
          className="relative min-w-[120px] cursor-pointer rounded-md border-0 bg-gradient-to-b from-gray-700 to-gray-900 p-[12px_17px] text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.1)] transition-all duration-800 ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:scale-110 hover:-translate-y-1 hover:text-white"
        >
          <span className="absolute bottom-0 left-[15%] h-[1px] w-[70%] bg-gradient-to-r from-transparent via-white to-transparent opacity-20 transition-all duration-1000 ease-[cubic-bezier(0.15,0.83,0.66,1)] hover:opacity-100"></span>
          <strong>Get Started</strong>
        </button>
      </div>
    </div>
  );
};

export default getStarted;
