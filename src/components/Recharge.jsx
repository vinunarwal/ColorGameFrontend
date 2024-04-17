import React from 'react'
import Icon from '../Images/Icon-color.png';
import Bankicon from '../Images/bank-icon.png';
import Ruppees from '../Images/ruppes-icon.png';
//import Footer from './Footer';

function Recharge() {
    return (
        <div>
            <div className=' mt-[40px]'>
                <div className='content max-w-[420px] mx-auto px-[12px] bg-slate-100'>

               {/* Profile Secttion */}
               <div className='pt-[12px] '>
                  <div className='Header mb-5 flex py-[8px] rounded-xl justify-between mx-[40px] px-[12px] bg-white '>
                     <div className='User'>
                        <div className='text-gray-500 text-xs'>Hello, Good Morning</div>
                        <div className=' font-bold text-sm'>Vivek Prajapati</div>
                     </div>
                     <div className=' flex justify-center items-center'>
                        <div className='icon mr-5'>🔔</div>
                        <div className='Profile'>
                           <img className=' w-8' src={Icon} alt='not found' />
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
                           className="rounded-lg block w-full px-4 py-2 text-gray-700 bg-white focus:border-white focus:outline-none focus:ring focus:ring-white-200 pl-12"
                           placeholder="Enter amount"
                        />
                        <img className='absolute top-0 left-3 w-11 h-10 rounded-s-lg' src={Ruppees} alt="not found rounded-md" />
                     </div>

                     <div className="flex items-center justify-center">
                        <hr className="w-full border-gray-400 border-t-2 mx-4" />
                        <span className="text-gray-400">OR</span>
                        <hr className="w-full border-gray-400 border-t-2 mx-4" />
                     </div>

                            <div className="flex justify-center">
                                <div className="flex flex-wrap justify-between">
                                    <div>
                                        <button className="bg-amber-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-11 mx-2 min-[430px]:mx-8  rounded-lg focus:outline-none focus:shadow-outline">
                                            ₹200
                                        </button>
                                    </div>
                                    <div>
                                        <button className="bg-amber-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-11 mx-2 min-[430px]:mx-8  rounded-lg focus:outline-none focus:shadow-outline">
                                            ₹300
                                        </button>
                                    </div>
                                    <div>
                                        <button className="bg-yellow-400 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-11 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline">
                                            ₹500
                                        </button>
                                    </div>
                                    <div>
                                        <button className="bg-yellow-400 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-10 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline">
                                            ₹1000
                                        </button>
                                    </div>
                                    <div>
                                        <button className="bg-lime-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-10 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline">
                                            ₹2000
                                        </button>
                                    </div>
                                    <div>
                                        <button className="bg-lime-500 hover:bg-blue-700 mt-[10px] duration-500 text-white font-bold py-2 px-10 mx-2 min-[430px]:mx-8 rounded-lg focus:outline-none focus:shadow-outline">
                                            ₹4000
                                        </button>
                                    </div>
                                </div>
                            </div>

                     <div className="flex justify-center mt-5 pb-5">
                        <button className=" bg-sky-500 hover:bg-rose-600 text-white text-lg font-bold py-3 px-20 rounded-lg focus:outline-none focus:shadow-outline">
                           Recharge
                        </button>
                     </div>

                  </div>
               </div>

            </div>
         {/*<Footer />*/}
         </div>
      </div>
   )
}

export default Recharge;
