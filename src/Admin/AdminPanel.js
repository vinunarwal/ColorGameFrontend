import React, { useState, useEffect } from "react";
import axios from "axios";
import TransactionList from "../Admin/TransactionList";
import WithdrawList from "../Admin/WithdrawalList";

function AdminPanel() {
  const [transactions, setTransactions] = useState([]);
  const [withdrawals, setWithdrawals] = useState([]);
  const [filter, setFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [showTransactionList, setShowTransactionList] = useState(true);

  useEffect(() => {
    fetchTransactions();
    fetchWithdrawals();
  }, [filter]);

  const fetchTransactions = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/transaction?filter=${filter}`
      );
      setTransactions(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching transactions:", error);
      setLoading(false);
    }
  };

  const fetchWithdrawals = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5000/withdraw?filter=${filter}`
      );
      setWithdrawals(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching withdrawals:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = (newFilter) => {
    setFilter(newFilter);
  };

  const updateTransactionStatus = async (transactionId, status) => {
    try {
      await axios.put("http://localhost:5000/updateStatus", {
        transactionId,
        status,
      }); 
      fetchTransactions();
    } catch (error) {
      console.error("Error updating transaction status:", error);
    }
  };

const updateWithdrawStatus = async (upiId, status) => {
  try {
    await axios.put("http://localhost:5000/status", {
      upiId: upiId, // Pass upiId as a property of the object
      status: status, // Pass status as a property of the object
    });
    fetchWithdrawals();
  } catch (error) {
    console.error("Error updating withdrawal status:", error);
  }
};

  const handleRechargeButtonClick = () => { 
    setShowTransactionList(true);
  };

  const handleWithdrawButtonClick = () => {
    setShowTransactionList(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Admin Panel</h1>
      <div className="flex justify-center mb-4">
        <button
          onClick={() => handleFilterChange("pending")}
          className={`mr-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${
            filter === "pending" && "bg-gray-300"
          }`}
        >
          Pending Transactions
        </button>
        <button
          onClick={() => handleFilterChange("success")}
          className={`mr-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${
            filter === "success" && "bg-gray-300"
          }`}
        >
          Successful Transactions
        </button>
        <button
          onClick={() => handleFilterChange("failed")}
          className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md ${
            filter === "failed" && "bg-gray-300"
          }`}
        >
          Failed Transactions
        </button>
      </div>
      <div className="flex justify-center mb-4">
        <button
          onClick={handleRechargeButtonClick}
          className={`mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Recharge
        </button>
        <button
          onClick={handleWithdrawButtonClick}
          className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
        >
          Withdraw
        </button>
      </div>
      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <>
          {showTransactionList ? (
            <TransactionList
              transactions={transactions}
              updateTransactionStatus={updateTransactionStatus}
            />
          ) : (
            <WithdrawList
              withdrawals={withdrawals}
              updateWithdrawStatus={updateWithdrawStatus}
            />
          )}
        </>
      )}
    </div>
  );
}

export default AdminPanel;