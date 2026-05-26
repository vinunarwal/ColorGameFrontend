// Footer.jsx - Fixed at bottom
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBolt, faMedal, faUser } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  const location = useLocation();
  
  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[10000]">
      <div className="container mx-auto">
        <div className="mx-auto" style={{ maxWidth: "420px" }}>
          <div className="footer-nav">
            <div className="flex items-center justify-around px-4 mx-auto max-w-[640px]">
              <Link 
                to='/main' 
                className={`flex flex-col items-center justify-center transition-all duration-300 py-2 px-4 rounded group ${
                  isActive('/main') ? 'text-white' : 'text-white/60'
                }`}
              >
                <div className={`rounded-full p-2 mb-1 transition-all duration-300 ${
                  isActive('/main') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-110' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <FontAwesomeIcon icon={faHome} className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Home</span>
              </Link>
              
              <Link 
                to='/recharge' 
                className={`flex flex-col items-center justify-center transition-all duration-300 py-2 px-4 rounded group ${
                  isActive('/recharge') ? 'text-white' : 'text-white/60'
                }`}
              >
                <div className={`rounded-full p-2 mb-1 transition-all duration-300 ${
                  isActive('/recharge') 
                    ? 'bg-gradient-to-r from-yellow-500 to-orange-500 shadow-lg scale-110' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <FontAwesomeIcon icon={faBolt} className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Recharge</span>
              </Link>
              
              <Link 
                to="/win" 
                className={`flex flex-col items-center justify-center transition-all duration-300 py-2 px-4 rounded group ${
                  isActive('/win') ? 'text-white' : 'text-white/60'
                }`}
              >
                <div className={`rounded-full p-2 mb-1 transition-all duration-300 ${
                  isActive('/win') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-110' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <FontAwesomeIcon icon={faMedal} className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Win</span>
              </Link>

              <Link 
                to="/ProfilePage" 
                className={`flex flex-col items-center justify-center transition-all duration-300 py-2 px-4 rounded group ${
                  isActive('/ProfilePage') ? 'text-white' : 'text-white/60'
                }`}
              >
                <div className={`rounded-full p-2 mb-1 transition-all duration-300 ${
                  isActive('/ProfilePage') 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 shadow-lg scale-110' 
                    : 'bg-white/10 group-hover:bg-white/20'
                }`}>
                  <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
                </div>
                <span className="text-xs font-medium">Profile</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;