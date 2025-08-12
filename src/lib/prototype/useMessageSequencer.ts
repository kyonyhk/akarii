import { useState, useCallback, useRef, useEffect } from 'react';
import { Message, Scenario } from './types';

interface SequencerMessage extends Message {
  id: string;
  isVisible: boolean;
  isTyping: boolean;
  displayedContent: string;
  inputTyping?: boolean;
}

interface MessageSequencerState {
  messages: SequencerMessage[];
  currentMessageIndex: number;
  isPlaying: boolean;
  isComplete: boolean;
  typingIndicator: {
    isVisible: boolean;
    sender: string;
    role: 'human' | 'ai' | 'system';
  } | null;
}

interface MessageSequencerOptions {
  scenario: Scenario;
  autoPlay?: boolean;
  onComplete?: () => void;
  onMessageStart?: (message: Message, index: number) => void;
  onMessageComplete?: (message: Message, index: number) => void;
}

export function useMessageSequencer({
  scenario,
  autoPlay = true,
  onComplete,
  onMessageStart,
  onMessageComplete,
}: MessageSequencerOptions) {
  const [state, setState] = useState<MessageSequencerState>({
    messages: [],
    currentMessageIndex: -1,
    isPlaying: false,
    isComplete: false,
    typingIndicator: null,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);

  // Initialize messages
  useEffect(() => {
    const initialMessages: SequencerMessage[] = scenario.messages.map((msg, index) => ({
      ...msg,
      id: `${scenario.id}-${index}`,
      isVisible: false,
      isTyping: false,
      displayedContent: '',
    }));

    setState(prevState => ({
      ...prevState,
      messages: initialMessages,
      currentMessageIndex: -1,
      isComplete: false,
    }));
  }, [scenario]);

  // Get WPM based on role
  const getWPM = useCallback((role: string, speedOverride?: number) => {
    if (speedOverride) return speedOverride;
    
    switch (role) {
      case 'ai':
        return 2400 + Math.random() * 1200; // 2400-3600 WPM (ultra-fast for demo)
      case 'human':
        return 120 + Math.random() * 20; // 120-140 WPM (demo-speed human typing)
      case 'system':
        return 999; // Instant for system messages
      default:
        return 80;
    }
  }, []);

  // Show typing indicator
  const showTypingIndicator = useCallback((message: Message) => {
    setState(prevState => ({
      ...prevState,
      typingIndicator: {
        isVisible: true,
        sender: message.sender,
        role: message.role,
      },
    }));
  }, []);

  // Hide typing indicator
  const hideTypingIndicator = useCallback(() => {
    setState(prevState => ({
      ...prevState,
      typingIndicator: null,
    }));
  }, []);

  // Type a single message with realistic animation
  const typeMessage = useCallback((messageIndex: number) => {
    if (!isActiveRef.current || messageIndex >= state.messages.length) {
      return;
    }

    const message = state.messages[messageIndex];
    const wpm = getWPM(message.role, message.speedOverrideWPM);
    
    // Determine if this message should type or appear instantly
    const shouldType = message.sender === 'Akarii'; // Only Akarii types in bubbles
    const shouldShowInputTyping = message.sender === scenario.pov; // Current POV user types in input
    const isOtherHuman = message.role === 'human' && message.sender !== scenario.pov;
    const shouldAppearInstantly = !shouldType && !shouldShowInputTyping && !isOtherHuman; // Only system messages appear instantly
    
    // Show typing indicator for AI messages and other human participants (not POV user)
    if (shouldType || isOtherHuman) {
      showTypingIndicator(message);
    }
    
    // Wait for typing indicator duration (show typing for other humans too)
    const typingIndicatorDuration = (shouldType || isOtherHuman) ? 500 + Math.random() * 1000 : 100;
    
    timeoutRef.current = setTimeout(() => {
      if (!isActiveRef.current) return;

      // Hide typing indicator and show message
      hideTypingIndicator();
      
      // Handle instant messages (System only)
      if (shouldAppearInstantly) {
        setState(prevState => {
          const newMessages = [...prevState.messages];
          newMessages[messageIndex] = {
            ...newMessages[messageIndex],
            isVisible: true,
            isTyping: false,
            displayedContent: message.content,
          };
          
          return {
            ...prevState,
            messages: newMessages,
            currentMessageIndex: messageIndex,
          };
        });

        onMessageStart?.(message, messageIndex);
        onMessageComplete?.(message, messageIndex);

        // Proceed to next message after brief pause
        const postDelay = 350;
        timeoutRef.current = setTimeout(() => {
          if (isActiveRef.current) {
            const nextIndex = messageIndex + 1;
            if (nextIndex < state.messages.length) {
              typeMessage(nextIndex);
            } else {
              setState(prevState => ({
                ...prevState,
                isPlaying: false,
                isComplete: true,
              }));
              
              // Add 3-second pause before calling onComplete (for screen recording)
              timeoutRef.current = setTimeout(() => {
                isActiveRef.current = false;
                onComplete?.();
              }, 3000);
            }
          }
        }, postDelay);
        return;
      }
      
      setState(prevState => {
        const newMessages = [...prevState.messages];
        newMessages[messageIndex] = {
          ...newMessages[messageIndex],
          isVisible: true,
          isTyping: shouldType,
          inputTyping: shouldShowInputTyping,
        };
        
        console.log('📝 Message update:', {
          messageIndex,
          sender: message.sender,
          content: message.content.substring(0, 50) + '...',
          shouldType,
          shouldShowInputTyping,
          inputTyping: shouldShowInputTyping
        });
        
        return {
          ...prevState,
          messages: newMessages,
          currentMessageIndex: messageIndex,
        };
      });

      onMessageStart?.(message, messageIndex);

      // Start typing animation for messages that should type
      const content = message.content;
      const isAkarii = message.sender === 'Akarii';
      
      if (isAkarii) {
        // Word-by-word typing for Akarii (much faster)
        const words = content.split(' ');
        let currentWordIndex = 0;
        
        const typeNextWord = () => {
          if (!isActiveRef.current || currentWordIndex >= words.length) {
            // Message complete
            setState(prevState => {
              const newMessages = [...prevState.messages];
              newMessages[messageIndex] = {
                ...newMessages[messageIndex],
                isTyping: false,
                inputTyping: false,
                displayedContent: content,
              };
              
              return {
                ...prevState,
                messages: newMessages,
              };
            });

            onMessageComplete?.(message, messageIndex);

            // Wait post delay, then proceed to next message
            const postDelay = message.postDelayMs || 250;
            timeoutRef.current = setTimeout(() => {
              if (isActiveRef.current) {
                const nextIndex = messageIndex + 1;
                if (nextIndex < state.messages.length) {
                  typeMessage(nextIndex);
                } else {
                  setState(prevState => ({
                    ...prevState,
                    isPlaying: false,
                    isComplete: true,
                  }));
                  
                  // Add 3-second pause before calling onComplete (for screen recording)
                  timeoutRef.current = setTimeout(() => {
                    isActiveRef.current = false;
                    onComplete?.();
                  }, 3000);
                }
              }
            }, postDelay);
            return;
          }

          // Add next word
          const currentWords = words.slice(0, currentWordIndex + 1);
          const newDisplayedContent = currentWords.join(' ');
          
          setState(prevState => {
            const newMessages = [...prevState.messages];
            newMessages[messageIndex] = {
              ...newMessages[messageIndex],
              displayedContent: newDisplayedContent,
            };
            
            return {
              ...prevState,
              messages: newMessages,
            };
          });

          currentWordIndex++;

          // Fast delay between words for Akarii (50-150ms per word)
          const wordDelay = 50 + Math.random() * 100;
          timeoutRef.current = setTimeout(typeNextWord, wordDelay);
        };

        // Start word typing with minimal delay
        const preDelay = message.preDelayMs || 100;
        timeoutRef.current = setTimeout(typeNextWord, preDelay);
        
      } else if (isOtherHuman) {
        // Other human participants: show message instantly after typing indicator
        setState(prevState => {
          const newMessages = [...prevState.messages];
          newMessages[messageIndex] = {
            ...newMessages[messageIndex],
            isTyping: false,
            inputTyping: false,
            displayedContent: content,
          };
          
          return {
            ...prevState,
            messages: newMessages,
          };
        });

        onMessageComplete?.(message, messageIndex);

        // Wait post delay, then proceed to next message
        const postDelay = message.postDelayMs || 800;
        timeoutRef.current = setTimeout(() => {
          if (isActiveRef.current) {
            const nextIndex = messageIndex + 1;
            if (nextIndex < state.messages.length) {
              typeMessage(nextIndex);
            } else {
              setState(prevState => ({
                ...prevState,
                isPlaying: false,
                isComplete: true,
              }));
              
              // Add 3-second pause before calling onComplete (for screen recording)
              timeoutRef.current = setTimeout(() => {
                isActiveRef.current = false;
                onComplete?.();
              }, 3000);
            }
          }
        }, postDelay);

      } else {
        // Character-by-character typing for POV user
        let currentIndex = 0;
        const pauses = message.pauses || [];
        
        const typeNextChar = () => {
          if (!isActiveRef.current || currentIndex >= content.length) {
            // Message complete
            setState(prevState => {
              const newMessages = [...prevState.messages];
              newMessages[messageIndex] = {
                ...newMessages[messageIndex],
                isTyping: false,
                inputTyping: false,
                displayedContent: content,
              };
              
              return {
                ...prevState,
                messages: newMessages,
              };
            });

            onMessageComplete?.(message, messageIndex);

            // Wait post delay, then proceed to next message (instant for POV user)
            const postDelay = message.sender === scenario.pov ? 50 : (message.postDelayMs || 350);
            timeoutRef.current = setTimeout(() => {
              if (isActiveRef.current) {
                const nextIndex = messageIndex + 1;
                if (nextIndex < state.messages.length) {
                  typeMessage(nextIndex);
                } else {
                  setState(prevState => ({
                    ...prevState,
                    isPlaying: false,
                    isComplete: true,
                  }));
                  
                  // Add 3-second pause before calling onComplete (for screen recording)
                  timeoutRef.current = setTimeout(() => {
                    isActiveRef.current = false;
                    onComplete?.();
                  }, 3000);
                }
              }
            }, postDelay);
            return;
          }

          // Add next character
          const newDisplayedContent = content.substring(0, currentIndex + 1);
          setState(prevState => {
            const newMessages = [...prevState.messages];
            newMessages[messageIndex] = {
              ...newMessages[messageIndex],
              displayedContent: newDisplayedContent,
            };
            
            return {
              ...prevState,
              messages: newMessages,
            };
          });

          currentIndex++;

          // Calculate delay for next character
          const charsPerMinute = wpm * 5;
          const charsPerSecond = charsPerMinute / 60;
          const baseDelay = 1000 / charsPerSecond;
          const randomDelay = 30 + Math.random() * 50;
          const pauseDelay = pauses.includes(currentIndex) ? 200 + Math.random() * 400 : 0;
          
          const totalDelay = baseDelay + randomDelay + pauseDelay;
          
          timeoutRef.current = setTimeout(typeNextChar, totalDelay);
        };

        // Start typing with pre-delay
        const preDelay = message.preDelayMs || 250;
        timeoutRef.current = setTimeout(typeNextChar, preDelay);
      }
      
    }, typingIndicatorDuration);
  }, [state.messages, getWPM, showTypingIndicator, hideTypingIndicator, onMessageStart, onMessageComplete, onComplete]);

  // Start the sequence
  const start = useCallback(() => {
    if (isActiveRef.current || state.messages.length === 0) return;

    isActiveRef.current = true;
    setState(prevState => ({
      ...prevState,
      isPlaying: true,
      isComplete: false,
      currentMessageIndex: -1,
      typingIndicator: null,
      messages: prevState.messages.map(msg => ({
        ...msg,
        isVisible: false,
        isTyping: false,
        displayedContent: '',
      })),
    }));

    // Start with first message
    typeMessage(0);
  }, [state.messages.length, typeMessage]);

  // Stop the sequence
  const stop = useCallback(() => {
    isActiveRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    setState(prevState => ({
      ...prevState,
      isPlaying: false,
      typingIndicator: null,
    }));
  }, []);

  // Reset to initial state
  const reset = useCallback(() => {
    stop();
    setState(prevState => ({
      ...prevState,
      messages: prevState.messages.map(msg => ({
        ...msg,
        isVisible: false,
        isTyping: false,
        displayedContent: '',
      })),
      currentMessageIndex: -1,
      isComplete: false,
      typingIndicator: null,
    }));
  }, [stop]);

  // Auto-play on scenario change
  useEffect(() => {
    if (autoPlay && state.messages.length > 0) {
      // Small delay to allow UI to settle
      const timer = setTimeout(start, 500);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, state.messages.length, start]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stop();
    };
  }, [stop]);

  return {
    ...state,
    start,
    stop,
    reset,
  };
}