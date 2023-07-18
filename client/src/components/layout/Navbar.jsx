import jwt_decode from "jwt-decode";
import React from "react";
import { RiAtLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
const Navbar = ({ token }) => {
  const [cookies, setCookie, removeCookie] = useCookies(["jwt"]);

  if (token) {
    var decoded = jwt_decode(token);
  }

  return (
    <div>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4">
        <nav
          className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between"
          aria-label="Global"
        >
          <Link to="/">
            <p className="flex items-center text-xl font-bold text-blue-600 space-x-1">
              <RiAtLine fontSize={36} /> <span>Metabyte</span>
            </p>
          </Link>
          <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:pl-5">
            {token ? (
              <>
                <span className="font-medium border-b border-gray-600">
                  {decoded.email}
                </span>
                <button
                  onClick={() => {
                    removeCookie("jwt");
                    console.log("cliecked logout");
                  }}
                  type="button"
                  className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full bg-blue-100 border border-transparent font-semibold text-blue-500 hover:text-white hover:bg-blue-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full bg-blue-100 border border-transparent font-semibold text-blue-500 hover:text-white hover:bg-blue-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button
                    type="button"
                    className="py-3 px-4 inline-flex justify-center items-center gap-2 rounded-full bg-blue-100 border border-transparent font-semibold text-blue-500 hover:text-white hover:bg-blue-100 focus:outline-none focus:ring-2 ring-offset-white focus:ring-blue-500 focus:ring-offset-2 transition-all text-sm"
                  >
                    Sign Up
                  </button>
                </Link>
              </>
            )}
          </div>
        </nav>
      </header>
    </div>
  );
};

export default Navbar;
