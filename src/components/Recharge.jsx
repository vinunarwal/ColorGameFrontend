import React, { useState, useEffect } from 'react';
import Icon from '../Images/Icon-color.png';
import Bankicon from '../Images/bank-icon.png';
import Ruppees from '../Images/ruppes-icon.png';
import { jwtDecode } from 'jwt-decode';
import Footer from './Footer';
import { Link } from 'react-router-dom';


function Recharge() {

    const [greeting, setGreeting] = useState('');
    const [username, setUsername] = useState(''); // State for username


    useEffect(() => {
        const currentHour = new Date().getHours();
        if (currentHour >= 6 && currentHour < 12) {
            setGreeting('Good Morning');
        } else if (currentHour >= 12 && currentHour < 18) {
            setGreeting('Good Afternoon');
        } else {
            setGreeting('Good Evening');
        }

        // Decode the token
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            setUsername(decodedToken.username || decodedToken.email); // Assuming your token stores `username` or `email`
        }
    }, []);

    

    const [amount, setAmount] = useState(""); // State to store the input amount

    // Function to handle button clicks and update the input amount
    const handleAmountClick = (amountValue) => {
        setAmount(amountValue);
    };
    return (
        <div>
            <div className=' mt-[40px]'>
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
                                    <Link to ="/ProfilePage"><img className=' w-8' src={Icon} alt='not found' /></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Total Balance Section */}
                    <div className='bg-white rounded-lg mx-[15px]'>
                        <div className='flex justify-between mx-[30px] py-[10px]'>
                            <div className='bank-img'>
                                <img className=' w-20 h-13' src={Bankicon} alt="not found" />
                            </div>
                            <div className='Total-balance'>
                                <div>
                                    <text className=' text-gray-400'>Total Balance</text>
                                </div>
                                <div>
                                    <h2 className=' text-blue-600'>Rs. <span>2,902.54</span></h2>
                                </div>
                                <div>
                                    <text className=' text-gray-400'>ID: <span>61acfede230f7</span></text>
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
                                    placeholder="Enter amount"
                                    value={amount} // Use the state value for the input
                                    onChange={(e) => setAmount(e.target.value)} // Update the state on input change
                                    min="100" // Minimum amount set to 100
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
                                <button className=" bg-sky-500 hover:bg-rose-600 duration-300 text-white text-lg font-bold py-3 px-20 rounded-lg focus:outline-none focus:shadow-outline">
                                    Recharge
                                </button>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Recharge;
