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
      <>
         <div>
            <div className="bg-gradient-to-b from-slate-300 to-slate-200 max-w-[420px] mx-auto shadow-lg p-6">
               <h2 className="text-2xl py-2 bg-slate-200 rounded-full text-red-500 text-center font-semibold mb-4">Bet Details</h2>
               <div className='overflow-y-scroll example h-[400px]'>
                  <table className="w-full text-center">
                     <thead className="sticky bg-slate-300 top-0 z-10">
                        <tr>
                           <th className="font-semibold border-b-2 border-r-2 border-gray-400">Period ID</th>
                           <th className="font-semibold border-b-2 border-r-2 border-gray-400">Bet <span className='block'>Amount</span></th>
                           <th className="font-semibold border-b-2 border-r-2 border-gray-400">Result <span className='block'>(Win/Loss)</span></th>
                           <th className="font-semibold border-b-2 border-gray-400">Win <span className='block'>Amount</span></th>
                        </tr>
                     </thead>
                     <tbody>
                        {userBets.length > 0 ? userBets.slice().reverse().map((bet, index) => ( 
                           <tr key={index} className="border-b border-gray-300">
                              <td className="py-2">{bet.periodId}</td>
                              <td className="py-2">{bet.amount}</td>
                              <td classname="py-2">{bet.outcome}</td>
                              <td classname="py-2">
                                 {bet.outcome==="Win" ? bet.winAmount:0}
                              </td>
                           </tr>
                        )) : <tr><td colSpan="4">No bets found</td></tr>}
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
