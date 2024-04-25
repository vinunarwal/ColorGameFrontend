import React, { useState, useEffect } from 'react';
import Icon from '../Images/Icon-color.png';
import Bankicon from '../Images/bank-icon.png';
import Ruppees from '../Images/ruppes-icon.png';
import qr from '../Images/qrcode.jpg';
import { jwtDecode } from 'jwt-decode';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';
import Marquee from "react-fast-marquee";


function Recharge() {
   const [greeting, setGreeting] = useState('');
   const [username, setUsername] = useState('');
   const [amount, setAmount] = useState('');
   const [transactionId, setTransactionId] = useState('');
   const [platform, setPlatform] = useState('');
   const [showMessage, setShowMessage] = useState(false);
   const [submitClicked, setSubmitClicked] = useState(false);
   const [userId, setUserId] = useState("");
   const [bankBalance, setBankBalance] = useState("0");


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


   const handleAmountClick = (amountValue) => {
      setAmount(amountValue);
   };

   const handleRecharge = () => {
      if (!amount) {
         Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Please enter the recharge amount!',
         });
         return;
      }

      const qrCodeHtml = `
       <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="display: flex; justify-content: center; align-items: center; height:100%">
             <img className='w-8' src=${qr} alt='QR Code'/>
          </div>
          <p style="text-align: center; margin-top: 10px;">Scan and Pay</p>
       </div>
    `;
      Swal.fire({
         title: 'QR Code',
         html: qrCodeHtml,
         showCloseButton: true,
         showConfirmButton: false,
         customClass: {
            popup: 'center-popup'
         }
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      setSubmitClicked(true);
      if (!amount || !transactionId || !platform || !userId) {
         return;
      }
      try {
         const response = await axios.post('http://localhost:5000/transaction', { transactionId, platform, amount, userId });
         if (response.status === 200 || response.status === 201) {
            setShowMessage(true);
            console.log('Transaction details saved successfully');
            // Clear input fields after successful submission
            setTransactionId('');
            setPlatform('');
            setAmount('');

         } else {
            console.error('Failed to save transaction details');
         }
      } catch (error) {
         console.error('Error while saving transaction details:', error);
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

               {/* Select Amount Section */}
               <div className='Select-Amonunt'>
                  <div className='enteramount'>

                     <div className='flex justify-center px-[10px] rtl relative mx-[16px] mb-5'>
                        <input
                           type="number"
                           className=" outline-black rounded-lg block w-full px-4 py-2 text-gray-700 bg-white  pl-12"
                           placeholder="Enter amount..."
                           value={amount}
                           required
                           onChange={(e) => setAmount(e.target.value)}
                           min="100"
                           max="100000"
                        />
                        <img className='absolute top-1 left-3 w-11 h-8 rounded-s-lg' src={Ruppees} alt="not found rounded-md" />
                     </div>

                     <div className="flex items-center justify-center">
                        <hr className="w-full border-gray-400 border-t-2 mx-4" />
                        <span className="text-gray-400">OR</span>
                        <hr className="w-full border-gray-400 border-t-2 mx-4" />
                     </div>

                     <div className="flex justify-center">
                        <div className="flex flex-wrap justify-between">
                           <div>
                              <button className="bg-amber-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-11 mx-2 min-[430px]:mx-8  rounded-lg focus:outline-none focus:shadow-outline"
                                 onClick={() => handleAmountClick("200")}>
                                 ₹200
                              </button>
                           </div>
                           <div>
                              <button className="bg-amber-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-11 mx-2 min-[430px]:mx-8  rounded-lg focus:outline-none focus:shadow-outline"
                                 onClick={() => handleAmountClick("300")}>
                                 ₹300
                              </button>
                           </div>
                           <div>
                              <button className="bg-yellow-400 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-11 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline"
                                 onClick={() => handleAmountClick("500")}>
                                 ₹500
                              </button>
                           </div>
                           <div>
                              <button className="bg-yellow-400 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-10 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline"
                                 onClick={() => handleAmountClick("1000")}>
                                 ₹1000
                              </button>
                           </div>
                           <div>
                              <button className="bg-lime-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-10 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline"
                                 onClick={() => handleAmountClick("2000")}>
                                 ₹2000
                              </button>
                           </div>
                           <div>
                              <button className="bg-lime-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-10 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline"
                                 onClick={() => handleAmountClick("4000")}>
                                 ₹4000
                              </button>
                           </div>
                        </div>
                     </div>

                     <div className="flex justify-center mt-5 pb-5">
                        <button className="bg-sky-500 hover:bg-rose-600 duration-300 text-white text-lg font-bold py-3 px-20 rounded-lg focus:outline-none focus:shadow-outline" onClick={handleRecharge}>
                           Recharge
                        </button>
                     </div>

                     {/* Text and input fields for transaction ID and platform */}

                     <div className="pb-6">
                        <div className="flex flex-col justify-center bg-slate-300 rounded-md">
                           <Marquee className=''>
                              <p className="text-center text-gray-600 mb-3 mt-4 font-bold rounded-2xl">After payment, enter your transaction ID and platform:</p>
                           </Marquee>
                           <div className="min-[370px]flex text-center items-center justify-around mb-3">
                              <input type="text"
                                 placeholder="Transaction ID *"
                                 className="border bg-amber-100 border-gray-300 max-[370px]:mb-3 rounded-md px-1 max-w-40 py-1 min-[370px]:mr-2 focus:outline-none"
                                 value={transactionId}
                                 required
                                 onChange={(e) => setTransactionId(e.target.value)}
                              />

                              <select
                                 className="border border-gray-300 bg-amber-100 rounded-md px-1 max-w-40 py-1 focus:outline-none"
                                 value={platform}
                                 required
                                 onChange={(e) => setPlatform(e.target.value)}
                              >
                                 <option value="">Select Platform</option>
                                 <option value="Paytm">Paytm</option>
                                 <option value="Google Pay">Google Pay</option>
                                 <option value="PhonePe">PhonePe</option>
                              </select>


                           </div>

                           {submitClicked && (!transactionId || !platform) && (

                              <p className="text-red-500 text-sm">Transaction ID, Platform & Amount are mandatory *</p>

                           )}
                           <div className=' flex justify-center'>
                              <button className="bg-sky-500 hover:bg-rose-600 text-white font-bold py-2 px-9 rounded-md my-2 mb-4  focus:outline-none"
                                 onClick={handleSubmit}>
                                 Submit</button>
                           </div>
                        </div>
                     </div>
                     <div>
                        {showMessage && ( // Render message if showMessage is true
                           <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-1 rounded relative" role="alert">
                              <span className="block sm:inline"> Transaction details saved successfully.</span>
                              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                                 <svg onClick={() => setShowMessage(false)} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.35 14.35a1 1 0 0 1-1.41 0L10 11.41l-2.93 2.93a1 1 0 1 1-1.41-1.41L8.59 10 5.66 7.07a1 1 0 0 1 1.41-1.41L10 8.59l2.93-2.93a1 1 0 0 1 1.41 1.41L11.41 10l2.93 2.93a1 1 0 0 1 0 1.42z" /></svg>
                              </span>
                           </div>
                        )}
                     </div>


                  </div>
               </div>

            </div>
         </div>

         <Footer />
      </div>
   );
}

export default Recharge;
