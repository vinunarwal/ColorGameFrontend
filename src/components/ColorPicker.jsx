import React, { useState, useEffect } from "react";
import GameRecord from "./GameRecord";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

function ColorPicker() {
  const [timer, setTimer] = useState(2); // 3 minutes in seconds
  const [id, setId] = useState(1234567890); // Initial ID
  const [periodIds, setPeriodIds] = useState([]); // Array to store period IDs
  const [amount, setAmount] = useState(""); // State to store the input amount

  useEffect(() => {
    const interval = setInterval(() => {
      if (timer > 0) {
        setTimer(timer - 1); // Decrease timer by 1 second
      } else {
        setTimer(2); // Restart the timer when it reaches 0 (3 minutes again)
        setId((prevId) => prevId + 1); // Increment ID by 1
        setPeriodIds((prevIds) => [id, ...prevIds]); // Add current ID to periodIds array
      }
    }, 1000); // Update every second (1000 milliseconds)

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [timer]); // Dependency array to run effect on timer change

  // Convert timer to minutes and seconds for display
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;
  // Add leading zero if seconds is less than 10
  const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

  // Function to handle updating periodIds in GameRecord component
  const updatePeriodIds = (newId) => {
    setPeriodIds((prevIds) => [...prevIds, newId]); // Add new ID to periodIds array
  };

  const handleBet = () => {
    Swal.fire({
      title: "Place Your Bet",
      html: `
        <input id="amountInput" type="number" placeholder="Enter Amount" class="swal2-input" value="">
        <div class="flex justify-around mt-4">
          <button class="swal2-confirm swal2-styled" data-value="100">100</button>
          <button class="swal2-confirm swal2-styled" data-value="200">200</button>
          <button class="swal2-confirm swal2-styled" data-value="300">300</button>
        </div>
      `,
      focusConfirm: false,
      preConfirm: () => {
        const amountInput = document.getElementById("amountInput");
        const amount = amountInput.value;
        if (!amount) {
          Swal.showValidationMessage("Please enter your amount");
        } else {
          return amount;
        }
      },
      didOpen: () => {
        const buttons = Swal.getPopup().querySelectorAll(".swal2-confirm");
        buttons.forEach((button) => {
          button.addEventListener("click", () => {
            const value = button.getAttribute("data-value");
            document.getElementById("amountInput").value = value;
          });
        });
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const betAmount = result.value;
        Swal.fire("Success!", `Your bet of ${betAmount} is placed.`, "success");
      }
    });
  };
  

  return (
    <div className="container mx-auto px-4">
      <div
        className="bg-slate-100 mx-auto py-2  "
        style={{ maxWidth: "700px" }}
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
              onClick={handleBet}
              className="bg-green-500 text-white py-2 px-4 rounded"
            >
              Join Green
            </button>
            <button
              onClick={handleBet}
              className="bg-red-500 text-white py-2 px-4 rounded"
            >
              Join Red
            </button>
            <button
              onClick={handleBet}
              className="bg-purple-500 text-white py-2 px-4 rounded"
            >
              Join Violet
            </button>
          </div>
          <div>
            <div className="text-center">
              <div className="flex justify-around mt-4">
                <button
                  onClick={handleBet}
                  className="bg-gradient-to-r from-green-500 to-violet-500 text-white py-1 px-5 rounded"
                >
                  0
                </button>
                <button
                  onClick={handleBet}
                  className="bg-green-500 text-white py-1 px-5 rounded"
                >
                  1
                </button>
                <button
                  onClick={handleBet}
                  className="bg-red-500 text-white py-1 px-5 rounded"
                >
                  2
                </button>
                <button
                  onClick={handleBet}
                  className="bg-green-500 text-white py-1 px-5 rounded"
                >
                  3
                </button>
                <button
                  onClick={handleBet}
                  className="bg-red-500 text-white py-1 px-5 rounded"
                >
                  4
                </button>
              </div>
              <div className="flex justify-around mt-4">
                <button className="bg-gradient-to-r from-red-500 to-violet-500 text-white py-1 px-5 rounded">
                  5
                </button>
                <button
                  onClick={handleBet}
                  className="bg-red-500 text-white py-1 px-5 rounded"
                >
                  6
                </button>
                <button
                  onClick={handleBet}
                  className="bg-green-500 text-white py-1 px-5 rounded"
                >
                  7
                </button>
                <button
                  onClick={handleBet}
                  className="bg-red-500 text-white py-1 px-5 rounded"
                >
                  8
                </button>
                <button
                  onClick={handleBet}
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
