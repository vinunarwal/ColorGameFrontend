import React from "react";
import { Link } from "react-router-dom";

const Address = () => {
  return (
    <>
      <div className="max-w-[442px] mx-auto px-[12px] ">
        <div className="flex justify-between py-3 px-4 rounded-sm items-center  bg-blue-500">
          <Link to="/ProfilePage">
            <p className="text-white  ">
              <span className=" text-[20px]">&#x3c;</span> Address
            </p>
          </Link>
          <Link to="/AddAddress" className=" text-[24px]  text-white">
            +
          </Link>
        </div>
      </div>
    </>
  );
};

export default Address;
