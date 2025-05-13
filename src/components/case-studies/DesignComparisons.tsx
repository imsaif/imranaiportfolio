import React, { useState } from 'react';
import { motion } from 'framer-motion';
import SplitViewComparison from './SplitViewComparison';
import { DesignComparison } from '@/data/scheduler-comparison';

interface DesignComparisonsProps {
  comparisons: DesignComparison[];
}

export default function DesignComparisons({ comparisons }: DesignComparisonsProps) {
  const [activeComparison, setActiveComparison] = useState(0);

  return (
    <div className="space-y-8">
      <div className="flex space-x-4 mb-8">
        {comparisons.map((comparison, index) => (
          <button
            key={comparison.id}
            onClick={() => setActiveComparison(index)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeComparison === index
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {comparison.title}
          </button>
        ))}
      </div>

      <motion.div
        key={comparisons[activeComparison].id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {comparisons[activeComparison].title}
          </h3>
          <p className="text-gray-700">
            {comparisons[activeComparison].description}
          </p>
        </div>

        <SplitViewComparison
          wireframeImage={comparisons[activeComparison].wireframeImage}
          finalImage={comparisons[activeComparison].finalImage}
          hotspots={comparisons[activeComparison].hotspots}
        />
      </motion.div>
    </div>
  );
} 