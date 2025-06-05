import React from 'react';

const StatsPanel = ({ generation, cellCount }) => {
  const percentAlive = ((cellCount.alive / cellCount.total) * 100).toFixed(1);
  
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col md:flex-row justify-between">
      <div className="mb-2 md:mb-0">
        <div className="text-gray-400 text-sm">Generation</div>
        <div className="text-2xl font-bold font-mono">{generation}</div>
      </div>
      
      <div className="flex gap-4">
        <div>
          <div className="text-gray-400 text-sm">Living Cells</div>
          <div className="text-xl font-bold text-emerald-400 font-mono">{cellCount.alive}</div>
        </div>
        
        <div>
          <div className="text-gray-400 text-sm">Population</div>
          <div className="text-xl font-bold text-blue-400 font-mono">{percentAlive}%</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;