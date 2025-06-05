import React from "react";
import { Minus, Plus } from "lucide-react";

const SpeedSlider = ({ speed, onSpeedChange }) => (
  <div className="speed-slider">
    <div className="speed-label">
      <span>Speed:</span>
      <span className="speed-value">{speed}x</span>
    </div>

    <div className="slider-container">
      <Minus size={16} />
      <div className="slider-wrapper">
        <input
          type="range"
          min="1"
          max="30"
          value={speed}
          onChange={e => onSpeedChange(Number(e.target.value))}
          className="slider"
        />
        <div className="slider-scale">
          <span>1x</span>
          <span>30x</span>
        </div>
      </div>
      <Plus size={16} />
    </div>
  </div>
);

export default SpeedSlider;
