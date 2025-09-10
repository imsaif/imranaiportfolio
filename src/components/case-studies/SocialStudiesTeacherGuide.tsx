import React from 'react';

interface SocialStudiesTeacherGuideProps {
  onBack?: () => void;
}

const SocialStudiesTeacherGuide: React.FC<SocialStudiesTeacherGuideProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="bg-orange-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-orange-100 transition-colors mr-2"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold">Social Studies - Grade 3A</h2>
            <p className="text-orange-100 text-sm">Mr. Johnson</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-orange-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live - 11:00 AM</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 space-y-3">
        {/* Lesson Overview */}
        <section className="bg-orange-50 rounded-lg p-3 border-l-4 border-orange-500">
          <h3 className="font-bold text-gray-800 mb-2 flex items-center">
            <svg className="w-5 h-5 mr-2 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Today's Lesson: Our Community Helpers
          </h3>
          <p className="text-gray-700 text-sm">
            Students will learn about different jobs in their community and how these helpers make our lives better.
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
              Identify different community helper jobs
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Explain how each helper serves the community
            </li>
            <li className="flex items-start">
              <span className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
              Connect community helpers to their own experiences
            </li>
          </ul>
        </section>

        {/* Materials Needed */}
        <section className="bg-green-50 rounded-lg p-3 border-l-4 border-green-500">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center">
            <svg className="w-5 h-5 mr-2 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
            Materials Needed
          </h3>
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              Picture cards
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              Community map
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              Matching game
            </div>
            <div className="flex items-center">
              <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
              Drawing paper
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
                <h4 className="font-semibold text-gray-800 text-sm">Community Helper Discussion</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">10 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Ask students about helpers they know. Show picture cards of different community workers.
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Helper Jobs & Tools</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Match each helper to their tools and explain what they do (doctor-stethoscope, firefighter-hose).
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Community Map Activity</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Locate where different helpers work on a community map (hospital, fire station, school).
              </p>
            </div>
            <div className="bg-white rounded p-3 border border-purple-200">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-gray-800 text-sm">Thank You Cards</h4>
                <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">5 min</span>
              </div>
              <p className="text-xs text-gray-600">
                Students draw a picture of their favorite community helper and write "Thank you."
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
            <p className="mb-2"><strong>Exit Ticket:</strong> Name three community helpers and tell how they help us.</p>
            <div className="bg-white rounded p-2 border border-pink-200">
              <p className="text-xs font-medium text-pink-700 mb-1">Look for:</p>
              <ul className="text-xs text-gray-600 space-y-1">
                <li>• Correct identification of helpers</li>
                <li>• Understanding of their roles</li>
                <li>• Connection to community service</li>
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
            <strong>Helper Hunt:</strong> With your family, identify three community helpers you see this week. Draw or write about them.
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

export default SocialStudiesTeacherGuide;