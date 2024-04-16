import React, { useState } from "react";

function MidHeader() {
  const [activeTab, setActiveTab] = useState("Parity");

  function handleTabClick(tabName) {
    setActiveTab(tabName);
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-slate-200 mx-auto py-4" style={{ maxWidth: "420px" }}>
        <div
          className="flex justify-between px-4 mx-auto"
          style={{ maxWidth: "640px" }}
        >
          <button
            className={`menu-button ${
              activeTab === "Parity"
                ? "border-b-[3px] pb-[3px] border-red-600 border-solid"
                : " pb-[6px]"
            }`}
            onClick={() => handleTabClick("Parity")}
          >
            <span className="text-lg font-bold">Parity</span>
          </button>
          <button
            className={`menu-button ${
              activeTab === "Square"
                ? "border-b-[3px] pb-[3px] border-red-600 border-solid"
                : " pb-[6px]"
            }`}
            onClick={() => handleTabClick("Square")}
          >
            <span className="text-lg font-bold">Square</span>
          </button>
          <button
            className={`menu-button ${
              activeTab === "Emeed"
                ? "border-b-[3px] pb-[3px] border-red-600 border-solid"
                : " pb-[6px]"
            }`}
            onClick={() => handleTabClick("Emeed")}
          >
            <span className="text-lg font-bold">Emeed</span>
          </button>
          <button
            className={`menu-button ${
              activeTab === "Bcone"
                ? "border-b-[3px] pb-[3px] border-red-600 border-solid"
                : " pb-[6px]"
            }`}
            onClick={() => handleTabClick("Bcone")}
          >
            <span className="text-lg font-bold">Bcone</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MidHeader;
