import React from 'react';

const StatsPanel = ({ generation, cellCount }) => {
  const percentAlive = cellCount.total > 0
    ? ((cellCount.alive / cellCount.total) * 100).toFixed(1)
    : "0.0";

  return (
    <div className="stats-panel">
      <div className="stat-block">
        <div className="stat-label">Generation</div>
        <div className="stat-value">{generation}</div>
      </div>

      <div className="stat-group">
        <div className="stat-block">
          <div className="stat-label">Living Cells</div>
          <div className="stat-value green">{cellCount.alive}</div>
        </div>

        <div className="stat-block">
          <div className="stat-label">Population</div>
          <div className="stat-value blue">{percentAlive}%</div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;
