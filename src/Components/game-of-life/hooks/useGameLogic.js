import { useState, useEffect, useRef, useCallback } from "react";

export function useGameLogic(gridSize) {
  const [grid, setGrid] = useState([]);
  const [generation, setGeneration] = useState(0);
  const [speed, setSpeed] = useState(10);
  const [isRunning, setIsRunning] = useState(false);
  const [cellCount, setCellCount] = useState({ alive: 0, total: gridSize.rows * gridSize.cols });

  const runningRef = useRef(isRunning);
  const speedRef = useRef(speed);

  const countAliveCells = useCallback((currentGrid) => {
    const alive = currentGrid.flat().filter(cell => cell === 1).length;
    setCellCount({
      alive,
      total: gridSize.rows * gridSize.cols,
    });
  }, [gridSize]);

  const initializeGrid = useCallback((patternData = null) => {
    const rows = gridSize.rows;
    const cols = gridSize.cols;
    const newGrid = Array(rows).fill(null).map(() => Array(cols).fill(0));

    if (patternData?.length && patternData[0]?.length) {
      const pr = patternData.length;
      const pc = patternData[0].length;
      const rOffset = Math.floor((rows - pr) / 2);
      const cOffset = Math.floor((cols - pc) / 2);
      for (let i = 0; i < pr; i++) {
        for (let j = 0; j < pc; j++) {
          newGrid[rOffset + i][cOffset + j] = patternData[i][j];
        }
      }
    } else {
      if (rows >= 4 && cols >= 4) {
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
  }, [gridSize, countAliveCells]);

  useEffect(() => {
    initializeGrid();
  }, [initializeGrid]);

  const randomizeGrid = () => {
    const newGrid = Array(gridSize.rows)
      .fill(null)
      .map(() => Array(gridSize.cols).fill(0).map(() => (Math.random() > 0.7 ? 1 : 0)));
    setGrid(newGrid);
    setGeneration(0);
    countAliveCells(newGrid);
  };

  const toggleCell = (i, j) => {
    if (isRunning) return;
    setGrid(prev => {
      const newGrid = prev.map(row => [...row]);
      newGrid[i][j] = newGrid[i][j] ? 0 : 1;
      countAliveCells(newGrid);
      return newGrid;
    });
  };

  const clearGrid = () => {
    const newGrid = Array(gridSize.rows).fill(null).map(() => Array(gridSize.cols).fill(0));
    setGrid(newGrid);
    setGeneration(0);
    countAliveCells(newGrid);
  };

  const runSimulation = useCallback(() => {
    if (!runningRef.current) return;

    setGrid(g => {
      const newGrid = g.map(row => [...row]);
      let changed = false;
      for (let i = 0; i < gridSize.rows; i++) {
        for (let j = 0; j < gridSize.cols; j++) {
          let neighbors = 0;
          for (let di = -1; di <= 1; di++) {
            for (let dj = -1; dj <= 1; dj++) {
              if (di === 0 && dj === 0) continue;
              const ni = (i + di + gridSize.rows) % gridSize.rows;
              const nj = (j + dj + gridSize.cols) % gridSize.cols;
              neighbors += g[ni][nj];
            }
          }
          if (g[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
            newGrid[i][j] = 0;
            changed = true;
          } else if (g[i][j] === 0 && neighbors === 3) {
            newGrid[i][j] = 1;
            changed = true;
          }
        }
      }
      if (changed) {
        setGeneration(gen => gen + 1);
        countAliveCells(newGrid);
      }
      return newGrid;
    });

    setTimeout(runSimulation, 1000 / speedRef.current);
  }, [gridSize, countAliveCells]);

  return {
    grid,
    setGrid,
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
    speedRef,
  };
}
