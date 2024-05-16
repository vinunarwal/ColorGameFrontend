import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from 'jwt-decode';

function GameRecord({periods, wonNumber, lowestBetNumberMap }) {
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


     const getBackgroundColorForWonNumber = (wonNumber) => {

      if (wonNumber === 0) {
         return "bg-gradient-to-r from-green-500 to-violet-500 text-white";
      } else if (wonNumber === 5) {
         return "bg-gradient-to-r from-red-500 to-violet-500 text-white";
      } else if ([1, 3, 7, 9].includes(wonNumber)) {
         return "bg-green-500 text-white";
      } else if ([2, 4, 6, 8].includes(wonNumber)) {
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
                        {periods.map((period, index) => (
                           <tr key={index}>
                              <td className="px-4 py-2">{period.periodId}</td>
                              <td className="px-4 py-2 flex items-center justify-center">
                                 <div
                                    className={`w-7 h-7 flex items-center justify-center rounded-full border border-gray-300 
                                    ${getBackgroundColorForWonNumber(
                                       period.wonNumber
                                    )}`}
                                 >
                                    {period.wonNumber}
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