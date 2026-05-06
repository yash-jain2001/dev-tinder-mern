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

  if (!requests) return null;

  if (requests.length === 0)
    return (
      <div className="text-2xl font-bold text-center ml-4 mt-4">
        No Requests found
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-8 px-4">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight text-white bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Connection Requests
        </h1>
        <p className="text-white/50 text-sm">Review who wants to connect with you</p>
      </div>

      <div className="grid gap-4">
        {requests.map((request) => {
          const {
            firstName,
            lastName,
            email,
            profilePicture,
            about,
            skills
          } = request.fromUserId;
          return (
            <div key={request._id} className="glass-card p-6 rounded-3xl flex flex-col md:flex-row items-center gap-6 transition-all duration-300 hover:bg-white/10 group animate-in slide-in-from-bottom-4">
              <div className="relative">
                <div className="avatar">
                  <div className="w-24 h-24 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-2">
                    <img src={profilePicture || "https://ui-avatars.com/api/?name=" + firstName} alt={firstName} />
                  </div>
                </div>
                <div className="absolute -bottom-2 -right-2 bg-primary text-white p-1 rounded-lg shadow-lg">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M8 9a3 3 0 100-6 3 3 0 000 6zM8 11a6 6 0 016 6H2a6 6 0 016-6zM16 7a1 1 0 10-2 0v1h-1a1 1 0 100 2h1v1a1 1 0 102 0v-1h1a1 1 0 100-2h-1V7z" /></svg>
                </div>
              </div>

              <div className="flex-grow text-center md:text-left space-y-2">
                <div>
                  <h2 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                    {firstName} {lastName}
                  </h2>
                  <p className="text-xs text-white/40 font-mono">{email}</p>
                </div>
                <p className="text-sm text-white/60 line-clamp-2 max-w-md italic">
                  "{about || "Hey there! I'd love to connect and talk about tech."}"
                </p>
                <div className="flex flex-wrap gap-1 justify-center md:justify-start">
                  {skills?.slice(0, 3).map((skill, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-primary/10 border border-primary/20 text-[10px] font-bold text-primary rounded-md uppercase tracking-wider">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex gap-3 w-full md:w-auto">
                <button 
                  onClick={() => reviewRequest("rejected", request._id)} 
                  className="flex-1 md:flex-none btn btn-ghost hover:bg-error/20 text-error rounded-2xl px-6 transition-all active:scale-95"
                >
                  Reject
                </button>
                <button 
                  onClick={() => reviewRequest("accepted", request._id)} 
                  className="flex-1 md:flex-none btn btn-primary rounded-2xl px-8 shadow-lg shadow-primary/20 transition-all active:scale-95"
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
