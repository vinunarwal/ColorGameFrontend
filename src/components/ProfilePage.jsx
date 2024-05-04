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


  return (
    <div>
      <div className="max-w-lg mx-auto px-[12px]">
        <div className=" bg-blue-500 m-[20px] rounded-md p-[20px]">
          <div className="flex justify-between items-center">
            <div className="flex items-center justify-center">
              <img
                className="w-[35px] h-[40px] rounded-[50px]"
                src={manicon}
                alt="manicon"
              />
              <div className=" ps-[20px]">
                <p className=" text-white font-medium">
                  User : <span>{username}</span>
                </p>
                <p className=" text-white font-medium">
                  ID : <span>{userId}</span>
                </p>
              </div>
            </div>
            <div>
              <img
                className=" w-[30px] h-[30px]"
                src={BellIcon}
                alt="bell icon"
              />
            </div>
          </div>
          <div>
            <p className=" text-white mt-[20px] font-medium">
              Mobile :
              <span className=" font-semibold text-[14px]">{mobile}</span>
            </p>
            <p className=" text-white mt-1 font-medium">
              Available Balance :
              <span className=" font-semibold text-[14px]">&#8377;</span>
              <span className=" font-semibold text-[14px]">{bankBalance}</span>
            </p>
          </div>

          <Link to="/recharge">
            <button className="border-1 hover:bg-green-500 duration-300 rounded-md mt-5 bg-[green] text-white border-solid py-[7px] px-[15px]">
              Recharge
            </button>
          </Link>

          <Link to='/withdraw'>
            <button
              className="border-1 hover:bg-red-500 duration-300 rounded-md mt-5 ml-3 bg-[red] text-white border-solid py-[7px] px-[15px]"
            >
              Withdraw
            </button>
          </Link>

        </div>
        <div className="m-[20px]">
          <div className="flex  ">
            <img src={bonus} alt="bonus" />
            <p className=" ps-2">Bonus Record</p>
          </div>
          <div className="flex border-t-[1px] py-[4px] border-solid border-[#706f6f77]  ">
            <img src={promotion} alt="promotion" />
            <p className=" ps-2">Promotion</p>
          </div>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <img src={bankcard} alt="bankcard" />{" "}
            <p className="ps-2">Bank Card</p>
          </div>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <img src={wallet} alt="wallet" /> <p className="ps-2">Wallet</p>
          </div>
          <Link
            to="/Address"
            className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] "
          >
            <img src={address} alt="ADDRESS" /> <p className="ps-2">Address</p>
          </Link>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <img src={appdownload} alt="app" />{" "}
            <p className="ps-2">App Download</p>
          </div>
          <Link
            to="/Complaints"
            className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <img src={complaints} alt="complaints" />{" "}
            <p className="ps-2">Complaints and suggestions</p>
          </Link>
          <div className="flex  border-b-[1px]  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <img src={about} alt="about" /> <p className=" ps-2">About</p>
          </div>
          <div className="text-center">
            <button
              className="border-1  rounded-md mt-5 bg-[red] text-white border-solid py-[7px] px-[15px]"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ProfilePage;
