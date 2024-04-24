import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TransactionList from './TransactionList';

function AdminPanel() {
   const [transactions, setTransactions] = useState([]);
   const [filter, setFilter] = useState('pending');
   const [loading, setLoading] = useState(false);

   useEffect(() => {
      fetchTransactions();
   }, [filter]);

   const fetchTransactions = async () => {
      setLoading(true);
      try {
         const response = await axios.get(`http://localhost:5000/transaction?filter=${filter}`);
         setTransactions(response.data);
         setLoading(false);
      } catch (error) {
         console.error('Error fetching transactions:', error);
         setLoading(false);
      }
   };

   const handleFilterChange = (newFilter) => {
      setFilter(newFilter);
   };

   const updateTransactionStatus = async (transactionId, status) => {
      try {
          await axios.put('http://localhost:5000/updateStatus', { transactionId, status });
          fetchTransactions(); // Refresh transactions after updating status
      } catch (error) {
          console.error('Error updating transaction status:', error);
      }
  };
  
  

   return (
      <div className="container mx-auto px-4 py-8">
         <h1 className="text-3xl font-bold mb-4">Admin Panel</h1>
         <div className="flex justify-center mb-4">
            <button onClick={() => handleFilterChange('pending')} className={`mr-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md 
                ${filter === 'pending' && 'bg-gray-300'}`}>
               Pending Transactions</button>
            <button onClick={() => handleFilterChange('success')} className={`mr-2 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md
                 ${filter === 'success' && 'bg-gray-300'}`}>
               Successful Transactions</button>
            <button onClick={() => handleFilterChange('failed')} className={`bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-md
                 ${filter === 'failed' && 'bg-gray-300'}`}>
               Failed Transactions</button>
         </div>
         {loading ? (
            <div className="text-center">Loading...</div>
         ) : (
            <TransactionList transactions={transactions} updateTransactionStatus={updateTransactionStatus} />
         )}
      </div>
   );
}

export default AdminPanel;
