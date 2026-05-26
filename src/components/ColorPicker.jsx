// ColorPicker.jsx - Updated with new design
import React, { useState, useEffect, useCallback } from "react";
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
  const [id, setId] = useState("");
  const [bankBalance, setBankBalance] = useState(0);
  const [userId, setUserId] = useState("");
  const [periods, setPeriods] = useState([]);
  const [wonNumber, setWonNumber] = useState([]);

  const showWinnerToast = (periodId, lowestBetNumber) => {
    toast(
      <div className="flex items-center gap-2">
        <span>🎉</span>
        <div>
          Round <span style={{ color: '#ff6584', fontWeight: 'bold' }}>{periodId}</span> result:
          <span style={{ color: '#6c63ff', fontWeight: 'bold', fontSize: '20px', marginLeft: '8px' }}>{lowestBetNumber}</span>
        </div>
      </div>,
      {
        position: "top-center",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
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

  const fetchLowestBetNumber = useCallback((periodId) => {
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
            axios.put(`https://colorgamebackend-1.onrender.com/bet/updateOutcome`, {
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
  }, [bankBalance]);

  useEffect(() => {
    Number(time) === 1 && fetchLowestBetNumber(id);
  }, [time, id, fetchLowestBetNumber]);

  const handleBet = (selection, periodId) => {
    if (parseInt(time) <= 30) {
      Swal.fire({
        icon: "info",
        title: "⏰ Betting Closed",
        text: "Bets close 30 seconds before result. Please wait for next round!",
        background: "linear-gradient(145deg, #1e1e3a, #16162e)",
        color: "#fff",
        confirmButtonColor: "#6c63ff",
        iconColor: "#ff6584"
      });
      return;
    }
    let amount = 10;
    Swal.fire({
      title: "🎲 Place Your Bet",
      html: `
        <div style="padding: 10px 0">
          <input id="amountInput" type="number" placeholder="Enter Amount" class="swal2-input" value="10" min="10" style="font-size: 24px; text-align: center; font-weight: bold; width: 200px;">
          <div class="flex justify-around mt-4" style="display: flex; gap: 12px; justify-content: center; margin-top: 16px;">
            <button id="increaseBy10" style="background: linear-gradient(135deg, #11998e, #38ef7d); border: none; padding: 8px 16px; border-radius: 40px; color: white; font-weight: bold; cursor: pointer;">+10</button>
            <button id="increaseBy100" style="background: linear-gradient(135deg, #f09819, #ff5858); border: none; padding: 8px 16px; border-radius: 40px; color: white; font-weight: bold; cursor: pointer;">+100</button>
            <button id="increaseBy1000" style="background: linear-gradient(135deg, #9b59b6, #8e44ad); border: none; padding: 8px 16px; border-radius: 40px; color: white; font-weight: bold; cursor: pointer;">+1000</button>
          </div>
          <p style="margin-top: 16px; font-size: 12px; color: #a0a0d0;">Balance: ₹${bankBalance.toLocaleString()}</p>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      cancelButtonText: "Cancel",
      confirmButtonText: "Place Bet",
      background: "linear-gradient(145deg, #1e1e3a, #16162e)",
      color: "#fff",
      confirmButtonColor: "#6c63ff",
      cancelButtonColor: "#ff6584",
      preConfirm: () => {
        amount = document.getElementById("amountInput").value;
        if (!amount || amount < 10) {
          Swal.showValidationMessage("Minimum bet amount is ₹10");
        } else if (amount > bankBalance) {
          Swal.showValidationMessage("Insufficient balance! Please recharge.");
        } else {
          return amount;
        }
      },
      didOpen: () => {
        const increaseBy10Button = document.getElementById("increaseBy10");
        const increaseBy100Button = document.getElementById("increaseBy100");
        const increaseBy1000Button = document.getElementById("increaseBy1000");
        increaseBy10Button?.addEventListener("click", () => {
          let currentAmount = parseInt(document.getElementById("amountInput").value) || 10;
          currentAmount += 10;
          document.getElementById("amountInput").value = currentAmount;
        });
        increaseBy100Button?.addEventListener("click", () => {
          let currentAmount = parseInt(document.getElementById("amountInput").value) || 10;
          currentAmount += 100;
          document.getElementById("amountInput").value = currentAmount;
        });
        increaseBy1000Button?.addEventListener("click", () => {
          let currentAmount = parseInt(document.getElementById("amountInput").value) || 10;
          currentAmount += 1000;
          document.getElementById("amountInput").value = currentAmount;
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
            Swal.fire({
              icon: "success",
              title: "Bet Placed! 🎯",
              text: `₹${amount} on ${selection}`,
              background: "linear-gradient(145deg, #1e1e3a, #16162e)",
              color: "#fff",
              confirmButtonColor: "#38ef7d",
              timer: 2000,
              showConfirmButton: false
            });
          })
          .catch((error) => {
            console.error("Error placing bet:", error);
            Swal.fire({
              icon: "error",
              title: "Failed!",
              text: "Could not place bet. Please try again.",
              background: "linear-gradient(145deg, #1e1e3a, #16162e)",
              color: "#fff",
              confirmButtonColor: "#ff6584"
            });
          });
      }
    });
  };

  const getNumberBtnClass = (num) => {
    if (num === '0') return "number-btn number-gradient-0";
    if (num === '5') return "number-btn number-gradient-5";
    if (['1','3','7','9'].includes(num)) return "number-btn number-green";
    return "number-btn number-red";
  };

  return (
    <div className="container mx-auto px-4">
      <div className="mx-auto" style={{ maxWidth: "420px" }}>
        <div className="period-card p-5 mx-auto max-w-[640px]">
          <div className="period-header mb-5 flex justify-between items-center">
            <div>
              <p className="period-label">PERIOD</p>
              <p className="period-value">#{periodId}</p>
            </div>
            <div className="text-right">
              <p className="period-label">COUNTDOWN</p>
              <p className={`countdown-timer ${parseInt(time) <= 30 ? 'countdown-urgent' : ''}`}>
                {time}s
              </p>
            </div>
          </div>

          <div className={`${parseInt(time) <= 30 ? 'urgent-pulse' : ''}`}>
            {/* Color Bet Buttons */}
            <div className="grid grid-cols-3 gap-3 mb-6">
              <button onClick={() => handleBet("Green", id)} className="join-green text-white">🟢 JOIN GREEN</button>
              <button onClick={() => handleBet("Red", id)} className="join-red text-white">🔴 JOIN RED</button>
              <button onClick={() => handleBet("Violet", id)} className="join-violet text-white">🟣 JOIN VIOLET</button>
            </div>

            {/* Number Bet Buttons */}
            <div className="text-center">
              <div className="grid grid-cols-5 gap-3 mb-3">
                {['0','1','2','3','4'].map(num => (
                  <button key={num} onClick={() => handleBet(num, id)} className={`${getNumberBtnClass(num)} text-white shadow-lg`}>
                    {num}
                  </button>
                ))}
              </div>
              <div className="grid grid-cols-5 gap-3">
                {['5','6','7','8','9'].map(num => (
                  <button key={num} onClick={() => handleBet(num, id)} className={`${getNumberBtnClass(num)} text-white shadow-lg`}>
                    {num}
                  </button>
                ))}
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