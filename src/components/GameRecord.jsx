import React, { useState, useEffect } from "react";
import axios from "axios";

function GameRecord({ periodIds }) {
  const [lowestBetNumbers, setLowestBetNumbers] = useState([]);

  useEffect(() => {
    const fetchLowestBetNumbers = async () => {
      try {
        const lowestBetNumbers = await Promise.all(
          periodIds.map(async (id) => {
            const response = await axios.get(`http://localhost:5000/lowest/${id}`);
            return { periodId: id, lowestBetNumber: response.data.lowestBetNumber };
          })
        );
        setLowestBetNumbers(lowestBetNumbers);
      } catch (error) {
        console.error("Error fetching lowest bet numbers:", error);
      }
    };

    fetchLowestBetNumbers();
  }, [periodIds]);

  return (
    <div className="container mx-auto">
      <div className="bg-slate-100 mx-auto py-4 max-w-[420px]">
        <div className="px-4 mx-auto max-w-[640px]">
          <h2 className="text-xl font-bold text-center">Parity Record</h2>
          <hr className="my-4 border-b-2 border-blue-500 font-bold" />
          <div className="overflow-y-scroll example h-[200px]">
            <table className="table-auto w-full">
              <thead className="sticky bg-slate-100 top-0 z-10">
                <tr>
                  <th className="px-4 py-2">Period</th>
                  <th className="px-4 py-2">Lowest Bet Number</th>
                </tr>
              </thead>
              <tbody>
                {lowestBetNumbers.map(({ periodId, lowestBetNumber }, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{periodId}</td>
                    <td className="px-4 py-2">{lowestBetNumber}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GameRecord;
