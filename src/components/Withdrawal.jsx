import React, { useState, useEffect } from 'react';
import Icon from '../Images/Icon-color.png';
import Bankicon from '../Images/bank-icon.png';
import { jwtDecode } from 'jwt-decode';
import Footer from './Footer';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import axios from 'axios';

function Withdrawal() {
    const [greeting, setGreeting] = useState('');
    const [username, setUsername] = useState('');
    const [amount, setAmount] = useState('');
    const [platform, setPlatform] = useState('');
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

            axios.get(`https://colorgamebackend-1.onrender.com/user/${decodedToken.userId}`)
                .then(response => {
                    setBankBalance(response.data.bankBalance);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });

        }
    }, []);

    const handleRecharge = () => {
        if (!amount) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Please enter the recharge amount!',
            });
            return;
        }
        else if (amount < 100 || amount > 100000) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Amount should be greater than 100 and less than 100,000',
            });
            return;
        }
    };


    const handlePlatformChange = (e) => {
        setPlatform(e.target.value);
    };

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleWithdrawal = () => {
        // Here you can implement logic to handle withdrawal
        console.log('Withdrawal Platform:', platform);
        console.log('Withdrawal Amount:', amount);
        // Reset platform and amount after withdrawal
        setPlatform('');
        setAmount('');
    };

    return (
        <div className="max-w-[420px] w-full mx-auto bg-slate-100 rounded-md shadow-md">
            <div className=' pb-10 pt-3 px-4'>
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



                <h2 className="text-2xl font-semibold mb-4 my-4 text-center">Withdrawal</h2>
                <div className="mb-4">
                    <label htmlFor="platform" className="block text-sm font-medium text-gray-700">Select Platform</label>
                    <select
                        id="platform"
                        value={platform}
                        onChange={handlePlatformChange}
                        className="mt-1 py-1 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    >
                        <option value="">Select Platform...</option>
                        <option value="Paytm">Paytm</option>
                        <option value="UPI">UPI</option>
                        <option value="PhonePe">PhonePe</option>
                        <option value="Google Pay">Google Pay</option>
                    </select>
                </div>
                <div className="mb-4">
                    <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Enter Amount</label>
                    <input
                        type="number"
                        id="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        className="mt-1 block w-full px-4 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        placeholder="Enter amount..."
                        min="100"
                        max="100000"
                        required
                    />
                </div>
                <button
                    onClick={handleWithdrawal}
                    className="w-full py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Withdraw
                </button>
            </div>

            <Footer />
        </div>
    );
}

export default Withdrawal;
