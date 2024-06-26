import React, { useState, useEffect } from "react";
import GameRecord from "./GameRecord";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ColorPicker() {

  const [periodId, setPeriodId] = useState("");
  const [time, setTime] = useState("");
  const [periodIds, setPeriodIds] = useState([]);
  const [id, setId] = useState("");
  const [bankBalance, setBankBalance] = useState(0);
  const [userId, setUserId] = useState("");
  const [periods, setPeriods] = useState([]);
  const [wonNumber, setWonNumber] = useState([]);

  const showWinnerToast = (periodId, lowestBetNumber) => {
    toast(
      <div>
        The won number for period <span style={{ color: 'red' }}>{periodId}</span> is: <span style={{ color: 'blue' }}>{lowestBetNumber}</span>
      </div>,
      {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      }
    );
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);

      axios
        .get(`https://colorgamebackend-1.onrender.com/user/${decodedToken.userId}`)
        .then((response) => {
          setBankBalance(response.data.bankBalance);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);


  const fetchData = () => {
    axios
      .get(`https://colorgamebackend-1.onrender.com/time`)
      .then((response) => {
        const { periodId, time } = response.data;
        setPeriodId(periodId);
        setTime(time);
        setId(periodId);

        axios
          .get(`https://colorgamebackend-1.onrender.com/periods`)
          .then((response) => {
            const { Periods, wonNumber } = response.data;
            setPeriods(Periods);
            setWonNumber(wonNumber);
          })
          .catch((error) => {
            console.error("Error fetching period data:", error);
          });
      })
      .catch((error) => {
        console.error("Error fetching time:", error);
      });
  };



  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 1000);
    return () => clearInterval(intervalId);
  }, []);


  const fetchLowestBetNumber = (periodId) => {
    axios
      .get(`https://colorgamebackend-1.onrender.com/lowest/${periodId}`)
      .then((response) => {
        const { lowestBetNumber } = response.data;

        axios
          .put(`https://colorgamebackend-1.onrender.com/update/won`, {
            periodId: periodId,
            newWonNumber: lowestBetNumber
          })
          .then((response) => {
            console.log(response.data.message);
            showWinnerToast(periodId, lowestBetNumber);
          })
          .catch((error) => {
            console.error("Error updating wonNumber:", error);
          });

        const result = lowestBetNumber;
        console.log("Result : ", result)

        axios
          .get(`https://colorgamebackend-1.onrender.com/bet/result/${periodId}/${result}`)
          .then((response) => {
            const { winningBets } = response.data;

            const updatePromises = winningBets.map((winningBet) => {
              const { userId, winAmount } = winningBet;

              return axios.put(`https://colorgamebackend-1.onrender.com/user/${userId}`, {
                bankBalance: bankBalance + winAmount,
              });
            });

            Promise.all(updatePromises)
              .then(() => {
                console.log("Bank balances updated successfully");
              })
              .catch((error) => {
                console.error("Error updating bank balances:", error);
              });


            // Update bet outcome
            axios.put(`http://localhost:5000/bet/updateOutcome`, {
              periodId: periodId,
              result: lowestBetNumber,
            })
              .then((response) => {
                console.log(response.data.message);
              })
              .catch((error) => {
                console.error("Error updating bet outcomes:", error);
              });


          })
          .catch((error) => {
            console.error("Error fetching bet results:", error);
          });

      })
      .catch((error) => {
        console.error("Error fetching lowest bet number:", error);
      });
  };



  useEffect(() => {
    time == 1 && fetchLowestBetNumber(id);
  }, [time]);


  const handleBet = (selection, periodId) => {

    if (parseInt(time) <= 30) {
      Swal.fire({
        icon: "info",
        text: "Sorry, you can't place a bet when the time is less than 30 sec.",
      });
      return;
    }

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
      cancelButtonText: "Cancel",
      preConfirm: () => {
        amount = document.getElementById("amountInput").value;
        if (!amount || amount < 10) {
          Swal.showValidationMessage("Please enter a valid amount (min: 10)");
        } else if (amount > bankBalance) {
          // Check if bet amount exceeds bank balance
          Swal.showValidationMessage(
            "Insufficient balance. Please recharge your account."
          );
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
        axios
          .post("https://colorgamebackend-1.onrender.com/bet", {
            userId,
            amount,
            selection,
            periodId,
          })
          .then((response) => {
            const updatedBankBalance = response.data.bankBalance;
            setBankBalance(updatedBankBalance);

            Swal.fire(
              "Success!",
              `Your bet of ${amount} on ${selection} is placed.`,
              "success"
            );
          })
          .catch((error) => {
            console.error("Error placing bet:", error);
            Swal.fire(
              "Error!",
              "Failed to place bet. Please try again.",
              "error"
            );
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
            <h2 className="text-lg font-medium">ID: {periodId}</h2>
            <h2 className="font-bold" style={{ color: time <= 30 ? "red" : "inherit" }}>{time}</h2>
          </div>
          <div className={` ${parseInt(time) <= 30 ? 'border-dashed border-2 border-indigo-300 animate-pulse' : ''}`}>
            <div className="flex justify-around mt-4">
              <button
                onClick={() => handleBet("Green", id)}
                className="bg-green-500 text-white py-2 px-4 rounded"
              >
                Join Green
              </button>
              <button
                onClick={() => handleBet("Red", id)}
                className="bg-red-500 text-white py-2 px-4 rounded"
              >
                Join Red
              </button>
              <button
                onClick={() => handleBet("Violet", id)}
                className="bg-purple-500 text-white py-2 px-4 rounded"
              >
                Join Violet
              </button>
            </div>
            <div>
              <div className="text-center mb-4">
                <div className="flex justify-around mt-4">
                  <button
                    onClick={() => handleBet("0", id)}
                    className="bg-gradient-to-r from-green-500 to-violet-500 text-white py-1 px-5 rounded"
                  >
                    0
                  </button>
                  <button
                    onClick={() => handleBet("1", id)}
                    className="bg-green-500 text-white py-1 px-5 rounded"
                  >
                    1
                  </button>
                  <button
                    onClick={() => handleBet("2", id)}
                    className="bg-red-500 text-white py-1 px-5 rounded"
                  >
                    2
                  </button>
                  <button
                    onClick={() => handleBet("3", id)}
                    className="bg-green-500 text-white py-1 px-5 rounded"
                  >
                    3
                  </button>
                  <button
                    onClick={() => handleBet("4", id)}
                    className="bg-red-500 text-white py-1 px-5 rounded"
                  >
                    4
                  </button>
                </div>

                <div className="flex justify-around mt-4">
                  <button
                    onClick={() => handleBet("5", id)}
                    className="bg-gradient-to-r from-red-500 to-violet-500 text-white py-1 px-5 rounded"
                  >
                    5
                  </button>
                  <button
                    onClick={() => handleBet("6", id)}
                    className="bg-red-500 text-white py-1 px-5 rounded"
                  >
                    6
                  </button>
                  <button
                    onClick={() => handleBet("7", id)}
                    className="bg-green-500 text-white py-1 px-5 rounded"
                  >
                    7
                  </button>
                  <button
                    onClick={() => handleBet("8", id)}
                    className="bg-red-500 text-white py-1 px-5 rounded"
                  >
                    8
                  </button>
                  <button
                    onClick={() => handleBet("9", id)}
                    className="bg-green-500 text-white py-1 px-5 rounded"
                  >
                    9
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <GameRecord periods={periods} wonNumber={wonNumber} />
    </div>
  );

}

export default ColorPicker;