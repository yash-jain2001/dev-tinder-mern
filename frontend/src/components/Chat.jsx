import React from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";

const Chat = () => {
  const [messages, setMessages] = useState(["Hello", "Hi"]);

  const { targetUserId } = useParams();
  console.log(targetUserId);

  return (
    <div className="w-1/2 mx-auto border px-4 py-2">
      <div>
        <h1 className="border-b-2 border-gray-600">Chat with {targetUserId}</h1>
      </div>
      <div className="flex flex-col justify-between w-full h-[500px]">
        <div className="h-full p-4 overflow-y-scroll">
          {/*display message*/}

          {messages.map((msg, idx) => {
            return (
              <>
                <div key={idx} className="chat chat-start">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">{msg}</div>
                </div>
                <div key={idx+1} className="chat chat-end">
                  <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                      <img
                        alt="Tailwind CSS chat bubble component"
                        src="https://img.daisyui.com/images/profile/demo/anakeen@192.webp"
                      />
                    </div>
                  </div>
                  <div className="chat-bubble">{msg}</div>
                </div>
              </>
            );
          })}
        </div>
        <div className="border flex rounded-full">
          <input className="border-none w-full outline-none px-4 py-1.5 bg-gray-900 rounded-full rounded-r-none"></input>
          <button className="px-4 py-1.5 bg-primary rounded-full rounded-l-none">
            send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
