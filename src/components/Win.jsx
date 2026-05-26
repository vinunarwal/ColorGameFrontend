// Win.jsx - Updated with modern design matching your game
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { jwtDecode } from 'jwt-decode';

const Win = ({ periodId }) => {
   const [userBets, setUserBets] = useState([]);
   const [error, setError] = useState(null);
   const [loading, setLoading] = useState(true);

   useEffect(() => {
      const fetchUserBets = async () => {
         try {
            setLoading(true);
            const token = localStorage.getItem('token');
            if (!token) {
               setError('No token found');
               return;
            }
            const decodedToken = jwtDecode(token);
            const userId = decodedToken.userId;

            const response = await axios.get(`https://colorgamebackend-1.onrender.com/bets/${userId}`);
            setUserBets(response.data.userBets || []);
         } catch (error) {
            console.error('Error fetching user bets:', error);
            setError('Failed to fetch bets');
         } finally {
            setLoading(false);
         }
      };

      fetchUserBets();
   }, [periodId]);

   const getResultBadgeClass = (outcome) => {
      switch(outcome) {
         case "Win":
            return "win-badge";
         case "Loss":
            return "loss-badge";
         default:
            return "pending-badge";
      }
   };

   const getResultIcon = (outcome) => {
      switch(outcome) {
         case "Win":
            return (
               <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
               </svg>
            );
         case "Loss":
            return (
               <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
               </svg>
            );
         default:
            return (
               <svg xmlns="http://www.w3.org/2000/svg" className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
               </svg>
            );
      }
   };

   const calculateStats = () => {
      const totalBets = userBets.length;
      const totalWins = userBets.filter(bet => bet.outcome === "Win").length;
      const totalLosses = userBets.filter(bet => bet.outcome === "Loss").length;
      const totalWinAmount = userBets.filter(bet => bet.outcome === "Win").reduce((sum, bet) => sum + (bet.winAmount || 0), 0);
      const totalBetAmount = userBets.reduce((sum, bet) => sum + (bet.amount || 0), 0);
      
      return { totalBets, totalWins, totalLosses, totalWinAmount, totalBetAmount };
   };

   const stats = calculateStats();

   return (
      <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
         <div className="flex-grow container mx-auto px-4 py-6">
            <div className="mx-auto" style={{ maxWidth: "420px" }}>
               
               {/* Header Card */}
               <div className="period-card p-5 mb-4">
                  <div className="period-header mb-4">
                     <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
                              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                 <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4M3 12a9 9 0 1118 0A9 9 0 013 12z" />
                              </svg>
                           </div>
                           <div>
                              <p className="period-label">BET HISTORY</p>
                              <p className="period-value text-lg">My Records</p>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                     <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <p className="text-white/50 text-xs mb-1">Total Bets</p>
                        <p className="text-white font-bold text-xl">{stats.totalBets}</p>
                     </div>
                     <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <p className="text-white/50 text-xs mb-1">Win Rate</p>
                        <p className="text-green-400 font-bold text-xl">
                           {stats.totalBets > 0 ? Math.round((stats.totalWins / stats.totalBets) * 100) : 0}%
                        </p>
                     </div>
                     <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <p className="text-white/50 text-xs mb-1">Total Bet</p>
                        <p className="text-yellow-400 font-bold text-lg">₹{stats.totalBetAmount.toLocaleString("en-IN")}</p>
                     </div>
                     <div className="bg-white/5 rounded-xl p-3 border border-white/10">
                        <p className="text-white/50 text-xs mb-1">Total Won</p>
                        <p className="text-green-400 font-bold text-lg">+₹{stats.totalWinAmount.toLocaleString("en-IN")}</p>
                     </div>
                  </div>
               </div>

               {/* Error Message */}
               {error && (
                  <div className="mb-4 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3">
                     <p className="text-sm text-red-400">{error}</p>
                  </div>
               )}

               {/* Loading State */}
               {loading && (
                  <div className="period-card p-8 text-center">
                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500 mx-auto mb-4"></div>
                     <p className="text-white/60">Loading your bets...</p>
                  </div>
               )}

               {/* Bet History Table */}
               {!loading && (
                  <div className="record-container">
                     <div className="p-4">
                        <h2 className="record-title text-center mb-4">📊 BET DETAILS</h2>
                        <hr className="mb-4 border-t-2 border-purple-500/50" />
                        
                        <div className="overflow-y-auto" style={{ maxHeight: "450px" }}>
                           <table className="w-full text-sm">
                              <thead className="sticky top-0 z-10">
                                 <tr className="bg-gradient-to-r from-[#2d2d5e] to-[#1a1a3e]">
                                    <th className="px-3 py-3 text-left text-xs font-semibold text-purple-300 uppercase tracking-wider">Period</th>
                                    <th className="px-3 py-3 text-right text-xs font-semibold text-purple-300 uppercase tracking-wider">Bet</th>
                                    <th className="px-3 py-3 text-center text-xs font-semibold text-purple-300 uppercase tracking-wider">Result</th>
                                    <th className="px-3 py-3 text-right text-xs font-semibold text-purple-300 uppercase tracking-wider">Win</th>
                                 </tr>
                              </thead>
                              <tbody className="divide-y divide-white/5">
                                 {userBets.length > 0 ? (
                                    [...userBets].reverse().map((bet, index) => (
                                       <tr key={index} className="hover:bg-white/5 transition-colors duration-200">
                                          {/* Period ID */}
                                          <td className="px-3 py-3">
                                             <span className="font-mono text-xs text-purple-300">#{bet.periodId}</span>
                                          </td>
                                          
                                          {/* Bet Amount */}
                                          <td className="px-3 py-3 text-right">
                                             <span className="font-semibold text-white">
                                                ₹{Number(bet.amount).toLocaleString("en-IN")}
                                             </span>
                                          </td>
                                          
                                          {/* Result Badge */}
                                          <td className="px-3 py-3 text-center">
                                             <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${getResultBadgeClass(bet.outcome)}`}>
                                                {getResultIcon(bet.outcome)}
                                                {bet.outcome}
                                             </span>
                                          </td>
                                          
                                          {/* Win Amount */}
                                          <td className="px-3 py-3 text-right">
                                             {bet.outcome === "Win" ? (
                                                <span className="font-bold text-green-400">
                                                   +₹{Number(bet.winAmount).toLocaleString("en-IN")}
                                                </span>
                                             ) : bet.outcome === "Loss" ? (
                                                <span className="text-red-400">
                                                   -₹{Number(bet.amount).toLocaleString("en-IN")}
                                                </span>
                                             ) : (
                                                <span className="text-yellow-400">—</span>
                                             )}
                                          </td>
                                       </tr>
                                    ))
                                 ) : (
                                    <tr>
                                       <td colSpan={4} className="px-4 py-16 text-center">
                                          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 mx-auto mb-3 opacity-30 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                                             <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2 2 4-4M3 12a9 9 0 1118 0A9 9 0 013 12z" />
                                          </svg>
                                          <p className="text-white/50 text-sm">No bets found</p>
                                          <p className="text-white/30 text-xs mt-1">Place your first bet to see history</p>
                                       </td>
                                    </tr>
                                 )}
                              </tbody>
                           </table>
                        </div>
                     </div>
                  </div>
               )}
            </div>
         </div>
         <Footer />
      </div>
   );
};

export default Win;