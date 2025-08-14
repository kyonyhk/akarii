'use client';

import { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import { SCENARIOS } from '../../prototype/data/scenarios';
import { useMessageSequencer } from '../../prototype/hooks/useMessageSequencer';
import { FileIcon, SpeechIcon, SendIcon } from '../../components/icons';

// Import prototype components
import AkariiMessage from '../../prototype/components/AkariiMessage';
import UserMessage from '../../prototype/components/UserMessage';
import ParticipantMessage from '../../prototype/components/ParticipantMessage';
import SystemMessage from '../../prototype/components/SystemMessage';
import TypingIndicator from '../../prototype/components/TypingIndicator';

interface ChatDemoContainerProps {
  scenarioIndex?: number;
  autoPlay?: boolean;
  isActive?: boolean; // New prop to control when this container is active
  className?: string;
  onComplete?: () => void;
  children?: React.ReactNode;
}

const ChatDemoContainer = forwardRef<HTMLDivElement, ChatDemoContainerProps>(
  (
    {
      scenarioIndex = 0,
      autoPlay = true,
      isActive = false,
      className = '',
      onComplete,
      children,
    },
    ref
  ) => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(
      scenarioIndex >= 0 && scenarioIndex < SCENARIOS.length ? scenarioIndex : 0
    );
    const [inputTypingContent, setInputTypingContent] = useState('');
    const [isSendButtonAnimating, setIsSendButtonAnimating] = useState(false);


    const scenario = SCENARIOS[currentScenarioIndex];

    // Safety check - if no scenario is found, don't render
    if (!scenario) {
      console.error('❌ Scenario not found:', {
        currentScenarioIndex,
        scenariosLength: SCENARIOS.length,
        availableScenarios: SCENARIOS.map((s) => ({ id: s.id, name: s.name })),
      });
      return (
        <div className="flex items-center justify-center w-full h-full text-white/50">
          Loading scenario...
        </div>
      );
    }

    // Get the current user name based on scenario
    const getCurrentUserName = (scenarioId: number) => {
      switch (scenarioId) {
        case 0:
          return 'Sarah';
        case 1:
          return 'Marcus';
        case 2:
          return 'Elena';
        case 3:
          return 'David';
        case 4:
          return 'Mike Krieger';
        case 5:
          return 'Kevin Weil';
        case 6:
          return 'Alex';
        case 7:
          return 'Priya';
        case 8:
          return 'Harper';
        default:
          return 'Sarah';
      }
    };

    // Handle input typing animation
    const inputTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const lastInputMessageIdRef = useRef<string | null>(null);
    const isInputTypingActiveRef = useRef(false);

    const startInputTyping = useCallback(
      (content: string, messageId: string) => {
        if (
          isInputTypingActiveRef.current ||
          lastInputMessageIdRef.current === messageId
        ) {
          return;
        }

        isInputTypingActiveRef.current = true;
        lastInputMessageIdRef.current = messageId;

        if (inputTypingTimeoutRef.current) {
          clearTimeout(inputTypingTimeoutRef.current);
        }

        let currentIndex = 0;
        const wpm = 180;
        const charsPerMinute = wpm * 5;
        const charsPerSecond = charsPerMinute / 60;
        const baseDelay = 1000 / charsPerSecond;

        setInputTypingContent('');

        const typeInInput = () => {
          if (currentIndex < content.length) {
            const newContent = content.substring(0, currentIndex + 1);
            setInputTypingContent(newContent);
            currentIndex++;
            inputTypingTimeoutRef.current = setTimeout(
              typeInInput,
              baseDelay + Math.random() * 20
            );
          } else {
            setIsSendButtonAnimating(true);
            setTimeout(() => {
              setIsSendButtonAnimating(false);
              setInputTypingContent('');
              isInputTypingActiveRef.current = false;

              window.dispatchEvent(
                new CustomEvent('userMessageSent', {
                  detail: { messageId, content },
                })
              );
            }, 200);
          }
        };

        inputTypingTimeoutRef.current = setTimeout(typeInInput, 100);
      },
      []
    );

    // Message sequencer for handling animations - only initialize if scenario exists
    const sequencer = useMessageSequencer({
      scenario: scenario!, // We know scenario exists due to the safety check above
      autoPlay: false, // Never auto-play automatically, we'll control this manually based on isActive
      onComplete: () => {
        onComplete?.();
        // Auto-advance to next scenario for continuous demo
        if (currentScenarioIndex < SCENARIOS.length - 1) {
          setTimeout(() => {
            setCurrentScenarioIndex((prev) => prev + 1);
          }, 2000);
        } else {
          // Loop back to first scenario
          setTimeout(() => {
            setCurrentScenarioIndex(0);
          }, 2000);
        }
      },
      onMessageStart: (message, index) => {
        messagesContainerRef.current?.scrollTo({
          top: messagesContainerRef.current.scrollHeight,
          behavior: 'smooth',
        });
      },
    });

    // Extract sequencer values to avoid dependency issues
    const { messages, typingIndicator, isPlaying, isComplete } = sequencer;

    // Store sequencer ref to avoid circular dependencies
    const sequencerRef = useRef(sequencer);
    sequencerRef.current = sequencer;

    // Scroll management
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    // Handle input typing for current user messages
    useEffect(() => {
      const currentUserName = getCurrentUserName(currentScenarioIndex);
      const currentInputTypingMessage = messages.find(
        (m) => m.inputTyping && m.isVisible && m.sender === currentUserName
      );

      if (currentInputTypingMessage && !isInputTypingActiveRef.current) {
        const messageScenarioId = parseInt(
          currentInputTypingMessage.id.split('-')[0]
        );

        if (messageScenarioId === currentScenarioIndex + 1) {
          startInputTyping(
            currentInputTypingMessage.content,
            currentInputTypingMessage.id
          );
        }
      }
    }, [messages, startInputTyping, currentScenarioIndex]);

    // Reset all state - both sequencer and local container state
    const resetAllState = useCallback(() => {
      // Reset sequencer state
      sequencerRef.current.stop();
      sequencerRef.current.reset();
      
      // Reset local container state
      if (inputTypingTimeoutRef.current) {
        clearTimeout(inputTypingTimeoutRef.current);
        inputTypingTimeoutRef.current = null;
      }
      setInputTypingContent('');
      setIsSendButtonAnimating(false);
      isInputTypingActiveRef.current = false;
      lastInputMessageIdRef.current = null;
    }, []);

    // Handle active state changes - start/stop animation based on isActive
    useEffect(() => {
      if (isActive && autoPlay) {
        // Always reset everything first to ensure we start from the beginning
        resetAllState();
        
        // Small delay to allow reset to complete before starting
        const timer = setTimeout(() => {
          // Double-check we're still active before starting
          if (isActive) {
            sequencerRef.current.start(); // Start fresh animation
          }
        }, 700); // Longer delay to ensure both state systems are reset

        return () => clearTimeout(timer);
      } else if (!isActive) {
        // Stop and reset everything when container becomes inactive
        resetAllState();
      }
    }, [isActive, autoPlay, resetAllState]);

    // Reset when scenario changes - use coordinated reset
    useEffect(() => {
      resetAllState();
    }, [currentScenarioIndex, resetAllState]);

    // Cleanup
    useEffect(() => {
      return () => {
        if (inputTypingTimeoutRef.current) {
          clearTimeout(inputTypingTimeoutRef.current);
        }
        isInputTypingActiveRef.current = false;
      };
    }, []);

    const currentUserName = getCurrentUserName(currentScenarioIndex);

    return (
      <div
        ref={ref}
        className={`bg-black/20 backdrop-blur-sm rounded-[40px] overflow-hidden relative w-full h-full ${className}`}
      >
        {/* Chat header */}
        <div className="absolute top-0 left-0 right-0 z-20 pointer-events-auto p-4 md:p-6">
          <div className="px-4 py-3 bg-white/1 border border-white/10 text-white/80 flex items-center justify-between rounded-[40px] backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="app-heading">
                #{scenario.thread.channel || 'general'}
              </span>
            </div>
            <div className="app-paragraph2 text-white/50">
              {scenario.thread.title}
            </div>
          </div>
        </div>

        {/* Messages Container - Full height with proper layering */}
        <div
          ref={messagesContainerRef}
          className="absolute inset-0 overflow-y-auto scrollbar-hide"
        >
          <div className="flex flex-col space-y-2 min-h-full justify-end px-4 md:px-6 pt-20 pb-20">
            {messages.map((message) => {
              if (!message.isVisible) return null;

              // Skip user's messages when they're in input typing mode
              if (message.sender === currentUserName && message.inputTyping) {
                return null;
              }

              if (message.sender === currentUserName) {
                return (
                  <UserMessage
                    key={message.id}
                    username={message.sender}
                    time={message.timestamp || ''}
                    userMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              } else if (message.sender === 'Sam') {
                return (
                  <ParticipantMessage
                    key={message.id}
                    username={message.sender}
                    time={message.timestamp || ''}
                    participantMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              } else if (message.sender === 'Akarii') {
                return (
                  <AkariiMessage
                    key={message.id}
                    time={message.timestamp || ''}
                    akariiMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                    messageType={message.type as 'rich' | 'card' | 'alert'}
                  />
                );
              } else if (message.sender === 'System') {
                return (
                  <SystemMessage
                    key={message.id}
                    time={message.timestamp || ''}
                    content={message.content}
                    type={message.type as 'vote' | 'alert' | 'card'}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              } else if (message.role === 'human') {
                return (
                  <ParticipantMessage
                    key={message.id}
                    username={message.sender}
                    time={message.timestamp || ''}
                    participantMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              }
              return null;
            })}

            {/* Typing Indicator */}
            {typingIndicator && (
              <TypingIndicator
                sender={typingIndicator.sender}
                role={typingIndicator.role}
                isVisible={typingIndicator.isVisible}
                currentUser={currentUserName}
              />
            )}
          </div>
        </div>

        {/* Gradient Overlays */}
        {/* <div className="absolute inset-0 pointer-events-none z-10">
          <div
            className="absolute top-0 left-0 right-0 h-[140px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10, 10, 10, 0.80) 0%, rgba(10, 10, 10, 0.00) 100%)',
            }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-16"
            style={{
              background:
                'linear-gradient(180deg, rgba(10, 10, 10, 0.00) 0%, rgba(10, 10, 10, 0.80) 100%)',
            }}
          />
        </div> */}

        {/* Input Area */}
        <div className="absolute bottom-0 left-0 right-0 z-20 flex items-start gap-1 md:gap-2 pointer-events-auto p-4 md:p-6">
          <div className="w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border border-white/10 bg-white/1 backdrop-blur-sm rounded-[40px] hover:bg-white/5 cursor-pointer">
            <FileIcon
              size={12}
              className="opacity-50 w-5 h-5"
              color="#DBDBDB"
            />
          </div>
          <div className="min-h-12 flex items-center flex-1 bg-white/1 backdrop-blur-sm border border-white/10 rounded-[40px] px-4 py-2">
            {inputTypingContent ? (
              <div className="w-full app-paragraph2 text-white/80 leading-relaxed">
                {inputTypingContent}
                <span className="animate-pulse ml-1">|</span>
              </div>
            ) : (
              <input
                type="text"
                placeholder="Type a message..."
                className="w-full bg-transparent outline-none app-paragraph2 p-0 border-none text-white/20"
                disabled
              />
            )}
          </div>
          <div className="w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border border-white/10 bg-white/1 rounded-[40px] hover:bg-white/5 cursor-pointer">
            <SpeechIcon
              size={12}
              className="opacity-50 w-5 h-5"
              color="#DBDBDB"
            />
          </div>
          <div
            className={`w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border rounded-[40px] cursor-pointer transition-all duration-200 ${
              isSendButtonAnimating
                ? 'bg-white/20 border-white/40 scale-110'
                : 'bg-white/1 border-white/10 hover:bg-white/5'
            }`}
          >
            <SendIcon
              size={12}
              className={`w-5 h-5 transition-all duration-200 ${
                isSendButtonAnimating ? 'opacity-100' : 'opacity-50'
              }`}
              color={isSendButtonAnimating ? '#FFFFFF' : '#DBDBDB'}
            />
          </div>
        </div>

        {children}
      </div>
    );
  }
);

ChatDemoContainer.displayName = 'ChatDemoContainer';

export default ChatDemoContainer;
