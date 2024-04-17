import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

function Home() {
  return (
    <div className="container mx-auto px-4">
      <div className="bg-slate-300 mx-auto py-2" style={{ maxWidth: "420px" }}>
        <div
          className="bg-blue-500 p-4 rounded-lg mx-auto"
          style={{ maxWidth: "640px" }}
        >
          <p className="text-white text-lg">Available Balance: 0.00</p>
          <div className="flex justify-between items-center">
            <div className="mt-4">
              <Link to ="/recharge" className="bg-green-500 text-white py-2 px-4 rounded mr-4">
                Recharge
              </Link>
              <button className="bg-white text-black py-2 px-4 rounded">
                Read Rules
              </button>
            </div>
            <div className="mt-4">
              <button className="bg-white text-black py-2 px-3 rounded-full">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="w-6 h-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Home;
