import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function GameRecord({ periodIds, lowestBetNumberMap }) {
   const [userId, setUserId] = useState("");
   const [bankBalance, setBankBalance] = useState(0);

   useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
         const decodedToken = jwtDecode(token);
         setUserId(decodedToken.userId);

         axios.get(`https://colorgamebackend-1.onrender.com/user/${decodedToken.userId}`)
            .then(response => {
               setBankBalance(response.data.bankBalance);
            })
            .catch(error => {
               console.error('Error fetching user data:', error);
            });
      }
   }, []);

   const latestTenPeriodIds = periodIds.slice(0, 10);

   useEffect(() => {
      latestTenPeriodIds.forEach((periodId) => {
         const result = lowestBetNumberMap[periodId];

         axios
            .get(`https://colorgamebackend-1.onrender.com/bet/result/${periodId}/${result}`)
            .then((response) => {
               const { winningBets } = response.data;

               const updatePromises = winningBets.map((winningBet) => {
                  const { userId, winAmount } = winningBet;
                  // Update bank balance on the server
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
            })
            .catch((error) => {
               console.error("Error fetching bet results:", error);
            });

         // Update bet outcome
         axios.put(`https://colorgamebackend-1.onrender.com/bet/updateOutcome`, {
            periodId: periodId,
            result: result,
         })
            .then((response) => {
               console.log("Bet outcomes updated successfully:", response.data.message);
            })
            .catch((error) => {
               console.error("Error updating bet outcomes:", error);
            });

      });
   }, [latestTenPeriodIds, lowestBetNumberMap]);

   const getLowestBetNumberBackgroundColor = (number) => {

    if (number === 0) {
      return "bg-gradient-to-r from-green-500 to-violet-500 text-white";
    } else if (number === 5) {
      return "bg-gradient-to-r from-red-500 to-violet-500 text-white";
    } else if ([1, 3, 7, 9].includes(number)) {
      return "bg-green-500 text-white";
    } else if ([2, 4, 6, 8].includes(number)) {
      return "bg-red-500 text-white";
    } else {
      return "";
    }
  };
  

  
    return (
      <div className="container mx-auto">
        <div className="bg-slate-200 mx-auto py-4 max-w-[420px]">
          <div className="px-4 mx-auto max-w-[640px]">
            <h2 className="text-xl font-bold text-center">Parity Record</h2>
            <hr className="my-4 border-b-2 border-blue-500 font-bold" />
            <div className="overflow-y-scroll example h-[268px] bg-slate-100">
              <table className="table-auto w-full text-center">
                <thead className="sticky bg-slate-100 top-0 z-10">
                  <tr>
                    <th className="px-4 py-2">Period</th>
                    <th className="px-4 py-2">Result</th>
                  </tr>
                </thead>
                <tbody>
                  {latestTenPeriodIds.map((id, index) => (
                    <tr key={index}>
                      <td className="px-4 py-2">{id}</td>
                      <td className="px-4 py-2 flex items-center justify-center">
                        <div
                          className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 ${getLowestBetNumberBackgroundColor(
                            lowestBetNumberMap[id]
                          )}`}
                        >
                          {lowestBetNumberMap[id]}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default GameRecord;