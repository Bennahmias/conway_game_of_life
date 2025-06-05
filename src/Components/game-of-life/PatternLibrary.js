import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Info, BookOpen } from "lucide-react";

const patterns = {
  oscillators: [
    {
      name: "Blinker",
      description: "Period 2 oscillator",
      grid: [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0]
      ]
    },
    {
      name: "Toad",
      description: "Period 2 oscillator",
      grid: [
        [0, 0, 0, 0],
        [0, 1, 1, 1],
        [1, 1, 1, 0],
        [0, 0, 0, 0]
      ]
    },
    {
      name: "Beacon",
      description: "Period 2 oscillator",
      grid: [
        [1, 1, 0, 0],
        [1, 1, 0, 0],
        [0, 0, 1, 1],
        [0, 0, 1, 1]
      ]
    },
    {
      name: "Pulsar",
      description: "Period 3 oscillator",
      grid: [
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
      ]
    }
  ],
  spaceships: [
    {
      name: "Glider",
      description: "Smallest spaceship",
      grid: [
        [0, 1, 0],
        [0, 0, 1],
        [1, 1, 1]
      ]
    },
    {
      name: "Lightweight Spaceship",
      description: "Small spaceship",
      grid: [
        [0, 1, 1, 0, 0],
        [1, 1, 0, 1, 0],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0]
      ]
    }
  ],
  still: [
    {
      name: "Block",
      description: "2x2 square",
      grid: [
        [1, 1],
        [1, 1]
      ]
    },
    {
      name: "Beehive",
      description: "Still life",
      grid: [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [0, 1, 1, 0]
      ]
    },
    {
      name: "Loaf",
      description: "Still life",
      grid: [
        [0, 1, 1, 0],
        [1, 0, 0, 1],
        [0, 1, 0, 1],
        [0, 0, 1, 0]
      ]
    }
  ],
  guns: [
    {
      name: "Gosper Glider Gun",
      description: "First discovered gun pattern",
      grid: [
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
      ]
    }
  ]
};

const PatternLibrary = ({ applyPattern }) => {
  const [selectedCategory, setSelectedCategory] = useState("oscillators");
  const [expanded, setExpanded] = useState({});
  
  const toggleExpand = (name) => {
    setExpanded(prev => ({
      ...prev,
      [name]: !prev[name]
    }));
  };
  
  const renderPatternPreview = (pattern) => {
    if (!pattern || !pattern.grid || !Array.isArray(pattern.grid) || pattern.grid.length === 0 || 
        !pattern.grid[0] || !Array.isArray(pattern.grid[0]) || pattern.grid[0].length === 0) {
      return (
        <div className="p-2 text-xs text-gray-400 bg-gray-900 rounded-lg flex justify-center items-center" style={{ minHeight: '50px' }}>
          Preview N/A
        </div>
      );
    }

    const baseCellSize = 8;
    const maxPreviewDimCells = 10;
    
    const patternRows = pattern.grid.length;
    const patternCols = pattern.grid[0].length;

    const cellSize = Math.min(baseCellSize, Math.floor(80 / Math.max(patternCols, patternRows, 1)));


    const displayRows = Math.min(patternRows, maxPreviewDimCells);
    const displayCols = Math.min(patternCols, maxPreviewDimCells);

    const previewWidth = displayCols * cellSize;
    const previewHeight = displayRows * cellSize;
    
    return (
      <div 
        className="p-1 bg-gray-900 rounded-md flex justify-center items-center overflow-hidden" 
        style={{ width: Math.max(previewWidth + 2, 40), height: Math.max(previewHeight + 2, 40) }}
      >
        <div className="grid" style={{ 
          display: 'grid', 
          gridTemplateColumns: `repeat(${displayCols}, ${cellSize}px)`,
          gap: '0px'
        }}>
          {pattern.grid.slice(0, displayRows).map((row, rIndex) => 
            row.slice(0, displayCols).map((cell, cIndex) => (
                <div
                  key={`${rIndex}-${cIndex}`}
                  className={`border-px ${cell ? 'bg-emerald-500 border-emerald-600' : 'bg-gray-700 border-gray-800'}`}
                  style={{ width: cellSize, height: cellSize }}
                />
            ))
          ).flat()}
        </div>
      </div>
    );
  };
  
  return (
    <div>
      <h3 className="text-xl font-bold mb-4 flex items-center">
        <BookOpen className="w-5 h-5 mr-2" />
        Pattern Library
      </h3>
      <div className="mb-4 bg-gray-700 flex gap-2 p-2 rounded">
        {Object.keys(patterns).map(category => (
          <button
            key={category}
            className={`px-2 py-1 rounded ${selectedCategory === category ? 'bg-gray-900 text-white' : 'bg-gray-600 text-gray-200'}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {patterns[selectedCategory].map((pattern) => (
          <div
            key={pattern.name}
            className="bg-gray-700 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-200"
          >
            <div
              className="flex items-center justify-between p-3 cursor-pointer"
              onClick={() => toggleExpand(pattern.name)}
            >
              <div className="flex items-center">
                {expanded[pattern.name] ? (
                  <ChevronDown className="w-4 h-4 mr-2" />
                ) : (
                  <ChevronRight className="w-4 h-4 mr-2" />
                )}
                <span className="font-medium">{pattern.name}</span>
              </div>
              <button
                style={{ padding: '0.25rem 0.5rem', borderRadius: '4px', background: '#10b981', color: 'white', fontWeight: 500 }}
                onClick={e => {
                  e.stopPropagation();
                  applyPattern(pattern.grid);
                }}
              >
                Apply
              </button>
            </div>
            {expanded[pattern.name] && (
              <div className="p-3 bg-gray-800 flex flex-col items-center space-y-3">
                <div className="text-sm text-gray-300 flex items-center">
                  <Info className="w-3 h-3 mr-1" />
                  {pattern.description}
                </div>
                {renderPatternPreview(pattern)}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatternLibrary;
