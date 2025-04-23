import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Placeholder data for journey steps
const steps = [
  {
    title: 'Upload School Data',
    role: { name: 'School Manager', icon: '🏫' },
    action: 'Upload school and class data to start the scheduling process.',
    emotion: { emoji: '😐', label: 'Neutral' },
    painPoint: 'Manual data entry was slow and error-prone.',
    opportunity: 'CSV upload and validation.',
    quote: '"It took hours to enter all the school info by hand."',
  },
  {
    title: 'Set Constraints',
    role: { name: 'Academic Director', icon: '🎓' },
    action: 'Define scheduling rules and constraints for the program.',
    emotion: { emoji: '🤔', label: 'Thoughtful' },
    painPoint: 'Hard to visualize all constraints.',
    opportunity: 'Visual constraint builder.',
    quote: '"I wish I could see all the rules at a glance."',
  },
  {
    title: 'Review Conflicts',
    role: { name: 'Production Staff', icon: '🔧' },
    action: 'Review detected scheduling conflicts and warnings.',
    emotion: { emoji: '😟', label: 'Anxious' },
    painPoint: 'Overwhelming error messages.',
    opportunity: 'Guided conflict resolution.',
    quote: '"I wasn\'t sure which issues to fix first."',
  },
  {
    title: 'Resolve Issues',
    role: { name: 'Production Staff', icon: '🔧' },
    action: 'Manually or automatically resolve scheduling issues.',
    emotion: { emoji: '😖', label: 'Frustrated' },
    painPoint: 'Tedious manual adjustments.',
    opportunity: 'Bulk editing and smart suggestions.',
    quote: '"Making changes one by one was exhausting."',
  },
  {
    title: 'Publish Schedule',
    role: { name: 'School Manager', icon: '🏫' },
    action: 'Publish the final, conflict-free schedule for all stakeholders.',
    emotion: { emoji: '😊', label: 'Relieved' },
    painPoint: '',
    opportunity: 'Success confirmation and summary.',
    quote: '"It felt great to finally see a green check!"',
  },
];

export default function UserJourneyMapInteractive() {
  const [selectedStep, setSelectedStep] = useState(0);

  return (
    <div className="p-6 flex flex-col md:flex-row gap-8">
      {/* Vertical Stepper */}
      <div className="flex flex-col gap-2 w-full md:w-1/3">
        {steps.map((step, idx) => (
          <button
            key={idx}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition focus:outline-none focus:ring-2 focus:ring-blue-300 text-left
              ${selectedStep === idx ? 'bg-blue-50 border-l-4 border-blue-400 shadow' : 'bg-gray-50 border-l-4 border-transparent'}
            `}
            onClick={() => setSelectedStep(idx)}
            aria-current={selectedStep === idx ? 'step' : undefined}
          >
            <span className={`flex items-center justify-center w-8 h-8 rounded-full font-bold text-lg ${selectedStep === idx ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>{idx + 1}</span>
            <div className="flex flex-col flex-1">
              <span className="font-semibold text-gray-900 mb-0.5">{step.title}</span>
              <span className="text-xs text-gray-500 flex items-center">{step.role.icon} {step.role.name}</span>
            </div>
            <span className="ml-auto text-xl">{step.emotion.emoji}</span>
          </button>
        ))}
      </div>
      {/* Step Details Popover/Panel */}
      <div className="flex-1 flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="w-full max-w-xl bg-white border border-gray-200 rounded-xl shadow-lg p-8"
          >
            {/* Removed step indicator and title heading */}
            <hr className="my-4 border-gray-200" />
            {/* Role & Emotion */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-6 items-start bg-gray-50 rounded-lg px-4 py-3 mb-6">
              <div className="flex items-center gap-2">
                <span className="text-lg">{steps[selectedStep].role.icon}</span>
                <span className="font-semibold text-gray-700">Role:</span>
                <span className="text-gray-700">{steps[selectedStep].role.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-lg">{steps[selectedStep].emotion.emoji}</span>
                <span className="font-semibold text-gray-700">Emotion:</span>
                <span className="text-gray-700">{steps[selectedStep].emotion.label}</span>
              </div>
            </div>
            {/* Action */}
            <div className="mb-6">
              <span className="block text-gray-900 font-semibold mb-1">Action</span>
              <span className="block text-gray-700 text-base mb-2">{steps[selectedStep].action}</span>
            </div>
            {/* Pain Point */}
            {steps[selectedStep].painPoint && (
              <div className="mb-5">
                <span className="block text-red-700 font-semibold mb-1 flex items-center"><span className="mr-2">⚠️</span>Pain Point</span>
                <span className="block text-red-600 text-base mb-1">{steps[selectedStep].painPoint}</span>
              </div>
            )}
            {/* Design Opportunity */}
            {steps[selectedStep].opportunity && (
              <div className="mb-5">
                <span className="block text-green-700 font-semibold mb-1 flex items-center"><span className="mr-2">💡</span>Design Opportunity</span>
                <span className="block text-green-600 text-base mb-1">{steps[selectedStep].opportunity}</span>
              </div>
            )}
            {/* User Quote */}
            {steps[selectedStep].quote && (
              <blockquote className="bg-blue-50 border-l-4 border-blue-400 pl-5 pr-3 py-4 italic text-blue-900 mt-6 text-base rounded-md shadow-sm">
                {steps[selectedStep].quote}
              </blockquote>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
} 