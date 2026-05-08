import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((store) => store.user);

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          email,
          password,
        },
        {
          withCredentials: true, // it is necessary to pass withCredentials to true in making api call
        },
      );
      console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      setError(err.response.data);
      console.error(err.message);
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      dispatch(addUser(res.data.data));
      navigate("/profile");
    } catch (err) {
      console.log(err.message);
      setError(err.response.data);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-200px)] py-12 px-4">
      <div className="glass-card w-full max-w-md p-8 rounded-3xl shadow-2xl space-y-8 animate-in fade-in zoom-in duration-500">
        <div className="text-center space-y-2">
          <h2 className="text-3xl font-extrabold tracking-tight text-white">
            {isLoginForm ? "Welcome Back" : "Create Account"}
          </h2>
          <p className="text-sm text-white/60">
            {isLoginForm 
              ? "Sign in to connect with developers worldwide" 
              : "Join the largest community of passionate developers"}
          </p>
        </div>

        <div className="space-y-4">
          {!isLoginForm && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">First Name</label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary transition-all rounded-xl"
                  placeholder="John"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">Last Name</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary transition-all rounded-xl"
                  placeholder="Doe"
                />
              </div>
            </div>
          )}

          <div className="space-y-1">
            <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary transition-all rounded-xl"
              placeholder="name@example.com"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-white/70 ml-1 uppercase tracking-wider">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary transition-all rounded-xl"
              placeholder="••••••••"
            />
          </div>
        </div>

        {error && (
          <div className="alert alert-error bg-error/10 border-error/20 text-error text-xs py-2 rounded-xl animate-shake">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-4 w-4" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span>{error}</span>
          </div>
        )}

        <div className="space-y-4">
          <button
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="btn btn-primary w-full rounded-xl text-lg font-bold shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            {isLoginForm ? "Sign In" : "Sign Up"}
          </button>

          <div className="text-center">
            <p className="text-sm text-white/50">
              {isLoginForm ? "New to Dev Tinder?" : "Already have an account?"}
              <button
                className="ml-2 text-primary font-bold hover:underline"
                onClick={() => {
                  setIsLoginForm(!isLoginForm);
                  setError("");
                }}
              >
                {isLoginForm ? "Create Account" : "Log In"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
