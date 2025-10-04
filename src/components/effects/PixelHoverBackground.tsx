'use client';

import React, { useEffect, useRef, useState } from 'react';

interface PixelHoverBackgroundProps {
  pixelSize?: number;
  highlightDuration?: number;
}

const PixelHoverBackground: React.FC<PixelHoverBackgroundProps> = ({
  pixelSize = 40,
  highlightDuration = 500,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [blocks, setBlocks] = useState<{ id: number; x: number; y: number; highlighted: boolean }[]>([]);

  useEffect(() => {
    if (!containerRef.current) return;

    const calculateBlocks = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const cols = Math.ceil(rect.width / pixelSize) + 1; // Add extra column to ensure full coverage
      const rows = Math.ceil(rect.height / pixelSize) + 2; // Add extra rows to ensure full coverage

      const newBlocks = [];
      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          newBlocks.push({
            id: row * cols + col,
            x: col * pixelSize,
            y: row * pixelSize,
            highlighted: false,
          });
        }
      }

      setBlocks(newBlocks);
    };

    calculateBlocks();

    // Recalculate on resize
    const resizeObserver = new ResizeObserver(() => {
      calculateBlocks();
    });

    resizeObserver.observe(containerRef.current);

    return () => {
      resizeObserver.disconnect();
    };
  }, [pixelSize]);

  const highlightBlock = (index: number) => {
    if (index < 0 || index >= blocks.length) return;

    setBlocks(prev => {
      const updated = [...prev];
      const block = updated[index];
      if (block) {
        updated[index] = { ...block, highlighted: true };
      }
      return updated;
    });

    setTimeout(() => {
      setBlocks(prev => {
        const updated = [...prev];
        const block = updated[index];
        if (block) {
          updated[index] = { ...block, highlighted: false };
        }
        return updated;
      });
    }, highlightDuration);
  };

  const getNeighbors = (index: number, cols: number) => {
    const row = Math.floor(index / cols);
    const col = index % cols;
    const neighbors = [];

    // Top
    if (row > 0) neighbors.push(index - cols);
    // Bottom
    if (row < Math.floor(blocks.length / cols) - 1) neighbors.push(index + cols);
    // Left
    if (col > 0) neighbors.push(index - 1);
    // Right
    if (col < cols - 1) neighbors.push(index + 1);

    return neighbors;
  };

  const handleMouseOver = (index: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const cols = Math.ceil(rect.width / pixelSize);

    highlightBlock(index);

    // Randomly highlight some neighbors
    const neighbors = getNeighbors(index, cols);
    const shuffled = neighbors.sort(() => Math.random() - 0.5);
    const toHighlight = shuffled.slice(0, Math.floor(Math.random() * 2) + 1);

    toHighlight.forEach(neighborIndex => {
      setTimeout(() => highlightBlock(neighborIndex), Math.random() * 100);
    });
  };

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="relative w-full h-full">
        {blocks.map((block) => (
          <div
            key={block.id}
            className="absolute pointer-events-auto transition-all duration-300 ease-out"
            style={{
              left: `${block.x}px`,
              top: `${block.y}px`,
              width: `${pixelSize}px`,
              height: `${pixelSize}px`,
              border: '0.5px solid rgba(156, 163, 175, 0.1)',
              borderImage: block.highlighted
                ? 'linear-gradient(135deg, rgba(112, 117, 224, 0.8), rgba(224, 99, 124, 0.8)) 1'
                : 'none',
            }}
            onMouseOver={() => handleMouseOver(block.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelHoverBackground;
