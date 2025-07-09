'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface WorkflowStep {
  id: number;
  title: string;
  description: string;
  content: React.ReactNode;
}

// Simple tooltip component
const Tooltip = ({ text, children }: { text: string; children: React.ReactNode }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onFocus={() => setIsVisible(true)}
      onBlur={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-800 text-white text-xs rounded-md shadow-lg whitespace-nowrap z-20">
          {text}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-800"></div>
        </div>
      )}
    </div>
  );
};

const GenerationWorkflow = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const steps: WorkflowStep[] = [
    {
      id: 1,
      title: 'Upload template library',
      description: 'Upload your Word template library with automation syntax',
      content: (
        <div className="border border-gray-200 rounded-lg p-4 md:p-8 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <h3 className="text-lg md:text-xl font-medium mb-2">Upload template library</h3>
            <p className="text-sm md:text-base text-gray-500">Drag and drop template library here to upload.</p>
            <p className="text-sm md:text-base text-gray-500">Template library should be in .docx format.</p>
          </div>

          <div className="w-12 h-12 md:w-16 md:h-16 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>

          <button className="flex items-center px-4 py-2 bg-white border border-indigo-600 rounded-md text-indigo-600 text-sm md:text-base font-medium hover:bg-indigo-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Choose file
          </button>
        </div>
      ),
    },
    {
      id: 2,
      title: 'Upload spreadsheet',
      description: 'Upload your content spreadsheet with lesson data',
      content: (
        <div className="border border-gray-200 rounded-lg p-4 md:p-8 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <h3 className="text-lg md:text-xl font-medium mb-2">Upload content spreadsheet</h3>
            <p className="text-sm md:text-base text-gray-500">Drag and drop content spreadsheet here to upload.</p>
            <p className="text-sm md:text-base text-gray-500">Spreadsheet should be in .xlsx format.</p>
          </div>

          <div className="w-12 h-12 md:w-16 md:h-16 mb-6">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1}
                d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </div>

          <button className="flex items-center px-4 py-2 bg-white border border-indigo-600 rounded-md text-indigo-600 text-sm md:text-base font-medium hover:bg-indigo-50 transition-colors">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 md:h-5 md:w-5 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
              />
            </svg>
            Choose file
          </button>
        </div>
      ),
    },
    {
      id: 3,
      title: 'Select content',
      description: 'Choose which content tab to use for generation',
      content: (
        <div className="border border-gray-200 rounded-lg p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-medium mb-4">Select content tab</h3>

          <div className="mb-4">
            <p className="text-sm text-gray-500 mb-2">Choose which spreadsheet tab to use:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-3">
              <div className="border border-indigo-200 bg-indigo-50 p-3 rounded-md flex items-center">
                <input type="radio" name="tab" className="mr-2" checked />
                <span>Grade 3 - Math</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <input type="radio" name="tab" className="mr-2" />
                <span>Grade 3 - Science</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <input type="radio" name="tab" className="mr-2" />
                <span>Grade 4 - English</span>
              </div>
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:border-indigo-200 hover:bg-indigo-50/30 transition-colors">
                <input type="radio" name="tab" className="mr-2" />
                <span>Grade 4 - Social Studies</span>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Content tab validation:</p>
            <div className="bg-green-50 border border-green-200 p-3 rounded-md">
              <div className="flex items-center text-green-700 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Valid content structure</span>
              </div>
              <p className="text-sm text-green-600">All required columns are present in the selected tab.</p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 4,
      title: 'Select lessons',
      description: 'Choose which lessons to generate',
      content: (
        <div className="border border-gray-200 rounded-lg p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-medium mb-4">Select lessons to generate</h3>

          <div className="mb-4">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-2 gap-2">
              <p className="text-sm text-gray-500">Found 12 lessons in Grade 3 - Math</p>
              <div className="flex items-center">
                <label className="text-sm text-gray-500 mr-2">Select:</label>
                <button className="text-xs text-indigo-600 mr-2 hover:underline">All</button>
                <button className="text-xs text-indigo-600 hover:underline">None</button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:bg-indigo-50/30 transition-colors">
                <input type="checkbox" className="mr-3" checked />
                <div>
                  <div className="font-medium">Lesson 1: Introduction to Fractions</div>
                  <div className="text-xs text-gray-500">Topic: Basic fraction concepts</div>
                </div>
              </div>
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:bg-indigo-50/30 transition-colors">
                <input type="checkbox" className="mr-3" checked />
                <div>
                  <div className="font-medium">Lesson 2: Equivalent Fractions</div>
                  <div className="text-xs text-gray-500">Topic: Finding equivalent fractions</div>
                </div>
              </div>
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:bg-indigo-50/30 transition-colors">
                <input type="checkbox" className="mr-3" checked />
                <div>
                  <div className="font-medium">Lesson 3: Comparing Fractions</div>
                  <div className="text-xs text-gray-500">Topic: Greater than and less than</div>
                </div>
              </div>
              <div className="border border-gray-200 p-3 rounded-md flex items-center hover:bg-indigo-50/30 transition-colors">
                <input type="checkbox" className="mr-3" />
                <div>
                  <div className="font-medium">Lesson 4: Adding Fractions</div>
                  <div className="text-xs text-gray-500">Topic: Adding with like denominators</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 mb-2">Selected lessons: 3 of 12</p>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div className="bg-indigo-600 h-2.5 rounded-full" style={{ width: '25%' }}></div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 5,
      title: 'Generate lessons',
      description: 'Review and start the generation process',
      content: (
        <div className="border border-gray-200 rounded-lg p-4 md:p-8">
          <h3 className="text-lg md:text-xl font-medium mb-4">Generate lessons</h3>

          <div className="mb-6">
            <div className="bg-indigo-50 border border-indigo-200 p-4 rounded-md mb-4">
              <h4 className="font-medium text-indigo-700 mb-2">Generation Summary</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>
                  Template library: <span className="font-medium">Math_Templates_v2.docx</span>
                </li>
                <li>
                  Content spreadsheet: <span className="font-medium">Grade3_Math_Content.xlsx</span>
                </li>
                <li>
                  Selected tab: <span className="font-medium">Grade 3 - Math</span>
                </li>
                <li>
                  Lessons to generate: <span className="font-medium">3 lessons</span>
                </li>
                <li>
                  Estimated time: <span className="font-medium">~2 minutes</span>
                </li>
              </ul>
            </div>

            <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
              <h4 className="font-medium text-yellow-700 mb-2">Preview First Lesson</h4>
              <p className="text-sm text-gray-700 mb-3">
                Review the first lesson before generating all selected lessons:
              </p>
              <button className="px-3 py-1.5 bg-yellow-100 text-yellow-700 border border-yellow-300 rounded text-sm hover:bg-yellow-200 transition-colors">
                Preview Lesson 1
              </button>
            </div>
          </div>

          <div className="p-4 bg-gray-50 rounded-md">
            <h4 className="font-medium mb-2">Generation Settings</h4>
            <div className="flex flex-col space-y-3">
              <label className="flex items-center hover:bg-gray-100 p-1 rounded transition-colors cursor-pointer">
                <input type="checkbox" className="mr-2" checked />
                <span className="text-sm">Include student materials</span>
              </label>
              <label className="flex items-center hover:bg-gray-100 p-1 rounded transition-colors cursor-pointer">
                <input type="checkbox" className="mr-2" checked />
                <span className="text-sm">Include teacher notes</span>
              </label>
              <label className="flex items-center hover:bg-gray-100 p-1 rounded transition-colors cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-sm">Add glossary terms</span>
              </label>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 6,
      title: 'Summary',
      description: 'View and download generated lessons',
      content: (
        <div className="border border-gray-200 rounded-lg p-4 md:p-8">
          <div className="mb-6 bg-green-50 border border-green-200 p-4 rounded-md">
            <div className="flex items-center text-green-700 mb-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <h3 className="text-lg md:text-xl font-medium">Generation Complete</h3>
            </div>

            <p className="text-sm text-gray-700 mb-2">
              All 3 lessons have been generated successfully. You can download them individually or as a package.
            </p>
          </div>

          <h4 className="font-medium mb-4">Generated Lessons</h4>

          <div className="space-y-3 mb-6">
            <div className="border border-gray-200 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="font-medium">Lesson 1: Introduction to Fractions</div>
                <div className="text-xs text-gray-500">Generated: Just now • Size: 2.4 MB</div>
              </div>
              <div className="flex items-center w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded text-sm mr-2 hover:bg-indigo-200 transition-colors">
                  Preview
                </button>
                <button className="flex-1 sm:flex-initial px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors">
                  Download
                </button>
              </div>
            </div>

            <div className="border border-gray-200 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="font-medium">Lesson 2: Equivalent Fractions</div>
                <div className="text-xs text-gray-500">Generated: Just now • Size: 2.1 MB</div>
              </div>
              <div className="flex items-center w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded text-sm mr-2 hover:bg-indigo-200 transition-colors">
                  Preview
                </button>
                <button className="flex-1 sm:flex-initial px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors">
                  Download
                </button>
              </div>
            </div>

            <div className="border border-gray-200 p-3 rounded-md flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
              <div>
                <div className="font-medium">Lesson 3: Comparing Fractions</div>
                <div className="text-xs text-gray-500">Generated: Just now • Size: 2.6 MB</div>
              </div>
              <div className="flex items-center w-full sm:w-auto">
                <button className="flex-1 sm:flex-initial px-3 py-1.5 bg-indigo-100 text-indigo-700 rounded text-sm mr-2 hover:bg-indigo-200 transition-colors">
                  Preview
                </button>
                <button className="flex-1 sm:flex-initial px-3 py-1.5 bg-indigo-600 text-white rounded text-sm hover:bg-indigo-700 transition-colors">
                  Download
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:justify-between items-center gap-3">
            <button className="w-full md:w-auto px-4 py-2 bg-indigo-600 text-white rounded flex items-center justify-center hover:bg-indigo-700 transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download All Lessons
            </button>

            <button className="w-full md:w-auto px-4 py-2 border border-indigo-600 text-indigo-600 rounded hover:bg-indigo-50 transition-colors">
              Start New Generation
            </button>
          </div>
        </div>
      ),
    },
  ];

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStepClick = (stepId: number) => {
    setCurrentStep(stepId);
  };

  const currentStepData = steps.find(step => step.id === currentStep);

  return (
    <div className="my-8 border border-gray-200 rounded-lg overflow-hidden shadow-md">
      <div className="bg-gray-50 px-4 py-2 border-b border-gray-200 flex flex-wrap items-center justify-between gap-2">
        <div className="flex flex-wrap items-center gap-1">
          <div className="flex items-center flex-shrink-0">
            <div className="w-3 h-3 rounded-full bg-red-400 mr-1"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-400 mr-1"></div>
            <div className="w-3 h-3 rounded-full bg-green-400 mr-1"></div>
          </div>
          <span className="text-sm text-gray-500 ml-1">Generate lessons (interactive)</span>
        </div>
      </div>
      <div className="p-4 md:p-8 bg-white">
        {/* Progress steps */}
        <div className="flex flex-wrap justify-between mb-12 relative">
          {/* Progress bar - with color indication for completed steps */}
          <div className="absolute h-[1px] bg-gray-200 top-5 left-0 right-0 z-0 hidden md:block"></div>
          <div
            className="absolute h-[1px] bg-indigo-400 top-5 left-0 z-0 hidden md:block transition-all duration-300 ease-in-out"
            style={{
              width: `${((currentStep - 1) * 100) / (steps.length - 1)}%`,
            }}
          ></div>

          {steps.map(step => (
            <div
              key={step.id}
              className="flex flex-col items-center relative z-10 w-1/3 md:w-auto mb-6 md:mb-0 cursor-pointer"
              onClick={() => handleStepClick(step.id)}
            >
              <Tooltip text={step.description}>
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ease-in-out ${
                    currentStep === step.id
                      ? 'bg-indigo-600 text-white'
                      : currentStep > step.id
                        ? 'bg-indigo-200 text-indigo-700'
                        : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  <span>{step.id}</span>
                </div>
              </Tooltip>
              <span
                className={`text-xs md:text-sm text-center font-medium ${
                  currentStep === step.id
                    ? 'text-indigo-600'
                    : currentStep > step.id
                      ? 'text-indigo-500'
                      : 'text-gray-500'
                }`}
              >
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Current step content with animation */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            {currentStepData?.content}
          </motion.div>
        </AnimatePresence>

        {/* Step description */}
        <div className="mt-6 mb-4 text-center text-sm text-gray-600">
          <p>{currentStepData?.description}</p>
        </div>

        {/* Footer with navigation buttons */}
        <div className="flex justify-between mt-8">
          <button
            className={`px-4 md:px-6 py-2 rounded-md text-sm md:text-base transition-colors ${
              currentStep > 1
                ? 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
            }`}
            onClick={handlePrevious}
            disabled={currentStep === 1}
          >
            Previous
          </button>

          <button
            className={`px-4 md:px-6 py-2 rounded-md text-sm md:text-base transition-colors ${
              currentStep < steps.length
                ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                : 'bg-indigo-300 text-white cursor-not-allowed'
            }`}
            onClick={handleNext}
            disabled={currentStep === steps.length}
          >
            {currentStep < steps.length ? 'Next' : 'Finish'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenerationWorkflow;
