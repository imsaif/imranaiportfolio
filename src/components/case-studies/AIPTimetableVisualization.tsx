'use client';

import { motion } from 'framer-motion';
import React from 'react';

/**
 * EduSchedulerTimetableVisualization - A detailed visualization of the educational scheduling system
 * This component is currently not in use but saved for later implementation
 */
export default function EduSchedulerTimetableVisualization() {
  return (
    <motion.div
      className="mt-8 aspect-video bg-white rounded-lg overflow-hidden shadow-md relative"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.4 }}
    >
      <div className="relative w-full h-full flex flex-col">
        {/* Top header with buttons */}
        <div className="border-b border-gray-200 p-4 flex justify-between items-center">
          <div>
            <button className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full font-medium">DRAFT</button>
          </div>
          <div className="flex items-center gap-2">
            <button className="border border-gray-300 bg-white w-8 h-8 flex items-center justify-center rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5zM1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4H1z" />
              </svg>
            </button>
            <button className="border border-gray-300 bg-blue-600 text-white w-8 h-8 flex items-center justify-center rounded">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path d="M8 0a1 1 0 0 1 1 1v5.268l4.562-2.634a1 1 0 1 1 1 1.732L10 8l4.562 2.634a1 1 0 1 1-1 1.732L9 9.732V15a1 1 0 1 1-2 0V9.732l-4.562 2.634a1 1 0 1 1-1-1.732L6 8 1.438 5.366a1 1 0 0 1 1-1.732L7 6.268V1a1 1 0 0 1 1-1z" />
              </svg>
            </button>
            <div className="flex">
              <button className="border border-gray-300 bg-blue-600 text-white px-4 py-2 rounded-l">Publish</button>
              <button className="border border-gray-300 bg-blue-600 text-white px-2 py-2 rounded-r border-l-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-1">
          {/* Main timetable area - 75% width */}
          <div className="flex-[3] overflow-hidden border-r border-gray-200">
            {/* Timetable content */}
            <div className="p-0 h-full bg-white overflow-auto">
              {/* Header */}
              <div className="grid grid-cols-6 border-b border-gray-200 bg-gray-50 text-center text-xs font-medium text-gray-700">
                <div className="p-2 border-r border-gray-200"></div>
                <div className="p-2 border-r border-gray-200">MON</div>
                <div className="p-2 border-r border-gray-200">TUE</div>
                <div className="p-2 border-r border-gray-200">WED</div>
                <div className="p-2 border-r border-gray-200">THU</div>
                <div className="p-2">FRI</div>
              </div>

              {/* Morning arrival row */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-1 border-r border-gray-200 text-xs text-gray-500">7 AM</div>
                <div className="p-1 border-r border-gray-200 bg-gray-100 text-xs">Mark Arrival</div>
                <div className="p-1 border-r border-gray-200 bg-gray-100 text-xs">Mark Arrival</div>
                <div className="p-1 border-r border-gray-200 bg-gray-100 text-xs">Mark Arrival</div>
                <div className="p-1 border-r border-gray-200 bg-gray-100 text-xs">Mark Arrival</div>
                <div className="p-1 bg-gray-100 text-xs">Mark Arrival</div>
              </div>

              {/* Jolly Phonics row */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-1 border-r border-gray-200 text-xs text-gray-500">8 AM</div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">
                    Jolly Phonics
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">
                    Jolly Phonics
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">
                    Jolly Phonics
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">
                    Jolly Phonics
                  </div>
                </div>
                <div className="p-1">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">
                    Jolly Phonics
                  </div>
                </div>
              </div>

              {/* Mathematics row */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-1 border-r border-gray-200 text-xs text-gray-500">9 AM</div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-yellow-50 p-1 rounded text-xs text-yellow-800 border border-yellow-100 mb-1">
                    Mathematics Level A
                  </div>
                  <div className="bg-green-50 p-1 rounded text-xs text-green-800 border border-green-100">
                    Social Studies
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-yellow-50 p-1 rounded text-xs text-yellow-800 border border-yellow-100 mb-1">
                    Mathematics Level A
                  </div>
                  <div className="bg-green-50 p-1 rounded text-xs text-green-800 border border-green-100">
                    Social Studies
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-purple-50 p-1 rounded text-xs text-purple-800 border border-purple-100 mb-1">
                    English Studies
                  </div>
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">Arabic</div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-yellow-50 p-1 rounded text-xs text-yellow-800 border border-yellow-100 mb-1">
                    Mathematics Level A
                  </div>
                  <div className="bg-green-50 p-1 rounded text-xs text-green-800 border border-green-100">
                    Social Studies
                  </div>
                </div>
                <div className="p-1">
                  <div className="bg-yellow-50 p-1 rounded text-xs text-yellow-800 border border-yellow-100 mb-1">
                    Mathematics Level A
                  </div>
                  <div className="bg-green-50 p-1 rounded text-xs text-green-800 border border-green-100">
                    Social Studies
                  </div>
                </div>
              </div>

              {/* Conflict row */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-1 border-r border-gray-200 text-xs text-gray-500">10 AM</div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-gray-100 p-1 rounded text-xs text-gray-700 border border-gray-200 mb-1">
                    Long Break
                  </div>
                  <div className="bg-purple-50 p-1 rounded text-xs text-purple-800 border border-purple-100">
                    English Studies
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-gray-100 p-1 rounded text-xs text-gray-700 border border-gray-200 mb-1">
                    Long Break
                  </div>
                  <div className="bg-red-50 p-1 rounded text-xs text-red-800 border border-red-200 flex items-center justify-between">
                    <span>Social Studies</span>
                    <span>❗</span>
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-gray-100 p-1 rounded text-xs text-gray-700 border border-gray-200 mb-1">
                    Long Break
                  </div>
                  <div className="bg-yellow-50 p-1 rounded text-xs text-yellow-800 border border-yellow-100">
                    Mathematics Level B
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-gray-100 p-1 rounded text-xs text-gray-700 border border-gray-200 mb-1">
                    Long Break
                  </div>
                  <div className="bg-red-50 p-1 rounded text-xs text-red-800 border border-red-200 flex items-center justify-between">
                    <span>Gaps in schedule</span>
                    <span>❗</span>
                  </div>
                </div>
                <div className="p-1">
                  <div className="bg-gray-100 p-1 rounded text-xs text-gray-700 border border-gray-200 mb-1">
                    Long Break
                  </div>
                  <div className="bg-purple-50 p-1 rounded text-xs text-purple-800 border border-purple-100">
                    English Studies
                  </div>
                </div>
              </div>

              {/* More rows */}
              <div className="grid grid-cols-6 border-b border-gray-200">
                <div className="p-1 border-r border-gray-200 text-xs text-gray-500">11 AM</div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">Arabic</div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">Arabic</div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-green-50 p-1 rounded text-xs text-green-800 border border-green-100">
                    Social Studies
                  </div>
                </div>
                <div className="p-1 border-r border-gray-200">
                  <div className="bg-amber-50 p-1 rounded text-xs text-amber-800 border border-amber-100">Arabic</div>
                </div>
                <div className="p-1">
                  <div className="bg-yellow-50 p-1 rounded text-xs text-yellow-800 border border-yellow-100">
                    Mathematics Level A
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right sidebar - 25% width */}
          <div className="flex-1 flex flex-col">
            {/* Soft rule highlights toggle */}
            <div className="p-3 border-b border-gray-200 flex items-center justify-end text-xs text-gray-700">
              <span className="mr-2">Soft rule highlights on</span>
              <div className="w-10 h-5 bg-blue-600 rounded-full flex items-center px-0.5">
                <div className="w-4 h-4 bg-white rounded-full ml-auto"></div>
              </div>
            </div>

            {/* Conflict details */}
            <div className="p-4 flex-1 overflow-y-auto">
              <p className="text-gray-700 mb-6">
                Teacher is teaching Social Studies and English at the same time for P3A on Tuesday at 10:25 to 11:00 AM
              </p>

              {/* Teacher Conflict */}
              <div className="mb-4">
                <div className="inline-block bg-red-200 text-red-800 px-2 py-0.5 rounded text-sm font-medium mb-2">
                  Teacher Conflict
                </div>
                <p className="text-gray-700 text-sm">
                  A teacher cannot teach more than one lesson at the same time. Please review to ensure the plan is
                  usable.
                </p>
              </div>

              {/* Lesson Conflict */}
              <div className="mb-6">
                <div className="inline-block bg-red-200 text-red-800 px-2 py-0.5 rounded text-sm font-medium mb-2">
                  Lesson Conflict
                </div>
                <p className="text-gray-700 text-sm">
                  A stream cannot attend more than one lesson at the same time. Please review to ensure the plan is
                  usable.
                </p>
              </div>

              {/* Also in section */}
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-600 mb-2">Also in</p>
                <div className="flex flex-wrap gap-1">
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium">P1A</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium">P2B</button>
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 border border-blue-300 rounded text-sm font-medium">
                    P3A
                  </button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium">P3B</button>
                  <button className="px-3 py-1 border border-gray-300 rounded text-sm font-medium">P3C</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
