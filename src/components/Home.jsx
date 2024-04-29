import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [bankBalance, setBankBalance] = useState("0");

  useEffect(()=>{
    const token = localStorage.getItem('token');
      if (token) {
         const decodedToken = jwtDecode(token);

         axios.get(`http://localhost:5000/user/${decodedToken.userId}`)
         .then(response => {
          setBankBalance(response.data.bankBalance);
         })
         .catch(error => {
            console.error('Error fetching user data:', error);
         });
     
      }
  } ,[]
);

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
          <p className="text-white text-lg">Available Balance: {bankBalance}</p>
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
                  <div className="bg-white max-w-[400px] mx-auto rounded-lg p-4 max-w-md">
                    <h2 className="text-md font-bold mb-4">Rule of guess:</h2>
                    <p className="text-[13px] mt-2">
                      3 minutes 1 issue, 2 minutes and 30 seconds to order, 30
                      seconds to show the lottery result. It opens all day. The
                      total number of trade is 480 issues
                    </p>
                    <p className="text-[13px] mt-2">
                      If you spend 100 to trade, after deducting 2 service fee,
                      your contract amount is 98:
                    </p>

                    <p className="text-[13px] mt-2">
                      1. JOIN GREEN: if the result shows 1,3,7,9, you will get
                      (98*2) 196 If the result shows 5, you will get (98*1.5)
                      147
                    </p>
                    <p className="text-[13px] mt-2">
                      2. JOIN RED: if the result shows 2,4,6,8, you will get
                      (98*2) 196; If the result shows 0, you will get (98*1.5)
                      147
                    </p>
                    <p className="text-[13px] mt-2">
                      3. JOIN VIOLET: if the result shows 0 or 5, you will get
                      (98*4.5) 441
                    </p>
                    <p className="text-[13px] mt-2">
                      4.SELECT NUMBER:if the result is the same as the number
                      you selected, you will get(98*9)882.
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
