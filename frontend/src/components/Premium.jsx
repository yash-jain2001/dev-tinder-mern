import React from "react";

const Premium = () => {
  return (
    <div className="flex gap-10 justify-center py-10 min-h-screen">
      <div className="w-96 h-[450px] rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-2xl shadow-gray-400/5 p-8 text-white">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-5xl font-bold text-gray-200 mb-8">
              Silver Plan
            </h1>
            <ul className="space-y-4 text-lg text-gray-300">
              <li>✓ Chat with premium members</li>
              <li>✓ 100 connection requests per day</li>
              <li>✓ Blue tick mark on profile</li>
              <li>✓ 3 months subscription</li>
            </ul>
          </div>
          <button className="w-full py-3 rounded-xl bg-gray-200 text-black font-semibold hover:bg-white transition">
            Buy for $9.99
          </button>
        </div>
      </div>

      <div className="w-96 h-[450px] rounded-3xl border border-amber-300/20 bg-white/5 backdrop-blur-xl shadow-2xl shadow-yellow-500/5 p-8 text-white">
        <div className="flex flex-col h-full justify-between">
          <div>
            <h1 className="text-5xl font-bold text-yellow-300 mb-8">
              Gold Plan
            </h1>
            <ul className="space-y-4 text-lg text-gray-300">
              <li>✓ Chat with premium members</li>
              <li>✓ Unlimited connection requests</li>
              <li>✓ Blue tick mark on profile</li>
              <li>✓ 6 months subscription</li>
            </ul>
          </div>
          <button className="w-full py-3 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition">
            Buy for $19.99
          </button>
        </div>
      </div>
    </div>
  );
};

export default Premium;