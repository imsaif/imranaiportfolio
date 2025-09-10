import React from 'react';

interface EnglishTeacherGuideProps {
  onBack?: () => void;
}

const EnglishTeacherGuide: React.FC<EnglishTeacherGuideProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="bg-green-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-green-100 transition-colors mr-2"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold">English - Grade 3A</h2>
            <p className="text-green-100 text-sm">Ms. Adesina</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live - 9:15 AM</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 space-y-3">
        {/* Lesson Overview */}
        <section className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Today's Lesson: Reading Comprehension
          </h3>
          <p className="text-gray-700 text-sm">
            Students will read a short story and answer questions to demonstrate understanding of main ideas and details.
          </p>
        </section>

        {/* Learning Objectives */}
        <section className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Learning Objectives
          </h3>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Identify main characters and setting in a story
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Answer questions about story details
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Express opinions about the story characters
            </li>
          </ul>
        </section>

        {/* Materials Needed */}
        <section className="bg-yellow-50 rounded-lg p-3 border-l-4 border-yellow-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Materials Needed
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
              Story books
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
              Question sheets
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
              Pencils
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
              Chart paper
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
                <h4 className="font-semibold text-gray-800 text-sm">Story Introduction</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">8 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Preview the story "The Magic Garden" and introduce new vocabulary words.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Guided Reading</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">20 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Read story together, pausing to discuss characters and events.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Comprehension Questions</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">12 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Students answer questions about main characters, setting, and plot.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Story Discussion</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">5 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Share thoughts about favorite characters and story ending.
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
            <p className="mb-2"><strong>Exit Ticket:</strong> Draw your favorite character and write one sentence about them.</p>
            <div className="bg-white rounded p-2 border border-pink-200">
              <p className="text-xs font-medium text-pink-700 mb-1">Look for:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Clear character identification</li>
                <li>• Complete sentence structure</li>
                <li>• Understanding of character traits</li>
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
            <strong>Reading Log:</strong> Read for 15 minutes at home and record the book title and favorite part. Due tomorrow.
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

export default EnglishTeacherGuide;