import React, { useState, useEffect } from 'react';
import Icon from '../Images/Icon-color.png';
import Bankicon from '../Images/bank-icon.png';
import { jwtDecode } from 'jwt-decode';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Withdrawl() {
   const [greeting, setGreeting] = useState('');
   const [username, setUsername] = useState('');
   const [userId, setUserId] = useState("");
   const [bankBalance, setBankBalance] = useState("0");
   const [withdrawalAmount, setWithdrawalAmount] = useState("");
   const [upiId, setUpiId] = useState("");
   const [errorMessage, setErrorMessage] = useState("");
   const [successMessage, setSuccessMessage] = useState("");


   useEffect(() => {
      const currentHour = new Date().getHours();
      if (currentHour >= 6 && currentHour < 12) {
         setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 18) {
         setGreeting('Good Afternoon');
      } else {
         setGreeting('Good Evening');
      }

      const token = localStorage.getItem('token');
      if (token) {
         const decodedToken = jwtDecode(token);
         setUsername(decodedToken.username);
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

   const handleAmountChange = (e) => {
      setWithdrawalAmount(e.target.value);
   };

   const handleUpiIdChange = (e) => {
      setUpiId(e.target.value);
   };

   const handleSubmit = async () => {
      if (parseFloat(withdrawalAmount) < 100) {
         setErrorMessage("Withdrawal amount must be at least 100Rs.");
      } else if (parseFloat(withdrawalAmount) > parseFloat(bankBalance)) {
         setErrorMessage("Withdrawal amount cannot exceed bank balance.");
      } else {
         try {
            const token = localStorage.getItem('token');
            if (token) {
               const decodedToken = jwtDecode(token);
               const userId = decodedToken.userId;

               const requestBody = {
                  upiId: upiId,
                  withDrawAmount: withdrawalAmount,
                  userId: userId
               };

               const response = await axios.post('http://localhost:5000/withDraw', requestBody);
               console.log("Withdrawal successful:", response.data);
               setSuccessMessage("Withdrawal successful.");
            }
         } catch (error) {
            console.error('Error withdrawing amount:', error);
            setErrorMessage("Error withdrawing amount. Please try again later.");
         }
      }
   };



   return (
      <div>
         <div className=' mt-[5px]'>
            <div className='content max-w-[420px] mx-auto px-[12px] bg-slate-100'>

               {/* Profile Secttion */}
               <div className='pt-[12px] '>
                  <div className='Header mb-5 flex py-[8px] rounded-xl justify-between mx-[40px] px-[12px] bg-white '>
                     <div className='User'>
                        <div className='text-gray-500 text-xs'>Hello, {greeting}</div>
                        <div className=' font-bold text-sm'>{username}</div>
                     </div>
                     <div className=' flex justify-center items-center'>
                        <div className='icon mr-5'>🔔</div>
                        <div className='Profile'>
                           <Link to="/ProfilePage"><img className=' w-8' src={Icon} alt='not found' /></Link>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Total Balance Section */}
               <div className='bg-white rounded-lg mx-[15px]'>
                  <div className='flex justify-between mx-[12px] py-[10px]'>
                     <div className='bank-img max-[394px]:hidden'>
                        <img className=' w-20 h-13' src={Bankicon} alt="not found" />
                     </div>
                     <div className='Total-balance'>
                        <div>
                           <text className=' text-gray-400'>Total Balance</text>
                        </div>
                        <div>
                           <h2 className=' text-blue-600'>Rs. <span>{bankBalance}</span></h2>
                        </div>
                        <div>
                           <text className=' text-gray-400'>ID: <span>{userId}</span></text>
                        </div>
                     </div>
                  </div>
               </div>

               <p className=' font-bold text-xl my-[10px] pl-5'>Select Amount</p>

               {/* Withdrawl Section */}

               <div className="">
                  <div className="bg-white p-8 rounded-md shadow-md">
                     <h2 className="text-lg font-bold mb-4">Withdraw</h2>
                     <p className="mb-4">Your bank balance: &#8377;{bankBalance}</p>

                     <div className="mb-4">
                        <label htmlFor="withdrawalAmount" className="block mb-2">
                           Amount
                        </label>
                        <input
                           type="text"
                           id="withdrawalAmount"
                           name="withdrawalAmount"
                           placeholder="Enter withdrawal amount"
                           className="border border-gray-300 rounded-md px-3 py-2 w-full"
                           value={withdrawalAmount}
                           onChange={handleAmountChange}
                        />
                     </div>
                     {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

                     <div className="mb-4">
                        <label htmlFor="upiId" className="block mb-2">
                           UPI Id
                        </label>
                        <input
                           type="text"
                           id="upiId"
                           name="upiId"
                           placeholder="Enter your UPI Id"
                           className="border border-gray-300 rounded-md px-3 py-2 w-full"
                           value={upiId}
                           onChange={handleUpiIdChange}
                        />
                     </div>
                     <div>
                        <button
                           className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                           onClick={handleSubmit}
                        >
                           Submit
                        </button>
                     </div>

                     {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 mt-2 px-1 py-2 mb-1 rounded relative" role="alert">
                           <p className="text-center">Withdrawal successful.</p>
                           <p>Amount will be credited in your account within 48 hrs.</p>
                        </div>
                     )}
                  </div>
               </div>

            </div>
         </div>

         <Footer />
      </div>
   );
}

export default Withdrawl;
