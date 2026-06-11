import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";
import { clearFeed } from "../utils/feedSlice";
import { clearRequests } from "../utils/requestSlice";
import { removeConnections } from "../utils/connectionSlice";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const requests = useSelector((store) => store.requests) || [];
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        },
      );
      localStorage.removeItem("token");
      dispatch(removeUser());
      dispatch(clearFeed());
      dispatch(clearRequests());
      dispatch(removeConnections());
      navigate("/login");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <>
      <div className="navbar glass-card sticky top-0 z-50 px-4 md:px-12 py-4 shadow-2xl backdrop-blur-2xl bg-opacity-80 border-b border-white/5 justify-between transition-all duration-500">
        <div className="flex">
          <Link
            to="/"
            className="text-3xl font-black tracking-tighter bg-linear-to-br from-white via-white to-gray-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300 cursor-pointer"
          >
            DEV TINDER
          </Link>
        </div>

        <div className="flex items-center gap-4 md:gap-12 mr-4">
          {user && (
            <div className="dropdown dropdown-end">
              <div
                className="flex items-center gap-4 cursor-pointer group p-1 pr-3 rounded-full hover:bg-white/5 transition-all duration-300"
                tabIndex={0}
                role="button"
              >
                <div className="btn btn-ghost btn-circle avatar border-2 border-white/10 group-hover:border-white/40 transition-all duration-500 shadow-xl overflow-hidden">
                  <div className="w-11 rounded-full">
                    <img
                      alt="User profile"
                      src={
                        user.profilePicture ||
                        "https://ui-avatars.com/api/?name=" + user.firstName
                      }
                    />
                  </div>
                </div>
                <h4 className="text-sm font-bold hidden md:flex group-hover:text-white transition-colors duration-200 items-center gap-1.5">
                  Welcome, {user.firstName}{" "}
                  {user.isPremium && (
                    <span className="text-blue-400">
                      <svg
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-4 h-4 drop-shadow-[0_0_8px_rgba(59,130,246,0.5)]"
                      >
                        <path d="M22.5 12.5c0-1.58-.88-2.95-2.18-3.66.15-.44.22-.91.22-1.4 0-2.43-1.97-4.41-4.4-4.41-.48 0-.95.08-1.4.22C14.03 1.95 12.66 1.07 11.08 1.07c-1.58 0-2.95.88-3.66 2.18-.44-.15-.91-.22-1.4-.22-2.43 0-4.41 1.97-4.41 4.4 0 .48.08.95.22 1.4C.54 9.54-.34 10.92-.34 12.5c0 1.58.88 2.95 2.18 3.66-.15.44-.22.91-.22 1.4 0 2.43 1.97 4.41 4.4 4.41.48 0 .95-.08 1.4-.22 1.05 1.95 2.42 2.82 4.01 2.82 1.58 0 2.95-.88 3.66-2.18.44.15.91.22 1.4.22 2.43 0 4.41-1.97 4.41-4.4 0-.48-.08-.95-.22-1.4 1.3-1.05 2.18-2.42 2.18-4.01zm-14.12 3.12l-3.32-3.32 1.41-1.41 1.91 1.91 4.63-4.63 1.41 1.41-6.04 6.04z" />
                      </svg>
                    </span>
                  )}{" "}
                  👋
                </h4>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm bg-black/90 backdrop-blur-3xl dropdown-content rounded-2xl z-50 mt-6 w-64 p-3 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10"
              >
                <li className="menu-title px-4 py-2 text-[10px] opacity-40 uppercase tracking-[0.2em] font-black">
                  Account
                </li>
                <li>
                  <Link
                    to="/profile"
                    className="flex justify-between py-4 px-4 hover:bg-white/5 rounded-xl transition-all group/item"
                  >
                    <span className="font-medium group-hover/item:translate-x-1 transition-transform">
                      Profile
                    </span>
                    <span className="badge badge-sm border-white/10 opacity-40 group-hover/item:opacity-100 transition-opacity">
                      Edit
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/connections"
                    className="py-4 px-4 hover:bg-white/5 rounded-xl transition-all group/item"
                  >
                    <span className="font-medium group-hover/item:translate-x-1 transition-transform">
                      My Connections
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/requests"
                    className="py-4 px-4 hover:bg-white/5 rounded-xl transition-all group/item"
                  >
                    <span className="font-medium group-hover/item:translate-x-1 transition-transform">
                      Requests
                    </span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/premium"
                    className="flex justify-between py-4 px-4 hover:bg-primary/20 rounded-xl transition-all group/item border border-primary/10 mt-1"
                  >
                    <span className="font-bold text-primary group-hover/item:translate-x-1 transition-transform">
                      Upgrade to PRO
                    </span>
                    <span className="text-lg">✨</span>
                  </Link>
                </li>
                <div className="divider my-2 opacity-5"></div>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex py-4 px-4 hover:bg-error/10 text-error/80 hover:text-error rounded-xl transition-all w-full text-left font-bold"
                  >
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Bottom Navigation */}
      {user && (
        <div className="md:hidden fixed bottom-6 left-4 right-4 z-50">
          <div className="glass-card flex justify-around items-center p-4 rounded-3xl shadow-2xl border-white/10 backdrop-blur-2xl">
            <Link
              to="/"
              className="flex flex-col items-center gap-1 text-white/50 hover:text-primary transition-all active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                Feed
              </span>
            </Link>
            <Link
              to="/connections"
              className="flex flex-col items-center gap-1 text-white/50 hover:text-primary transition-all active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                Network
              </span>
            </Link>
            <Link
              to="/requests"
              className="flex flex-col items-center gap-1 text-white/50 hover:text-primary transition-all active:scale-90"
            >
              <div className="relative">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                  />
                </svg>
                {requests.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.8)]"></span>
                )}
              </div>
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                Requests
              </span>
            </Link>
            <Link
              to="/premium"
              className="flex flex-col items-center gap-1 text-white/50 hover:text-primary transition-all active:scale-90"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                />
              </svg>
              <span className="text-[8px] font-black uppercase tracking-[0.2em]">
                Premium
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
