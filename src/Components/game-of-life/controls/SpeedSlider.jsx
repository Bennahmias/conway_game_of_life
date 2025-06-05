import React from "react";
import { Minus, Plus } from "lucide-react";

const SpeedSlider = ({ speed, onSpeedChange }) => (
  <div className="flex flex-col md:flex-row items-center mb-6 bg-gray-800 p-4 rounded-lg">
    <div className="flex items-center mb-2 md:mb-0 md:mr-4">
      <span className="mr-2 text-sm">Speed:</span>
      <span className="font-mono">{speed}x</span>
    </div>
    <div className="flex-1 flex items-center">
      <Minus className="w-4 h-4 mr-2" />
      <div className="flex-1 relative">
        <input
          type="range"
          min="1"
          max="30"
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
        />
        <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
          <span className="text-xs">1x</span>
          <span className="text-xs">30x</span>
        </div>
      </div>
      <Plus className="w-4 h-4 ml-2" />
    </div>
  </div>
);

export default SpeedSlider;
