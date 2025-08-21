'use client';

import { useEffect, useState } from 'react';

import { Message } from '../../types/chat';
import { generateResponse, initialMessages } from '../../utils';
import Button from './Button';
import ChatInput from './chat/ChatInput';
import ChatMessageList from './chat/ChatMessageList';
import ChatSuggestions from './chat/ChatSuggestions';

// Case study data for easy maintenance
const caseStudies = [
  {
    id: 'lessonloom',
    title: 'LessonLoom',
    description:
      'An innovative platform that automates the creation of educational materials using AI and templating systems. Increased student engagement by 35% and reduced lesson planning time by 40%.',
    url: '/casestudy/lessonloom',
  },
  {
    id: 'eduscheduler',
    title: 'EduScheduler',
    description:
      'An intelligent academic planning system that generates optimized teaching schedules. Reduced scheduling time by 60% and improved meeting attendance by 25%.',
    url: '/casestudy/scheduler',
  },
];

interface ChatInterfaceProps {
  closeChat?: (e?: React.MouseEvent) => void;
}

const ChatInterface = ({}: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showCaseStudyButtons, setShowCaseStudyButtons] = useState(false);

  // Define suggested questions that focus on case studies
  const localSuggestedQuestions = [
    'Can you walk me through your case studies?',
    'What are his most interesting projects?',
  ];

  // Initialize with welcome messages
  useEffect(() => {
    // Add initial messages with a short delay for smooth appearance
    const timer = setTimeout(() => {
      setMessages(initialMessages);
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  // Handle sending a new message
  const handleSendMessage = async (text: string) => {
    if (!text.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      sender: 'user',
      timestamp: new Date(),
    };

    // Hide suggestions after first user message
    setShowSuggestions(false);

    // Check if message is asking about case studies or projects
    const lowerCaseText = text.toLowerCase();
    const askingAboutCaseStudies =
      lowerCaseText.includes('case stud') ||
      lowerCaseText.includes('projects') ||
      lowerCaseText.includes('interesting project') ||
      lowerCaseText.includes('portfolio');

    // Update messages with user's message
    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    // Get current messages for context
    const currentMessages = [...messages, userMessage];

    try {
      // Get response from the AI (now async)
      const responseText = await generateResponse(text, currentMessages);

      // Create bot message with response
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'bot',
        timestamp: new Date(),
      };

      // Add bot message to chat
      setMessages(prev => [...prev, botMessage]);

      // Show case study buttons if the question was about case studies
      if (askingAboutCaseStudies) {
        setShowCaseStudyButtons(true);
      } else {
        setShowCaseStudyButtons(false);
      }
    } catch (error) {
      console.error('Error generating response:', error);

      // Add error message if response generation fails
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm having trouble connecting right now. Could you try again?",
        sender: 'bot',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  // Handle suggestion click
  const handleSuggestionSelect = (question: string) => {
    handleSendMessage(question);
  };

  // Handle case study button click
  const handleCaseStudySelect = (caseStudyId: string) => {
    // Find the selected case study
    const caseStudy = caseStudies.find(cs => cs.id === caseStudyId);
    if (!caseStudy) return;

    // Add a message indicating the user is viewing a case study
    const userMessage: Message = {
      id: Date.now().toString(),
      text: `I want to see the ${caseStudy.title} case study`,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);

    // Navigate to the case study URL
    window.location.href = caseStudy.url;
  };

  // Case study buttons component
  const CaseStudyButtons = () => (
    <div className="mb-4 mt-3">
      <div className="flex flex-wrap gap-3">
        {caseStudies.map(caseStudy => (
          <Button
            key={caseStudy.id}
            variant="secondary"
            className="text-sm py-2.5 px-4"
            onClick={() => handleCaseStudySelect(caseStudy.id)}
          >
            View {caseStudy.title}
          </Button>
        ))}
      </div>
    </div>
  );

  return (
    <div
      className="flex flex-col h-full w-full relative bg-gradient-to-br from-white/70 to-white/40 backdrop-blur-md rounded-lg sm:rounded-xl"
      style={{
        background: 'linear-gradient(145deg, rgba(244, 244, 255, 0.3) 0%, rgba(250, 250, 255, 0.2) 100%)',
        backdropFilter: 'blur(8px)',
        willChange: 'transform', // Optimize for GPU rendering
        borderRadius: '6px',
      }}
    >
      {/* Messages container with stable dimensions */}
      <div className="flex-1 overflow-hidden min-h-0 px-2 sm:px-4 py-1 sm:py-2">
        {' '}
        {/* minHeight prevents flex container issues */}
        <ChatMessageList messages={messages} isTyping={isTyping} />
      </div>

      {/* Message input with stable height and subtle gradient */}
      <div
        className="mt-auto px-2 sm:px-4 py-3 sm:py-4 border-t border-white/20 backdrop-blur-sm bg-gradient-to-t from-white/70 to-white/40 sticky bottom-0 z-20"
        style={{
          flexShrink: 0,
        }}
      >
        {showCaseStudyButtons && <CaseStudyButtons />}

        {showSuggestions && messages.length <= 2 && (
          <div className="hidden sm:block">
            <ChatSuggestions suggestions={localSuggestedQuestions} onSelect={handleSuggestionSelect} />
          </div>
        )}
        <ChatInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
