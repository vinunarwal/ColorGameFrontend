import React, { useState, useEffect } from "react";
import GameRecord from "./GameRecord";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import moment from "moment";

function ColorPicker() {
  //const initialTimer = localStorage.getItem("timer") || 60;
  //const initialId = localStorage.getItem("id") || 1234567890;
  //const initialPeriodIds = JSON.parse(localStorage.getItem("periodIds")) || [];
  
  const [periodId, setPeriodId] = useState("");
  const [time, setTime] = useState(60)

  //const [timer, setTimer] = useState(parseInt(initialTimer));
  const [id, setId] = useState(parseInt(periodId));
  const [periodIds, setPeriodIds] = useState([id]);
  const [bankBalance, setBankBalance] = useState(0);
  const [userId, setUserId] = useState("");
  const [countdownOpacity, setCountdownOpacity] = useState(1);
  const [lowestBetNumberMap, setLowestBetNumberMap] = useState({});

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserId(decodedToken.userId);

      axios
        .get(`http://localhost:5000/user/${decodedToken.userId}`)
        .then((response) => {
          setBankBalance(response.data.bankBalance);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, []);

 
  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchData(); // Fetch initial data
    
    const timer = setInterval(() => {
      setTime(prevTime => {
        if (prevTime > 0) {
          return prevTime - 1; // Decrement time every second if time is greater than 0
        } else {
          clearInterval(timer); // Clear interval when time reaches 0
          fetchData(); // Refetch data when time reaches 0
        }
      });
    }, 1000);
  
    // Cleanup function to clear interval when component unmounts
    return () => clearInterval(timer);
  }, []);
  
  const fetchData = async () => {
    try {
      const dataResponse = await axios.get("http://localhost:5000/time");
  
      const { periodId, endTime } = dataResponse.data;
  
      setPeriodId(periodId);
  
      // Calculate remaining time based on startTime and endTime
      const now = moment();
      const endTimeMoment = moment(endTime);
      const remainingTime = Math.max(0, endTimeMoment.diff(now, 'seconds')); 
      setTime(remainingTime);
  
      console.log("periodId :", periodId);
      console.log("time :", remainingTime);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  
  
  
  const fetchLowestBetNumber = (periodId) => {
    axios
      .get(`http://localhost:5000/lowest/${periodId}`) 
      .then((response) => {
        const { lowestBetNumber } = response.data;
        setLowestBetNumberMap((prevMap) => ({
          ...prevMap,
          [periodId]: lowestBetNumber, 
        }));
      })
      .catch((error) => {
        //console.error("Error fetching lowest bet number:", error);
      });
  };
  
  useEffect(() => {
    fetchLowestBetNumber(periodId); 
  }, [periodId]); 
  

  const handleBet = (selection, periodId) => {
    // Disable handleBet function when countdownOpacity is 0.5
    if (countdownOpacity === 0.5) {
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
          .post("http://localhost:5000/bet", {
            userId,
            amount,
            selection,
            periodId,
          })
          .then((response) => {
            const updatedBankBalance = response.data.bankBalance; // Assuming the backend sends the updated bank balance
            setBankBalance(updatedBankBalance);

            Swal.fire(
              "Success!",
              `Your bet of ${amount} on ${selection} is placed.`,
              "success"
            );
          })
          .catch((error) => {
            //console.error("Error placing bet:", error);
            Swal.fire(
              "Error!",
              "Failed to place bet. Please try again.",
              "error"
            );
          });
      }
    });
  };

   // Calculate minutes and seconds
   const minutes = Math.floor(time / 60);
   const seconds = time % 60;

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
            <h2 className="text-lg font-medium">
              {minutes}:{seconds}
            </h2>
            
          </div>
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
            <div className="text-center">
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
      <GameRecord periodIds={periodIds} lowestBetNumberMap={lowestBetNumberMap} />
    </div>
  );
}

export default ColorPicker;
