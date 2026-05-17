import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useState } from "react";
import createSocketConnection from "../utils/socket";
import { useSelector } from "react-redux";
import { BASE_URL } from "../utils/constants";
import axios from "axios";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  let { targetUserId } = useParams();
  targetUserId = targetUserId.replace(/^:/, "");
  console.log(targetUserId);

  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const [socket, setSocket] = useState(null);
  const connections = useSelector((store) => store.connections);
  const targetUser = connections?.find((c) => c._id === targetUserId);

  const fetchChatMessages = async () => {
    const chat = await axios.get(BASE_URL + `/chat/${targetUserId}`, {
      withCredentials: true,
    });
    console.log(chat.data.messages);
    const chatMessages = chat.data.messages.map((msg) => {
      return {firstName:msg.senderId.firstName,lastName:msg.senderId.lastName,text:msg.text};
    });
    setMessages(chatMessages);
  }; 

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    setSocket(socket);

    socket.emit("joinChat", {
      firstName: user?.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageRecieved", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId, user?.firstName]);

  const sendMessage = () => {
    if (socket) {
      socket.emit("sendMessage", {
        firstName: user?.firstName,
        userId,
        targetUserId,
        text: newMessage,
      });
      setNewMessage("");
    }
  };

  return (
    <div className="w-3/4 mx-auto flex flex-col h-[calc(100vh-12rem)]">
      {/* Header */}
      <div className="glass-card rounded-t-3xl px-6 py-5 border-b border-white/5 flex items-center gap-4">
        <div className="w-11 h-11 rounded-full bg-linear-to-r from-primary to-secondary flex items-center justify-center text-white font-black text-lg shadow-lg shadow-primary/20">
          {targetUser?.firstName?.charAt(0)?.toUpperCase() || "💬"}
        </div>
        <div>
          <h1 className="text-xl font-black tracking-tight text-white">
            Chat Room
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-2 h-2 rounded-full bg-success animate-pulse"></span>
            <span className="text-[11px] text-white/40 font-semibold uppercase tracking-widest">
              Live
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="glass-card rounded-none border-x border-white/5 flex flex-col flex-1 min-h-0 w-full">
        <div className="h-full p-5 overflow-y-auto space-y-1">
          {/*display message*/}

          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center opacity-15 select-none">
              <div className="text-6xl mb-3">💬</div>
              <p className="text-sm font-semibold tracking-wide">
                No messages yet
              </p>
            </div>
          )}

          {messages.map((msg, idx) => {
            const isSender = msg.firstName === user?.firstName;
            return (
              <div
                key={idx}
                className={`chat ${isSender ? "chat-end" : "chat-start"}`}
              >
                <div className="chat-header text-[11px] font-semibold text-white/40 mb-0.5 px-1">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div
                  className={`chat-bubble text-sm shadow-md ${
                    isSender
                      ? "bg-primary text-primary-content"
                      : "bg-base-100/80 text-white/90 border border-white/5"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            );
          })}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-white/5">
          <div className="flex items-center gap-2 bg-base-100/50 rounded-2xl border border-white/10 px-2 py-1 transition-all focus-within:border-primary/40 focus-within:shadow-lg focus-within:shadow-primary/5">
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 bg-transparent outline-none px-4 py-2.5 text-sm text-white placeholder:text-white/20"
              placeholder="Type a message..."
            ></input>
            <button
              onClick={sendMessage}
              className="btn btn-primary btn-sm rounded-xl px-5 shadow-lg shadow-primary/20 font-bold tracking-wide transition-all active:scale-95"
            >
              Send
            </button>
          </div>
        </div>
      </div>

      {/* Footer accent */}
      <div className="glass-card rounded-b-3xl h-2 bg-linear-to-r from-primary/20 to-secondary/20"></div>
    </div>
  );
};

export default Chat;
