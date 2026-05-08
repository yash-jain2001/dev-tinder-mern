import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";

const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if(userData) return;
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      } else {
        console.log(err.message);
      }
    }
  };

  useEffect(() => {
      fetchUser();
  }, []);

  return (
    <div className="min-h-screen flex flex-col font-sans gradient-bg overflow-x-hidden">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 md:px-8 py-6">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Body;
