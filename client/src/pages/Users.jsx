import React, { useEffect, useState } from "react";

import jwt_decode from "jwt-decode";
import { ToastContainer } from "react-toastify";
import { error } from "../components/toast";
import { useNavigate } from "react-router-dom";
const Users = ({ token }) => {
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  if (token) {
    var decoded = jwt_decode(token);
  }
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/user/users/`)
      .then((res) => res.json())
      .then((data) =>
        setUsers(data.filter((user) => user.email !== decoded.email))
      );
  }, []);
  const allUsers = users.filter((user) =>
    user.email.includes(search.toLowerCase())
  );
  const imageStyle = {
    filter:
      "brightness(0) saturate(100%) invert(28%) sepia(98%) saturate(3043%) hue-rotate(217deg) brightness(96%) contrast(91%)",
  };
  const createChat = async (member_id) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/chat/create/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: decoded.id,
          member: member_id,
        }),
      }
    );
    const data = await response.json();
    if (response.status === 200 || response.status === 201) {
      navigate(`/chat/${data._id}`);
    }
    error("Something went wrong!");
  };
  return (
    <div>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        {/* Title */}
        <div className="max-w-2xl text-center mx-auto mb-10 lg:mb-14">
          <h2 className="text-2xl font-bold md:text-4xl md:leading-tight">
            Chat
          </h2>
          <div className=" mt-3 mx-auto w-full">
            <label htmlFor="icon" className="sr-only">
              Search
            </label>
            <div className="">
              <input
                type="text"
                onChange={(e) => {
                  setSearch(e.target.value);
                }}
                id="icon"
                name="icon"
                className="py-2 px-4  block w-full border border-gray-700 shadow-sm rounded-md text-sm mx-auto focus:border-gray-900 focus:ring-gray-600"
                placeholder="Search Users..."
              />
            </div>
          </div>
        </div>
        {/* End Title */}
        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 lg:mb-14">
          {/* Card */}
          {allUsers &&
            allUsers.map((user) => (
              <div
                className="w-full max-w-xs bg-white rounded-full"
                key={user._id}
              >
                <div className="flex flex-col items-center py-7 px-4">
                  <img
                    className="mb-3 object-contain"
                    width={56}
                    src="https://img.icons8.com/parakeet/96/user.png"
                    style={imageStyle}
                    alt={user.name}
                  />
                  <h5 className="mb-1  font-medium text-gray-900">
                    {user.email}
                  </h5>
                  <div className="flex mt-2 space-x-3">
                    <button
                      onClick={() => {
                        createChat(user._id);
                      }}
                      className="inline-flex items-center px-4 py-2 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300"
                    >
                      Chat Now
                    </button>
                  </div>
                </div>
              </div>
            ))}

          {/* Card End */}
        </div>
        {/* End Grid */}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Users;
