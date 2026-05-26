// Home.jsx - Updated with new design classes
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import { RefreshCw } from 'lucide-react';

function Home() {
  const [isOpen, setIsOpen] = useState(false);
  const [bankBalance, setBankBalance] = useState("0");

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      axios.get(`https://colorgamebackend-1.onrender.com/user/${decodedToken.userId}`)
        .then(response => {
          setBankBalance(response.data.bankBalance);
        })
        .catch(error => {
          console.error('Error fetching user data:', error);
        });
    }
  }, []);

  const openPopup = () => {
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  };

  const closePopup = () => {
    setIsOpen(false);
    document.body.style.overflow = "auto";
  };

  return (
    <div className="container mx-auto px-4 pt-4">
      <div className="home-container mx-auto" style={{ maxWidth: "420px" }}>
        <div className="header-card p-4 mx-auto" style={{ maxWidth: "640px" }}>
          <div className="balance-card p-3 mb-4">
            <p className="text-white/70 text-sm mb-1">Available Balance</p>
            <p className="balance-amount">₹{parseFloat(bankBalance).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</p>
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex gap-3">
              <Link to="/recharge">
                <button className="btn-recharge text-white">
                  💰 Recharge
                </button>
              </Link>
              <button className="btn-rules" onClick={openPopup}>
                📖 Rules
              </button>
            </div>
            <Link to="/">
              <button className="btn-refresh text-white">
                <RefreshCw size={20} />
              </button>
            </Link>
          </div>
        </div>

        {/* Rules Modal */}
        {isOpen && (
          <div className="fixed inset-0 z-[1000000] flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={closePopup}>
            <div className="rules-modal" onClick={(e) => e.stopPropagation()}>
              <h2 className="rules-title">🎲 Game Rules</h2>
              <div className="rules-text">
                <p className="rules-rule">⏱️ <strong>3 minutes</strong> per round | 2:30 betting time | 30 sec result display</p>
                <p className="rules-rule">💰 Bet ₹100 → after ₹2 fee, contract amount = ₹98</p>
                <p className="rules-rule">🟢 <strong>GREEN:</strong> 1,3,7,9 → win ₹196 | 5 → win ₹147</p>
                <p className="rules-rule">🔴 <strong>RED:</strong> 2,4,6,8 → win ₹196 | 0 → win ₹147</p>
                <p className="rules-rule">🟣 <strong>VIOLET:</strong> 0 or 5 → win ₹441</p>
                <p className="rules-rule">🔢 <strong>NUMBER:</strong> Exact match → win ₹882</p>
              </div>
              <button className="btn-close-modal" onClick={closePopup}>
                Got it ✓
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;