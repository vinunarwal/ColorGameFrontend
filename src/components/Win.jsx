import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { jwtDecode } from 'jwt-decode';

const Win = ({ periodId }) => {
   const [userBets, setUserBets] = useState([]);
   const [error, setError] = useState(null);

   useEffect(() => {
      const fetchUserBets = async () => {
         try {
            const token = localStorage.getItem('token');
            if (!token) {
               setError('No token found');
               return;
            }
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            const response = await axios.get(`https://colorgamebackend-1.onrender.com/bets/${userId}`);
            setUserBets(response.data.userBets || []); // Handle case where no bets are found
         } catch (error) {
            console.error('Error fetching user bets:', error);
            setError('Failed to fetch bets');
         }
      };

      fetchUserBets();
   }, [periodId]);

   return (
   <div className="flex flex-col min-h-screen">
         <div className="flex-grow container mx-auto px-4 py-6 flex justify-center">
         <div className="w-full max-w-2xl">
   
            {/* Card */}
            <div className="bg-white dark:bg-zinc-900 rounded-2xl border border-gray-200 dark:border-zinc-700 overflow-hidden shadow-sm">
   
               {/* Header */}
               <div className="bg-gray-50 dark:bg-zinc-800 px-5 py-4 border-b border-gray-200 dark:border-zinc-700 flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4M3 12a9 9 0 1118 0A9 9 0 013 12z" />
               </svg>
               <h2 className="text-base font-semibold text-gray-800 dark:text-gray-100 tracking-tight">
                  Bet Details
               </h2>
               </div>
   
               {/* Scrollable Table */}
               <div className="overflow-y-auto max-h-[520px]">
               <table className="w-full text-sm">
                  <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-zinc-800 border-b border-gray-200 dark:border-zinc-700">
                     <tr>
                     {["Period ID", "Bet (₹)", "Result", "Win (₹)"].map((col, i) => (
                        <th
                           key={col}
                           className={`px-4 py-3 font-medium text-xs uppercase tracking-wide text-gray-500 dark:text-gray-400 whitespace-nowrap ${i === 0 ? "text-left" : "text-right"}`}
                        >
                           {col}
                        </th>
                     ))}
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-zinc-800">
                     {userBets.length > 0 ? (
                     [...userBets].reverse().map((bet, index) => (
                        <tr
                           key={index}
                           className="hover:bg-gray-50 dark:hover:bg-zinc-800 transition-colors"
                        >
                           {/* Period ID */}
                           <td className="px-4 py-3 text-left font-mono text-xs text-gray-500 dark:text-gray-400">
                           {bet.periodId}
                           </td>
   
                           {/* Bet Amount */}
                           <td className="px-4 py-3 text-right font-medium text-gray-800 dark:text-gray-200">
                           ₹{Number(bet.amount).toLocaleString("en-IN")}
                           </td>
   
                           {/* Result Badge */}
                           <td className="px-4 py-3 text-right">
                           <span
                              className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${
                                 bet.outcome === "Win"
                                 ? "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-400"
                                 : bet.outcome === "Loss"
                                 ? "bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-400"
                                 : "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-400"
                              }`}
                           >
                              {bet.outcome === "Win" && (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
                                 </svg>
                              )}
                              {bet.outcome === "Loss" && (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                                 </svg>
                              )}
                              {bet.outcome === "Pending" && (
                                 <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                 </svg>
                              )}
                              {bet.outcome}
                           </span>
                           </td>
   
                           {/* Win Amount */}
                           <td className="px-4 py-3 text-right">
                           {bet.outcome === "Win" ? (
                              <span className="font-semibold text-green-600 dark:text-green-400">
                                 +₹{Number(bet.winAmount).toLocaleString("en-IN")}
                              </span>
                           ) : (
                              <span className="text-gray-400 dark:text-zinc-500">—</span>
                           )}
                           </td>
                        </tr>
                     ))
                     ) : (
                     <tr>
                        <td colSpan={4} className="px-4 py-16 text-center text-gray-400 dark:text-zinc-500">
                           <svg xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 mx-auto mb-3 opacity-30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                           <path strokeLinecap="round" strokeLinejoin="round" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
                           </svg>
                           <p className="text-sm">No bets found</p>
                        </td>
                     </tr>
                     )}
                  </tbody>
               </table>
               </div>
   
            </div>
         </div>
         </div>
         <Footer />
   </div>
   );
};

export default Win;