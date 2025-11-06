'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MdAutoAwesome, MdArrowBack, MdThumbUp, MdThumbDown, MdSettings, MdError, MdWarning, MdInfo } from 'react-icons/md';

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
      content: 'Hi! Let\'s create lessons together. Start by uploading a template and spreadsheet using the + Upload buttons on the left, then drag them here to get started.'
    }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationComplete, setGenerationComplete] = useState(false);
  const [generationStage, setGenerationStage] = useState(0);
  const [lessonsGenerated, setLessonsGenerated] = useState(0);
  const [isValidated, setIsValidated] = useState(false);
  const [showValidationSuggestions, setShowValidationSuggestions] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [validationMessageAdded, setValidationMessageAdded] = useState(false);

  // Upload State
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadType, setUploadType] = useState(null); // 'template' or 'spreadsheet'
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadedTemplates, setUploadedTemplates] = useState([]);
  const [uploadedSpreadsheets, setUploadedSpreadsheets] = useState([]);

  // Collapse State
  const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(false);

  // Feedback State
  const [generationFeedback, setGenerationFeedback] = useState(null); // 'thumbsup' | 'thumbsdown' | null

  // Error Simulation State (Demo/Testing)
  const [showErrorSettings, setShowErrorSettings] = useState(false);
  const [errorSimulation, setErrorSimulation] = useState({
    fileValidation: false,
    compatibility: false,
    contentQuality: false,
    generationFailure: false
  });

  // Refs for scrolling
  const chatContainerRef = useRef(null);

  // Validation suggestions
  const [validationSuggestions] = useState([
    'Consider using a more advanced template to unlock additional formatting options',
    'The Q1 Math Content spreadsheet includes diverse learning styles - great choice for inclusivity!'
  ]);

  // Sample data - empty by default
  const templates = [];
  const spreadsheets = [];

  // Auto-scroll chat to bottom when new messages are added
  useEffect(() => {
    if (chatContainerRef.current) {
      setTimeout(() => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }, 0);
    }
  }, [chatMessages, isGenerating, generationComplete]);

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
        setValidationMessageAdded(true);
        setChatMessages(prev => [...prev,
          {
            type: 'validation',
            template: item,
            spreadsheet: selectedSpreadsheet
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
        setValidationMessageAdded(true);
        setChatMessages(prev => [...prev,
          {
            type: 'validation',
            template: selectedTemplate,
            spreadsheet: item
          }
        ]);
      }
    }
  };

  const handleOpenUploadModal = (type) => {
    setUploadType(type);
    setIsUploadModalOpen(true);
    setUploadProgress(0);
  };

  const handleUploadFile = (fileName) => {
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const progressInterval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 40;
      });
    }, 100);

    // Simulate upload completion
    setTimeout(() => {
      setIsUploading(false);
      setUploadProgress(100);

      // Check for file validation error simulation
      if (errorSimulation.fileValidation) {
        const validationErrors = [
          'Unsupported file format detected. Expected .docx for templates, .xlsx for spreadsheets.',
          'File size exceeds 10MB limit. Please upload a smaller file.',
          'File appears corrupted or unreadable. Please try re-exporting from your source application.'
        ];
        const randomError = validationErrors[Math.floor(Math.random() * validationErrors.length)];

        setChatMessages(prev => [...prev, {
          type: 'error',
          content: randomError,
          action: 'retry'
        }]);

        // Close modal
        setTimeout(() => {
          setIsUploadModalOpen(false);
          setUploadType(null);
        }, 500);
        return;
      }

      // Add uploaded file (success path)
      if (uploadType === 'template') {
        const newTemplate = {
          id: Date.now(),
          name: fileName,
          emoji: '📋',
          description: 'Custom uploaded template',
          isUploaded: true
        };
        setUploadedTemplates(prev => [...prev, newTemplate]);
        setChatMessages(prev => [...prev, {
          type: 'ai',
          content: `✓ Template "${fileName}" uploaded successfully! Now upload a content spreadsheet to get started with lesson generation.`
        }]);
      } else if (uploadType === 'spreadsheet') {
        const newSpreadsheet = {
          id: Date.now(),
          name: fileName,
          emoji: '📈',
          description: 'Custom uploaded spreadsheet',
          isUploaded: true
        };
        setUploadedSpreadsheets(prev => [...prev, newSpreadsheet]);
        setChatMessages(prev => [...prev, {
          type: 'ai',
          content: `✓ Spreadsheet "${fileName}" uploaded successfully! Now upload a lesson template to complete your setup.`
        }]);
      }

      // Close modal
      setTimeout(() => {
        setIsUploadModalOpen(false);
        setUploadType(null);
      }, 500);
    }, 2000);
  };

  const handleGenerate = () => {
    // Check for compatibility error
    if (errorSimulation.compatibility) {
      const compatibilityErrors = [
        'Template variables don\'t match spreadsheet columns. Found variables: [{{lesson_name}}, {{duration}}, {{objectives}}] but spreadsheet has columns: [Title, Duration, Learning Goals, Assessment]',
        'Missing required fields detected. Template expects "learning_outcomes" but spreadsheet column is labeled "LearningOutcomes"',
        'Compatibility issue detected: Template has 12 placeholders but spreadsheet only provides 8 column headers. Please ensure all template variables have corresponding data.'
      ];
      const randomError = compatibilityErrors[Math.floor(Math.random() * compatibilityErrors.length)];

      setChatMessages(prev => [...prev, {
        type: 'warning',
        content: randomError,
        action: 'selectDifferent'
      }]);
      return;
    }

    // Check for content quality warning (non-blocking)
    if (errorSimulation.contentQuality) {
      const qualityWarnings = [
        'Low data quality detected in 23 spreadsheet rows: Some cells contain placeholder text like "TBD", "TODO", or "Update Later". These rows may produce less polished lessons.',
        'Inconsistent formatting detected across columns. Some entries use different date formats (MM/DD/YYYY vs DD-MM-YYYY). This may affect generation quality.',
        'Missing data in 15 rows: Several rows have empty cells in key columns. Generation will proceed but some lessons may have incomplete information.'
      ];
      const randomWarning = qualityWarnings[Math.floor(Math.random() * qualityWarnings.length)];

      setChatMessages(prev => [...prev, {
        type: 'quality-warning',
        content: randomWarning
      }]);
    }

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

    // Complete (7200ms) or Failure
    setTimeout(() => {
      // Check for generation failure simulation
      if (errorSimulation.generationFailure) {
        const generationErrors = [
          'Generation service timeout after processing stage 3. Please retry or check your spreadsheet for unusually large files.',
          'AI processing error: Maximum token limit exceeded. Try reducing the number of rows in your spreadsheet and retry.',
          'Network connection lost during generation. Your progress was not saved. Please try again.'
        ];
        const randomError = generationErrors[Math.floor(Math.random() * generationErrors.length)];

        setIsGenerating(false);
        setGenerationStage(0);
        setChatMessages(prev => [...prev.slice(0, -1),
          {
            type: 'error',
            content: randomError,
            action: 'retry'
          }
        ]);
        return;
      }

      setIsGenerating(false);
      setGenerationComplete(true);
      setGenerationStage(0);
      setLessonsGenerated(0);
      setChatMessages(prev => [...prev,
        {
          type: 'success'
        }
      ]);
    }, 7200);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4">
      {/* Back Button - Outside the prototype */}
      <div className="w-full max-w-full mb-6 flex justify-start px-6">
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
      <div className="w-full max-w-7xl h-[90vh] bg-white rounded-xl shadow-2xl flex flex-col border border-gray-200 mx-auto relative"
           style={{ overflow: 'visible' }}>
        {/* Content - Two Column Layout */}
        <div className="flex flex-1 overflow-hidden">
          {/* Left Sidebar - Templates & Spreadsheets Library */}
          <div className="w-[30%] border-r border-gray-200 flex flex-col overflow-hidden">
            {/* Library Header */}
            <div className="p-4 border-b border-gray-200 flex-shrink-0">
            <h3 className="font-semibold text-gray-800 text-base">Library</h3>
            <p className="text-sm text-gray-500 mt-1">Drag items to the chat to build your lesson plan</p>
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
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <h4 className="text-sm font-semibold text-gray-800">Templates</h4>
                  </div>
                  <button
                    onClick={() => handleOpenUploadModal('template')}
                    className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors font-medium"
                    title="Upload new template"
                  >
                    + Upload
                  </button>
                </div>
                <div className="space-y-2">
                  {[...templates, ...uploadedTemplates].map(template => (
                    <div
                      key={template.id}
                      className={`template-card bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all group select-none ${selectedTemplate?.id === template.id ? 'ring-2 ring-gray-400' : ''}`}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, template, 'template')}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">{template.emoji}</span>
                          </div>
                          <span className="text-base font-medium text-gray-800">{template.name}</span>
                          {template.isUploaded && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Uploaded</span>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                      <p className="text-sm text-gray-600">{template.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Spreadsheets Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                    </svg>
                    <h4 className="text-sm font-semibold text-gray-800">Content Spreadsheets</h4>
                  </div>
                  <button
                    onClick={() => handleOpenUploadModal('spreadsheet')}
                    className="text-sm px-3 py-1.5 bg-indigo-50 text-indigo-600 rounded hover:bg-indigo-100 transition-colors font-medium"
                    title="Upload new spreadsheet"
                  >
                    + Upload
                  </button>
                </div>
                <div className="space-y-2">
                  {[...spreadsheets, ...uploadedSpreadsheets].map(spreadsheet => (
                    <div
                      key={spreadsheet.id}
                      className={`template-card bg-white border border-gray-200 rounded-lg p-3 cursor-move hover:shadow-md transition-all group select-none ${selectedSpreadsheet?.id === spreadsheet.id ? 'ring-2 ring-gray-400' : ''}`}
                      draggable="true"
                      onDragStart={(e) => handleDragStart(e, spreadsheet, 'spreadsheet')}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2 flex-1">
                          <div className="w-6 h-6 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                            <span className="text-white text-xs">{spreadsheet.emoji}</span>
                          </div>
                          <span className="text-sm font-medium text-gray-800">{spreadsheet.name}</span>
                          {spreadsheet.isUploaded && (
                            <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">Uploaded</span>
                          )}
                        </div>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-gray-600 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                        </svg>
                      </div>
                      <p className="text-xs text-gray-600">{spreadsheet.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects Section */}
              <div>
                <button
                  onClick={() => setIsProjectsExpanded(!isProjectsExpanded)}
                  className="w-full flex items-center justify-between mb-3 group"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                    </svg>
                    <h4 className="text-sm font-semibold text-gray-800">Projects</h4>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isProjectsExpanded ? 'rotate-0' : '-rotate-90'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {isProjectsExpanded && (
                  <div className="space-y-2">
                    {[
                      { id: 1, name: 'AP Biology 2024', lessons: 48, date: 'Nov 2024' },
                      { id: 2, name: 'Algebra I - Fall', lessons: 32, date: 'Oct 2024' },
                      { id: 3, name: 'US History Module', lessons: 25, date: 'Sep 2024' }
                    ].map(project => (
                      <div
                        key={project.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all group cursor-pointer"
                      >
                        <div className="flex items-start gap-2">
                          <svg className="w-4 h-4 text-gray-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
                          </svg>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-800 truncate">{project.name}</p>
                            <p className="text-xs text-gray-500">{project.lessons} lessons • {project.date}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Generation History Section */}
              <div>
                <button
                  onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
                  className="w-full flex items-center justify-between mb-3 group"
                >
                  <div className="flex items-center">
                    <svg className="w-4 h-4 text-gray-800 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <h4 className="text-sm font-semibold text-gray-800">History</h4>
                  </div>
                  <svg
                    className={`w-4 h-4 text-gray-600 transition-transform duration-200 ${isHistoryExpanded ? 'rotate-0' : '-rotate-90'}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
                {isHistoryExpanded && (
                  <div className="space-y-2">
                    {[
                      { id: 1, template: 'Standard Lesson', spreadsheet: 'Q1 Math', lessons: 25, date: 'Today' },
                      { id: 2, template: 'Interactive Module', spreadsheet: 'Science Topics', lessons: 20, date: 'Yesterday' },
                      { id: 3, template: 'Standard Lesson', spreadsheet: 'Q1 Math', lessons: 15, date: '2 days ago' }
                    ].map(item => (
                      <div
                        key={item.id}
                        className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-all group cursor-pointer"
                      >
                        <p className="text-xs font-medium text-gray-800 truncate">{item.template}</p>
                        <p className="text-xs text-gray-500 truncate">{item.spreadsheet}</p>
                        <div className="flex items-center justify-between mt-2">
                          <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded font-medium">{item.lessons} lessons</span>
                          <span className="text-xs text-gray-400">{item.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

        {/* Right Side - Chat Interface */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Chat Messages Area */}
          <div
            ref={chatContainerRef}
            className="flex-1 min-h-0 p-6 overflow-y-scroll space-y-4 scroll-smooth"
            style={{ scrollBehavior: 'smooth', scrollbarGutter: 'stable' }}
          >
            {/* Chat Messages */}
            {chatMessages.map((message, index) => {
              // Regular AI message
              if (message.type === 'ai') {
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4 max-w-2xl">
                      <p className="text-base text-gray-800">{message.content}</p>
                    </div>
                  </div>
                );
              }

              // Validation message
              if (message.type === 'validation') {
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-3 max-w-2xl">
                      {/* Validation Checks */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-green-900 mb-3">AI Validation Complete</p>
                            <div className="space-y-2 text-xs text-green-800">
                              <div className="flex items-start gap-2">
                                <span className="text-green-600 font-bold mt-0.5">✓</span>
                                <div>
                                  <p className="font-medium">File Format Validation</p>
                                  <p className="text-green-700">{message.template?.isUploaded ? 'Custom' : message.template?.name} is valid .docx template • {message.spreadsheet?.isUploaded ? 'Custom' : message.spreadsheet?.name} is valid .xlsx spreadsheet</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-green-600 font-bold mt-0.5">✓</span>
                                <div>
                                  <p className="font-medium">Content Structure Analysis</p>
                                  <p className="text-green-700">Template has 12 variable placeholders • Spreadsheet contains 487 rows of structured data across 6 columns</p>
                                </div>
                              </div>
                              <div className="flex items-start gap-2">
                                <span className="text-green-600 font-bold mt-0.5">✓</span>
                                <div>
                                  <p className="font-medium">Compatibility Checking</p>
                                  <p className="text-green-700">All template variables match spreadsheet column headers • Perfect alignment detected</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Suggestions */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                        <div className="flex items-start gap-2">
                          <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div className="flex-1">
                            <p className="text-xs font-semibold text-blue-900 mb-2">Suggestions for Optimization:</p>
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
                    </div>
                  </div>
                );
              }

              // Error message
              if (message.type === 'error') {
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-3 max-w-2xl w-full">
                      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <MdError className="w-5 h-5 text-red-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-red-900 text-sm mb-2">Error</p>
                            <p className="text-sm text-red-800">{message.content}</p>
                            {message.action === 'retry' && (
                              <div className="mt-3 flex flex-col gap-2">
                                <button
                                  onClick={() => {
                                    // For upload errors, reopen the modal
                                    if (message.content.includes('file') || message.content.includes('File')) {
                                      setIsUploadModalOpen(true);
                                    }
                                    // For generation errors, clear the error
                                    else {
                                      setChatMessages(prev => prev.filter((_, i) => i !== index));
                                    }
                                  }}
                                  className="text-red-700 hover:text-red-800 text-sm font-medium underline text-left"
                                >
                                  Try Again →
                                </button>
                                {/* For generation errors, also show Start New Generation */}
                                {!message.content.includes('file') && !message.content.includes('File') && (
                                  <button
                                    onClick={() => {
                                      setSelectedTemplate(null);
                                      setSelectedSpreadsheet(null);
                                      setGenerationComplete(false);
                                      setIsValidated(false);
                                      setShowValidationSuggestions(false);
                                      setValidationMessageAdded(false);
                                      setGenerationFeedback(null);
                                      setChatMessages([{
                                        type: 'ai',
                                        content: 'Hi! Let\'s create lessons together. Start by uploading a template and spreadsheet using the + Upload buttons on the left, then drag them here to get started.'
                                      }]);
                                    }}
                                    className="text-red-700 hover:text-red-800 text-sm font-medium underline text-left"
                                  >
                                    Start New Generation →
                                  </button>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Warning message (Compatibility)
              if (message.type === 'warning') {
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-3 max-w-2xl w-full">
                      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <MdWarning className="w-5 h-5 text-orange-600 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-orange-900 text-sm mb-2">Compatibility Warning</p>
                            <p className="text-sm text-orange-800">{message.content}</p>
                            <p className="text-xs text-orange-700 mt-3 font-medium">Please select compatible files and try again.</p>
                            <button
                              onClick={() => {
                                setSelectedTemplate(null);
                                setSelectedSpreadsheet(null);
                                setGenerationComplete(false);
                                setIsValidated(false);
                                setShowValidationSuggestions(false);
                                setValidationMessageAdded(false);
                                setGenerationFeedback(null);
                                setChatMessages([{
                                  type: 'ai',
                                  content: 'Hi! Let\'s create lessons together. Start by uploading a template and spreadsheet using the + Upload buttons on the left, then drag them here to get started.'
                                }]);
                              }}
                              className="mt-3 text-orange-700 hover:text-orange-800 text-sm font-medium underline block"
                            >
                              Start New Generation →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Quality Warning message
              if (message.type === 'quality-warning') {
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-3 max-w-2xl w-full">
                      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <MdInfo className="w-5 h-5 text-yellow-700 mt-0.5 flex-shrink-0" />
                          <div className="flex-1">
                            <p className="font-semibold text-yellow-900 text-sm mb-2">Data Quality Notice</p>
                            <p className="text-sm text-yellow-800">{message.content}</p>
                            <p className="text-xs text-yellow-700 mt-3 font-medium">Generation will proceed, but review output carefully.</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Success message
              if (message.type === 'success') {
                return (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div className="space-y-3 max-w-2xl">
                      {/* Success Header */}
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <div className="flex items-start gap-3">
                          <svg className="w-6 h-6 text-green-600 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          <div>
                            <h4 className="font-semibold text-green-800 text-base">Lessons Generated Successfully!</h4>
                            <p className="text-sm text-green-700 mt-2">Your lesson pack is ready for download and review.</p>
                          </div>
                        </div>
                      </div>

                      {/* Lesson Pack Summary Card */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start gap-4">
                          <div className="flex-1">
                            <span className="text-base font-medium text-gray-800 block">Mathematics Lesson Pack</span>
                            <p className="text-sm text-gray-500 mt-2">25 lessons • PDF Format • 2.4 MB</p>
                          </div>
                          <button className="bg-green-600 text-white text-sm px-4 py-2 rounded hover:bg-green-700 transition-colors flex-shrink-0 font-medium">
                            Download
                          </button>
                        </div>
                      </div>

                      {/* Feedback Buttons */}
                      <div className="bg-white border border-gray-200 rounded-lg p-4">
                        <p className="text-sm text-gray-700 font-medium mb-3">How helpful was this generation?</p>
                        <div className="flex gap-2">
                          <button
                            onClick={() => setGenerationFeedback('thumbsup')}
                            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                              generationFeedback === 'thumbsup'
                                ? 'bg-green-100 border border-green-500 text-green-700'
                                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <MdThumbUp size={18} />
                            <span className="text-sm font-medium">Helpful</span>
                          </button>
                          <button
                            onClick={() => setGenerationFeedback('thumbsdown')}
                            className={`flex items-center gap-2 px-4 py-2 rounded transition-colors ${
                              generationFeedback === 'thumbsdown'
                                ? 'bg-red-100 border border-red-500 text-red-700'
                                : 'bg-gray-100 border border-gray-300 text-gray-700 hover:bg-gray-200'
                            }`}
                          >
                            <MdThumbDown size={18} />
                            <span className="text-sm font-medium">Not Helpful</span>
                          </button>
                        </div>
                      </div>

                      {/* Start New Generation Link */}
                      <button
                        onClick={() => {
                          setSelectedTemplate(null);
                          setSelectedSpreadsheet(null);
                          setGenerationComplete(false);
                          setIsValidated(false);
                          setShowValidationSuggestions(false);
                          setValidationMessageAdded(false);
                          setGenerationFeedback(null);
                          setChatMessages([{
                            type: 'ai',
                            content: 'Hi! Let\'s create lessons together. Start by uploading a template and spreadsheet using the + Upload buttons on the left, then drag them here to get started.'
                          }]);
                        }}
                        className="text-green-700 text-sm font-medium hover:underline"
                      >
                        Start New Generation →
                      </button>
                    </div>
                  </div>
                );
              }

              return null;
            })}

            {/* Generation Progress with Stages */}
            {isGenerating && (
              <div className="my-4 bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-200 rounded-lg p-4">
                <div className="mb-4">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    <h3 className="text-base font-semibold text-indigo-900">Generating Lessons</h3>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                    <div
                      className="bg-gradient-to-r from-indigo-500 to-purple-500 h-2.5 rounded-full transition-all duration-300"
                      style={{ width: `${(generationStage / 5) * 100}%` }}
                    ></div>
                  </div>

                  {/* Stage Indicators */}
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { num: 1, label: 'Analyzing' },
                      { num: 2, label: 'Processing' },
                      { num: 3, label: 'Batch 1' },
                      { num: 4, label: 'Batch 2' },
                      { num: 5, label: 'Finalizing' }
                    ].map(stage => (
                      <div
                        key={stage.num}
                        className={`text-center py-2 px-2 rounded-lg transition-all ${
                          generationStage >= stage.num
                            ? 'bg-indigo-600 text-white font-semibold'
                            : 'bg-white text-gray-500 border border-gray-200'
                        }`}
                      >
                        <div className="text-xs font-bold">{stage.num}</div>
                        <div className="text-xs">{stage.label}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Current Lesson Count */}
                {lessonsGenerated > 0 && (
                  <div className="text-center pt-2 border-t border-indigo-200">
                    <p className="text-base font-semibold text-indigo-900">
                      Lesson {lessonsGenerated} of 25 ✨
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Drop Zone */}
            {!(selectedTemplate && selectedSpreadsheet) && (
              <div className="flex justify-center mt-4">
                <div
                  className={`border-2 border-dashed rounded-lg p-6 w-full text-center transition-all ${
                    isDragOver
                      ? 'border-purple-500 bg-purple-50 scale-105'
                      : 'border-gray-300 hover:border-purple-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <svg className={`mx-auto h-6 w-6 mb-2 transition-colors ${isDragOver ? 'text-purple-600' : 'text-gray-400'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  <p className={`text-base transition-colors ${isDragOver ? 'text-purple-700 font-medium' : 'text-gray-600'}`}>
                    {isDragOver ? 'Release to add item' : 'Drop templates or spreadsheets here'}
                  </p>
                </div>
              </div>
            )}

            {/* Selected Items Display */}
            {(selectedTemplate || selectedSpreadsheet) && !generationComplete && (
              <div className="space-y-2 mt-3">
                {selectedTemplate && (
                  <div className={`border rounded-lg p-2 flex items-center justify-between transition-all ${
                    isValidated
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">{selectedTemplate.emoji}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-800 block truncate">Template: {selectedTemplate.name}</span>
                        {isValidated && <p className="text-xs text-green-600 font-medium">✓ Validated</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedTemplate(null);
                        setIsValidated(false);
                        setShowValidationSuggestions(false);
                        setValidationMessageAdded(false);
                        setChatMessages([{
                          type: 'ai',
                          content: 'Hi! Let\'s create lessons together. Start by uploading a template and spreadsheet using the + Upload buttons on the left, then drag them here to get started.'
                        }]);
                      }}
                      className="text-xs px-2 py-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors flex-shrink-0 ml-2"
                    >
                      Change
                    </button>
                  </div>
                )}

                {selectedSpreadsheet && (
                  <div className={`border rounded-lg p-2 flex items-center justify-between transition-all ${
                    isValidated
                      ? 'bg-green-50 border-green-300'
                      : 'bg-white border-gray-200'
                  }`}>
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <div className="w-5 h-5 bg-gray-800 rounded flex items-center justify-center flex-shrink-0">
                        <span className="text-white text-xs">{selectedSpreadsheet.emoji}</span>
                      </div>
                      <div className="min-w-0">
                        <span className="text-sm font-medium text-gray-800 block truncate">Content: {selectedSpreadsheet.name}</span>
                        {isValidated && <p className="text-xs text-green-600 font-medium">✓ Validated</p>}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        setSelectedSpreadsheet(null);
                        setIsValidated(false);
                        setShowValidationSuggestions(false);
                        setValidationMessageAdded(false);
                        setChatMessages([{
                          type: 'ai',
                          content: 'Hi! Let\'s create lessons together. Start by uploading a template and spreadsheet using the + Upload buttons on the left, then drag them here to get started.'
                        }]);
                      }}
                      className="text-xs px-2 py-1 text-indigo-600 hover:bg-indigo-50 rounded transition-colors flex-shrink-0 ml-2"
                    >
                      Change
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>


          {/* Bottom Action Bar */}
          <div className="border-t border-gray-200 p-4 bg-gray-50">
            <div className="flex items-center gap-2 mb-3">
              <label className="text-base font-medium text-gray-700">Generate Lesson Plan</label>
              {/* AI Disclaimer Tooltip */}
              <div className="relative group">
                <button
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                  type="button"
                  title="AI Disclaimer"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </button>
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-56 bg-gray-900 text-white text-xs rounded-lg p-3 shadow-lg z-50 hidden group-hover:block">
                  <p className="font-semibold mb-1">AI-Generated Content</p>
                  <p className="text-gray-200">All lessons are generated by AI and should be reviewed before use. Verify accuracy, alignment with curriculum standards, and appropriateness for your audience.</p>
                </div>
              </div>
            </div>
            <button
              disabled={!selectedTemplate || !selectedSpreadsheet || isGenerating || generationComplete}
              onClick={handleGenerate}
              className={`w-full py-3 px-4 rounded font-medium transition-all text-base ${
                !selectedTemplate || !selectedSpreadsheet || isGenerating || generationComplete
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-indigo-600 text-white hover:bg-indigo-700'
              }`}
            >
              {isGenerating ? 'Generating...' : generationComplete ? 'Generation Complete' : 'Generate Lessons'}
            </button>
            <p className="text-sm text-gray-400 text-center mt-2">
              {generationComplete ? 'Check the chat for your generated lessons' : selectedTemplate && selectedSpreadsheet ? 'Ready to generate!' : 'Add at least one template and one spreadsheet'}
            </p>
          </div>
        </div>
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-2xl max-w-md w-full mx-4">
            {/* Modal Header */}
            <div className="border-b border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">
                  Upload {uploadType === 'template' ? 'Template' : 'Spreadsheet'}
                </h2>
                <button
                  onClick={() => {
                    setIsUploadModalOpen(false);
                    setUploadType(null);
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-4">
              {!isUploading ? (
                <>
                  <p className="text-sm text-gray-600">
                    Select a {uploadType === 'template' ? '.docx template' : '.xlsx spreadsheet'} file to upload:
                  </p>
                  <div className="space-y-2">
                    {uploadType === 'template' ? (
                      <>
                        <button
                          onClick={() => handleUploadFile('Advanced Lesson Template.docx')}
                          className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Advanced Lesson Template.docx</p>
                              <p className="text-xs text-gray-500">2.4 MB</p>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => handleUploadFile('Interactive Module Template.docx')}
                          className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-red-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Interactive Module Template.docx</p>
                              <p className="text-xs text-gray-500">3.1 MB</p>
                            </div>
                          </div>
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleUploadFile('Q2 Advanced Math Content.xlsx')}
                          className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Q2 Advanced Math Content.xlsx</p>
                              <p className="text-xs text-gray-500">1.8 MB</p>
                            </div>
                          </div>
                        </button>
                        <button
                          onClick={() => handleUploadFile('Biology Lab Activities.xlsx')}
                          className="w-full text-left p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-green-500 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
                            </svg>
                            <div>
                              <p className="text-sm font-medium text-gray-800">Biology Lab Activities.xlsx</p>
                              <p className="text-xs text-gray-500">2.2 MB</p>
                            </div>
                          </div>
                        </button>
                      </>
                    )}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="inline-block">
                      <svg className="w-12 h-12 text-indigo-600 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                      </svg>
                    </div>
                    <p className="text-sm font-medium text-gray-800 mt-4">Uploading file...</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${uploadProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-center text-xs text-gray-500">{Math.round(uploadProgress)}% complete</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Settings Panel (Error Simulation - Demo Only) */}
      <div className="absolute bottom-4 right-4 z-40 pointer-events-auto">
        {/* Settings Button */}
        <button
          onClick={() => setShowErrorSettings(!showErrorSettings)}
          className="w-12 h-12 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center shadow-lg transition-all hover:scale-110"
          title="Error simulation settings (Demo only)"
        >
          <MdSettings size={24} />
        </button>

        {/* Settings Panel */}
        {showErrorSettings && (
          <div className="absolute bottom-16 right-0 w-72 bg-white rounded-lg shadow-2xl border border-gray-200 p-4 animate-in fade-in slide-in-from-bottom-2">
            <div className="mb-4">
              <p className="text-sm font-semibold text-gray-900 mb-4">Error Simulation (Demo Only)</p>
              <p className="text-xs text-gray-500 mb-4">Toggle error scenarios to see how the prototype handles different failure modes.</p>
            </div>

            <div className="space-y-3">
              {/* File Validation Error */}
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={errorSimulation.fileValidation}
                  onChange={(e) => setErrorSimulation(prev => ({
                    ...prev,
                    fileValidation: e.target.checked
                  }))}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">File Validation Error</p>
                  <p className="text-xs text-gray-500">Simulate file format/size errors on upload</p>
                </div>
              </label>

              {/* Compatibility Error */}
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={errorSimulation.compatibility}
                  onChange={(e) => setErrorSimulation(prev => ({
                    ...prev,
                    compatibility: e.target.checked
                  }))}
                  className="w-4 h-4 text-orange-600 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Compatibility Error</p>
                  <p className="text-xs text-gray-500">Template/spreadsheet mismatch warning</p>
                </div>
              </label>

              {/* Content Quality Warning */}
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={errorSimulation.contentQuality}
                  onChange={(e) => setErrorSimulation(prev => ({
                    ...prev,
                    contentQuality: e.target.checked
                  }))}
                  className="w-4 h-4 text-yellow-600 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Content Quality Warning</p>
                  <p className="text-xs text-gray-500">Data quality issues detected (non-blocking)</p>
                </div>
              </label>

              {/* Generation Failure */}
              <label className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors">
                <input
                  type="checkbox"
                  checked={errorSimulation.generationFailure}
                  onChange={(e) => setErrorSimulation(prev => ({
                    ...prev,
                    generationFailure: e.target.checked
                  }))}
                  className="w-4 h-4 text-red-600 rounded"
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-800">Generation Failure</p>
                  <p className="text-xs text-gray-500">Simulate generation service error</p>
                </div>
              </label>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                💡 Tip: Upload templates and spreadsheets first, then enable error scenarios and click "Generate Lessons" to see how errors are handled.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
