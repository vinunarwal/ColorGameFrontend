import React from "react";
import { Link } from "react-router-dom";
function Footer() {
  return (
    // <div className="fixed bottom-0 left-0 right-0 bg-gray-800 text-white">
    <div className="container fixed bottom-0 z-[10000] left-0 right-0 mx-auto px-4zz">
      <div className="bg-slate-400 mx-auto py-2 max-w-[420px]">
        <div className=" flex items-center justify-around px-4 mx-auto max-w-[640px]">
          <Link to ='/main' className="flex flex-col items-center justify-center  text-white py-2 px-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5 3a1 1 0 011-1h8a1 1 0 011 1v7a1 1 0 01-1 1h-3v5a1 1 0 01-1 1H9a1 1 0 01-1-1v-5H5a1 1 0 01-1-1V3zm10 10h3a1 1 0 001-1V5a1 1 0 00-1-1h-3v9zm-4 0h3v2h-3v-2zm-4 0h3v2H7v-2z"
                clipRule="evenodd"
              />
            </svg>
            Home
          </Link>
          <Link to ='/recharge' className="flex flex-col items-center justify-center  text-white py-2 px-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h3.586a1 1 0 01.707.293l4.414 4.414a1 1 0 001.414 0L15.707 16.7a1 1 0 011.414 0l4.586 4.586V5a1 1 0 00-1-1H3zm15-1a2 2 0 012 2v14a2 2 0 01-2 2H3a2 2 0 01-2-2V5a2 2 0 012-2h15zm-9 8a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1zm4 0a1 1 0 011 1v3a1 1 0 11-2 0v-3a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Recharge
          </Link>
          <button className="flex flex-col items-center justify-center text-white py-2 px-4 rounded">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-0"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 1a9 9 0 019 9c0 4.97-4.03 9-9 9-4.97 0-9-4.03-9-9A9 9 0 0110 1zm0 2a7 7 0 00-7 7c0 3.866 3.134 7 7 7s7-3.134 7-7a7 7 0 00-7-7zm-.5 3a.5.5 0 00-.5.5v3.25a.5.5 0 00.777.416l2.223-1.334a.5.5 0 000-.832L9.777 6.25A.5.5 0 009 6.666V10.5a.5.5 0 00.5.5z"
                clipRule="evenodd"
              />
            </svg>
            Win
          </button>
          <Link to="/ProfilePage">
            <button className="flex flex-col items-center justify-center  text-white py-2 px-4 rounded">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-0"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a9 9 0 019 9c0 4.97-4.03 9-9 9-4.97 0-9-4.03-9-9A9 9 0 0110 1zm0 2a7 7 0 00-7 7c0 3.866 3.134 7 7 7s7-3.134 7-7a7 7 0 00-7-7zm-.5 3a.5.5 0 00-.5.5v3.25a.5.5 0 00.777.416l2.223-1.334a.5.5 0 000-.832L9.777 6.25A.5.5 0 009 6.666V10.5a.5.5 0 00.5.5z"
                  clipRule="evenodd"
                />
              </svg>
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
