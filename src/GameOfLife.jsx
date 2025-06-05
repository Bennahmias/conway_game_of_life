import React, { useState, useEffect, useRef, useCallback } from 'react';
// import { Button } from "@/components/ui/button";
// import { Slider } from "@/components/ui/slider";
import { 
  Play, Pause, RotateCcw, Trash2, 
  BookOpen, XCircle, Plus, Minus,
  ChevronRight, ChevronDown 
} from "lucide-react";
import PatternLibrary from "./Components/game-of-life/PatternLibrary.jsx";
import Grid from "./Components/game-of-life/Grid.jsx";
import StatsPanel from "./Components/game-of-life/StatsPanel.jsx";
import GridSizeControl from "./Components/game-of-life/GridSizeControl.jsx";

export default function GameOfLife() {
  const [grid, setGrid] = useState([]);
  const [gridSize, setGridSize] = useState({ rows: 40, cols: 40 });
  const [isRunning, setIsRunning] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [showPatternLibrary, setShowPatternLibrary] = useState(false);
  const [cellCount, setCellCount] = useState({ alive: 0, total: 1600 });
  
  const runningRef = useRef(isRunning);
  runningRef.current = isRunning;
  
  const speedRef = useRef(speed);
  speedRef.current = speed;
  
  const generationRef = useRef(generation);
  generationRef.current = generation;

  const countAliveCells = useCallback((currentGrid) => {
    if (!currentGrid || currentGrid.length === 0) {
      setCellCount({ alive: 0, total: gridSize.rows * gridSize.cols });
      return;
    }
    const alive = currentGrid.flat().filter(cell => cell === 1).length;
    setCellCount({
      alive,
      total: gridSize.rows * gridSize.cols
    });
  }, [gridSize]);

  const initializeGrid = useCallback((patternData = null) => {
    const rows = gridSize.rows;
    const cols = gridSize.cols;
    
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    
    if (patternData && Array.isArray(patternData) && patternData.length > 0 && 
        Array.isArray(patternData[0]) && patternData[0].length > 0) {
      
      const patternRows = patternData.length;
      const patternCols = patternData[0].length;
      const rowOffset = Math.floor((rows - patternRows) / 2);
      const colOffset = Math.floor((cols - patternCols) / 2);
      
      for (let i = 0; i < patternRows; i++) {
        if (patternData[i] && patternData[i].length === patternCols) { // Check row consistency
          for (let j = 0; j < patternCols; j++) {
            // Ensure pattern cell exists and target location is within grid bounds
            if (patternData[i][j] !== undefined &&
                rowOffset + i >= 0 && rowOffset + i < rows && 
                colOffset + j >= 0 && colOffset + j < cols) {
              newGrid[rowOffset + i][colOffset + j] = patternData[i][j];
            }
          }
        }
      }
    } else {
      // Default: Create a glider pattern if grid is large enough
      if (rows >= 4 && cols >= 4) { // Ensures space for the specific glider placement
        newGrid[1][2] = 1;
        newGrid[2][3] = 1;
        newGrid[3][1] = 1;
        newGrid[3][2] = 1;
        newGrid[3][3] = 1;
      }
    }
    
    setGrid(newGrid);
    setGeneration(0);
    countAliveCells(newGrid);
  }, [gridSize, countAliveCells]); // Added countAliveCells

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]); // Call initializeGrid when it (or its dependencies like gridSize) changes

  const randomizeGrid = () => {
    const rows = gridSize.rows;
    const cols = gridSize.cols;
    const newGrid = Array(rows).fill(null).map(() => 
      Array(cols).fill(null).map(() => (Math.random() > 0.7 ? 1 : 0))
    );
    setGrid(newGrid);
    setGeneration(0);
    countAliveCells(newGrid);
  };

  const toggleCell = (i, j) => {
    if (isRunning) return;
    
    setGrid(prevGrid => {
      // Ensure grid and row exist before attempting to modify
      if (!prevGrid || !prevGrid[i]) return prevGrid;

      const newGrid = prevGrid.map(row => [...row]); // Create a deep copy for rows
      newGrid[i][j] = newGrid[i][j] ? 0 : 1;
      countAliveCells(newGrid); // Count after update
      return newGrid;
    });
  };

  const clearGrid = () => {
    const rows = gridSize.rows;
    const cols = gridSize.cols;
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));
    setGrid(newGrid);
    setGeneration(0);
    countAliveCells(newGrid);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) {
      return;
    }

    setGrid(g => {
      if (!g || g.length === 0 || !g[0] || g[0].length === 0) {
        // If grid is not properly initialized, stop simulation
        setIsRunning(false);
        runningRef.current = false;
        return g;
      }
      
      const newGrid = g.map(row => [...row]);
      const rows = gridSize.rows; // Use current gridSize from state
      const cols = gridSize.cols;

      for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
          let neighbors = 0;
          // Check all 8 neighbors
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              const ni = (i + di + rows) % rows;
              const nj = (j + dj + cols) % cols;
              // Ensure g[ni] exists before accessing g[ni][nj]
              if (g[ni] && g[ni][nj] !== undefined) {
                neighbors += g[ni][nj];
              }
            }
          }

          if (g[i] && g[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = 0;
          } else if (g[i] && g[i][j] === 0 && neighbors === 3) {
            newGrid[i][j] = 1;
          }
        }
      }
      
      // Only update generation and count cells if the grid has changed
      // This simple equality check might not be deep enough for complex scenarios but is a start
      if (JSON.stringify(g) !== JSON.stringify(newGrid)) {
        setGeneration(prevGen => prevGen + 1); // Use functional update for generation
        countAliveCells(newGrid);
      }
      return newGrid;
    });

    const timeout = 1000 / speedRef.current;
    setTimeout(runSimulation, timeout);
  }, [gridSize, countAliveCells]); // Added countAliveCells

  const handlePlayPause = () => {
    setIsRunning(prevIsRunning => {
      const nextIsRunning = !prevIsRunning;
      runningRef.current = nextIsRunning;
      if (nextIsRunning) {
        runSimulation();
      }
      return nextIsRunning;
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
    // initializeGrid will be called by useEffect due to gridSize change
  };
  
  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <header className="p-4 md:p-6 bg-gray-800">
        <h1 className="text-2xl md:text-3xl font-bold text-center">Conway's Game of Life</h1>
      </header>
      
      <main className="flex-1 p-4 md:p-6 flex flex-col items-center">
        <div className="w-full max-w-5xl mx-auto">
          {/* Controls Panel */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-2 md:gap-4 mb-6">
            <button
              onClick={handlePlayPause} 
              className={`flex items-center gap-2 col-span-1 md:col-span-2 p-2 rounded-lg transition-all ${
                isRunning ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'
              }`}
            >
              {isRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
              {isRunning ? 'Pause' : 'Start'}
            </button>
            
            <button
              onClick={randomizeGrid} 
              disabled={isRunning}
              className="flex items-center gap-2 col-span-1 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              <RotateCcw className="w-4 h-4" /> Random
            </button>
            
            <button
              onClick={clearGrid} 
              disabled={isRunning}
              className="flex items-center gap-2 col-span-1 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              <Trash2 className="w-4 h-4" /> Clear
            </button>
            
            <button
              onClick={() => setShowPatternLibrary(!showPatternLibrary)} 
              disabled={isRunning}
              className="flex items-center gap-2 col-span-1 md:col-span-2 p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-all"
            >
              <BookOpen className="w-4 h-4" /> 
              {showPatternLibrary ? 'Hide Patterns' : 'Show Patterns'}
            </button>
          </div>
          
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
                  step="1"
                  value={speed}
                  onChange={(e) => setSpeed(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                />
                <div className="absolute inset-0 flex items-center justify-between px-2 pointer-events-none">
                  <span className="text-xs">{1}x</span>
                  <span className="text-xs">{30}x</span>
                </div>
              </div>
              <Plus className="w-4 h-4 ml-2" />
            </div>
          </div>
          
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
            {grid && grid.length > 0 && grid[0] && grid[0].length > 0 ? (
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