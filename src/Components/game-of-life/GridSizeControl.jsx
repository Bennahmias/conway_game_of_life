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
    <div className="bg-gray-800 p-4 rounded-lg">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-bold flex items-center">
          <Settings className="w-4 h-4 mr-2" /> Grid Size
        </h3>
        <div className="text-gray-300">
          Current: {gridSize.rows}×{gridSize.cols}
        </div>
      </div>
      {!showCustomSize ? (
        <>
          <div className="flex gap-2 mb-3">
            {sizePresets.map(preset => (
              <button
                key={preset.name}
                disabled={disabled}
                onClick={() => onSizeChange(preset.size)}
                className={`flex-1 px-2 py-1 rounded ${gridSize.rows === preset.size.rows && gridSize.cols === preset.size.cols ? 'bg-emerald-600 text-white' : 'bg-gray-700 text-gray-200'}`}
              >
                {preset.name}
              </button>
            ))}
          </div>
          <button
            onClick={() => setShowCustomSize(true)}
            disabled={disabled}
            className="w-full text-gray-300 hover:text-white px-2 py-1 rounded bg-gray-700"
          >
            Custom Size...
          </button>
        </>
      ) : (
        <div className="space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label htmlFor="rows" className="text-sm text-gray-300">Rows</label>
              <div className="flex items-center">
                <button
                  className="h-8 w-8 flex items-center justify-center bg-gray-700 rounded"
                  onClick={() => handleCustomSizeChange('rows', customSize.rows - 1)}
                  disabled={customSize.rows <= 10}
                  type="button"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  id="rows"
                  type="number"
                  min="10"
                  max="100"
                  value={customSize.rows}
                  onChange={e => handleCustomSizeChange('rows', e.target.value)}
                  className="h-8 text-center mx-2 rounded bg-gray-900 text-white border border-gray-600"
                />
                <button
                  className="h-8 w-8 flex items-center justify-center bg-gray-700 rounded"
                  onClick={() => handleCustomSizeChange('rows', customSize.rows + 1)}
                  disabled={customSize.rows >= 100}
                  type="button"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="cols" className="text-sm text-gray-300">Columns</label>
              <div className="flex items-center">
                <button
                  className="h-8 w-8 flex items-center justify-center bg-gray-700 rounded"
                  onClick={() => handleCustomSizeChange('cols', customSize.cols - 1)}
                  disabled={customSize.cols <= 10}
                  type="button"
                >
                  <Minus className="h-3 w-3" />
                </button>
                <input
                  id="cols"
                  type="number"
                  min="10"
                  max="100"
                  value={customSize.cols}
                  onChange={e => handleCustomSizeChange('cols', e.target.value)}
                  className="h-8 text-center mx-2 rounded bg-gray-900 text-white border border-gray-600"
                />
                <button
                  className="h-8 w-8 flex items-center justify-center bg-gray-700 rounded"
                  onClick={() => handleCustomSizeChange('cols', customSize.cols + 1)}
                  disabled={customSize.cols >= 100}
                  type="button"
                >
                  <Plus className="h-3 w-3" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setShowCustomSize(false)}
              className="flex-1 px-2 py-1 rounded bg-gray-700 text-gray-200"
              type="button"
            >
              Cancel
            </button>
            <button
              onClick={applyCustomSize}
              disabled={customSize.rows === gridSize.rows && customSize.cols === gridSize.cols}
              className="flex-1 px-2 py-1 rounded bg-emerald-600 text-white"
              type="button"
            >
              <Check className="w-4 h-4 mr-1 inline-block" /> Apply
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default GridSizeControl;