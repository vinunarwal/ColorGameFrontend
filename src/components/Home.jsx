import React, { useState } from "react";
import { Link } from "react-router-dom";
function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };
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
              <Link
                to="/recharge"
                className="bg-green-500 text-white py-2 px-4 rounded mr-4"
              >
                Recharge
              </Link>
              <button
                className="bg-white text-black py-2 px-4 rounded"
                onClick={openPopup}
              >
                Read Rules
              </button>
              {isOpen && (
                <div className="fixed inset-0 z-[1000000]  flex items-center justify-center bg-gray-500 bg-opacity-75">
                  <div className="bg-white max-w-[420px] mx-auto rounded-lg p-4">
                    <h2 className="text-md font-bold mb-4">Rules</h2>
                    <p className="">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                      Fusce consectetur justo in tortor consectetur, id
                      scelerisque dolor efficitur.
                    </p>
                    <div className="text-center">
                      <button
                        className=" mr-4 mt-2 text-sm bg-[red] rounded-md px-[20px] py-[7px] text-white"
                        onClick={closePopup}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              )}
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
