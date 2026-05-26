// GameRecord.jsx - Updated with new design
import React from "react";

function GameRecord({ periods }) {
  const getBackgroundColorForWonNumber = (wonNumber) => {
    if (wonNumber === 0) {
      return "result-badge number-gradient-0";
    } else if (wonNumber === 5) {
      return "result-badge number-gradient-5";
    } else if ([1, 3, 7, 9].includes(wonNumber)) {
      return "result-badge number-green";
    } else if ([2, 4, 6, 8].includes(wonNumber)) {
      return "result-badge number-red";
    } else {
      return "result-badge bg-gray-600 text-white";
    }
  };

  return (
    <div className="container mx-auto px-4 pb-4">
      <div className="record-container mx-auto" style={{ maxWidth: "420px" }}>
        <div className="p-4">
          <h2 className="record-title text-center mb-4">📊 GAME HISTORY</h2>
          <hr className="mb-4 border-t-2 border-purple-500/50" />
          <div className="overflow-y-scroll h-[320px] custom-scroll">
            <table className="record-table w-full text-center">
              <thead>
                <tr>
                  <th className="px-4 py-3">PERIOD</th>
                  <th className="px-4 py-3">RESULT</th>
                </tr>
              </thead>
              <tbody>
                {periods.map((period, index) => (
                  <tr key={index} className="border-b border-white/5">
                    <td className="period-cell px-4 py-3">#{period.periodId}</td>
                    <td className="px-4 py-3">
                      <div className={getBackgroundColorForWonNumber(period.wonNumber)}>
                        {period.wonNumber !== undefined ? period.wonNumber : "—"}
                      </div>
                    </td>
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