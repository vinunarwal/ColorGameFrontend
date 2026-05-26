// ProfilePage.jsx - Updated with modern design
import React, { useState, useEffect } from "react";
import manicon from "../assets/images/jpg/manicon.jpg";
import BellIcon from "../assets/images/svg/bell.svg";
import { Link, useNavigate } from "react-router-dom";
import promotion from "../assets/images/svg/per.svg";
import bonus from "../assets/images/svg/bonus-svgrepo-com.svg";
import about from "../assets/images/svg/about.svg";
import address from "../assets/images/svg/address.svg";
import bankcard from "../assets/images/svg/bankcard.svg";
import complaints from "../assets/images/svg/complaints.svg";
import appdownload from "../assets/images/svg/appdownload.svg";
import wallet from "../assets/images/svg/wallet.svg";
import Footer from "./Footer";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [mobile, setMobile] = useState('');
  const [userId, setUserId] = useState("");
  const [bankBalance, setBankBalance] = useState("0");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      setUsername(decodedToken.username);
      setMobile(decodedToken.mobile);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const menuItems = [
    { icon: bonus, label: "Bonus Record", link: "/bonus-record" },
    { icon: promotion, label: "Promotion", link: "/promotion" },
    { icon: bankcard, label: "Bank Card", link: "/bank-card" },
    { icon: wallet, label: "Wallet", link: "/wallet" },
    { icon: address, label: "Address", link: "/Address" },
    { icon: appdownload, label: "App Download", link: "/app-download" },
    { icon: complaints, label: "Complaints and suggestions", link: "/Complaints" },
    { icon: about, label: "About", link: "/about" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#1a1a2e] to-[#16213e]">
      <div className="max-w-[420px] mx-auto px-4 py-4">
        {/* Profile Header Card */}
        <div className="period-card p-5 mb-4">
          <div className="period-header mb-4">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    className="w-16 h-16 rounded-full border-2 border-purple-500 shadow-lg object-cover"
                    src={manicon}
                    alt="manicon"
                  />
                  <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                </div>
                <div>
                  <p className="text-white font-bold text-lg">{username}</p>
                  <p className="text-purple-300 text-sm">ID: {userId}</p>
                </div>
              </div>
              <div className="bg-white/10 rounded-full p-2 cursor-pointer hover:bg-white/20 transition-all">
                <img className="w-5 h-5" src={BellIcon} alt="bell icon" />
              </div>
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between bg-white/5 rounded-xl p-3">
              <span className="text-white/60 text-sm">📱 Mobile</span>
              <span className="text-white font-semibold">{mobile}</span>
            </div>
            <div className="flex items-center justify-between bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-3 border border-purple-500/30">
              <span className="text-white/80 text-sm">💰 Available Balance</span>
              <span className="text-white font-bold text-xl">₹{parseFloat(bankBalance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <Link to="/recharge" className="flex-1">
              <button className="w-full btn-recharge text-white py-3 rounded-xl font-bold">
                💰 Recharge
              </button>
            </Link>
            <Link to='/withdraw' className="flex-1">
              <button className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:shadow-lg transition-all py-3 rounded-xl font-bold text-white">
                💸 Withdraw
              </button>
            </Link>
          </div>
        </div>

        {/* Menu Items Card */}
        <div className="record-container">
          <div className="p-4">
            <h2 className="record-title text-center mb-4">⚙️ SETTINGS</h2>
            <hr className="mb-4 border-t-2 border-purple-500/50" />
            
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={index}
                  to={item.link}
                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-300 group"
                >
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <img src={item.icon} alt={item.label} className="w-5 h-5" />
                  </div>
                  <span className="flex-1 text-white/80 group-hover:text-white font-medium">
                    {item.label}
                  </span>
                  <svg className="w-5 h-5 text-white/40 group-hover:text-white/60 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>

            {/* Logout Button */}
            <div className="mt-6 pt-4 border-t border-white/10">
              <button
                className="w-full bg-gradient-to-r from-red-600 to-red-500 hover:shadow-lg transition-all py-3 rounded-xl font-bold text-white flex items-center justify-center gap-2"
                onClick={handleLogout}
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;