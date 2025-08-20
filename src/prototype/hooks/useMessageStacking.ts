import { useCallback, useRef, useEffect } from 'react';

interface MessageStackingOptions {
  messagesContainerRef: React.RefObject<HTMLDivElement | null>;
  onHeightChange?: () => void;
}

interface MessageStackingReturn {
  observeMessage: (element: HTMLElement | null, messageId: string) => void;
  unobserveMessage: (messageId: string) => void;
  scrollToBottom: (smooth?: boolean) => void;
}

export function useMessageStacking({
  messagesContainerRef,
  onHeightChange,
}: MessageStackingOptions): MessageStackingReturn {
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const observedElementsRef = useRef<Map<string, HTMLElement>>(new Map());
  const messageHeightsRef = useRef<Map<string, number>>(new Map());
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize ResizeObserver
  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver((entries) => {
      let shouldScrollToBottom = false;
      
      for (const entry of entries) {
        const element = entry.target as HTMLElement;
        const messageId = element.dataset.messageId;
        
        if (!messageId) continue;
        
        const newHeight = entry.contentRect.height;
        const previousHeight = messageHeightsRef.current.get(messageId);
        
        // Store the new height
        messageHeightsRef.current.set(messageId, newHeight);
        
        // If height changed significantly (more than 2px), we should scroll
        if (previousHeight !== undefined && Math.abs(newHeight - previousHeight) > 2) {
          shouldScrollToBottom = true;
        }
      }
      
      // Trigger height change callback and auto-scroll if needed
      if (shouldScrollToBottom) {
        onHeightChange?.();
        
        // Debounced scroll to bottom
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }
        
        scrollTimeoutRef.current = setTimeout(() => {
          scrollToBottom(true);
        }, 50); // Small delay to let animations settle
      }
    });

    return () => {
      if (resizeObserverRef.current) {
        resizeObserverRef.current.disconnect();
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [onHeightChange]);

  const observeMessage = useCallback((element: HTMLElement | null, messageId: string) => {
    if (!element || !resizeObserverRef.current) return;
    
    // Set the message ID as a data attribute for tracking
    element.dataset.messageId = messageId;
    
    // Unobserve previous element if it exists
    const previousElement = observedElementsRef.current.get(messageId);
    if (previousElement && resizeObserverRef.current) {
      resizeObserverRef.current.unobserve(previousElement);
    }
    
    // Observe new element
    observedElementsRef.current.set(messageId, element);
    resizeObserverRef.current.observe(element);
    
    // Store initial height
    const initialHeight = element.getBoundingClientRect().height;
    messageHeightsRef.current.set(messageId, initialHeight);
  }, []);

  const unobserveMessage = useCallback((messageId: string) => {
    const element = observedElementsRef.current.get(messageId);
    if (element && resizeObserverRef.current) {
      resizeObserverRef.current.unobserve(element);
      observedElementsRef.current.delete(messageId);
      messageHeightsRef.current.delete(messageId);
    }
  }, []);

  const scrollToBottom = useCallback((smooth: boolean = true) => {
    if (!messagesContainerRef.current) return;
    
    const container = messagesContainerRef.current;
    const scrollOptions: ScrollToOptions = {
      top: container.scrollHeight,
      behavior: smooth ? 'smooth' : 'auto',
    };
    
    container.scrollTo(scrollOptions);
  }, [messagesContainerRef]);

  return {
    observeMessage,
    unobserveMessage,
    scrollToBottom,
  };
}