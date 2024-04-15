import React, { useState } from 'react';

function MidHeader() {
  const [activeTab, setActiveTab] = useState('Parity');

  function handleTabClick(tabName) {
    setActiveTab(tabName);
  }

  return (
    <div className="container mx-auto px-4">
      <div className="bg-slate-200 mx-auto py-4" style={{ maxWidth: '700px' }}>
        <div className="flex justify-between px-4 mx-auto" style={{ maxWidth: '640px' }}>
          <button
            className={`menu-button ${activeTab === 'Parity' ? 'active' : ''}`}
            onClick={() => handleTabClick('Parity')}
            style={{ backgroundColor: activeTab === 'Parity' ? 'blue' : 'transparent' }}
          >
            <span className="text-lg font-bold">Parity</span>
          </button>
          <button
            className={`menu-button ${activeTab === 'Square' ? 'active' : ''}`}
            onClick={() => handleTabClick('Square')}
            style={{ backgroundColor: activeTab === 'Square' ? 'blue' : 'transparent' }}
          >
            <span className="text-lg font-bold">Square</span>
          </button>
          <button
            className={`menu-button ${activeTab === 'Emeed' ? 'active' : ''}`}
            onClick={() => handleTabClick('Emeed')}
            style={{ backgroundColor: activeTab === 'Emeed' ? 'blue' : 'transparent' }}
          >
            <span className="text-lg font-bold">Emeed</span>
          </button>
          <button
            className={`menu-button ${activeTab === 'Bcone' ? 'active' : ''}`}
            onClick={() => handleTabClick('Bcone')}
            style={{ backgroundColor: activeTab === 'Bcone' ? 'blue' : 'transparent' }}
          >
            <span className="text-lg font-bold">Bcone</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MidHeader;
