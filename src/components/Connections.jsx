import axios from "axios"   .;
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnection = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/myconnections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (error) {
      console.log(error.response.data);
    }
  };

  useEffect(() => {
    fetchConnection();
  }, []);

  if (!connections) return null;

  if (connections?.length === 0) {
    return (
      <div className="text-2xl font-bold text-center ml-4 mt-4">
        No connections found{" "}
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-12 py-10 px-4">
      <div className="text-center space-y-3">
        <h1 className="text-5xl font-black tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Network
        </h1>
        <p className="text-white/50 text-lg">You have {connections.length} professional connections</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {connections.map((connection) => {
          const {
            _id,
            firstName,
            lastName,
            profilePicture,
            about,
            skills,
            gender,
            age
          } = connection;
          return (
            <div key={_id} className="glass-card group rounded-4xl flex flex-col justify-between px-4 pt-4 pb-4 space-y-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 animate-in zoom-in-95">
              <div className="flex items-center gap-6">
                <div className="avatar relative">
                  <div className="w-20 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-2 transition-all duration-500 group-hover:ring-primary/50">
                    <img src={profilePicture || "https://ui-avatars.com/api/?name=" + firstName} alt={firstName} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-4 border-base-100 shadow-lg"></div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-bold text-white group-hover:text-primary transition-colors ">
                    {firstName} {lastName}
                  </h2>
                  <div className="flex gap-2">
                    <span className="badge badge-outline badge-xs opacity-50 uppercase tracking-tighter">{gender}</span>
                    <span className="badge badge-outline badge-xs opacity-50">{age} yrs</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-white/60 line-clamp-2 italic leading-relaxed">
                  "{about || "A passionate developer always looking for new opportunities and collaborations."}"
                </p>
                
                <div className="flex flex-wrap gap-1.5">
                  {skills?.slice(0, 4).map((skill, idx) => (
                    <span key={idx} className="px-3 py-1 bg-primary/5 border border-primary/20 text-[10px] font-bold text-primary/80 rounded-lg uppercase tracking-widest">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full flex gap-12 justify-between ">
                <button className="flex-1 w-fit btn btn-ghost btn-sm rounded-xl text-white/40 hover:text-white transition-all">
                  Chat
                </button>
                <button className="flex-1 w-fit btn btn-primary btn-sm rounded-xl shadow-lg shadow-primary/10 transition-all active:scale-95">
                  Profile
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
