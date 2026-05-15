import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/connectionSlice";
import { Link } from "react-router-dom";

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
      <div className="text-2xl font-bold text-center text-white/20 mt-20 animate-in fade-in duration-1000">
        No connections found
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8 md:space-y-12 py-6 md:py-10 px-4">
      <div className="text-center space-y-2 md:space-y-3">
        <h1 className="text-3xl md:text-5xl font-black tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Your Network
        </h1>
        <p className="text-white/50 text-sm md:text-lg">
          You have {connections.length} professional connections
        </p>
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
            age,
          } = connection;
          return (
            <div
              key={_id}
              className="glass-card group rounded-4xl flex flex-col justify-between px-4 pt-4 pb-4 space-y-6 transition-all duration-500 hover:bg-white/10 hover:-translate-y-2 animate-in zoom-in-95"
            >
              <div className="flex items-center gap-6">
                <div className="avatar relative">
                  <div className="w-20 rounded-2xl ring ring-primary/20 ring-offset-base-100 ring-offset-2 transition-all duration-500 group-hover:ring-primary/50">
                    <img
                      src={
                        profilePicture ||
                        "https://ui-avatars.com/api/?name=" + firstName
                      }
                      alt={firstName}
                    />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success rounded-full border-4 border-base-100 shadow-lg"></div>
                </div>
                <div className="space-y-1">
                  <h2 className="text-2xl font-black text-white group-hover:text-primary transition-colors flex items-center gap-2">
                    {firstName} {lastName}
                    {connection.isPremium && (
                      <span className="text-blue-400">
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-5 h-5 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                        >
                          <path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.15-.44.22-.91.22-1.4 0-2.43-1.97-4.41-4.4-4.41-.48 0-.95.08-1.4.22C14.03 1.95 12.66 1.07 11.08 1.07c-1.58 0-2.95.88-3.66 2.18-.44-.15-.91-.22-1.4-.22-2.43 0-4.41 1.97-4.41 4.4 0 .48.08.95.22 1.4C.54 9.54-.34 10.92-.34 12.5c0 1.58.88 2.95 2.18 3.66-.15.44-.22.91-.22 1.4 0 2.43 1.97 4.41 4.4 4.41.48 0 .95-.08 1.4-.22 1.05 1.95 2.42 2.82 4.01 2.82 1.58 0 2.95-.88 3.66-2.18.44.15.91.22 1.4.22 2.43 0 4.41-1.97 4.41-4.4 0-.48-.08-.95-.22-1.4 1.3-1.05 2.18-2.42 2.18-4.01zm-14.12 3.12l-3.32-3.32 1.41-1.41 1.91 1.91 4.63-4.63 1.41 1.41-6.04 6.04z" />
                        </svg>
                      </span>
                    )}
                  </h2>
                  <div className="flex gap-2">
                    <span className="badge badge-outline badge-xs opacity-50 uppercase tracking-tighter">
                      {gender}
                    </span>
                    <span className="badge badge-outline badge-xs opacity-50">
                      {age} yrs
                    </span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm text-white/60 line-clamp-2 italic leading-relaxed">
                  "
                  {about ||
                    "A passionate developer always looking for new opportunities and collaborations."}
                  "
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {skills?.slice(0, 4).map((skill, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-primary/5 border border-primary/20 text-[10px] font-bold text-primary/80 rounded-lg uppercase tracking-widest"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="w-full flex gap-12 justify-between ">
                {/* <button className="flex-1 w-fit btn btn-ghost btn-sm rounded-xl text-white/40 hover:text-white transition-all">
                  Chat
                </button> */}
                <Link
                  to={"/chat/:"+_id}
                  className="flex-1 w-fit btn btn-primary btn-sm rounded-xl shadow-lg shadow-primary/10 transition-all active:scale-95"
                >
                  Chat
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
