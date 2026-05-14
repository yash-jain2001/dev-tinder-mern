import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Premium = () => {
  const [isUserPremium, setIsUserPremium] = useState(false);

  const verifyPremiumUser = async () => {
    try {
      const res = await axios.get(BASE_URL + "/premium/verify", {
        withCredentials: true,
      });
      if (res.data.isPremium) {
        setIsUserPremium(true);
      }
    } catch (err) {
      console.error("Error verifying premium status:", err);
    }
  };

  useEffect(() => {
    verifyPremiumUser();
  }, []);

  const handleBuyClick = async (type) => {
    try {
      const order = await axios.post(
        BASE_URL + "/payment/create",
        { membershipType: type },
        { withCredentials: true },
      );
      console.log("Frontend received order data:", order.data);

      const { amount, keyId, currency, notes, orderId } = order.data;
      const options = {
        key: keyId,
        amount,
        currency,
        name: "Dev Tinder",
        description: "Dev Tinder Premium",
        order_id: orderId,
        prefill: {
          name: notes.firstName + " " + notes.lastName,
          email: notes.email,
        },
        theme: {
          color: "#3B82F6",
        },
        handler: async function (response) {
          try {
            const res = await axios.post(
              BASE_URL + "/payment/verify",
              response,
              { withCredentials: true },
            );
            if (res.data.isPremium) {
              setIsUserPremium(true);
            }
          } catch (err) {
            console.error("Verification failed:", err);
          }
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  if (isUserPremium) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 animate-in fade-in duration-700">
        <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mb-6 border border-primary/30">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h1 className="text-3xl md:text-5xl font-black mb-3">You're already Pro</h1>
        <p className="text-white/40 max-w-sm">Thank you for being a premium member! You have access to all exclusive features.</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto py-16 px-4 space-y-12 animate-in fade-in duration-1000">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-black tracking-tight">Choose Your Plan</h1>
        <p className="text-white/40 text-lg max-w-2xl mx-auto">Enhance your developer networking experience with exclusive premium features.</p>
      </div>

      <div className="flex flex-wrap gap-8 justify-center items-stretch py-4">
        {/* Silver Plan */}
        <div className="w-full md:w-[380px] group">
          <div className="h-full glass-card rounded-[2.5rem] border border-white/10 p-10 flex flex-col justify-between transition-all duration-300 hover:border-white/20 hover:bg-white/[0.07] shadow-2xl">
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-black text-white group-hover:text-primary transition-colors">Silver</h2>
                  <p className="text-xs font-bold text-white/30 uppercase tracking-widest mt-1">Growth Starter</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">₹199</div>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">3 Months</div>
                </div>
              </div>

              <ul className="space-y-5">
                {[
                  "Chat with premium members",
                  "100 connection requests / day",
                  "Verified blue tick badge",
                  "Priority profile visibility"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                    <svg className="w-5 h-5 text-primary shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleBuyClick("silver")}
              className="w-full py-4 mt-10 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all duration-300 active:scale-[0.98]"
            >
              Get Silver
            </button>
          </div>
        </div>

        {/* Gold Plan */}
        <div className="w-full md:w-[380px] group">
          <div className="h-full glass-card rounded-[2.5rem] border border-amber-400/20 p-10 flex flex-col justify-between transition-all duration-300 hover:border-amber-400/40 hover:bg-amber-400/[0.03] shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 px-6 py-2 bg-amber-400 text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-bl-2xl">Popular</div>
            
            <div>
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h2 className="text-3xl font-black text-amber-400">Gold</h2>
                  <p className="text-xs font-bold text-amber-400/40 uppercase tracking-widest mt-1">Ultimate Access</p>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-black text-white">₹349</div>
                  <div className="text-[10px] font-bold text-white/30 uppercase tracking-widest">6 Months</div>
                </div>
              </div>

              <ul className="space-y-5">
                {[
                  "Chat with premium members",
                  "Unlimited connection requests",
                  "Verified blue tick badge",
                  "Priority matching algorithm",
                  "Advanced profile analytics"
                ].map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm font-medium text-white/60">
                    <svg className="w-5 h-5 text-amber-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <button
              onClick={() => handleBuyClick("gold")}
              className="w-full py-4 mt-10 rounded-2xl bg-amber-400 text-black font-black uppercase tracking-widest text-xs hover:bg-amber-300 transition-all duration-300 active:scale-[0.98] shadow-lg shadow-amber-400/20"
            >
              Get Gold
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Premium;
