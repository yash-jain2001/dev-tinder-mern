import axios from "axios";
import React, { useEffect } from "react";
import { BASE_URL } from "../utils/constants";
import { addFeed } from "../utils/feedSlice";
import { useDispatch, useSelector } from "react-redux";
import FeedUserCard from "./FeedUserCard";

const Feed = () => {
  const dispatch = useDispatch();

  const feed = useSelector((store) => store.feed);
  console.log(feed);

  useEffect(() => {
    const getFeed = async () => {
      if (feed && feed.length > 0) {
        return;
      }
      try {
        const res = await axios.get(BASE_URL + "/feed", {
          withCredentials: true,
        });
        // console.log(res.data);
        dispatch(addFeed(res?.data?.data));
      } catch (err) {
        console.log(err);
      }
    };
    getFeed();
  }, []);
  if (!feed) return <div className="text-center w-full text-4xl font-bold">No more user found</div>
  if (feed.length <= 0)
    return (
      <h1 className="text-center w-full text-4xl font-bold">
        No more new users found
      </h1>
    );
  return (
    feed && (
      <div className="flex items-center justify-center mt-10">
        <FeedUserCard user={feed[0]} />
      </div>
    )
  );
};

export default Feed;
