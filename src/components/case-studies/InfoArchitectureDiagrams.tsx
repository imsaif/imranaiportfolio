import { motion } from 'framer-motion';
import React, { useState } from 'react';

// Inline SVG icons for each node type (dark gray, larger)
const NodeIcon = ({ type }: { type: string }) => {
  switch (type) {
    case 'programs':
      // Map pin icon
      return (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mx-auto mb-1">
          <circle cx="12" cy="10" r="5" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M12 22c3-4 7-7.5 7-12A7 7 0 0 0 5 10c0 4.5 4 8 7 12z" stroke="#334155" strokeWidth="2" fill="none" />
          <circle cx="12" cy="10" r="2" fill="#334155" />
        </svg>
      );
    case 'schools':
      // School building icon
      return (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mx-auto mb-1">
          <rect x="4" y="10" width="16" height="8" rx="2" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M2 10l10-6 10 6" stroke="#334155" strokeWidth="2" fill="none" />
          <rect x="10" y="14" width="4" height="4" stroke="#334155" strokeWidth="1.5" fill="none" />
        </svg>
      );
    case 'grades':
      // Stacked blocks/layers icon
      return (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mx-auto mb-1">
          <rect x="6" y="16" width="12" height="3" rx="1" stroke="#334155" strokeWidth="2" fill="none" />
          <rect x="6" y="11" width="12" height="3" rx="1" stroke="#334155" strokeWidth="2" fill="none" />
          <rect x="6" y="6" width="12" height="3" rx="1" stroke="#334155" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'teachers':
      // Person/teacher icon
      return (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mx-auto mb-1">
          <circle cx="12" cy="9" r="4" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M4 21v-1a7 7 0 0 1 14 0v1" stroke="#334155" strokeWidth="2" fill="none" />
        </svg>
      );
    case 'subjects':
      // Open book icon
      return (
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24" className="mx-auto mb-1">
          <path d="M3 6.5A2.5 2.5 0 0 1 5.5 4H12v16H5.5A2.5 2.5 0 0 1 3 17.5v-11z" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M21 6.5A2.5 2.5 0 0 0 18.5 4H12v16h6.5A2.5 2.5 0 0 0 21 17.5v-11z" stroke="#334155" strokeWidth="2" fill="none" />
          <path d="M12 20V4" stroke="#334155" strokeWidth="1.5" />
        </svg>
      );
    default:
      return null;
  }
};

const nodes = [
  { id: 'programs', label: 'Programs', x: 80, y: 120 },
  { id: 'schools', label: 'Schools', x: 210, y: 120 },
  { id: 'grades', label: 'Grades', x: 340, y: 120 },
  { id: 'teachers', label: 'Teachers', x: 470, y: 120 },
  { id: 'subjects', label: 'Subjects', x: 600, y: 120 },
];

const edges = [
  { from: 'programs', to: 'schools' },
  { from: 'schools', to: 'grades' },
  { from: 'grades', to: 'teachers' },
  { from: 'teachers', to: 'subjects' },
  { from: 'grades', to: 'subjects' },
];

const nodeDetails: Record<string, string> = {
  programs: 'Represents the geographical location (e.g., Nigeria).',
  schools: 'Each program contains multiple schools.',
  grades: 'Schools are divided into grades or streams.',
  teachers: 'Teachers are assigned to grades and subjects.',
  subjects: 'Subjects are taught within each grade.',
};

const nodeRadius = 36;

const spring = {
  type: 'spring',
  stiffness: 200,
  damping: 20,
};

const getEdgePath = (from: any, to: any) => {
  // straight line
  return `M${from.x},${from.y} L${to.x},${to.y}`;
};

const InfoArchitectureDiagrams: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="relative w-full max-w-3xl" style={{ height: 266 }}>
        <svg
          viewBox="0 0 700 270"
          className="absolute left-0 top-0 w-full h-full z-10"
          aria-labelledby="info-arch-diagram-title"
          role="img"
        >
          <title id="info-arch-diagram-title">Information Architecture Diagram</title>
          {/* Edges with arrows */}
          {edges.map((edge, i) => {
            const from = nodes.find((n) => n.id === edge.from)!;
            const to = nodes.find((n) => n.id === edge.to)!;
            const path = getEdgePath(from, to);
            // Arrowhead
            const arrowSize = 8;
            const angle = Math.atan2(to.y - from.y, to.x - from.x);
            const arrowX = to.x - nodeRadius * Math.cos(angle);
            const arrowY = to.y - nodeRadius * Math.sin(angle);
            return (
              <g key={i}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="#64748b"
                  strokeWidth={2.5}
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.7, delay: 0.2 + i * 0.1 }}
                  strokeLinecap="round"
                />
                {/* Arrowhead */}
                <motion.polygon
                  points={`0,0 -${arrowSize / 2},-${arrowSize} ${arrowSize / 2},-${arrowSize}`}
                  fill="#64748b"
                  style={{
                    transform: `translate(${arrowX}px,${arrowY}px) rotate(${(angle * 180) / Math.PI + 90}deg)`,
                    transformOrigin: 'center',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 + i * 0.1 }}
                />
              </g>
            );
          })}
          {/* Nodes */}
          {nodes.map((node, i) => {
            const expanded = hovered === node.id;
            return (
              <motion.g
                key={node.id}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ ...spring, delay: 0.3 + i * 0.1 }}
                tabIndex={0}
                aria-label={node.label}
                onMouseEnter={() => setHovered(node.id)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(node.id)}
                onBlur={() => setHovered(null)}
                style={{ cursor: 'pointer' }}
              >
                <motion.circle
                  cx={node.x}
                  cy={node.y}
                  r={expanded ? nodeRadius + 6 : nodeRadius}
                  fill="#fff"
                  stroke={expanded ? '#93c5fd' : '#cbd5e1'}
                  strokeWidth={2}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
                <foreignObject x={node.x - 16} y={node.y - 16} width={32} height={32} pointerEvents="none">
                  <div className="flex items-center justify-center w-8 h-8">
                    <NodeIcon type={node.id} />
                  </div>
                </foreignObject>
                <text
                  x={node.x}
                  y={node.y + nodeRadius + 16}
                  textAnchor="middle"
                  className="fill-gray-700 font-medium text-xs select-none pointer-events-none"
                >
                  {node.label}
                </text>
                {/* Inline expansion for details */}
                {expanded && (
                  <foreignObject x={node.x - 70} y={node.y + nodeRadius + 22} width={140} height={100}>
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      className="bg-white border border-gray-200 rounded shadow-sm px-3 py-2 mt-1 text-gray-700 text-xs text-center"
                      style={{ minHeight: 32 }}
                    >
                      <div className="font-semibold text-blue-700 mb-1">{node.label}</div>
                      <div>{nodeDetails[node.id]}</div>
                    </motion.div>
                  </foreignObject>
                )}
              </motion.g>
            );
          })}
        </svg>
      </div>
      <div className="mt-3 w-full max-w-3xl text-center">
        <p className="text-xs text-gray-500">
          <span className="font-semibold text-gray-700">How this works:</span> Hover over each step to see details about that part of the information architecture. This diagram shows how core entities in the scheduling system relate to each other.
        </p>
      </div>
    </div>
  );
};

export default InfoArchitectureDiagrams;
