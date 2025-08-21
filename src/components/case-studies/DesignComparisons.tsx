import { DesignComparison } from '@/data/scheduler-comparison';
import { motion } from 'framer-motion';
import { useState } from 'react';
import SplitViewComparison from './SplitViewComparison';

interface DesignComparisonsProps {
  comparisons: DesignComparison[];
}

export default function DesignComparisons({ comparisons }: DesignComparisonsProps) {
  const [activeComparison, setActiveComparison] = useState(0);

  // Guard clause for empty comparisons
  if (!comparisons || comparisons.length === 0) {
    return <div className="text-gray-500">No comparisons available.</div>;
  }

  const currentComparison = comparisons[activeComparison];

  // Guard clause for invalid active comparison index
  if (!currentComparison) {
    return <div className="text-gray-500">Selected comparison not found.</div>;
  }

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
        key={currentComparison.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-xl font-bold text-gray-900 mb-2">
            {currentComparison.title}
          </h3>
          <p className="text-gray-700">
            {currentComparison.description}
          </p>
        </div>

        <SplitViewComparison
          wireframeImage={currentComparison.wireframeImage}
          finalImage={currentComparison.finalImage}
          hotspots={currentComparison.hotspots}
        />
      </motion.div>
    </div>
  );
}
