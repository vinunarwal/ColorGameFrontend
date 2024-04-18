import React from "react";
import { Link } from "react-router-dom";

const AddAddress = () => {
  return (
    <div className="max-w-[442px] mx-auto px-[12px]">
      <div>
        <Link to="/Address">
          <p className=" text-white py-3 px-4 rounded-sm items-center  bg-blue-500">
            <span className=" text-[20px]">&#x3c;</span> Add Address
          </p>
        </Link>
        <form action="" className="">
          <p className="text-[#47444472] mt-4 font-semibold text-[17px]">
            Full Name
          </p>
          <input
            type="text"
            required
            className=" py-2 outline-none border-b-2 border-solid border-[#47444472] w-full"
            placeholder="Enter your Full Name "
          />{" "}
          <p className="text-[#47444472] mt-4 font-semibold text-[17px]">
            Mobile No.
          </p>
          <input
            type="number"
            required
            className=" py-2 outline-none border-b-2 border-solid border-[#47444472] w-full"
            placeholder="Enter your Mobile No. "
          />
          <p className="text-[#47444472] mt-4 font-semibold text-[17px]">
            Pincode
          </p>
          <input
            type="number"
            required
            className=" py-2 outline-none border-b-2 border-solid border-[#47444472] w-full"
            placeholder=" Pincode "
          />
          <p className="text-[#47444472] mt-4 font-semibold text-[17px]">
            Town City
          </p>
          <input
            type="text"
            required
            className=" py-2 outline-none border-b-2 border-solid border-[#47444472] w-full"
            placeholder="Town/City"
          />
          <button className="border-1 hover:bg-green-500 duration-300 rounded-md mt-5 bg-[green] text-white border-solid py-[7px] px-[15px]">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddAddress;
