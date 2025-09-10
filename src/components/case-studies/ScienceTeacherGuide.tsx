import React from 'react';

interface ScienceTeacherGuideProps {
  onBack?: () => void;
}

const ScienceTeacherGuide: React.FC<ScienceTeacherGuideProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="bg-yellow-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-yellow-100 transition-colors mr-2"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold">Science - Grade 3A</h2>
            <p className="text-yellow-100 text-sm">Mr. Bello</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live - 10:15 AM</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 space-y-3">
        {/* Lesson Overview */}
        <section className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-500">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Today's Lesson: Plant Life Cycle
          </h3>
          <p className="text-gray-700 text-sm">
            Students will learn about the stages of a plant's life cycle from seed to mature plant.
          </p>
        </section>

        {/* Learning Objectives */}
        <section className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learning Objectives
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Identify the four stages of plant life cycle
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Explain what plants need to grow
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Observe and record plant growth changes
            </li>
          </ul>
        </section>

        {/* Materials Needed */}
        <section className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Materials Needed
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Bean seeds
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Small pots
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Potting soil
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-2"></span>
              Life cycle chart
            </div>
          </div>
        </section>

        {/* Lesson Activities */}
        <section className="bg-purple-50 rounded-lg p-3 border-l-4 border-purple-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lesson Activities (45 minutes)
          </h3>
          <div className="space-y-3">
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Introduction to Plants</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">10 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Discuss what students know about plants and how they grow.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Life Cycle Exploration</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Show life cycle chart and explain each stage: seed, sprout, plant, flower.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Hands-on Planting</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Students plant bean seeds in pots and water them. Set up observation station.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Science Journal</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">5 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Draw and label their planted seed. Record date and predictions.
              </p>
            </div>
          </div>
        </section>

        {/* Assessment */}
        <section className="bg-pink-50 rounded-lg p-3 border-l-4 border-pink-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-pink-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Quick Assessment
          </h3>
          <div className="text-sm text-gray-700">
            <p className="mb-2"><strong>Exit Ticket:</strong> Draw the four stages of plant life cycle in order.</p>
            <div className="bg-white rounded p-2 border border-pink-200">
              <p className="text-xs font-medium text-pink-700 mb-1">Look for:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Correct sequence: seed → sprout → plant → flower</li>
                <li>• Clear drawings of each stage</li>
                <li>• Basic understanding of growth process</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Homework */}
        <section className="bg-gray-50 rounded-lg p-3 border-l-4 border-gray-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
            </svg>
            Homework Assignment
          </h3>
          <p className="text-sm text-gray-700">
            <strong>Plant Observer:</strong> Check your planted seed daily and record any changes in your science journal. Bring journal tomorrow.
          </p>
        </section>
        
        {/* Extra space to test scrolling */}
        <div className="h-20 flex items-center justify-center text-gray-400 text-sm">
          End of lesson guide
        </div>
        </div>
      </div>
    </div>
  );
};

export default ScienceTeacherGuide;