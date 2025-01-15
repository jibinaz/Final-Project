import React from 'react'

const getStarted = () => {
  return (
<div className="flex justify-center items-center gap-12 h-full">
  <div
    className="bg-gradient-to-b from-gray-800/40 to-transparent p-[4px] rounded-[16px]"
  >
    <button
      className="group p-[4px] rounded-[12px] bg-gradient-to-b from-gray-700 to-gray-600 shadow-[0_2px_4px_rgba(0,0,0,0.7)] hover:shadow-[0_4px_8px_rgba(0,0,0,0.6)] active:shadow-[0_0px_1px_rgba(0,0,0,0.8)] active:scale-[0.995] transition-all duration-200"
    >
      <div
        className="bg-gradient-to-b from-gray-600 to-gray-700 rounded-[8px] px-3 py-2"
      >
        <div className="flex gap-2 items-center">
          <span className=" text-lg text-white">Get Started</span>
        </div>
      </div>
    </button>
  </div>
</div>

  )
}

export default getStarted