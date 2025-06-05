import React, { useState } from 'react';
import { ChevronRight, ChevronDown, Info, BookOpen } from "lucide-react";
import {patternsExamples} from './PatternExamples';

const patterns = patternsExamples;

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
    if (
      !pattern?.grid?.length ||
      !Array.isArray(pattern.grid[0]) ||
      pattern.grid[0].length === 0
    ) {
      return (
        <div className="pattern-preview-unavailable">
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
        className="pattern-preview-box"
        style={{ width: Math.max(previewWidth + 2, 40), height: Math.max(previewHeight + 2, 40) }}
      >
        <div
          className="pattern-preview-grid"
          style={{
            gridTemplateColumns: `repeat(${displayCols}, ${cellSize}px)`
          }}
        >
          {pattern.grid.slice(0, displayRows).flatMap((row, rIndex) =>
            row.slice(0, displayCols).map((cell, cIndex) => (
              <div
                key={`${rIndex}-${cIndex}`}
                className={`pattern-cell ${cell ? "alive" : "dead"}`}
                style={{ width: cellSize, height: cellSize }}
              />
            ))
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="pattern-library">
      <h3 className="pattern-title">
        <BookOpen size={20} style={{ marginRight: '8px' }} />
        Pattern Library
      </h3>

      <div className="pattern-categories">
        {Object.keys(patterns).map(category => (
          <button
            key={category}
            className={`pattern-category-btn ${selectedCategory === category ? "active" : ""}`}
            onClick={() => setSelectedCategory(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      <div className="pattern-list">
        {(patterns[selectedCategory] || []).map(pattern => (
          <div key={pattern.name} className="pattern-card">
            <div
              className="pattern-header"
              onClick={() => toggleExpand(pattern.name)}
            >
              <div className="pattern-name">
                {expanded[pattern.name] ? (
                  <ChevronDown size={14} style={{ marginRight: '6px' }} />
                ) : (
                  <ChevronRight size={14} style={{ marginRight: '6px' }} />
                )}
                <span>{pattern.name}</span>
              </div>
              <button
                className="pattern-apply-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  applyPattern(pattern.grid);
                }}
              >
                Apply
              </button>
            </div>
            {expanded[pattern.name] && (
              <div className="pattern-details">
                <div className="pattern-description">
                  <Info size={12} style={{ marginRight: '4px' }} />
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
