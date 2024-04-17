import React, { useState, useEffect } from "react";
import GameRecord from "./GameRecord";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";

function ColorPicker() {
   const [timer, setTimer] = useState(180); 
   const [id, setId] = useState(1234567890); 
   const [periodIds, setPeriodIds] = useState([]); 
   const [amount, setAmount] = useState("");

   useEffect(() => {
      const interval = setInterval(() => {
         if (timer > 0) {
            setTimer(timer - 1);
         } else {
            setTimer(2);
            setId((prevId) => prevId + 1);
            setPeriodIds((prevIds) => [id, ...prevIds]); // Add current ID to periodIds array
         }
      }, 1000);

      return () => clearInterval(interval);
   }, [timer]);

   const minutes = Math.floor(timer / 60);
   const seconds = timer % 60;
   const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

   // Function to handle updating periodIds in GameRecord component
   const updatePeriodIds = (newId) => {
      setPeriodIds((prevIds) => [...prevIds, newId]); // Add new ID to periodIds array
   };

   const handleBet = (selection, periodId) => {
      let amount = 10; 
      Swal.fire({
         title: "Place Your Bet",
         html: `
        <input id="amountInput" type="number" placeholder="Enter Amount (min: 10)" class="swal2-input" value="10" min="10">
        <div class="flex justify-around mt-4">
          <button id="increaseBy10" class="swal2-confirm swal2-styled">+10</button>
          <button id="increaseBy100" class="swal2-confirm swal2-styled">+100</button>
          <button id="increaseBy1000" class="swal2-confirm swal2-styled">+1000</button>
        </div>
      `,
         focusConfirm: false,
         showCancelButton: true,
         cancelButtonText: 'Cancel',
         preConfirm: () => {
            amount = document.getElementById("amountInput").value;
            if (!amount || amount < 10) {
               Swal.showValidationMessage("Please enter a valid amount (min: 10)");
            } else {
               return amount;
            }
         },
         didOpen: () => {
            const increaseBy10Button = document.getElementById("increaseBy10");
            const increaseBy100Button = document.getElementById("increaseBy100");
            const increaseBy1000Button = document.getElementById("increaseBy1000");

            increaseBy10Button.addEventListener("click", () => {
               amount = parseInt(amount) + 10;
               document.getElementById("amountInput").value = amount;
            });

            increaseBy100Button.addEventListener("click", () => {
               amount = parseInt(amount) + 100;
               document.getElementById("amountInput").value = amount;
            });

            increaseBy1000Button.addEventListener("click", () => {
               amount = parseInt(amount) + 1000;
               document.getElementById("amountInput").value = amount;
            });
         },
      }).then((result) => {
         if (result.isConfirmed) {
            axios.post('http://localhost:5000/bet', { userId: 'yourUserId', amount, selection, periodId })
               .then(response => {
                  Swal.fire("Success!", `Your bet of ${amount} on ${selection} is placed.`, "success");
               })
               .catch(error => {
                  console.error('Error placing bet:', error);
                  Swal.fire("Error!", "Failed to place bet. Please try again.", "error");
               });
         }
      });
   };

   return (
      <div className="container mx-auto px-4">
         <div
            className="bg-slate-100 mx-auto py-2  "
            style={{ maxWidth: "420px" }}
         >

            <div className="p-4 rounded-lg max-w-[640px] mx-auto ">
               <div className="flex justify-between w-full sm:w-auto mb-4 sm:mb-0">
                  <h2 className="text-lg font-bold">Period</h2>
                  <h2 className="text-lg font-bold">Count Down</h2>
               </div>
               <div className="flex justify-between w-full sm:w-auto">
                  <h2 className="text-lg font-medium">ID: {id}</h2>
                  <h2 className="text-lg font-medium">{`0${minutes}:${formattedSeconds}`}</h2>
               </div>
               <div className="flex justify-around mt-4">
                  <button
                     onClick={() => handleBet('Green', id)}
                     className="bg-green-500 text-white py-2 px-4 rounded"
                  >
                     Join Green
                  </button>
                  <button
                     onClick={() => handleBet('Red', id)}
                     className="bg-red-500 text-white py-2 px-4 rounded"
                  >
                     Join Red
                  </button>
                  <button
                     onClick={() => handleBet('Violet', id)}
                     className="bg-purple-500 text-white py-2 px-4 rounded"
                  >
                     Join Violet
                  </button>
               </div>
               <div>
                  <div className="text-center">
                     <div className="flex justify-around mt-4">
                        <button
                           onClick={() => handleBet('0', id)}
                           className="bg-gradient-to-r from-green-500 to-violet-500 text-white py-1 px-5 rounded"
                        >
                           0
                        </button>
                        <button
                           onClick={() => handleBet('1', id)}
                           className="bg-green-500 text-white py-1 px-5 rounded"
                        >
                           1
                        </button>
                        <button
                           onClick={() => handleBet('2', id)}
                           className="bg-red-500 text-white py-1 px-5 rounded"
                        >
                           2
                        </button>
                        <button
                           onClick={() => handleBet('3', id)}
                           className="bg-green-500 text-white py-1 px-5 rounded"
                        >
                           3
                        </button>
                        <button
                           onClick={() => handleBet('4', id)}
                           className="bg-red-500 text-white py-1 px-5 rounded"
                        >
                           4
                        </button>
                     </div>

                     <div className="flex justify-around mt-4">
                        <button
                           onClick={() => handleBet('5', id)}
                           className="bg-gradient-to-r from-red-500 to-violet-500 text-white py-1 px-5 rounded">
                           5
                        </button>
                        <button
                           onClick={() => handleBet('6', id)}
                           className="bg-red-500 text-white py-1 px-5 rounded"
                        >
                           6
                        </button>
                        <button
                           onClick={() => handleBet('7', id)}
                           className="bg-green-500 text-white py-1 px-5 rounded"
                        >
                           7
                        </button>
                        <button
                           onClick={() => handleBet('8', id)}
                           className="bg-red-500 text-white py-1 px-5 rounded"
                        >
                           8
                        </button>
                        <button
                           onClick={() => handleBet('9', id)}
                           className="bg-green-500 text-white py-1 px-5 rounded"
                        >
                           9
                        </button>


                     </div>

                  </div>
               </div>
            </div>
         </div>
         <GameRecord periodIds={periodIds} />
      </div>
   );
}

export default ColorPicker;