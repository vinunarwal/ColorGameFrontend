import React from "react";

function TransactionList({ transactions, updateTransactionStatus }) {
  const handleAccept = async (transactionId) => {
    try {
      await updateTransactionStatus(transactionId, "success");
    } catch (error) {
      console.error("Error accepting transaction:", error);
    }
  };

  const handleDeny = async (transactionId) => {
    try {
      await updateTransactionStatus(transactionId, "failed");
    } catch (error) {
      console.error("Error denying transaction:", error);
    }
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Transactions</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded-xl overflow-hidden">
          <thead className="bg-gray-200">
            <tr>
              <th className="text-left py-2 px-4">Transaction ID</th>
              <th className="text-left py-2 px-4">Platform</th>
              <th className="text-left py-2 px-4">Amount</th>
              <th className="text-left py-2 px-4">Status</th>
              {transactions.some(
                (transaction) => transaction.status === "pending"
              ) && <th className="text-left py-2 px-4">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction._id}>
                <td className="border px-4 py-2">
                  {transaction.transactionId}
                </td>
                <td className="border px-4 py-2">{transaction.platform}</td>
                <td className="border px-4 py-2">{transaction.amount}</td>
                <td className="border px-4 py-2">{transaction.status}</td>
                {transaction.status === "pending" && (
                  <td className="border px-4 py-2">
                    <div>
                      <button
                        onClick={() => handleAccept(transaction.transactionId)}
                        className="hover:text-xl text-green-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        ✓
                      </button>
                      <button
                        onClick={() => handleDeny(transaction.transactionId)}
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

export default TransactionList;
