import React, { useState } from "react";
import { useGameLogic } from "./Components/game-of-life/hooks/useGameLogic.js";
import PatternLibrary from "./Components/game-of-life/PatternLibrary.jsx";
import Grid from "./Components/game-of-life/Grid.jsx";
import StatsPanel from "./Components/game-of-life/StatsPanel.jsx";
import GridSizeControl from "./Components/game-of-life/GridSizeControl.jsx";
import SimulationControls from "./Components/game-of-life/controls/SimulationControls.jsx";
import SpeedSlider from "./Components/game-of-life/controls/SpeedSlider.jsx";

export default function GameOfLife() {
  const [gridSize, setGridSize] = useState({ rows: 40, cols: 40 });
  const [showPatternLibrary, setShowPatternLibrary] = useState(false);

  const {
    grid,
    //setGrid,
    generation,
    isRunning,
    setIsRunning,
    speed,
    setSpeed,
    cellCount,
    initializeGrid,
    randomizeGrid,
    toggleCell,
    clearGrid,
    runSimulation,
    runningRef,
  } = useGameLogic(gridSize);

  const handlePlayPause = () => {
    setIsRunning(prev => {
      const next = !prev;
      runningRef.current = next;
      if (next) runSimulation();
      return next;
    });
  };

  const applyPattern = (patternGrid) => {
    if (isRunning) {
      setIsRunning(false);
      runningRef.current = false;
    }
    initializeGrid(patternGrid);
    setShowPatternLibrary(false);
  };

  const handleSizeChange = (newSize) => {
    if (isRunning) {
      setIsRunning(false);
      runningRef.current = false;
    }
    setGridSize(newSize);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="p-4 md:p-6 bg-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Conway's Game of Life</h1>
      </header>

      <main className="flex-1 p-4 md:p-6 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto">
          <SimulationControls
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onRandomize={randomizeGrid}
            onClear={clearGrid}
            onTogglePatterns={() => setShowPatternLibrary(!showPatternLibrary)}
            patternsVisible={showPatternLibrary}
          />

          <SpeedSlider speed={speed} onSpeedChange={setSpeed} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <StatsPanel generation={generation} cellCount={cellCount} />
            <GridSizeControl
              gridSize={gridSize}
              onSizeChange={handleSizeChange}
              disabled={isRunning}
            />
          </div>

          {showPatternLibrary && (
            <div className="mb-6 bg-gray-800 p-4 rounded-lg">
              <PatternLibrary applyPattern={applyPattern} />
            </div>
          )}

          <div className="flex justify-center">
            {grid && grid.length > 0 ? (
              <Grid
                grid={grid}
                toggleCell={toggleCell}
                isRunning={isRunning}
                gridSize={gridSize}
              />
            ) : (
              <div className="w-[600px] h-[600px] flex items-center justify-center bg-gray-800 rounded-lg">
                <p className="text-gray-400">Initializing grid...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="p-4 text-center text-gray-400 text-sm">
        <p>Conway's Game of Life Simulation</p>
      </footer>
    </div>
  );
}
