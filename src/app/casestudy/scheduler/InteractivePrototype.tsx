import React, { useState, useRef, useEffect } from "react";
import Button from "@/components/ui/Button";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// Step Enum
const STEP = {
  SCHOOL_SELECTION: 0,
  PLAN_GENERATION: 1,
  TIMETABLE_VIEW: 2,
};

const SCHOOLS = [
  { name: "Amagor Primary School", grades: "Primary • P1-P6", status: "No Plan", statusColor: "bg-gray-100 text-gray-800" },
  { name: "Baki Primary School", grades: "Primary • P1-P8", status: "No Plan", statusColor: "bg-gray-100 text-gray-800" },
  { name: "Ivbore Primary School", grades: "Primary • P1-P6", status: "Published", statusColor: "bg-green-100 text-green-800" },
  { name: "Unity Primary School", grades: "Primary • P1-P6", status: "Published", statusColor: "bg-green-100 text-green-800" },
  { name: "Sunrise Academy", grades: "Primary • P1-P8", status: "Draft", statusColor: "bg-gray-100 text-gray-800" },
  { name: "Greenfield School", grades: "Primary • P1-P6", status: "Draft", statusColor: "bg-gray-100 text-gray-800" },
  { name: "Lakeside International", grades: "Primary • P1-P7", status: "No Plan", statusColor: "bg-gray-100 text-gray-800" },
  { name: "Royal Scholars School", grades: "Primary • P1-P6", status: "Published", statusColor: "bg-green-100 text-green-800" },
];

export default function InteractivePrototype() {
  const [step, setStep] = useState(STEP.SCHOOL_SELECTION);
  const [selectedSchools, setSelectedSchools] = useState<string[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const shouldReduceMotion = useReducedMotion();

  // Interactive conflict state
  const [selectedConflict, setSelectedConflict] = useState<
    | {
        row: number;
        col: number;
        subject: string;
        teacher: string;
        conflictType?: string;
      }
    | null
  >(null);

  // When user clicks Generate Timetable, go to PLAN_GENERATION step
  const handleGenerate = () => {
    setStep(STEP.PLAN_GENERATION);
  };

  // When in PLAN_GENERATION, auto-advance to TIMETABLE_VIEW after delay
  useEffect(() => {
    if (step === STEP.PLAN_GENERATION) {
      timerRef.current = setTimeout(() => {
        setStep(STEP.TIMETABLE_VIEW);
      }, 2500);
    }
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [step]);

  // Animation variants
  const fadeSlide = {
    initial: { opacity: 0, y: shouldReduceMotion ? 0 : 30 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, y: shouldReduceMotion ? 0 : -30, transition: { duration: 0.3 } },
  };

  // --- Timetable Data (Step 1) ---
  const timetableData = [
    {
      time: '10 AM',
      slots: [
        { subject: 'Math', teacher: 'Mr. Okoro', color: 'bg-blue-100 text-blue-800', conflict: false },
        { subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', conflict: false },
        { subject: 'Science', teacher: 'Mr. Bello', color: 'bg-yellow-100 text-yellow-800', conflict: false },
        { subject: 'Arts', teacher: 'Ms. Chika', color: 'bg-purple-100 text-purple-800', conflict: false },
        { subject: 'History', teacher: 'Mr. Musa', color: 'bg-pink-100 text-pink-800', conflict: false },
      ],
    },
    {
      time: '11 AM',
      slots: [
        { subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', conflict: false },
        { subject: 'Math', teacher: 'Mr. Okoro', color: 'bg-blue-100 text-blue-800', conflict: true, conflictType: 'double-booking' },
        { subject: 'Science', teacher: 'Mr. Bello', color: 'bg-yellow-100 text-yellow-800', conflict: false },
        { subject: 'Arts', teacher: 'Ms. Chika', color: 'bg-purple-100 text-purple-800', conflict: false },
        { subject: 'History', teacher: 'Mr. Musa', color: 'bg-pink-100 text-pink-800', conflict: false },
      ],
    },
    {
      time: '12 PM',
      slots: [
        { subject: 'Long Break', teacher: '', color: 'bg-gray-100 text-gray-700', conflict: false },
        { subject: 'Math', teacher: 'Mr. Okoro', color: 'bg-blue-100 text-blue-800', conflict: false },
        { subject: 'English', teacher: 'Ms. Adesina', color: 'bg-green-100 text-green-800', conflict: false },
        { subject: 'Gaps in schedule', teacher: '', color: 'bg-red-100 text-red-800', conflict: true, conflictType: 'gap' },
        { subject: 'Science', teacher: 'Mr. Bello', color: 'bg-yellow-100 text-yellow-800', conflict: false },
      ],
    },
  ];
  const days = ['MON', 'TUE', 'WED', 'THU', 'FRI'];

  return (
    <section className="my-12 border-2 border-gray-200 rounded-xl shadow-lg bg-white overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-accent to-tertiary flex items-center justify-between">
        <div>
          <h3 className="text-xl md:text-2xl font-bold text-white" id="interactive-prototype-title">Try the Interactive Prototype</h3>
          <p className="text-white text-sm mt-1" id="interactive-prototype-desc">Click through the core scheduling flow as a user would experience it.</p>
        </div>
        <a
          href="https://www.figma.com/proto/4HVHnoV0n8uEVLf7XkKU1f/AIP---Multiple-schools?page-id=225%3A12437&node-id=54617-3517&viewport=482%2C201%2C0.05&t=dYiIBvYppZoyDru5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=54617%3A3517"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-2 border border-blue-200 text-blue-700 bg-white text-sm font-semibold rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
          aria-label="View the interactive prototype in Figma (opens in new tab)"
          aria-labelledby="interactive-prototype-title interactive-prototype-desc"
        >
          View in Figma
        </a>
      </div>
      <div className="p-4 md:p-8">
        <div className="flex justify-center">
          <div className="w-full max-w-7xl relative rounded-xl shadow-lg bg-white overflow-hidden min-h-[600px] h-[600px]">
            <AnimatePresence mode="wait">
              {step === STEP.SCHOOL_SELECTION && (
                <motion.div
                  key="school-selection"
                  {...fadeSlide}
                  className="w-full h-full"
                >
                  {/* School Selection Interface */}
                  <div className="border border-gray-200 rounded overflow-hidden mb-6 w-full h-full flex flex-col">
                    {/* Header */}
                    <div className="bg-blue-600 text-white px-4 py-2 flex justify-between items-center">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        <span className="text-sm font-medium">Schools</span>
                      </div>
                    </div>
                    {/* Generate Timetable Button */}
                    <div className="flex items-center px-4 py-4">
                      <button
                        className={`mr-4 px-5 py-2 rounded-lg text-base font-semibold shadow transition-colors ${selectedSchools.length > 0 ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
                        disabled={selectedSchools.length === 0}
                        onClick={handleGenerate}
                      >
                        Generate Timetable
                      </button>
                      <span className="text-gray-500 text-sm">Select a school to enable</span>
                    </div>
                    {/* Schools List */}
                    <div className="divide-y divide-gray-200">
                      {SCHOOLS.map((school) => (
                        <label key={school.name} className="p-3 flex justify-between items-center hover:bg-gray-50 cursor-pointer">
                          <div className="flex items-center">
                            <input
                              type="checkbox"
                              name="school"
                              className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-3"
                              checked={selectedSchools.includes(school.name)}
                              onChange={() => {
                                setSelectedSchools((prev) =>
                                  prev.includes(school.name)
                                    ? prev.filter((n) => n !== school.name)
                                    : [...prev, school.name]
                                );
                              }}
                              aria-label={`Select ${school.name}`}
                            />
                            <div>
                              <div className={`text-sm font-medium ${selectedSchools.includes(school.name) ? 'text-blue-600' : 'text-gray-900'}`}>{school.name}</div>
                              <div className="text-xs text-gray-500">{school.grades}</div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            {/* Only show chip if not 'In Progress' */}
                            {school.status !== 'In Progress' && (
                              <span className={`px-2 py-0.5 text-xs rounded-full ${school.statusColor}`}>{school.status}</span>
                            )}
                            {/* Only show 'View' button for Published */}
                            {school.status === 'Published' && (
                              <button className="text-xs text-blue-600" tabIndex={-1}>View</button>
                            )}
                          </div>
                        </label>
                      ))}
                    </div>
                    {/* Pagination */}
                    <div className="bg-gray-50 px-3 py-2 flex justify-between text-xs text-gray-600">
                      <span>Showing {SCHOOLS.length} of 32 schools</span>
                      <div className="flex space-x-1">
                        <button className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">Prev</button>
                        <button className="px-1.5 py-0.5 bg-white border border-gray-300 rounded">Next</button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {step === STEP.PLAN_GENERATION && (
                <motion.div
                  key="plan-generation"
                  {...fadeSlide}
                  className="w-full h-full flex items-center justify-center"
                  aria-live="polite"
                  aria-busy="true"
                >
                  {/* Generating Plan Modal UI */}
                  <div className="w-full max-w-md mx-auto bg-white rounded-xl shadow-lg border border-blue-200 p-8 flex flex-col items-center">
                    <div className="inline-block p-3 rounded-full bg-blue-50 mb-4">
                      <svg className="w-8 h-8 text-blue-600 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">Generating plan...</h4>
                    <p className="text-sm text-gray-600 mb-4">This might take a few seconds</p>
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '70%' }}
                        transition={{ duration: shouldReduceMotion ? 0 : 2.2, ease: 'easeInOut' }}
                        className="bg-blue-600 h-2 rounded-full"
                        aria-hidden="true"
                      ></motion.div>
                    </div>
                    <p className="text-xs text-gray-500 mb-4">Processing constraints</p>
                    <div className="space-y-2 w-full">
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                        <span className="text-sm text-gray-700">Hard Violations (2)</span>
                      </div>
                      <div className="flex items-center">
                        <span className="inline-block w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                        <span className="text-sm text-gray-700">Soft Violations (3)</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              {step === STEP.TIMETABLE_VIEW && (
                <motion.div
                  key="timetable-view"
                  {...fadeSlide}
                  className="relative w-full h-full overflow-y-auto"
                >
                  {/* School Timetable View */}
                  <div className="bg-white border border-gray-200 rounded-md overflow-hidden w-full h-full flex flex-col">
                    <div className="flex h-full">
                      {/* Main Timetable Content */}
                      <div className="flex-1 flex flex-col">
                        <div className="p-3 border-b border-gray-200">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center">
                              <button
                                onClick={() => setStep(STEP.SCHOOL_SELECTION)}
                                className="mr-2 p-1 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                aria-label="Back to School List"
                              >
                                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-gray-400">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                </svg>
                              </button>
                              <span className="text-base font-semibold text-gray-900">Amagor School</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span className="bg-gray-100 px-3 py-1 text-sm font-medium rounded-full text-gray-800">DRAFT</span>
                              <button className="bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded shadow hover:bg-blue-700 transition-colors">Publish</button>
                              <button className="bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-1.5 rounded border border-blue-200 hover:bg-blue-200 transition-colors">Re-generate</button>
                            </div>
                          </div>
                          <div className="flex border-b border-gray-200 mb-2 space-x-2">
                            <button className="px-4 py-1.5 text-sm font-medium text-gray-500 rounded-t hover:text-blue-700 focus:outline-none">Summary</button>
                            <button className="px-4 py-1.5 text-sm font-semibold text-blue-700 border-b-2 border-blue-700 rounded-t bg-blue-50">Plan</button>
                          </div>
                          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0 mt-2">
                            <div className="flex flex-wrap items-center gap-2 text-sm">
                              <span className="font-medium text-gray-700">View by</span>
                              <span className="border border-gray-200 rounded-full px-3 py-1 bg-gray-50 font-medium text-gray-800">Grade and Stream ▼</span>
                              <span className="border border-gray-200 rounded-full px-3 py-1 bg-gray-50 font-medium text-gray-800">Primary 3 ▼</span>
                              <span className="border border-gray-200 rounded-full px-3 py-1 bg-gray-50 font-medium text-gray-800">A ▼</span>
                            </div>
                          </div>
                        </div>
                        <div className="border-b border-gray-200 overflow-x-auto flex-1">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                              <tr>
                                <th className="p-2 text-left text-xs font-medium text-gray-500 tracking-wider">Time</th>
                                {days.map((day) => (
                                  <th key={day} className="p-2 text-center text-xs font-medium text-gray-500 tracking-wider">{day}</th>
                                ))}
                              </tr>
                            </thead>
                            <tbody>
                              {timetableData.map((row, rowIdx) => (
                                <tr key={row.time}>
                                  <td className="p-2 text-xs font-medium text-gray-500">{row.time}</td>
                                  {row.slots.map((slot, colIdx) => {
                                    const isSelected =
                                      selectedConflict &&
                                      selectedConflict.row === rowIdx &&
                                      selectedConflict.col === colIdx;
                                    return (
                                      <td key={colIdx} className="p-1 align-top">
                                        <div
                                          className={
                                            `${slot.color} p-1 text-center text-[11px] rounded relative font-medium flex flex-col items-center justify-center min-h-[36px] ` +
                                            (slot.conflict
                                              ? ' cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-400 transition-shadow'
                                              : '') +
                                            (isSelected ? ' ring-2 ring-red-500 z-10' : '')
                                          }
                                          tabIndex={slot.conflict ? 0 : -1}
                                          role={slot.conflict ? 'button' : undefined}
                                          aria-label={slot.conflict ? `View conflict: ${slot.subject}` : undefined}
                                          onClick={() => {
                                            if (slot.conflict) {
                                              setSelectedConflict({
                                                row: rowIdx,
                                                col: colIdx,
                                                subject: slot.subject,
                                                teacher: slot.teacher,
                                                conflictType: slot.conflictType,
                                              });
                                            }
                                          }}
                                          onKeyDown={e => {
                                            if (slot.conflict && (e.key === 'Enter' || e.key === ' ')) {
                                              setSelectedConflict({
                                                row: rowIdx,
                                                col: colIdx,
                                                subject: slot.subject,
                                                teacher: slot.teacher,
                                                conflictType: slot.conflictType,
                                              });
                                            }
                                          }}
                                        >
                                          {slot.subject}
                                          {slot.teacher && (
                                            <span className="block text-[10px] text-gray-500 font-normal">{slot.teacher}</span>
                                          )}
                                          {slot.conflict && (
                                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                                              <span className="text-white text-[10px]">!</span>
                                            </span>
                                          )}
                                        </div>
                                      </td>
                                    );
                                  })}
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                      {/* Interactive Conflict Side Sheet */}
                      <aside className="w-64 h-full bg-red-50 border-l-4 border-red-200 p-4 flex flex-col items-start transition-all duration-300">
                        {selectedConflict ? (
                          <div className="w-full bg-white rounded-lg shadow p-3 border border-red-100 relative">
                            <button
                              className="absolute top-2 right-2 text-gray-400 hover:text-red-500 focus:outline-none"
                              aria-label="Close conflict details"
                              onClick={() => setSelectedConflict(null)}
                            >
                              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                              </svg>
                            </button>
                            <p className="text-xs font-medium text-red-800 mb-1 capitalize">
                              {selectedConflict.conflictType === 'double-booking' && 'Teacher Double Booking'}
                              {selectedConflict.conflictType === 'gap' && 'Gap in Schedule'}
                              {!selectedConflict.conflictType && 'Conflict'}
                            </p>
                            <p className="text-xs text-gray-700 mb-2">
                              <span className="font-semibold">Subject:</span> {selectedConflict.subject}
                              {selectedConflict.teacher && (
                                <>
                                  <br />
                                  <span className="font-semibold">Teacher:</span> {selectedConflict.teacher}
                                </>
                              )}
                            </p>
                            {/* Example details for demo */}
                            {selectedConflict.conflictType === 'double-booking' && (
                              <p className="text-xs text-gray-700">This teacher is scheduled for two classes at the same time. Please resolve the conflict by reassigning or rescheduling.</p>
                            )}
                            {selectedConflict.conflictType === 'gap' && (
                              <p className="text-xs text-gray-700">There is a gap in the schedule for this stream. Consider rearranging lessons for a continuous flow.</p>
                            )}
                          </div>
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
                            <span>Select a conflict cell to view details</span>
                          </div>
                        )}
                      </aside>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        {/* Restart Button - now below the prototype */}
        {step === STEP.TIMETABLE_VIEW && (
          <div className="flex justify-center mt-8 space-x-4">
            <Button variant="primary" onClick={() => setStep(STEP.SCHOOL_SELECTION)} aria-label="Restart Prototype">
              Restart Prototype
            </Button>
            <a
              href="https://www.figma.com/proto/4HVHnoV0n8uEVLf7XkKU1f/AIP---Multiple-schools?page-id=225%3A12437&node-id=54617-3517&viewport=482%2C201%2C0.05&t=dYiIBvYppZoyDru5-1&scaling=min-zoom&content-scaling=fixed&starting-point-node-id=54617%3A3517"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-5 py-2 border border-blue-200 text-blue-700 bg-white text-sm font-semibold rounded hover:bg-blue-50 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="View in Figma (opens in new tab)"
            >
              View in Figma
            </a>
          </div>
        )}
      </div>
    </section>
  );
} 