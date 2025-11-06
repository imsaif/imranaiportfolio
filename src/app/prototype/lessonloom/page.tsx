'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdAutoAwesome, MdArrowBack } from 'react-icons/md';

export default function LessonLoomPrototypePage() {
  const router = useRouter();

  const handleBackToCaseStudy = () => {
    // Navigate to the case study with tactical tab parameter
    router.push('/casestudy/lessonloom?tab=tactical');

    // Wait for navigation and tab switch to complete, then scroll to the Interactive Prototype section
    setTimeout(() => {
      const element = document.getElementById('interactive-prototype');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 1000);
  };

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
  const [generationStage, setGenerationStage] = useState(0);
  const [lessonsGenerated, setLessonsGenerated] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationSuggestions, setShowValidationSuggestions] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Refs for scrolling
  const chatContainerRef = useRef(null);

  // Validation suggestions
  const [validationSuggestions] = useState([
    'Consider using a more advanced template to unlock additional formatting options',
    'The Q1 Math Content spreadsheet includes diverse learning styles - great choice for inclusivity!'
  ]);

  // Sample data
  const templates = [
    { id: 1, name: 'Standard Lesson', emoji: '📄', description: 'Basic lesson structure with objectives, content, and assessment' },
    { id: 2, name: 'Interactive Module', emoji: '🎮', description: 'Lesson with embedded interactivity and student engagement tools' }
  ];

  const spreadsheets = [
    { id: 1, name: 'Q1 Math Content', emoji: '📊', description: 'Mathematics curriculum content for Q1' },
    { id: 2, name: 'Science Topics', emoji: '🔬', description: 'Science topics and lab activities' }
  ];

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

      // Check if spreadsheet is already selected
      if (selectedSpreadsheet) {
        setIsValidated(true);
        setShowValidationSuggestions(true);
        setChatMessages(prev => [...prev,
          {
            type: 'ai',
            content: `✓ Perfect! Scenario validated. I have both the ${item.name} template and ${selectedSpreadsheet.name} spreadsheet. Everything looks good - proceed to generate when ready!`
          }
        ]);
      }
    } else if (type === 'spreadsheet') {
      setSelectedSpreadsheet(item);
      setChatMessages(prev => [...prev,
        {
          type: 'ai',
          content: `Great! I've added the ${item.name} spreadsheet. Now I have both a template and content data.`
        }
      ]);

      // Check if template is already selected
      if (selectedTemplate) {
        setIsValidated(true);
        setShowValidationSuggestions(true);
        setChatMessages(prev => [...prev,
          {
            type: 'ai',
            content: `✓ Perfect! Scenario validated. I have both the ${selectedTemplate.name} template and ${item.name} spreadsheet. Everything looks good - proceed to generate when ready!`
          }
        ]);
      }
    }
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setGenerationStage(1);
    setLessonsGenerated(0);
    setChatMessages(prev => [...prev,
      {
        type: 'ai',
        content: 'Analyzing template structure...'
      }
    ]);

    // Stage 1: Analyze (0-1200ms)
    setTimeout(() => {
      setGenerationStage(2);
      setChatMessages(prev => [...prev.slice(0, -1),
        {
          type: 'ai',
          content: 'Processing spreadsheet content...'
        }
      ]);
    }, 1200);

    // Stage 2: Process (1200-2500ms)
    setTimeout(() => {
      setGenerationStage(3);
      setChatMessages(prev => [...prev.slice(0, -1),
        {
          type: 'ai',
          content: 'Generating lessons 1-10...'
        }
      ]);
    }, 2500);

    // Stage 3: Generate first batch (2500-4200ms)
    let lessonCounter = 0;
    const stage3Interval = setInterval(() => {
      lessonCounter++;
      if (lessonCounter <= 10) {
        setLessonsGenerated(lessonCounter);
        setChatMessages(prev => [...prev.slice(0, -1),
          {
            type: 'ai',
            content: `Generating lessons 1-10... (Lesson ${lessonCounter} of 25)`
          }
        ]);
      }
      if (lessonCounter >= 10) clearInterval(stage3Interval);
    }, 120);

    // Stage 4: Generate second batch (4200-5900ms)
    setTimeout(() => {
      setGenerationStage(4);
      let stage4Counter = 10;
      const stage4Interval = setInterval(() => {
        stage4Counter++;
        if (stage4Counter <= 20) {
          setLessonsGenerated(stage4Counter);
          setChatMessages(prev => [...prev.slice(0, -1),
            {
              type: 'ai',
              content: `Generating lessons 11-20... (Lesson ${stage4Counter} of 25)`
            }
          ]);
        }
        if (stage4Counter >= 20) clearInterval(stage4Interval);
      }, 120);
    }, 4200);

    // Stage 5: Finalize (5900-7200ms)
    setTimeout(() => {
      setGenerationStage(5);
      let stage5Counter = 20;
      const stage5Interval = setInterval(() => {
        stage5Counter++;
        if (stage5Counter <= 25) {
          setLessonsGenerated(stage5Counter);
          setChatMessages(prev => [...prev.slice(0, -1),
            {
              type: 'ai',
              content: `Finalizing ${stage5Counter} lessons...`
            }
          ]);
        }
        if (stage5Counter >= 25) clearInterval(stage5Interval);
      }, 110);
    }, 5900);

    // Complete (7200ms)
    setTimeout(() => {
      setIsGenerating(false);
      setGenerationComplete(true);
      setGenerationStage(0);
      setLessonsGenerated(0);
      setChatMessages(prev => [...prev,
        {
          type: 'ai',
          content: `🎉 Success! Generated 25 lessons using ${selectedTemplate?.name} template and ${selectedSpreadsheet?.name} data. Ready for download!`
        }
      ]);
    }, 7200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-8">
      {/* Back Button - Outside the prototype */}
      <div className="w-full max-w-5xl mb-6 flex justify-start">
        <button
          onClick={handleBackToCaseStudy}
          className="text-white hover:text-gray-300 transition-colors flex items-center gap-2 text-sm font-medium"
          title="Back to case study"
        >
          <MdArrowBack className="w-5 h-5" />
          Back to Case Study
        </button>
      </div>

      {/* Prototype Container */}
      <div className="w-full max-w-5xl h-[90vh] bg-white rounded-xl shadow-2xl overflow-hidden flex flex-col border border-gray-200">
        {/* Content - Two Column Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Templates & Spreadsheets Library */}
          <div className="w-[30%] border-r border-gray-200 flex flex-col overflow-hidden">
            {/* Library Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <h3 className="font-semibold text-gray-800">Library</h3>
            <p className="text-xs text-gray-500 mt-1">Drag items to the chat to build your lesson plan</p>
          </div>

          {/* Scrollable Library Content */}
          <div
            className="overflow-y-auto p-4 space-y-6 flex-1"
            style={{
              scrollbarWidth: 'thin',
              scrollbarColor: '#d1d5db #f3f4f6'
            }}
          >
              {/* Templates Section */}
              <div>
                <div className="flex items-center mb-3">
                  <svg className="w-4 h-4 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-800">Templates</h4>
                </div>
                <div className="space-y-2">
                  {templates.map(template => (
                    <div
                      key={template.id}
                      className={`template-card bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all group select-none ${selectedTemplate?.id === template.id ? 'ring-2 ring-gray-400' : ''}`}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, template, 'template')}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center mr-2">
                            <span className="text-white text-xs">{template.emoji}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">{template.name}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spreadsheets Section */}
              <div>
                <div className="flex items-center mb-3">
                  <svg className="w-4 h-4 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                  </svg>
                  <h4 className="text-sm font-semibold text-gray-800">Content Spreadsheets</h4>
                </div>
                <div className="space-y-2">
                  {spreadsheets.map(spreadsheet => (
                    <div
                      key={spreadsheet.id}
                      className={`template-card bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all group select-none ${selectedSpreadsheet?.id === spreadsheet.id ? 'ring-2 ring-gray-400' : ''}`}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, spreadsheet, 'spreadsheet')}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center">
                          <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center mr-2">
                            <span className="text-white text-xs">{spreadsheet.emoji}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">{spreadsheet.name}</span>
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">{spreadsheet.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        {/* Right Side - Chat Interface */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 p-6 overflow-y-auto space-y-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth' }}
          >
            {/* Chat Messages */}
            {chatMessages.map((message, index) => (
              <div key={index} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 max-w-xl">
                  <p className="text-sm text-gray-800">{message.content}</p>
                </div>
              </div>
            ))}

            {/* Loading Animation during generation */}
            {isGenerating && (
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-white animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 max-w-xl">
                  <div className="flex items-center space-x-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                      <div className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                    </div>
                    <span className="text-sm text-gray-600">Processing...</span>
                  </div>
                </div>
              </div>
            )}

            {/* Drop Zone */}
            {!(selectedTemplate && selectedSpreadsheet) && (
              <div className="flex justify-center my-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 w-full max-w-md text-center transition-all ${
                    isDragOver
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <svg className={`mx-auto h-8 w-8 mb-2 transition-colors ${isDragOver ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className={`text-sm transition-colors ${isDragOver ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
                    {isDragOver ? 'Release to add item' : 'Drop templates or spreadsheets here'}
                  </p>
                  <p className={`text-xs transition-colors ${isDragOver ? 'text-purple-500' : 'text-gray-400'}`}>
                    {isDragOver ? 'Adding to your lesson plan...' : 'Start by adding at least one template'}
                  </p>
                </div>
              </div>
            )}

            {/* Selected Items Display */}
            {(selectedTemplate || selectedSpreadsheet) && (
              <div className="space-y-3">
                {selectedTemplate && (
                  <div className={`border-2 rounded-lg p-3 mb-2 flex items-center justify-between transition-all ${
                    isValidated
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center flex-1">
                      <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center mr-2">
                        <span className="text-white text-xs">{selectedTemplate.emoji}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800">Template: {selectedTemplate.name}</span>
                        {isValidated && <p className="text-xs text-green-600 font-medium">✓ Validated</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTemplate(null);
                        setIsValidated(false);
                        setShowValidationSuggestions(false);
                        setChatMessages([{
                          type: 'ai',
                          content: 'Welcome! Drag templates and spreadsheets from the left panel to build your lesson plan.'
                        }]);
                      }}
                      className="text-xs px-2 py-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    >
                      Change
                    </button>
                  </div>
                )}

                {selectedSpreadsheet && (
                  <div className={`border-2 rounded-lg p-3 mb-2 flex items-center justify-between transition-all ${
                    isValidated
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center flex-1">
                      <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center mr-2">
                        <span className="text-white text-xs">{selectedSpreadsheet.emoji}</span>
                      </div>
                      <div>
                        <span className="text-sm font-medium text-gray-800">Content: {selectedSpreadsheet.name}</span>
                        {isValidated && <p className="text-xs text-green-600 font-medium">✓ Validated</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSpreadsheet(null);
                        setIsValidated(false);
                        setShowValidationSuggestions(false);
                        setChatMessages([{
                          type: 'ai',
                          content: 'Welcome! Drag templates and spreadsheets from the left panel to build your lesson plan.'
                        }]);
                      }}
                      className="text-xs px-2 py-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                    >
                      Change
                    </button>
                  </div>
                )}

                {/* AI Suggestions */}
                {isValidated && showValidationSuggestions && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                    <div className="flex items-start gap-2">
                      <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <div className="flex-1">
                        <p className="text-xs font-semibold text-blue-900 mb-2">AI Suggestions for Correction:</p>
                        <ul className="space-y-1 text-xs text-blue-800">
                          {validationSuggestions.map((suggestion, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-blue-600">•</span>
                              <span>{suggestion}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Success State Display */}
            {generationComplete && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <svg className="w-6 h-6 text-green-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <div>
                    <h4 className="font-semibold text-green-800 mb-2">Lessons Generated Successfully!</h4>
                    <div className="space-y-2 mb-4">
                      <div className="bg-white border border-green-200 rounded p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-800">Mathematics Lesson Pack</span>
                            <p className="text-xs text-gray-500 mt-2">25 lessons • PDF Format • 2.4 MB</p>
                          </div>
                          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition-colors flex-shrink-0">Download</button>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTemplate(null);
                        setSelectedSpreadsheet(null);
                        setGenerationComplete(false);
                        setChatMessages([{
                          type: 'ai',
                          content: 'Welcome! Drag templates and spreadsheets from the left panel to build your lesson plan.'
                        }]);
                      }}
                      className="text-green-700 text-sm font-medium hover:underline"
                    >
                      Create Another Lesson
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Bottom Action Bar */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <label className="text-sm font-medium text-gray-700">Generate Lesson Plan</label>
              <div className="relative group">
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                  title="AI Generation Process"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-0 mb-2 w-48 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-50 hidden group-hover:block">
                  <p className="font-semibold mb-2">AI Generation Process:</p>
                  <ul className="space-y-1 text-gray-200">
                    <li>• Analyzing template structure</li>
                    <li>• Processing spreadsheet content</li>
                    <li>• Generating lessons 1-10</li>
                    <li>• Generating lessons 11-20</li>
                    <li>• Finalizing all 25 lessons</li>
                  </ul>
                  <p className="text-gray-300 mt-2">Usually takes 3-5 seconds</p>
                </div>
              </div>
            </div>
            <button
              disabled={!selectedTemplate || !selectedSpreadsheet || isGenerating}
              onClick={handleGenerate}
              className={`w-full py-2 px-4 rounded font-medium transition-all ${
                !selectedTemplate || !selectedSpreadsheet || isGenerating
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isGenerating ? 'Generating...' : 'Generate Lessons'}
            </button>
            <p className="text-xs text-gray-400 text-center mt-2">
              {selectedTemplate && selectedSpreadsheet ? 'Ready to generate!' : 'Add at least one template and one spreadsheet'}
            </p>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3 mt-4">
              <p className="text-xs text-yellow-800">
                <span className="font-semibold">AI-Generated Content:</span> All lessons are generated by AI and must be thoroughly reviewed and edited before moving forward in the review process. Verify accuracy, alignment with curriculum standards, and appropriateness for your audience.
              </p>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
