import React from "react";

function GameRecord({ periodIds }) {
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
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Number</th>
                  <th className="px-4 py-2">Result</th>
                </tr>
              </thead>
              <tbody>
                {periodIds.map((id, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2">{id}</td>
                    <td className="px-4 py-2">Price data</td>
                    <td className="px-4 py-2">Number data</td>
                    <td className="px-4 py-2">Result data</td>
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
