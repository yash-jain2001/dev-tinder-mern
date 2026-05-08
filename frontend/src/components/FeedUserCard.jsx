import axios from 'axios'
import React from 'react'
import { BASE_URL } from '../utils/constants'
import { useDispatch } from 'react-redux'
import { removeUserFromFeed } from '../utils/feedSlice'

const FeedUserCard = ({user}) => {

    const dispatch = useDispatch();
    // console.log(user);
    const {_id,firstName,lastName,profilePicture,skills,age,gender,about} = user

    const handleSendRequest = async(status, userId)=>{
     try {
       const res = await axios.post(BASE_URL+"/request/send/"+ status + "/" + userId,{},{withCredentials:true})
      dispatch(removeUserFromFeed(userId));
      console.log(res.data);
      
      } catch (error) {
      console.log(error.message);
     } 
    }
    
  return (
    <div className="group relative w-full max-w-[380px] h-[550px] transition-all duration-500 [perspective:1000px]">
      <div className="glass-card w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col transition-all duration-500 group-hover:shadow-primary/20 group-hover:-translate-y-2">
        
        {/* Image Container */}
        <div className="relative h-[60%] w-full overflow-hidden">
          <img
            src={profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800"}
            alt={`${firstName} ${lastName}`} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-linear-to-t from-base-300 via-transparent to-transparent opacity-60"></div>
          
          {/* Top Badges */}
          <div className="absolute top-6 left-6 flex gap-2">
            {age && (
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white shadow-xl">
                {age} YRS
              </div>
            )}
            {gender && (
              <div className="px-3 py-1 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-xs font-bold text-white shadow-xl">
                {gender.toUpperCase()}
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="flex-grow p-8 flex flex-col justify-between -mt-12 relative z-10 bg-base-300/40 backdrop-blur-xl rounded-t-[2.5rem]">
          <div className="space-y-4">
            <div className="space-y-1">
              <h2 className="text-3xl font-black tracking-tight text-white group-hover:text-primary transition-colors duration-300">
                {firstName} {lastName}
              </h2>
              <p className="text-sm text-white/60 line-clamp-2 italic">
                "{about || "No bio yet..."}"
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1.5">
              {skills?.slice(0, 5).map((skill, index) => (
                <span 
                  key={index} 
                  className="px-3 py-1 bg-primary/10 border border-primary/20 text-primary text-[10px] font-bold rounded-lg uppercase tracking-widest transition-all duration-300 hover:bg-primary hover:text-white"
                >
                  {skill.toString()}
                </span>
              ))}
              {skills?.length > 5 && (
                <span className="px-3 py-1 bg-white/5 border border-white/10 text-white/40 text-[10px] font-bold rounded-lg">
                  +{skills.length - 5} MORE
                </span>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-4 mt-6">
            <button 
              onClick={() => handleSendRequest("ignored", _id)} 
              className="flex-1 py-4 bg-white/5 hover:bg-error/20 border border-white/10 hover:border-error/50 text-white font-bold rounded-2xl transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn"
            >
              <span className="text-xl group-hover/btn:rotate-12 transition-transform">👎</span>
              Skip
            </button>
            <button 
              onClick={() => handleSendRequest("interested", _id)} 
              className="flex-[1.5] py-4 bg-primary hover:bg-primary-focus text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 group/btn"
            >
              <span className="text-xl group-hover/btn:scale-125 transition-transform">🔥</span>
              Connect
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedUserCard