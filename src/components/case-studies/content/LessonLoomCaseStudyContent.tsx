'use client';

import CaseStudyFooter from '@/components/case-studies/CaseStudyFooter';
import ScrollToTopButton from '@/components/ui/ScrollToTopButton';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useState, useRef, useEffect } from 'react';

interface LessonLoomCaseStudyContentProps {
  showScrollToTop?: boolean;
}

export const LessonLoomCaseStudyContent: React.FC<LessonLoomCaseStudyContentProps> = ({
  showScrollToTop = true,
}) => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  // In the Generation Workflow section, modify to add interactivity
  const [currentStep, setCurrentStep] = useState(1);

  // AI Interface State
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedSpreadsheet, setSelectedSpreadsheet] = useState(null);
  const [chatMessages, setChatMessages] = useState([
    {
      type: 'ai',
      content: 'Welcome! Drag templates and spreadsheets from the left panel to build your lesson plan.'
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);

  // Refs for scrolling
  const chatContainerRef = useRef(null);

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTo({
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      });
    }
  }, [chatMessages, isGenerating]);

  // Drag and Drop Handlers
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragStart = (e, item, type) => {
    e.dataTransfer.setData('application/json', JSON.stringify({ item, type }));
    e.dataTransfer.effectAllowed = 'copy';
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'copy';
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const data = JSON.parse(e.dataTransfer.getData('application/json'));
    const { item, type } = data;

    if (type === 'template') {
      setSelectedTemplate(item);
      setChatMessages(prev => [...prev,
        {
          type: 'ai',
          content: `Great! I've added the ${item.name} template. Now drag a spreadsheet to provide content data.`
        }
      ]);
    } else if (type === 'spreadsheet') {
      setSelectedSpreadsheet(item);
      setChatMessages(prev => [...prev,
        {
          type: 'ai',
          content: `Perfect! I now have both a template (${selectedTemplate?.name || 'Template'}) and content spreadsheet (${item.name}). You can generate your lessons now!`
        }
      ]);
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setChatMessages(prev => [...prev,
      {
        type: 'ai',
        content: 'Generating lessons... This may take a few moments.'
      }
    ]);

    // Simulate generation process
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
      setChatMessages(prev => [...prev,
        {
          type: 'ai',
          content: `🎉 Success! Generated 25 lessons using ${selectedTemplate?.name} template and ${selectedSpreadsheet?.name} data. Ready for download!`
        }
      ]);
    }, 3000);
  };

  // Template and spreadsheet data
  const templates = [
    { id: 1, name: 'Mathematics Template', emoji: '📄', description: 'Grade 3 • Fractions & Decimals' },
    { id: 2, name: 'Science Template', emoji: '🧪', description: 'Grade 5 • Lab Experiments' },
    { id: 3, name: 'Language Template', emoji: '📝', description: 'Grade 4 • Reading Comprehension' },
    { id: 4, name: 'History Template', emoji: '🏛️', description: 'Grade 6 • World History' },
    { id: 5, name: 'Art Template', emoji: '🎨', description: 'Grade K-2 • Creative Arts' },
    { id: 6, name: 'Music Template', emoji: '🎵', description: 'Grade 3-5 • Music Theory' },
  ];

  const spreadsheets = [
    { id: 1, name: 'Q1 Math Content', emoji: '📊', description: 'Grade 3 • 25 lessons' },
    { id: 2, name: 'Science Units', emoji: '📊', description: 'Grade 5 • 30 lessons' },
    { id: 3, name: 'Language Arts', emoji: '📊', description: 'Grade 4 • 45 lessons' },
    { id: 4, name: 'Q2 Math Content', emoji: '📊', description: 'Grade 3 • 28 lessons' },
    { id: 5, name: 'History Curriculum', emoji: '📊', description: 'Grade 6 • 20 lessons' },
    { id: 6, name: 'Art Projects', emoji: '📊', description: 'Grade K-2 • 15 projects' },
  ];

  return (
    <div className="bg-[#f8f9fe] min-h-screen">
      {/* Full-width hero image section */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
        className="w-full relative"
      >
        <div className="w-full h-[70vh] md:h-[80vh] relative overflow-hidden">
          <Image
            src="/images/casestudy/lessonloom/lessonloomboard.png"
            alt="LessonLoom: Automated Lesson Generation Platform"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-transparent"></div>
        </div>
      </motion.div>

      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12">
        {/* Title Section */}
        <motion.h1
          className="text-5xl font-bold text-transparent bg-clip-text animate-gradient-text mb-12"
          style={{
            backgroundImage: 'linear-gradient(90deg, #d94f9d, #9333ea, #d94f9d)',
            backgroundSize: '200% auto',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          LessonLoom: Automated Lesson Generation Platform
        </motion.h1>

        {/* Add CSS keyframes animation definition */}
        <style jsx global>{`
          @keyframes gradient-shift {
            0% { background-position: 0% center; }
            50% { background-position: 100% center; }
            100% { background-position: 0% center; }
          }
          .animate-gradient-text {
            animation: gradient-shift 4s ease-in-out infinite;
          }
        `}</style>

        {/* Problem Statement */}
        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">The Challenge</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              Teachers spend countless hours creating lesson plans and educational materials from scratch,
              often lacking the time and resources to create engaging, curriculum-aligned content that meets
              diverse learning needs.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">15+ hrs</div>
                <div className="text-gray-600">per week on lesson planning</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">60%</div>
                <div className="text-gray-600">of materials created from scratch</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-red-500 mb-2">1 in 3</div>
                <div className="text-gray-600">teachers report feeling overwhelmed</div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Solution Overview */}
        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Solution</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              LessonLoom uses AI to automatically generate custom lesson plans, worksheets, and educational
              materials based on curriculum standards, grade levels, and teacher preferences.
            </p>

            {/* AI Generation Process */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📝</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Input</h4>
                <p className="text-sm text-gray-600">Teacher specifies subject, grade level, and learning objectives</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">🤖</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">AI Processing</h4>
                <p className="text-sm text-gray-600">AI analyzes curriculum standards and generates content</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">📋</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Generation</h4>
                <p className="text-sm text-gray-600">Creates lesson plans, activities, and assessments</p>
              </div>

              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">✨</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Customize</h4>
                <p className="text-sm text-gray-600">Teachers can edit and personalize generated content</p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Interactive AI Generation Demo */}
        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Try the AI Generation Workflow</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <p className="text-gray-600 mb-6">
              Drag and drop a template and spreadsheet below to see how LessonLoom generates lessons:
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Templates Panel */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Templates</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {templates.map((template) => (
                    <div
                      key={template.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, template, 'template')}
                      className="flex items-center p-3 bg-blue-50 rounded-lg cursor-move hover:bg-blue-100 transition-colors"
                    >
                      <span className="mr-3 text-lg">{template.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">{template.name}</div>
                        <div className="text-xs text-gray-600">{template.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Chat Interface */}
              <div
                className={`border-2 border-dashed rounded-lg p-4 transition-colors ${
                  isDragOver ? 'border-blue-400 bg-blue-50' : 'border-gray-300 bg-gray-50'
                }`}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <h3 className="font-semibold text-gray-800 mb-4">AI Assistant</h3>
                <div
                  ref={chatContainerRef}
                  className="space-y-3 h-48 overflow-y-auto mb-4 p-3 bg-white rounded-lg border"
                >
                  {chatMessages.map((message, index) => (
                    <div key={index} className="flex items-start space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white text-xs font-bold">
                        AI
                      </div>
                      <div className="flex-1 text-sm text-gray-700">
                        {message.content}
                      </div>
                    </div>
                  ))}
                  {isGenerating && (
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                      <div className="text-sm text-gray-500">AI is working...</div>
                    </div>
                  )}
                </div>

                {selectedTemplate && selectedSpreadsheet && !isGenerating && !generationComplete && (
                  <button
                    onClick={handleGenerate}
                    className="w-full py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium hover:from-purple-600 hover:to-pink-600 transition-colors"
                  >
                    Generate Lessons
                  </button>
                )}

                {generationComplete && (
                  <div className="text-center">
                    <div className="text-green-600 font-medium mb-2">✅ Generation Complete!</div>
                    <button className="px-4 py-2 bg-green-500 text-white rounded-lg font-medium hover:bg-green-600 transition-colors">
                      Download Lessons
                    </button>
                  </div>
                )}
              </div>

              {/* Spreadsheets Panel */}
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-800">Content Data</h3>
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {spreadsheets.map((spreadsheet) => (
                    <div
                      key={spreadsheet.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, spreadsheet, 'spreadsheet')}
                      className="flex items-center p-3 bg-green-50 rounded-lg cursor-move hover:bg-green-100 transition-colors"
                    >
                      <span className="mr-3 text-lg">{spreadsheet.emoji}</span>
                      <div>
                        <div className="font-medium text-gray-800">{spreadsheet.name}</div>
                        <div className="text-xs text-gray-600">{spreadsheet.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Impact Results */}
        <motion.section {...fadeIn} className="mb-16">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">Results & Impact</h2>
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-4xl font-bold text-green-500 mb-2">10,000+</div>
                <div className="text-gray-600 font-medium">Lessons Generated</div>
                <div className="text-sm text-gray-500 mt-1">Across all subjects and grade levels</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-blue-500 mb-2">6hrs/week</div>
                <div className="text-gray-600 font-medium">Time Saved per Teacher</div>
                <div className="text-sm text-gray-500 mt-1">More time for actual teaching</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-purple-500 mb-2">92%</div>
                <div className="text-gray-600 font-medium">Adoption Rate</div>
                <div className="text-sm text-gray-500 mt-1">Teachers continue using after trial</div>
              </div>
            </div>
          </div>
        </motion.section>

        <CaseStudyFooter />
      </main>
      {showScrollToTop && <ScrollToTopButton targetId="intro-section" />}
    </div>
  );
};