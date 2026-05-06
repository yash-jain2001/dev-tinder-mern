import React from "react";
import { useState } from "react";
import EditProfileUserCard from "./EditProfileUserCard";
import axios from "axios";
import { BASE_URL } from "./../utils/constants";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";

const EditProfile = ({ user }) => {
  console.log(user);

  const [firstName, setFirstName] = useState(user.firstName);
  const [lastName, setLastName] = useState(user.lastName);
  const [skills, setSkills] = useState(user.skills);
  const [profilePicture, setProfilePicture] = useState(user.profilePicture);
  const [about, setAbout] = useState(user.about);
  const [age, setAge] = useState(user.age);
  const [gender, setGender] = useState(user.gender);
  const [error, setError] = useState("");
  const [showToast, setShowToast] = useState(false);

  const dispatch = useDispatch();

  const saveProfile = async () => {
    //clear error
    setError("");

    try {
      const res = await axios.patch(
        BASE_URL + "/profile/edit",
        { firstName, lastName, profilePicture, skills, age, gender, about },
        {
          withCredentials: true,
        },
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 2000);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-12 px-4 space-y-10">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-black tracking-tight bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
          Edit Your Profile
        </h1>
        <p className="text-white/50">Personalize how others see you in the community</p>
      </div>

      <div className="flex flex-col lg:flex-row items-start justify-center gap-12">
        {/* Form Section */}
        <div className="w-full lg:max-w-xl animate-in slide-in-from-left-8 duration-500">
          <div className="glass-card p-8 rounded-[2.5rem] shadow-2xl space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">First Name</label>
                <input
                  type="text"
                  placeholder="First Name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary rounded-2xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Last Name</label>
                <input
                  type="text"
                  placeholder="Last Name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary rounded-2xl"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Profile Picture URL</label>
              <div className="join w-full">
                <span className="join-item bg-white/5 border-white/10 px-4 flex items-center text-white/30 text-sm">https://</span>
                <input
                  type="text"
                  value={profilePicture}
                  onChange={(e) => setProfilePicture(e.target.value)}
                  className="input input-bordered join-item w-full bg-white/5 border-white/10 focus:border-primary"
                  placeholder="example.com/photo.jpg"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Age</label>
                <input
                  type="number"
                  placeholder="e.g. 25"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary rounded-2xl"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Gender</label>
                <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 gap-1">
                  <button 
                    onClick={() => setGender("male")}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${gender === "male" ? "bg-primary text-white shadow-lg" : "hover:bg-white/5 text-white/40"}`}
                  >
                    Male
                  </button>
                  <button 
                    onClick={() => setGender("female")}
                    className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${gender === "female" ? "bg-primary text-white shadow-lg" : "hover:bg-white/5 text-white/40"}`}
                  >
                    Female
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">About Me</label>
              <textarea
                placeholder="Tell us about yourself..."
                value={about}
                onChange={(e) => setAbout(e.target.value)}
                className="textarea textarea-bordered w-full bg-white/5 border-white/10 focus:border-primary rounded-2xl h-24"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-white/40 uppercase tracking-widest ml-1">Skills (comma separated)</label>
              <input
                type="text"
                placeholder="React, Node.js, Python..."
                value={skills}
                onChange={(e) => setSkills(e.target.value.split(","))}
                className="input input-bordered w-full bg-white/5 border-white/10 focus:border-primary rounded-2xl"
              />
            </div>

            <button 
              onClick={saveProfile} 
              className="btn btn-primary w-full rounded-2xl h-14 text-lg font-black shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 active:scale-95 mt-4"
            >
              Save Changes
            </button>
          </div>
        </div>

        {/* Preview Section */}
        <div className="w-full lg:sticky lg:top-32 flex flex-col items-center gap-4 animate-in slide-in-from-right-8 duration-500">
          <div className="text-xs font-bold text-white/20 uppercase tracking-[0.3em] mb-2">Live Preview</div>
          {user && (
            <EditProfileUserCard
              user={{
                firstName,
                lastName,
                profilePicture,
                skills,
                age,
                gender,
                about,
              }}
            />
          )}
        </div>
      </div>

      {showToast && (
        <div className="toast toast-top toast-center z-50">
          <div className="alert alert-success bg-success/20 backdrop-blur-md border border-success/30 text-success rounded-2xl shadow-2xl px-8 py-4 animate-in slide-in-from-top-12">
            <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            <span className="font-bold">Profile updated successfully!</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditProfile;
