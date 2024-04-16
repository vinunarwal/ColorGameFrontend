import React from "react";
import manicon from "../assets/images/jpg/manicon.jpg";
import BellIcon from "../assets/images/svg/bell.svg";
const ProfilePage = () => {
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
                  User : <span>12345</span>
                </p>
                <p className=" text-white font-medium">
                  ID : <span>22255</span>
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
              <span className=" font-semibold text-[14px]">+912255663344</span>
            </p>
            <p className=" text-white mt-1 font-medium">
              Available Balance :
              <span className=" font-semibold text-[14px]">&#8377;</span>
              <span className=" font-semibold text-[14px]">1250000000001</span>
            </p>
          </div>

          <button className="border-1  rounded-md mt-5 bg-[green] text-white border-solid py-[7px] px-[15px]">
            Recharge
          </button>
        </div>
        <div className="m-[20px]">
          <div className="flex  ">
            <p>Bonus Record</p>
          </div>
          <div className="flex border-t-[1px] py-[4px] border-solid border-[#706f6f77]  ">
            <p>Promotion</p>
          </div>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <p>Bank Card</p>
          </div>{" "}
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <p>Wallet</p>
          </div>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <p>Address</p>
          </div>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <p>App Download</p>
          </div>
          <div className="flex  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <p>Complaints and suggestions</p>
          </div>
          <div className="flex  border-b-[1px]  border-t-[1px] py-[4px] border-solid border-[#706f6f77] ">
            <p>About</p>
          </div>
          <div className="text-center">
            <button className="border-1 mt-5 bg-[red] rounded-md text-white border-solid py-[10px] px-[35px]">
              logout
            </button>
          </div>
        
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
