import React from "react";

function WithdrawList({ withdrawals, updateWithdrawStatus }) {
  const handleAccept = async (upiId) => {
    try {
      await updateWithdrawStatus(upiId, "success");
    } catch (error) {
      console.error("Error accepting withdrawal:", error);
    }
  };

  const handleDeny = async (upiId) => {
    try {
      console.log("Denying withdrawal for UPI ID:", upiId);
      await updateWithdrawStatus(upiId, "failed");
    } catch (error) {
      console.error("Error denying withdrawal:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Withdrawals</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4">UPI ID</th>
              <th className="text-left py-2 px-4">Amount</th>
              <th className="text-left py-2 px-4">Status</th>
              {withdrawals.some(
                (withdrawal) => withdrawal.status === "pending"
              ) && <th className="text-left py-2 px-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {withdrawals.map((withdrawal) => (
              <tr key={withdrawal._id}>
                <td className="border px-4 py-2">{withdrawal.upiId}</td>
                <td className="border px-4 py-2">
                  {withdrawal.withDrawAmount}
                </td>
                <td className="border px-4 py-2">{withdrawal.status}</td>
                {withdrawal.status === "pending" && (
                  <td className="border px-4 py-2">
                    <div>
                      <button
                        onClick={() => handleAccept(withdrawal.upiId)}
                        className="hover:text-xl text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleDeny(withdrawal.upiId)}
                        className="hover:text-xl text-red-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        ✗
                      </button>
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default WithdrawList;
