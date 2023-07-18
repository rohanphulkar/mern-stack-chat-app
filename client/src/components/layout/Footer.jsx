import React from "react";
import { RiAtLine } from "react-icons/ri";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <footer className="mt-auto w-full max-w-[85rem] py-10 px-4 sm:px-6 lg:px-8 mx-auto">
        {/* Grid */}
        <div className="text-center">
          <div>
            <Link to="/">
              <p className="flex items-center justify-center text-xl font-bold text-blue-600 space-x-1">
                <RiAtLine fontSize={36} /> <span>Metabyte</span>
              </p>
            </Link>
          </div>
          {/* End Col */}
          <div className="">
            <p className="text-gray-500">
              © Metabyte. 2023. All rights reserved.
            </p>
          </div>
        </div>
        {/* End Grid */}
      </footer>
    </div>
  );
};

export default Footer;
