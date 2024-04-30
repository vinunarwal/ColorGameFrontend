import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Complaints = () => {
  const nevigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    // Show SweetAlert confirmation dialog
    Swal.fire({
      title: "Are you sure?",
      text: "Do you want to submit this complaint?",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, submit it!",
    }).then((result) => {
      if (result.isConfirmed) {
        nevigate("/ProfilePage");
      }
    });
  };

  return (
    <>
      <div className="max-w-lg mx-auto px-[12px]">
        <div className=" py-3 px-4  rounded-sm  bg-blue-500">
          <Link to="/ProfilePage" className=" items-center  flex">
            <span className=" text-[20px] text-white">&#x3c;</span>
            <p className=" text-center text-white">
              Complaints And Suggestions
            </p>
          </Link>
        </div>

        <form onSubmit={handleSubmit} className=" text-center mt-5">
          <textarea
            required
            className=" resize-none w-full  p-2 outline-none border-2 border-solid border-[#5e5959] h-[200px]"
          ></textarea>
          <button
            type="submit"
            className="border-1 hover:bg-green-500 duration-300 rounded-md mt-5 bg-[green] text-white border-solid py-[7px] px-[15px]"
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Complaints;