import React, { useEffect, useState } from "react";
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';

const WithdrawPopup = ({ onClose }) => {
    const [bankBalance, setBankBalance] = useState("0");
    const [withdrawalAmount, setWithdrawalAmount] = useState("");
    const [upiId, setUpiId] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);

            axios.get(`http://localhost:5000/user/${decodedToken.userId}`)
                .then(response => {
                    setBankBalance(response.data.bankBalance);
                })
                .catch(error => {
                    console.error('Error fetching user data:', error);
                });
        }
    }, []);

    const handleAmountChange = (e) => {
        setWithdrawalAmount(e.target.value);
    };

    const handleUpiIdChange = (e) => {
        setUpiId(e.target.value);
    };

    const handleSubmit = async () => {
        if (parseFloat(withdrawalAmount) < 100) {
            setErrorMessage("Withdrawal amount must be at least 100Rs.");
        } else if (parseFloat(withdrawalAmount) > parseFloat(bankBalance)) {
            setErrorMessage("Withdrawal amount cannot exceed bank balance.");
        } else {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const decodedToken = jwtDecode(token);
                    const userId = decodedToken.userId;

                    const requestBody = {
                        upiId: upiId,
                        withDrawAmount: withdrawalAmount,
                        userId: userId
                    };

                    const response = await axios.post('http://localhost:5000/withDraw', requestBody);
                    console.log("Withdrawal successful:", response.data);
                    setSuccessMessage("Withdrawal successful.");
                    setTimeout(() => {
                        onClose();
                    }, 3000); // Delay Time
                }
            } catch (error) {
                console.error('Error withdrawing amount:', error);
                setErrorMessage("Error withdrawing amount. Please try again later.");
            }
        }
    };

    return (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-md shadow-md">
                <h2 className="text-lg font-bold mb-4">Withdraw</h2>
                <p className="mb-4">Your bank balance: &#8377;{bankBalance}</p>

                <div className="mb-4">
                    <label htmlFor="withdrawalAmount" className="block mb-2">
                        Amount
                    </label>
                    <input
                        type="text"
                        id="withdrawalAmount"
                        name="withdrawalAmount"
                        placeholder="Enter withdrawal amount"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        value={withdrawalAmount}
                        onChange={handleAmountChange}
                    />
                </div>
                {errorMessage && <p className="text-red-500 mb-2">{errorMessage}</p>}

                <div className="mb-4">
                    <label htmlFor="upiId" className="block mb-2">
                        UPI Id
                    </label>
                    <input
                        type="text"
                        id="upiId"
                        name="upiId"
                        placeholder="Enter your UPI Id"
                        className="border border-gray-300 rounded-md px-3 py-2 w-full"
                        value={upiId}
                        onChange={handleUpiIdChange}
                    />
                </div>

                <div className="flex justify-between">
                    <button
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md mr-2"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                        onClick={handleSubmit}
                    >
                        Submit
                    </button>
                </div>
                {successMessage && (
                    <div className="bg-green-100 border border-green-400 text-green-700 mt-2 px-1 py-2 mb-1 rounded relative" role="alert">
                        <p className="text-center">Withdrawal successful.</p>
                        <p>Amount will be credited in your account within 48 hrs.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WithdrawPopup;
