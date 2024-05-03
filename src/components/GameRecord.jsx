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

         axios.get(`http://localhost:5000/user/${decodedToken.userId}`)
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
            .get(`http://localhost:5000/bet/result/${periodId}/${result}`)
            .then((response) => {
               const { winningBets } = response.data;

               winningBets.forEach((winningBet) => {
                  const { userId, winAmount } = winningBet;

                  axios.put(`http://localhost:5000/user/${userId}`, {
                     bankBalance: bankBalance + winAmount, 
                  });

                  axios.put(`http://localhost:5000/bet/updateOutcome`, {
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
            });
      });
   }, [latestTenPeriodIds, lowestBetNumberMap]);


   return (
      <div className="container mx-auto">
         <div className="bg-slate-100 mx-auto py-4 max-w-[420px]">
            <div className="px-4 mx-auto max-w-[640px]">
               <h2 className="text-xl font-bold text-center">Parity Record</h2>
               <hr className="my-4 border-b-2 border-blue-500 font-bold" />
               <div className="overflow-y-scroll example h-[200px]">
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
                              <td className="px-4 py-2">{lowestBetNumberMap[id]}</td>
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
