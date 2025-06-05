import React from "react";
import { Play, Pause, RotateCcw, Trash2, BookOpen } from "lucide-react";

const SimulationControls = ({
  isRunning,
  onPlayPause,
  onRandomize,
  onClear,
  onTogglePatterns,
  patternsVisible,
}) => (
  <div className="controls-panel">
    <button
      onClick={onPlayPause}
      className={`btn ${isRunning ? "btn-red" : "btn-green"}`}
    >
      {isRunning ? <Pause size={16} /> : <Play size={16} />}
      {isRunning ? "Pause" : "Start"}
    </button>

    <button
      onClick={onRandomize}
      disabled={isRunning}
      className="btn"
    >
      <RotateCcw size={16} /> Random
    </button>

    <button
      onClick={onClear}
      disabled={isRunning}
      className="btn"
    >
      <Trash2 size={16} /> Clear
    </button>

    <button
      onClick={onTogglePatterns}
      disabled={isRunning}
      className="btn btn-wide"
    >
      <BookOpen size={16} />
      {patternsVisible ? "Hide Patterns" : "Show Patterns"}
    </button>
  </div>
);

export default SimulationControls;
