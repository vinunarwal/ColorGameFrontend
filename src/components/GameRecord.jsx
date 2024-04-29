import React, { useEffect } from "react";
import axios from "axios";

function GameRecord({ periodIds, lowestBetNumberMap }) {
   // Get the latest 10 elements from periodIds
   const latestTenPeriodIds = periodIds.slice(0, 10);

   useEffect(() => {
      // Fetch winAmount for matching bets and update bank balance
      latestTenPeriodIds.forEach((periodId) => {
         const result = lowestBetNumberMap[periodId];
         const multiplier = lowestBetNumberMap[`${periodId}-multiplier`];

         axios
            .get(`http://localhost:5000/bet/result/${periodId}/${result}`)
            .then((response) => {
               const { winningBets } = response.data;
               winningBets.forEach((winningBet) => {
                  const { userId, winAmount } = winningBet;
                  // Update bank balance for each winning user
                  // Assuming there's an API endpoint to update the user's bank balance
                  axios.patch(`http://localhost:5000/user/${userId}`, {
                     bankBalance: winAmount * multiplier,
                  });
               });
            })
            .catch((error) => {
               console.error("Error fetching winning bets:", error);
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
                              {/** Display lowestBetNumber */}
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
