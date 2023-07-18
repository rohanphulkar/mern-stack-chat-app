import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { error } from "../components/toast";
import { ToastContainer } from "react-toastify";
import jwt_decode from "jwt-decode";
import { io } from "socket.io-client";
import InputEmoji from "react-input-emoji";

const Chat = ({ token }) => {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  var msgRef = useRef();
  if (token) {
    var decoded = jwt_decode(token);
  }

  const fetchMessages = async () => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/message/${id}`
    );
    const data = await response.json();
    if (response.status === 200) {
      setMessages(data);
    } else {
      error("something went wrong");
    }
  };

  const getUser = async () => {
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/${id}`);
    const data = await response.json();
    if (response.status === 200) {
      const user_id = data.members.filter((user) => {
        return user !== decoded.id;
      });
      await fetch(`${import.meta.env.VITE_API_URL}/user/${user_id}/`)
        .then((res) => res.json())
        .then((data) => {
          setUser(data.email);
        });
    } else {
      error("something went wrong");
    }
  };
  useEffect(() => {
    fetchMessages();
    getUser();
  }, [id]);

  useEffect(() => {
    var socket = io(import.meta.env.VITE_API_URL);

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("join-room", id);
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    socket.on("receive-message", (msg) => {
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);
  const sendMessage = () => {
    if (newMessage) {
      var socket = io(import.meta.env.VITE_API_URL);
      const msg = {
        chat: id,
        sender: decoded.id,
        content: newMessage,
      };
      socket.emit("send-message", msg, id);
      socket.on("receive-message", (msg) => {
        setMessages((prevMessages) => [...prevMessages, msg]);
        msgRef.current.innerHTML += `<li className="flex gap-x-2 sm:gap-x-4"><div><div className="bg-gray-900 text-white border border-gray-800 rounded-lg p-4 space-y-3"><h2 className="font-medium">{message.content}</h2></div></div></li>`;
      });
      setNewMessage("");
    }
  };

  return (
    <div>
      <div>
        {/* Content */}
        <div className="w-full">
          {/* Search */}
          <div className="max-w-2xl mx-auto  p-3 sm:py-6">
            {/* Content */}
            <div className="">
              {/* Title */}
              <div className="text-center">
                <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
                  User: {user ? user : "Anonymous User"}
                </h1>
              </div>
              {/* End Title */}
              <div className="max-w-4xl max-h-[42rem] px-4 py-6 sm:px-6 lg:px-8 mx-auto overflow-y-auto">
                <ul className="mt-16 space-y-5" ref={msgRef}>
                  {/* Chat Bubble */}
                  {messages.length > 0 &&
                    messages.map((message) => (
                      <li
                        key={message._id}
                        className={`flex gap-x-2 sm:gap-x-4 ${
                          message.sender === decoded.id ? "justify-end" : ""
                        }`}
                      >
                        <div>
                          {/* Card */}
                          <div
                            className={`${
                              message.sender === decoded.id
                                ? "bg-white text-gray-900"
                                : " bg-gray-900 text-white"
                            } border border-gray-800 rounded-lg p-4 space-y-3`}
                          >
                            <h2 className="font-medium">{message.content}</h2>
                          </div>
                        </div>
                        {/* End Card */}
                      </li>
                    ))}
                  {/* End Chat Bubble */}
                </ul>
              </div>
              <div>
                <label
                  htmlFor="search"
                  className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
                >
                  Search
                </label>
                <div className="flex items-center">
                  <InputEmoji
                    id="message"
                    name="message"
                    onChange={setNewMessage}
                    value={newMessage}
                    onEnter={sendMessage}
                    cleanOnEnter
                    placeholder="Type a message ..."
                  />

                  <button
                    onClick={() => {
                      sendMessage();
                    }}
                    type="button"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
            {/* End Content */}
          </div>

          {/* End Search */}
        </div>
        {/* End Content */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Chat;
