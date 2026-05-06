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
  // console.log(user);
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
      // console.log(res.data);
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
    <div className="navbar glass-card sticky top-0 z-50 px-4 md:px-8 py-3 shadow-lg backdrop-blur-md bg-opacity-70 justify-between transition-all duration-300">
      <div className="flex">
        <Link to="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent hover:scale-105 transition-transform duration-200 cursor-pointer ml-4">
          Dev Tinder 🧑‍💻
        </Link>
      </div>

      <div className="flex items-center gap-4 md:gap-8 mr-4">
        {user && (
          <div className="dropdown dropdown-end">
            <div className="flex items-center gap-3 cursor-pointer group" tabIndex={0} role="button">
              <h4 className="text-sm font-medium hidden md:block group-hover:text-primary transition-colors duration-200">
                Welcome, {user.firstName} 👋
              </h4>
              <div className="btn btn-ghost btn-circle avatar border-2 border-primary/20 group-hover:border-primary transition-all duration-200">
                <div className="w-10 rounded-full">
                  <img
                    alt="User profile"
                    src={user.profilePicture || "https://ui-avatars.com/api/?name=" + user.firstName}
                  />
                </div>
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm bg-base-300/90 backdrop-blur-lg dropdown-content rounded-xl z-50 mt-4 w-56 p-2 shadow-2xl border border-white/5"
            >
              <li className="menu-title px-4 py-2 text-xs opacity-50 uppercase tracking-wider font-bold">Account</li>
              <li>
                <Link to="/profile" className="flex justify-between py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors">
                  Profile
                  <span className="badge badge-sm badge-outline opacity-50">View</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="flex justify-between py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors">
                  My Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="flex justify-between py-3 px-4 hover:bg-primary/10 rounded-lg transition-colors">
                  Requests
                  <span className="badge badge-sm badge-primary">New</span>
                </Link>
              </li>
              <div className="divider my-1 opacity-20"></div>
              <li>
                <button 
                  onClick={handleLogout}
                  className="flex py-3 px-4 hover:bg-error/10 text-error rounded-lg transition-colors w-full text-left"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
