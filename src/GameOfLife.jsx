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
    <div className="app-container">
      <header className="app-header">
        <h1>Conway's Game of Life</h1>
      </header>

      <main className="main-content">
        <div className="content-wrapper">
          <SimulationControls
            isRunning={isRunning}
            onPlayPause={handlePlayPause}
            onRandomize={randomizeGrid}
            onClear={clearGrid}
            onTogglePatterns={() => setShowPatternLibrary(!showPatternLibrary)}
            patternsVisible={showPatternLibrary}
          />

          <SpeedSlider speed={speed} onSpeedChange={setSpeed} />

          <div className="stats-layout">
            <StatsPanel generation={generation} cellCount={cellCount} />
            <GridSizeControl
              gridSize={gridSize}
              onSizeChange={handleSizeChange}
              disabled={isRunning}
            />
          </div>

          {showPatternLibrary && (
            <div className="pattern-library">
              <PatternLibrary applyPattern={applyPattern} />
            </div>
          )}

          <div className="grid-wrapper">
            {grid && grid.length > 0 ? (
              <Grid
                grid={grid}
                toggleCell={toggleCell}
                isRunning={isRunning}
                gridSize={gridSize}
              />
            ) : (
              <div className="grid-placeholder">
                <p>Initializing grid...</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <footer className="app-footer">
        <p>Conway's Game of Life Simulation</p>
      </footer>
    </div>
  );
}
