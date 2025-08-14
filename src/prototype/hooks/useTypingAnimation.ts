import { useState, useEffect, useRef, useCallback } from 'react';

interface TypingAnimationOptions {
  text: string;
  speed?: number; // words per minute
  pauses?: number[]; // character indices where to pause
  preDelayMs?: number; // delay before starting to type
  postDelayMs?: number; // delay after completion
  randomDelayRange?: [number, number]; // [min, max] random delay per character in ms
  onComplete?: () => void;
  onStart?: () => void;
}

interface TypingAnimationState {
  displayedText: string;
  isTyping: boolean;
  isComplete: boolean;
  currentIndex: number;
}

export function useTypingAnimation({
  text,
  speed = 60, // default WPM
  pauses = [],
  preDelayMs = 0,
  postDelayMs = 0,
  randomDelayRange = [30, 80],
  onComplete,
  onStart,
}: TypingAnimationOptions) {
  const [state, setState] = useState<TypingAnimationState>({
    displayedText: '',
    isTyping: false,
    isComplete: false,
    currentIndex: 0,
  });

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isActiveRef = useRef(false);

  // Calculate base delay between characters
  const getBaseDelay = useCallback(() => {
    // Convert WPM to characters per minute (assume avg 5 chars per word)
    const charsPerMinute = speed * 5;
    const charsPerSecond = charsPerMinute / 60;
    const baseDelayMs = 1000 / charsPerSecond;
    return baseDelayMs;
  }, [speed]);

  // Get random delay within range
  const getRandomDelay = useCallback(() => {
    const [min, max] = randomDelayRange;
    return Math.random() * (max - min) + min;
  }, [randomDelayRange]);

  // Get pause delay at specific character index
  const getPauseDelay = useCallback((index: number) => {
    if (pauses.includes(index)) {
      // Pause delays: 200-800ms for natural feeling
      return Math.random() * 600 + 200;
    }
    return 0;
  }, [pauses]);

  const typeNextCharacter = useCallback(() => {
    if (!isActiveRef.current) return;

    setState(prevState => {
      const nextIndex = prevState.currentIndex + 1;
      const nextChar = text[prevState.currentIndex];
      
      if (!nextChar || nextIndex > text.length) {
        // Animation complete
        setTimeout(() => {
          if (isActiveRef.current) {
            setState(s => ({ ...s, isTyping: false, isComplete: true }));
            onComplete?.();
          }
        }, postDelayMs);
        return { ...prevState, isTyping: false };
      }

      const newDisplayedText = prevState.displayedText + nextChar;
      
      // Schedule next character
      const baseDelay = getBaseDelay();
      const randomDelay = getRandomDelay();
      const pauseDelay = getPauseDelay(nextIndex);
      const totalDelay = baseDelay + randomDelay + pauseDelay;

      timeoutRef.current = setTimeout(typeNextCharacter, totalDelay);

      return {
        ...prevState,
        displayedText: newDisplayedText,
        currentIndex: nextIndex,
      };
    });
  }, [text, getBaseDelay, getRandomDelay, getPauseDelay, onComplete, postDelayMs]);

  const start = useCallback(() => {
    if (isActiveRef.current || text.length === 0) return;

    isActiveRef.current = true;
    setState({
      displayedText: '',
      isTyping: true,
      isComplete: false,
      currentIndex: 0,
    });

    onStart?.();

    // Start typing after pre-delay
    timeoutRef.current = setTimeout(typeNextCharacter, preDelayMs);
  }, [text, preDelayMs, typeNextCharacter, onStart]);

  const stop = useCallback(() => {
    isActiveRef.current = false;
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  }, []);

  const reset = useCallback(() => {
    stop();
    setState({
      displayedText: '',
      isTyping: false,
      isComplete: false,
      currentIndex: 0,
    });
  }, [stop]);

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