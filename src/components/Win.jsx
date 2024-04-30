import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Footer from './Footer';
import { jwtDecode } from 'jwt-decode';

const Win = ({ periodId }) => {
   const [userBets, setUserBets] = useState([]);

   useEffect(() => {
      // Fetch user's bet details for the specific period ID
      const fetchUserBets = async () => {
         try {
            const token = localStorage.getItem('token');
            if (token) {
               const decodedToken = jwtDecode(token);
               const userId = decodedToken.userId;

               const response = await axios.get(`http://localhost:5000/bets/${userId}/${periodId}`);
               setUserBets(response.data.userBets); // Assuming the response data contains an array of user bets
            }
         } catch (error) {
            console.error('Error fetching user bets:', error);
         }
      };

      fetchUserBets();
   }, [periodId]);

   return (
      <>
         <div className=''>
            <div className="bg-gradient-to-b from-slate-300 to-slate-200 max-w-[420px] mx-auto shadow-lg p-6">
               <h2 className="text-2xl py-2 bg-slate-200 rounded-full text-red-500 text-center font-semibold mb-4">Bet Details</h2>
             
               <div className='overflow-y-scroll example h-[400px]'>             
                  <table className="w-full text-center">
                     <thead className="sticky bg-slate-300 top-0 z-10">
                        <tr>
                           <th className="font-semibold border-b-2 border-gray-400">Period ID</th>
                           <th className="font-semibold border-b-2 border-gray-400">Bet (in Rs.)</th>
                           <th className="font-semibold border-b-2 border-gray-400">Result (Win/Loss)</th>
                           <th className="font-semibold border-b-2 border-gray-400">Win (in Rs.)</th>
                        </tr>
                     </thead>
                     <tbody>
                        {userBets.map((bet, index) => (
                           <tr key={index} className="border-b border-gray-300">
                              <td className="py-2">{bet.periodId}</td>
                              <td className="py-2">{bet.amount}</td>
                              <td className={bet.isWin ? 'text-green-500 py-2' : 'text-red-500 py-2'}>
                                 {bet.isWin ? 'Win' : 'Loss'}
                              </td>
                              <td className="py-2">{bet.winAmount}</td>
                           </tr>
                        ))}
                     </tbody>
                  </table>
               </div>
            </div>
         </div>
         <Footer />
      </>
   );
};

export default Win;