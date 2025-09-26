'use client';

import React from 'react';
import AnimatedNumber from './AnimatedNumber';
import { useActiveCard } from '../../context/ActiveCardContext';

// Custom CSS for single pulse animation
const singlePulseStyle = {
  animation: 'pulse 1s ease-in-out 1'
};

interface Metric {
  id: string;
  number: string;
  label: string;
}

interface LeadershipMetric extends Metric {
  icon: React.ComponentType<any>;
}

interface HighlightedMetricsTableProps {
  metrics: Metric[];
  leadershipMetrics: LeadershipMetric[];
  cardMetricMapping: Record<string, string[]>;
}

const HighlightedMetricsTable: React.FC<HighlightedMetricsTableProps> = ({
  metrics,
  leadershipMetrics,
  cardMetricMapping
}) => {
  const { activeCardId } = useActiveCard();

  // Get the metrics that should be highlighted based on active card
  const highlightedMetrics = activeCardId ? cardMetricMapping[activeCardId] || [] : [];

  const isHighlighted = (metricId: string) => highlightedMetrics.includes(metricId);

  return (
    <div className="relative">
      {/* Gradient Shadow Background - Brand Colors */}
      <div className="absolute -inset-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-xl blur-lg opacity-20"></div>

      {/* Table Container */}
      <div className="relative bg-white rounded-xl border border-gray-200 overflow-hidden">
        <table className="w-full">
          <tbody>
            {/* Primary Metrics */}
            {metrics.map((metric, index) => {
              const highlighted = isHighlighted(metric.id);
              return (
                <tr
                  key={index}
                  className={`border-b border-gray-100 transition-all duration-500 ${
                    highlighted
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-md border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className={`px-5 py-6 text-sm font-medium transition-colors duration-300 ${
                    highlighted ? 'text-blue-800' : 'text-gray-700'
                  }`}>
                    {metric.label}
                  </td>
                  <td className="px-5 py-6 text-right">
                    <div className="relative inline-block">
                      <AnimatedNumber
                        value={metric.number}
                        className={`text-xl font-bold transition-colors duration-300 ${
                          highlighted ? 'text-blue-700' : 'text-gray-900'
                        }`}
                        duration={1500}
                      />
                      {highlighted && (
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-md opacity-20 -mx-1 -my-0.5"
                          style={singlePulseStyle}
                        ></div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {/* Separator Row with Visual Emphasis */}
            <tr className="bg-gray-50">
              <td colSpan={2} className="px-5 py-1">
                <div className="border-t-2 border-gray-200"></div>
              </td>
            </tr>

            {/* Leadership Metrics */}
            {leadershipMetrics.map((metric, index) => {
              const highlighted = isHighlighted(metric.id);
              return (
                <tr
                  key={`leadership-${index}`}
                  className={`border-b border-gray-100 transition-all duration-500 ${
                    highlighted
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 shadow-md border-blue-200'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className={`px-5 py-6 text-sm font-medium transition-colors duration-300 ${
                    highlighted ? 'text-blue-800' : 'text-gray-700'
                  }`}>
                    {metric.label}
                  </td>
                  <td className="px-5 py-6 text-right">
                    <div className="relative inline-block">
                      <AnimatedNumber
                        value={metric.number}
                        className={`text-xl font-bold transition-colors duration-300 ${
                          highlighted ? 'text-blue-700' : 'text-gray-900'
                        }`}
                        duration={1800}
                      />
                      {highlighted && (
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-md opacity-20 -mx-1 -my-0.5"
                          style={singlePulseStyle}
                        ></div>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HighlightedMetricsTable;