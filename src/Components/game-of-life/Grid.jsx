import React, { useRef, useEffect } from 'react';

const Grid = ({ grid, toggleCell, isRunning, gridSize }) => {
  const canvasRef = useRef(null);
  const cellSize = Math.min(
    Math.floor(600 / Math.max(gridSize.rows, gridSize.cols)),
    15
  );
  
  const width = gridSize.cols * cellSize;
  const height = gridSize.rows * cellSize;
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, width, height);
    
    // Draw gridlines
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 0.5;
    
    for (let i = 0; i <= gridSize.rows; i++) {
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(width, i * cellSize);
      ctx.stroke();
    }
    
    for (let j = 0; j <= gridSize.cols; j++) {
      ctx.beginPath();
      ctx.moveTo(j * cellSize, 0);
      ctx.lineTo(j * cellSize, height);
      ctx.stroke();
    }
    
    // Draw cells - Added checks for grid initialization
    if (!grid || grid.length === 0) {
      // If grid is not initialized or empty, don't attempt to draw cells
      return;
    }
    
    for (let i = 0; i < gridSize.rows; i++) {
      // Ensure the row itself exists before trying to access cells in it
      if (!grid[i]) {
        continue; 
      }
      for (let j = 0; j < gridSize.cols; j++) {
        if (grid[i][j]) { // Check if cell is alive (value 1)
          ctx.fillStyle = '#10b981'; // Emerald color for live cells
          ctx.fillRect(j * cellSize, i * cellSize, cellSize, cellSize);
        }
      }
    }
  }, [grid, gridSize, cellSize, width, height]);
  
  const handleCanvasClick = (e) => {
    if (isRunning) return;
    
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    
    const col = Math.floor(x / cellSize);
    const row = Math.floor(y / cellSize);
    
    // Ensure grid is valid before toggling
    if (grid && grid[row] && row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {
      toggleCell(row, col);
    }
  };
  
  return (
    <div className="relative bg-gray-800 p-1 rounded-lg overflow-hidden shadow-xl">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className={`
          cursor-${isRunning ? 'default' : 'pointer'}
          transition-all duration-200
          ${isRunning ? 'opacity-100' : 'opacity-90 hover:opacity-100'}
        `}
      />
      
      {isRunning && (
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs px-2 py-1 rounded-full">
          Running
        </div>
      )}
    </div>
  );
};

export default Grid;