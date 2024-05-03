import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt, faMedal, faUser } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    // <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
    <div className="container  z-[10000] mx-auto ">
      <div className="bg-slate-400 mx-auto py-2 max-w-[420px]">
        <div className=" flex items-center justify-around px-4 mx-auto max-w-[640px]">
          <Link to='/main' className="flex flex-col items-center justify-center  text-white py-2 px-4 rounded">
            <FontAwesomeIcon icon={faHome} className="w-6 h-6" />
            Home
          </Link>
          <Link to='/recharge' className="flex flex-col items-center justify-center  text-white py-2 px-4 rounded">
            <FontAwesomeIcon icon={faBolt} className="w-6 h-6" />
            Recharge
          </Link>
          <Link to="/win">
            <button className="flex flex-col items-center justify-center text-white py-2 px-4 rounded">
              <FontAwesomeIcon icon={faMedal} className="w-6 h-6" />
              Win
            </button>
          </Link>

          <Link to="/ProfilePage">
            <button className="flex flex-col items-center justify-center  text-white py-2 px-4 rounded">
              <FontAwesomeIcon icon={faUser} className="w-6 h-6" />
              My
            </button>
          </Link>
        </div>
      </div>
    </div>
    // </div>
  );
}

export default Footer;
