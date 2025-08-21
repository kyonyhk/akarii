'use client';

import { useState, useEffect, useRef, forwardRef, useCallback } from 'react';
import { SCENARIOS } from '../../prototype/data/scenarios';
import { useMessageSequencer } from '../../prototype/hooks/useMessageSequencer';
import { useMessageStacking } from '../../prototype/hooks/useMessageStacking';
import { FileIcon, SpeechIcon, SendIcon } from '../../components/icons';
import posthog from '@/lib/posthog';

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
  enableWaitlistInteraction?: boolean;
  onInteractionAttempt?: (type: 'input_click' | 'send_click' | 'file_click' | 'speech_click') => void;
  source?: 'overview' | 'features';
  userColors?: Record<string, {borderColor: string, bgColor: string}>;
  forceMobileMode?: boolean; // Force mobile layout regardless of window width
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
      enableWaitlistInteraction = false,
      onInteractionAttempt,
      source = 'overview',
      userColors,
      forceMobileMode,
    },
    ref
  ) => {
    const [currentScenarioIndex, setCurrentScenarioIndex] = useState(
      scenarioIndex >= 0 && scenarioIndex < SCENARIOS.length ? scenarioIndex : 0
    );
    const [inputTypingContent, setInputTypingContent] = useState('');
    const [isSendButtonAnimating, setIsSendButtonAnimating] = useState(false);
    
    // Smart auto-scroll state management
    const [isAtBottom, setIsAtBottom] = useState(true);
    const [isUserScrolling, setIsUserScrolling] = useState(false);
    const [inputAreaHeight, setInputAreaHeight] = useState(0);

    // Interaction handlers for waitlist conversion
    const handleInteraction = useCallback((type: 'input_click' | 'send_click' | 'file_click' | 'speech_click') => {
      if (enableWaitlistInteraction && onInteractionAttempt) {
        // Track the interaction attempt
        posthog.capture('chat_demo_interaction_attempt', {
          source,
          interaction_type: type,
          scenario_index: currentScenarioIndex,
        });
        
        onInteractionAttempt(type);
      }
    }, [enableWaitlistInteraction, onInteractionAttempt, source, currentScenarioIndex]);


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

    // Get the current user name based on scenario array index
    const getCurrentUserName = (scenarioIndex: number) => {
      switch (scenarioIndex) {
        case 0: // Scenario ID 1
          return 'Sarah';
        case 1: // Scenario ID 2
          return 'Marcus';
        case 2: // Scenario ID 3
          return 'Elena';
        case 3: // Scenario ID 4
          return 'David';
        case 4: // Scenario ID 5
          return 'Mike Krieger';
        case 5: // Scenario ID 6
          return 'Kevin Weil';
        case 6: // Scenario ID 7
          return 'Alex';
        case 7: // Scenario ID 8
          return 'Priya';
        case 8: // Scenario ID 9
          return 'Harper';
        case 9: // Scenario ID 10
          return 'Dan';
        case 10: // Scenario ID 11
          return 'Elena';
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
        // Smart auto-scroll: only scroll if user is at bottom
        smartScrollToBottom(true);
      },
    });

    // Extract sequencer values to avoid dependency issues
    const { messages, typingIndicator, isPlaying, isComplete } = sequencer;

    // Store sequencer ref to avoid circular dependencies
    const sequencerRef = useRef(sequencer);
    sequencerRef.current = sequencer;

    // Scroll management
    const messagesContainerRef = useRef<HTMLDivElement>(null);
    const inputAreaRef = useRef<HTMLDivElement>(null);
    const inputElementRef = useRef<HTMLDivElement>(null);
    
    // Smart auto-scroll logic
    const checkIfAtBottom = useCallback(() => {
      if (!messagesContainerRef.current) return false;
      const container = messagesContainerRef.current;
      const threshold = 100; // Consider "at bottom" if within 100px of bottom
      const isAtBottomNow = container.scrollTop + container.clientHeight >= container.scrollHeight - threshold;
      return isAtBottomNow;
    }, []);
    
    const smartScrollToBottom = useCallback((smooth: boolean = true) => {
      if (!messagesContainerRef.current || !isAtBottom) return;
      
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: smooth ? 'smooth' : 'auto',
      });
    }, [isAtBottom]);
    
    // Handle scroll events to track user scrolling behavior
    const handleScroll = useCallback(() => {
      if (!messagesContainerRef.current) return;
      
      const wasAtBottom = checkIfAtBottom();
      setIsAtBottom(wasAtBottom);
      
      // If user scrolls back to bottom, re-enable auto-scroll
      if (wasAtBottom && isUserScrolling) {
        setIsUserScrolling(false);
      } else if (!wasAtBottom && !isUserScrolling) {
        setIsUserScrolling(true);
      }
    }, [checkIfAtBottom, isUserScrolling]);
    
    // Add scroll event listener
    useEffect(() => {
      const container = messagesContainerRef.current;
      if (!container) return;
      
      container.addEventListener('scroll', handleScroll, { passive: true });
      return () => container.removeEventListener('scroll', handleScroll);
    }, [handleScroll]);
    
    // Dynamic input element height measurement
    useEffect(() => {
      const inputElement = inputElementRef.current;
      if (!inputElement) return;
      
      const updateInputHeight = () => {
        const rect = inputElement.getBoundingClientRect();
        console.log('🐛 Input element measurement:', { height: rect.height, width: rect.width });
        if (rect.height > 0) {
          setInputAreaHeight(rect.height);
        }
      };
      
      // Delay initial measurement to ensure DOM is rendered
      const timer = setTimeout(updateInputHeight, 100);
      
      // ResizeObserver to track changes in the input element (for multiline)
      const resizeObserver = new ResizeObserver((entries) => {
        for (const entry of entries) {
          const height = entry.contentRect.height;
          console.log('🐛 ResizeObserver input element height:', height);
          if (height > 0) {
            setInputAreaHeight(height);
          }
        }
      });
      resizeObserver.observe(inputElement);
      
      return () => {
        clearTimeout(timer);
        resizeObserver.disconnect();
      };
    }, []);

    // Message stacking and animation management
    const { observeMessage, scrollToBottom } = useMessageStacking({
      messagesContainerRef,
      onHeightChange: () => {
        // Smart auto-scroll: only scroll if user is at bottom
        smartScrollToBottom(true);
      },
    });

    // Handle input typing for current user messages
    useEffect(() => {
      const currentUserName = getCurrentUserName(currentScenarioIndex);
      const currentInputTypingMessage = messages.find(
        (m) => m.inputTyping && m.isVisible && m.sender === currentUserName
      );

      // Debug logging for scenarios 10 & 11
      if (currentScenarioIndex >= 9) {
        console.log('🐛 Debug scenario', currentScenarioIndex + 1, ':', {
          currentScenarioIndex,
          scenarioIndex,
          currentUserName,
          currentInputTypingMessage: currentInputTypingMessage ? {
            id: currentInputTypingMessage.id,
            sender: currentInputTypingMessage.sender,
            inputTyping: currentInputTypingMessage.inputTyping,
            isVisible: currentInputTypingMessage.isVisible
          } : null,
          isInputTypingActive: isInputTypingActiveRef.current,
          messagesWithInputTyping: messages.filter(m => m.inputTyping).map(m => ({id: m.id, sender: m.sender, isVisible: m.isVisible}))
        });
      }

      if (currentInputTypingMessage && !isInputTypingActiveRef.current) {
        const messageScenarioId = parseInt(
          currentInputTypingMessage.id.split('-')[0]
        );

        console.log('🐛 Starting input typing for message:', messageScenarioId, 'vs expected:', currentScenarioIndex + 1);

        if (messageScenarioId === currentScenarioIndex + 1) {
          startInputTyping(
            currentInputTypingMessage.content,
            currentInputTypingMessage.id
          );
        }
      }
    }, [messages, startInputTyping, currentScenarioIndex]);

    // Update currentScenarioIndex when scenarioIndex prop changes
    useEffect(() => {
      const newIndex = scenarioIndex >= 0 && scenarioIndex < SCENARIOS.length ? scenarioIndex : 0;
      if (newIndex !== currentScenarioIndex) {
        setCurrentScenarioIndex(newIndex);
      }
    }, [scenarioIndex]); // Remove currentScenarioIndex from dependencies to prevent infinite loop

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
    
    // Calculate dynamic bottom padding
    // Mobile: 8px gap, Desktop: 16px gap  
    const isMobile = forceMobileMode !== undefined ? forceMobileMode : (typeof window !== 'undefined' && window.innerWidth < 768);
    const desiredGap = isMobile ? 8 : 16;
    const inputAreaBottomPadding = isMobile ? 16 : 24; // p-4 md:p-6
    
    // Default input heights (will be replaced by actual measurements if available)
    const defaultInputHeight = isMobile ? 40 : 48; // min-h-10 md:min-h-12
    
    // Use measured height if available, fallback to default
    const actualInputHeight = inputAreaHeight > 0 ? inputAreaHeight : defaultInputHeight;
    
    // Total: input height + padding + desired gap
    const dynamicPaddingBottom = actualInputHeight + inputAreaBottomPadding + desiredGap;
    
    // Debug logging
    console.log('🐛 Complete padding debug:', {
      isMobile,
      desiredGap,
      inputAreaBottomPadding,
      defaultInputHeight,
      actualInputHeight,
      inputAreaHeight,
      dynamicPaddingBottom,
      breakdown: `${actualInputHeight} + ${inputAreaBottomPadding} + ${desiredGap} = ${dynamicPaddingBottom}`
    });

    return (
      <div
        ref={ref}
        className={`bg-black/20 backdrop-blur-sm rounded-[40px] relative w-full h-full ${className}`}
        style={{ overflow: 'hidden', height: '100%' }}
      >
        {/* Bottom Layer: Messages Container (Full Height) */}
        <div
          ref={messagesContainerRef}
          className="absolute inset-0 chat-scroll-container"
          id="messages-container"
          data-lenis-prevent
          style={{ 
            overflowY: 'scroll',
            overflowX: 'hidden',
            scrollBehavior: 'smooth',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            pointerEvents: 'auto',
            zIndex: 1,
            height: '100%',
            WebkitOverflowScrolling: 'touch', // Enable momentum scrolling on iOS
          }}
        >
          <div
            id="messages-list"
            className="flex flex-col justify-end min-h-full space-y-2 px-4 md:px-6 pt-[140px] md:pt-20"
            style={{ paddingBottom: `${dynamicPaddingBottom}px` }}
          >
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
                    messageId={message.id}
                    onObserveMessage={observeMessage}
                    userColors={userColors}
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
                    messageId={message.id}
                    onObserveMessage={observeMessage}
                    userColors={userColors}
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
                    messageId={message.id}
                    onObserveMessage={observeMessage}
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
                    messageId={message.id}
                    onObserveMessage={observeMessage}
                    userColors={userColors}
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

        {/* Middle Layer: Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10" style={{ pointerEvents: 'none' }}>
          {/* Top Gradient */}
          <div
            className="absolute top-0 left-0 right-0 h-[140px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10, 10, 10, 0.80) 50%, rgba(10, 10, 10, 0.00) 100%)',
            }}
          />
          {/* Bottom Gradient */}
          <div
            className="absolute bottom-0 left-0 right-0 h-30 md:h-16"
            style={{
              background:
                'linear-gradient(180deg, rgba(10, 10, 10, 0.00) 0%, rgba(10, 10, 10, 0.80) 100%)',
            }}
          />
        </div>

        {/* Top Layer: UI Elements */}
        <div className="relative z-20 flex flex-col h-full pointer-events-none">
          {/* Chat Header */}
          <div className="flex items-center gap-4 pointer-events-auto p-4 md:p-6">
            <div className="flex-1 px-4 py-3 bg-white/1 border border-white/10 text-white/80 flex items-center justify-between rounded-[40px] backdrop-blur-sm">
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

          {/* Spacer to push input to bottom */}
          <div className="flex-1"></div>

          {/* Message Input Area */}
          <div ref={inputAreaRef} className="flex items-start gap-1 md:gap-2 pointer-events-auto p-4 md:p-6">
            <div 
              className="w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border border-white/10 bg-white/1 backdrop-blur-sm rounded-[40px] hover:bg-white/5 cursor-pointer"
              onClick={() => handleInteraction('file_click')}
            >
              <FileIcon
                size={16}
                className="opacity-50 md:w-5 md:h-5"
                color="#DBDBDB"
              />
            </div>
            <div 
              ref={inputElementRef}
              className="min-h-10 md:min-h-12 flex items-center flex-1 bg-white/1 border border-white/10 rounded-[40px] px-4 py-2 backdrop-blur-sm cursor-text hover:bg-white/5"
              onClick={() => handleInteraction('input_click')}
            >
              {inputTypingContent ? (
                <div className="w-full app-paragraph2 text-white/80 leading-relaxed">
                  {inputTypingContent}
                  <span className="animate-pulse ml-1">|</span>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-transparent outline-none app-paragraph2 p-0 border-none text-white/50"
                  disabled
                />
              )}
            </div>
            <div 
              className="w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border border-white/10 bg-white/1 backdrop-blur-sm rounded-[40px] hover:bg-white/5 cursor-pointer"
              onClick={() => handleInteraction('speech_click')}
            >
              <SpeechIcon
                size={16}
                className="opacity-50 md:w-5 md:h-5"
                color="#DBDBDB"
              />
            </div>
            <div
              className={`w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border backdrop-blur-sm rounded-[40px] cursor-pointer transition-all duration-200 ${
                isSendButtonAnimating
                  ? 'bg-white/20 border-white/40 scale-110'
                  : 'bg-white/1 border-white/10 hover:bg-white/5'
              }`}
              onClick={() => handleInteraction('send_click')}
            >
              <SendIcon
                size={16}
                className={`md:w-5 md:h-5 transition-all duration-200 ${
                  isSendButtonAnimating ? 'opacity-100' : 'opacity-50'
                }`}
                color={isSendButtonAnimating ? '#FFFFFF' : '#DBDBDB'}
              />
            </div>
          </div>
        </div>

        {children}
      </div>
    );
  }
);

ChatDemoContainer.displayName = 'ChatDemoContainer';

export default ChatDemoContainer;
