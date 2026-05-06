import React from 'react'

const EditProfileUserCard = ({user}) => {
  const {firstName, lastName, profilePicture, skills, age, gender, about} = user
  
  return (
    <div className="relative w-full max-w-[320px] h-[500px] transition-all duration-500">
      <div className="glass-card w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col border border-white/10">
        
        {/* Image Container */}
        <div className="relative h-[55%] w-full overflow-hidden">
          <img
            src={profilePicture || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=800"}
            alt={`${firstName} ${lastName}`} 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-linear-to-t from-base-300 via-transparent to-transparent opacity-60"></div>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-1.5">
            {age && (
              <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase">
                {age} YRS
              </div>
            )}
            {gender && (
              <div className="px-2 py-0.5 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-[10px] font-bold text-white uppercase">
                {gender}
              </div>
            )}
          </div>
        </div>

        {/* Content Body */}
        <div className="grow p-6 flex flex-col justify-between -mt-10 relative z-10 bg-base-300/60 backdrop-blur-xl rounded-t-[2.5rem]">
          <div className="space-y-3">
            <div className="space-y-0.5">
              <h2 className="text-xl font-bold text-white">
                {firstName || "First"} {lastName || "Last"}
              </h2>
              <p className="text-xs text-white/50 line-clamp-2 italic leading-relaxed">
                "{about || "A short bio about yourself..."}"
              </p>
            </div>

            {/* Skills */}
            <div className="flex flex-wrap gap-1">
              {skills?.slice(0, 4).map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-primary text-[9px] font-bold rounded-md uppercase tracking-wider"
                >
                  {skill.toString()}
                </span>
              ))}
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-white/5 flex justify-center">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.2em]">Profile Preview</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EditProfileUserCard