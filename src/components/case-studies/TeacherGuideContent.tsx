import React from 'react';

interface TeacherGuideContentProps {
  onBack?: () => void;
}

const TeacherGuideContent: React.FC<TeacherGuideContentProps> = ({ onBack }) => {
  return (
    <div className="h-full flex flex-col bg-white">
      {/* Fixed Header */}
      <div className="bg-blue-600 text-white px-4 py-3 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center space-x-3">
          {onBack && (
            <button
              onClick={onBack}
              className="flex items-center text-white hover:text-blue-100 transition-colors mr-2"
            >
              <svg className="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              <span className="text-sm font-medium">Back</span>
            </button>
          )}
          <div>
            <h2 className="text-lg font-semibold">Mathematics - Grade 3A</h2>
            <p className="text-blue-100 text-sm">Mrs. Adesina</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span className="text-sm font-medium">Live - 8:30 AM</span>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="px-4 py-3 space-y-3">
          {/* Lesson Overview */}
          <section className="bg-blue-50 rounded-lg p-3 border-l-4 border-blue-500">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Today's Lesson: Addition with Regrouping
            </h3>
            <p className="text-gray-700 text-sm">
              Students will learn to add two-digit numbers with regrouping using base-10 blocks and place value understanding.
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
                Add two-digit numbers with regrouping accurately
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Explain the regrouping process using place value
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                Solve word problems involving addition with regrouping
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
                Base-10 blocks
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                Worksheets
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                Whiteboard
              </div>
              <div className="flex items-center">
                <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                Number line
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
                  <h4 className="font-semibold text-gray-800 text-sm">Warm-up Review</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">5 min</span>
                </div>
                <p className="text-xs text-gray-600">
                  Review single-digit addition and place value with quick mental math exercises.
                </p>
              </div>
              <div className="bg-white rounded p-3 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Introduction to Regrouping</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15 min</span>
                </div>
                <p className="text-xs text-gray-600">
                  Demonstrate regrouping concept using base-10 blocks. Work through 27 + 35 step by step.
                </p>
              </div>
              <div className="bg-white rounded p-3 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Guided Practice</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">15 min</span>
                </div>
                <p className="text-xs text-gray-600">
                  Work through problems together: 48 + 26, 39 + 47. Students use manipulatives.
                </p>
              </div>
              <div className="bg-white rounded p-3 border border-purple-200">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-gray-800 text-sm">Independent Practice</h4>
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded">10 min</span>
                </div>
                <p className="text-xs text-gray-600">
                  Complete worksheet problems 1-8. Circulate and provide individual support.
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
              <p className="mb-2"><strong>Exit Ticket:</strong> Solve 56 + 28 and explain your regrouping steps.</p>
              <div className="bg-white rounded p-2 border border-pink-200">
                <p className="text-xs font-medium text-pink-700 mb-1">Look for:</p>
                <ul className="text-xs text-gray-600 space-y-1">
                  <li>• Correct addition in ones place (6+8=14)</li>
                  <li>• Proper regrouping (write 4, carry 1)</li>
                  <li>• Correct final answer (84)</li>
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
              <strong>Math Workbook:</strong> Pages 45-46, problems 1-12. 
              Practice addition with regrouping. Due tomorrow.
            </p>
          </section>

          {/* Next Lesson Preview */}
          <section className="bg-indigo-50 rounded-lg p-3 border-l-4 border-indigo-500">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
              Coming Tomorrow
            </h3>
            <p className="text-sm text-gray-700">
              Subtraction with Regrouping - Building on today's addition skills
            </p>
          </section>
          
          {/* Additional Resources */}
          <section className="bg-cyan-50 rounded-lg p-3 border-l-4 border-cyan-500">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-cyan-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C20.832 18.477 19.246 18 17.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
              Additional Resources
            </h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Math manipulatives guide</li>
              <li>• Interactive whiteboard activities</li>
              <li>• Parent practice sheet</li>
              <li>• Extension activities for advanced learners</li>
            </ul>
          </section>

          {/* Notes for Tomorrow */}
          <section className="bg-amber-50 rounded-lg p-3 border-l-4 border-amber-500">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              Notes for Tomorrow
            </h3>
            <p className="text-sm text-gray-700">
              Review today's exit tickets before tomorrow's lesson. Focus extra attention on students who struggled with the carry-over concept.
            </p>
          </section>

          {/* Student Differentiation */}
          <section className="bg-emerald-50 rounded-lg p-3 border-l-4 border-emerald-500">
            <h3 className="font-bold text-gray-800 mb-2 flex items-center">
              <svg className="w-5 h-5 mr-2 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
              </svg>
              Differentiation Notes
            </h3>
            <div className="text-sm text-gray-700 space-y-2">
              <p><strong>For struggling learners:</strong> Use physical base-10 blocks throughout</p>
              <p><strong>For advanced learners:</strong> Introduce three-digit addition with regrouping</p>
              <p><strong>Visual learners:</strong> Use color-coded place value charts</p>
            </div>
          </section>

          {/* Extra space to test scrolling */}
          <div className="h-20 flex items-center justify-center text-gray-400 text-sm border-t border-gray-200 mt-6">
            📝 End of Mathematics Lesson Guide
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherGuideContent;