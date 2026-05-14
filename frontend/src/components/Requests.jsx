import React, { useEffect } from "react";
import axios, { Axios } from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addRequests, removeRequest } from "../utils/requestSlice";

const Requests = () => {
  const dispatch = useDispatch();
  const requests = useSelector((store) => store.requests);


const reviewRequest = async(status,_id)=>{
  try {
    const res = await axios.post(BASE_URL+"/request/review/"+status+"/"+_id,{},{withCredentials:true})
    console.log(res.data);
    dispatch(removeRequest(_id))
  } catch (error) {
    console.log(error.message);
  }
}

  const fetchRequests = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/requests/recieved", {
        withCredentials: true,
      });
      // console.log(res.data.data);
      dispatch(addRequests(res.data.data));
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  if (requests === null) return (
    <div className="flex justify-center items-center min-h-[60vh]">
      <span className="loading loading-spinner loading-lg text-primary"></span>
    </div>
  );

  if (requests.length === 0)
    return (
      <div className="text-2xl font-bold text-center text-white/20 mt-20 animate-in fade-in duration-1000">
        No pending requests found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-6 md:space-y-8 py-4 md:py-8 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-3xl md:text-4xl font-black tracking-tight text-white bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Connection Requests
        </h1>
        <p className="text-white/50 text-sm">Review who wants to connect with you</p>
      </div>

      <div className="grid gap-4 md:gap-6">
        {requests.map((request) => {
          if (!request.fromUserId) return null;
          
          const {
            firstName,
            lastName,
            email,
            profilePicture,
            about,
            skills
          } = request.fromUserId;
          return (
            <div key={request._id} className="glass-card p-5 md:p-6 rounded-3xl flex flex-col md:flex-row items-center gap-4 md:gap-6 transition-all duration-300 hover:bg-white/10 group animate-in slide-in-from-bottom-4">
              <div className="relative shrink-0">
                <div className="avatar">
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img src={profilePicture || "https://ui-avatars.com/api/?name=" + firstName} alt={firstName} />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-lg shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>
                </div>
              </div>

              <div className="flex-grow text-center md:text-left space-y-3 w-full">
                <div className="space-y-1">
                  <h2 className="text-xl md:text-2xl font-black text-white group-hover:text-primary transition-colors flex items-center justify-center md:justify-start gap-2">
                    {firstName} {lastName}
                    {request.fromUserId.isPremium && (
                      <span className="text-blue-400">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]">
                          <path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.15-.44.22-.91.22-1.4 0-2.43-1.97-4.41-4.4-4.41-.48 0-.95.08-1.4.22C14.03 1.95 12.66 1.07 11.08 1.07c-1.58 0-2.95.88-3.66 2.18-.44-.15-.91-.22-1.4-.22-2.43 0-4.41 1.97-4.41 4.4 0 .48.08.95.22 1.4C.54 9.54-.34 10.92-.34 12.5c0 1.58.88 2.95 2.18 3.66-.15.44-.22.91-.22 1.4 0 2.43 1.97 4.41 4.4 4.41.48 0 .95-.08 1.4-.22 1.05 1.95 2.42 2.82 4.01 2.82 1.58 0 2.95-.88 3.66-2.18.44.15.91.22 1.4.22 2.43 0 4.41-1.97 4.41-4.4 0-.48-.08-.95-.22-1.4 1.3-1.05 2.18-2.42 2.18-4.01zm-14.12 3.12l-3.32-3.32 1.41-1.41 1.91 1.91 4.63-4.63 1.41 1.41-6.04 6.04z" />
                        </svg>
                      </span>
                    )}
                  </h2>
                  <p className="text-[10px] text-white/30 font-black uppercase tracking-widest">{email}</p>
                </div>
                <p className="text-sm text-white/60 line-clamp-2 max-w-md italic leading-relaxed mx-auto md:mx-0">
                  "{about || "Hey there! I'd love to connect and talk about tech."}"
                </p>
                <div className="flex flex-wrap gap-1.5 justify-center md:justify-start pt-1">
                  {skills?.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-2.5 py-1 bg-primary/5 border border-primary/10 text-[9px] font-black text-primary rounded-lg uppercase tracking-tighter transition-all hover:bg-primary hover:text-white">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-row md:flex-col gap-2 w-full md:w-auto mt-2 md:mt-0">
                <button 
                  onClick={() => reviewRequest("rejected", request._id)} 
                  className="flex-1 btn btn-ghost hover:bg-error/20 text-error rounded-2xl px-4 md:px-6 transition-all active:scale-95 text-sm"
                >
                  Reject
                </button>
                <button 
                  onClick={() => reviewRequest("accepted", request._id)} 
                  className="flex-1 btn btn-primary rounded-2xl px-4 md:px-8 shadow-lg shadow-primary/20 transition-all active:scale-95 text-sm"
                >
                  Accept
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Requests;
