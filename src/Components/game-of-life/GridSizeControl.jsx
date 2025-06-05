import React, { useState } from 'react';
import { Minus, Plus, Settings, Check } from "lucide-react";

const GridSizeControl = ({ gridSize, onSizeChange, disabled }) => {
  const [showCustomSize, setShowCustomSize] = useState(false);
  const [customSize, setCustomSize] = useState({ rows: gridSize.rows, cols: gridSize.cols });

  const handleCustomSizeChange = (key, value) => {
    const numValue = parseInt(value, 10);
    if (isNaN(numValue)) return;
    const clampedValue = Math.min(Math.max(numValue, 10), 100);
    setCustomSize(prev => ({ ...prev, [key]: clampedValue }));
  };

  const applyCustomSize = () => {
    onSizeChange(customSize);
    setShowCustomSize(false);
  };

  const sizePresets = [
    { name: "20×20", size: { rows: 20, cols: 20 } },
    { name: "40×40", size: { rows: 40, cols: 40 } },
    { name: "60×60", size: { rows: 60, cols: 60 } }
  ];

  return (
    <div className="grid-size-panel">
      <div className="grid-size-header">
        <h3><Settings size={16} style={{ marginRight: '8px' }} /> Grid Size</h3>
        <div className="grid-size-current">
          Current: {gridSize.rows}×{gridSize.cols}
        </div>
      </div>

      {!showCustomSize ? (
        <>
          <div className="preset-buttons">
            {sizePresets.map(preset => (
              <button
                key={preset.name}
                disabled={disabled}
                onClick={() => onSizeChange(preset.size)}
                className={`preset-btn ${
                  gridSize.rows === preset.size.rows && gridSize.cols === preset.size.cols
                    ? 'active'
                    : ''
                }`}
              >
                {preset.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCustomSize(true)}
            disabled={disabled}
            className="custom-btn"
          >
            Custom Size...
          </button>
        </>
      ) : (
        <div className="custom-size-form">
          <div className="custom-size-grid">
            {["rows", "cols"].map(key => (
              <div key={key}>
                <label htmlFor={key}>{key === "rows" ? "Rows" : "Columns"}</label>
                <div className="custom-size-input-group">
                  <button
                    onClick={() => handleCustomSizeChange(key, customSize[key] - 1)}
                    disabled={customSize[key] <= 10}
                    type="button"
                  >
                    <Minus size={12} />
                  </button>
                  <input
                    id={key}
                    type="number"
                    min="10"
                    max="100"
                    value={customSize[key]}
                    onChange={e => handleCustomSizeChange(key, e.target.value)}
                  />
                  <button
                    onClick={() => handleCustomSizeChange(key, customSize[key] + 1)}
                    disabled={customSize[key] >= 100}
                    type="button"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="custom-size-actions">
            <button
              onClick={() => setShowCustomSize(false)}
              type="button"
              className="cancel-btn"
            >
              Cancel
            </button>
            <button
              onClick={applyCustomSize}
              disabled={customSize.rows === gridSize.rows && customSize.cols === gridSize.cols}
              type="button"
              className="apply-btn"
            >
              <Check size={14} style={{ marginRight: '6px' }} /> Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridSizeControl;
