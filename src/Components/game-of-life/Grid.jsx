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

    // Draw live cells
    if (!grid || grid.length === 0) return;

    for (let i = 0; i < gridSize.rows; i++) {
      if (!grid[i]) continue;
      for (let j = 0; j < gridSize.cols; j++) {
        if (grid[i][j]) {
          ctx.fillStyle = '#10b981'; // emerald
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

    if (grid && grid[row] && row >= 0 && row < gridSize.rows && col >= 0 && col < gridSize.cols) {
      toggleCell(row, col);
    }
  };

  return (
    <div className="grid-canvas-container">
      <canvas
        ref={canvasRef}
        width={width}
        height={height}
        onClick={handleCanvasClick}
        className={`grid-canvas ${isRunning ? 'disabled' : 'clickable'}`}
      />
      {isRunning && (
        <div className="running-indicator">Running</div>
      )}
    </div>
  );
};

export default Grid;
