import React from "react";

function GameRecord({ periodIds, lowestBetNumberMap }) {
   return (
      <div className="container mx-auto">
         <div className="bg-slate-100 mx-auto py-4 max-w-[420px]">
            <div className="px-4 mx-auto max-w-[640px]">
               <h2 className="text-xl font-bold text-center">Parity Record</h2>
               <hr className="my-4 border-b-2 border-blue-500 font-bold" />
               <div className="overflow-y-scroll example h-[200px]">
                  <table className="table-auto w-full text-center">
                     <thead className="sticky bg-slate-100 top-0 z-10">
                        <tr>
                           <th className="px-4 py-2">Period</th>
                           <th className="px-4 py-2">Result</th>
                        </tr>
                     </thead>
                     <tbody>
                        {periodIds.map((id, index) => (
                           <tr key={index}>
                              <td className="px-4 py-2">{id}</td>
                              <td className="px-4 py-2">{lowestBetNumberMap[id]}</td> {/* Display lowestBetNumber */}
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

