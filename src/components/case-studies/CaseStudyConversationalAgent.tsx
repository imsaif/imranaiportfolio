'use client';

import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import {
    ConversationContext,
    ConversationLimits,
    ConversationMessage,
    ConversationSession,
    getHybridAgent,
    HybridConversationalAgent,
} from '../../services/hybridConversationalAgent';

interface CaseStudyConversationalAgentProps {
  caseStudyId: string;
  caseStudyTitle: string;
  isVisible: boolean;
  onClose: () => void;
  className?: string;
  limits?: Partial<ConversationLimits>;
}

type AgentState = 'idle' | 'listening' | 'processing' | 'speaking' | 'error';

const CaseStudyConversationalAgent: React.FC<CaseStudyConversationalAgentProps> = ({
  caseStudyId,
  caseStudyTitle,
  isVisible,
  onClose,
  className = '',
  limits = {},
}) => {
  const [currentSession, setCurrentSession] = useState<ConversationSession | null>(null);
  const [messages, setMessages] = useState<ConversationMessage[]>([]);
  const [agentState, setAgentState] = useState<AgentState>('idle');
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [sessionStatus, setSessionStatus] = useState<any>(null);
  const [userContext, setUserContext] = useState<Partial<ConversationContext>>({});
  const [errorMessage, setErrorMessage] = useState<string>('');

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hybridAgent = getHybridAgent();

  // Check browser support on mount
  useEffect(() => {
    setIsSupported(HybridConversationalAgent.isSupported());
  }, []);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Initialize session when component becomes visible
  useEffect(() => {
    if (isVisible && isSupported && !currentSession) {
      initializeSession();
    }

    return () => {
      if (currentSession) {
        hybridAgent.endSession();
      }
    };
  }, [isVisible, isSupported]);

  // Update session status periodically
  useEffect(() => {
    if (!currentSession) return;

    const interval = setInterval(() => {
      const status = hybridAgent.getSessionStatus();
      setSessionStatus(status);
    }, 1000);

    return () => clearInterval(interval);
  }, [currentSession]);

  const initializeSession = async () => {
    try {
      setAgentState('processing');

      // Determine if user is first-time visitor (simple heuristic)
      const isFirstTimeVisitor = !localStorage.getItem(`visited_${caseStudyId}`);
      if (isFirstTimeVisitor) {
        localStorage.setItem(`visited_${caseStudyId}`, 'true');
      }

      const context: Partial<ConversationContext> = {
        caseStudyId,
        isFirstTimeVisitor,
        conversationDuration: 0,
        messageCount: 0,
        userEngagement: 0.5, // Default engagement
        ...userContext,
      };

      const session = await hybridAgent.startSession(caseStudyId, context, limits);
      setCurrentSession(session);
      setMessages(session.messages);
      setAgentState('idle');
    } catch (error) {
      console.error('Failed to initialize session:', error);
      setErrorMessage('Failed to start conversation. Please try refreshing the page.');
      setAgentState('error');
    }
  };

  const handleStartListening = async () => {
    if (!currentSession) return;

    try {
      setAgentState('listening');
      setErrorMessage('');

      const response = await hybridAgent.listenAndRespond(userContext, limits);

      if (response) {
        // Update messages from session
        const history = hybridAgent.getConversationHistory();
        setMessages([...history]);

        // Update user engagement based on interaction
        setUserContext(prev => ({
          ...prev,
          userEngagement: Math.min((prev.userEngagement || 0.5) + 0.1, 1.0),
          messageCount: history.length,
        }));
      }

      setAgentState('idle');
    } catch (error) {
      console.error('Conversation error:', error);
      setErrorMessage('I had trouble understanding that. Please try again.');
      setAgentState('error');

      setTimeout(() => {
        setAgentState('idle');
        setErrorMessage('');
      }, 3000);
    }
  };

  const handleStopListening = () => {
    hybridAgent.stopListening();
    setAgentState('idle');
  };

  const handleStopSpeaking = () => {
    hybridAgent.stopSpeaking();
    setAgentState('idle');
  };

  const handleEndSession = () => {
    if (currentSession) {
      const completedSession = hybridAgent.endSession();
      setCurrentSession(null);
      setMessages([]);
      setAgentState('idle');
      console.log('Session completed:', completedSession);
    }
    onClose();
  };

  const getStateIcon = () => {
    switch (agentState) {
      case 'listening':
        return '🎤';
      case 'processing':
        return '🤔';
      case 'speaking':
        return '🗣️';
      case 'error':
        return '❌';
      default:
        return '💬';
    }
  };

  const getStateText = () => {
    switch (agentState) {
      case 'listening':
        return 'Listening to you...';
      case 'processing':
        return 'Thinking about your question...';
      case 'speaking':
        return 'Speaking...';
      case 'error':
        return errorMessage || 'Something went wrong';
      default:
        return 'Ready to chat about this case study!';
    }
  };

  const getStateBgColor = () => {
    switch (agentState) {
      case 'listening':
        return 'bg-blue-500';
      case 'processing':
        return 'bg-yellow-500';
      case 'speaking':
        return 'bg-green-500';
      case 'error':
        return 'bg-red-500';
      default:
        return 'bg-purple-500';
    }
  };

  if (!isVisible) return null;

  if (!isSupported) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        className={`fixed inset-4 md:inset-8 bg-white rounded-xl shadow-2xl z-50 flex items-center justify-center ${className}`}
      >
        <div className="text-center p-8">
          <div className="text-6xl mb-4">🚫</div>
          <h3 className="text-xl font-semibold mb-2">Voice Chat Not Supported</h3>
          <p className="text-gray-600 mb-4">
            Your browser doesn't support voice recognition. Please try using Chrome or Safari.
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        className={`fixed inset-4 md:inset-8 bg-white rounded-xl shadow-2xl z-50 flex flex-col ${className}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b">
          <div>
            <h2 className="text-xl font-semibold text-gray-800">Chat about: {caseStudyTitle}</h2>
            <p className="text-sm text-gray-600">
              {sessionStatus && (
                <>
                  Cost: ${sessionStatus.totalCost.toFixed(4)} | Premium: {sessionStatus.premiumMinutesUsed.toFixed(1)}
                  min | Duration: {sessionStatus.duration.toFixed(1)}min
                </>
              )}
            </p>
          </div>
          <button onClick={handleEndSession} className="text-gray-500 hover:text-gray-700 transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {messages.map(message => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-blue-500 text-white'
                    : message.usedPremiumVoice
                      ? 'bg-purple-100 text-purple-900 border-2 border-purple-300'
                      : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                {message.sender === 'assistant' && (
                  <div className="flex items-center justify-between mt-1 text-xs opacity-75">
                    <span>{message.usedPremiumVoice ? "🎤 Imran's Voice" : '🔊 Browser Voice'}</span>
                    {message.cost && message.cost > 0 && <span>${message.cost.toFixed(4)}</span>}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        {/* Status Indicator */}
        <div className="px-6 py-3 bg-gray-50 border-t">
          <div className="flex items-center space-x-3">
            <div
              className={`w-3 h-3 rounded-full ${getStateBgColor()} ${
                agentState === 'listening' || agentState === 'speaking' ? 'animate-pulse' : ''
              }`}
            />
            <span className="text-sm text-gray-700">
              {getStateIcon()} {getStateText()}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="p-6 border-t bg-gray-50">
          <div className="flex items-center justify-center space-x-4">
            {agentState === 'idle' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStartListening}
                className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
                  />
                </svg>
                <span>Ask a Question</span>
              </motion.button>
            )}

            {agentState === 'listening' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStopListening}
                className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center space-x-2"
              >
                <div className="w-4 h-4 bg-white rounded-sm" />
                <span>Stop Listening</span>
              </motion.button>
            )}

            {agentState === 'speaking' && (
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleStopSpeaking}
                className="px-6 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-colors flex items-center space-x-2"
              >
                <div className="w-4 h-4 bg-white rounded-sm" />
                <span>Stop Speaking</span>
              </motion.button>
            )}
          </div>

          {/* Usage Indicator */}
          {sessionStatus && limits.maxPremiumMinutes && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-600 mb-1">
                <span>Premium Voice Usage</span>
                <span>
                  {sessionStatus.premiumMinutesUsed.toFixed(1)}/{limits.maxPremiumMinutes} min
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.min((sessionStatus.premiumMinutesUsed / limits.maxPremiumMinutes) * 100, 100)}%`,
                  }}
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                After premium limit, conversation continues with free browser voice
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default CaseStudyConversationalAgent;
