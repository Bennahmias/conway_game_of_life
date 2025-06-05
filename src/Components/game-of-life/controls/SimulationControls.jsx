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
  <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mb-6">
    <button
      onClick={onPlayPause}
      className={`flex items-center gap-2 col-span-1 md:col-span-2 p-2 rounded-lg transition-all ${
        isRunning ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"
      }`}
    >
      {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
      {isRunning ? "Pause" : "Start"}
    </button>

    <button
      onClick={onRandomize}
      disabled={isRunning}
      className="flex items-center gap-2 col-span-1 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
    >
      <RotateCcw className="w-4 h-4" /> Random
    </button>

    <button
      onClick={onClear}
      disabled={isRunning}
      className="flex items-center gap-2 col-span-1 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
    >
      <Trash2 className="w-4 h-4" /> Clear
    </button>

    <button
      onClick={onTogglePatterns}
      disabled={isRunning}
      className="flex items-center gap-2 col-span-1 md:col-span-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700"
    >
      <BookOpen className="w-4 h-4" />
      {patternsVisible ? "Hide Patterns" : "Show Patterns"}
    </button>
  </div>
);

export default SimulationControls;
