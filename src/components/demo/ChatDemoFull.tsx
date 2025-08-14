'use client';

import { forwardRef } from 'react';
import ChatDemoContainer from './ChatDemoContainer';

interface ChatDemoFullProps {
  scenarioIndex?: number;
  isActive?: boolean;
  className?: string;
  onComplete?: () => void;
  enableWaitlistInteraction?: boolean;
  onInteractionAttempt?: (type: 'input_click' | 'send_click' | 'file_click' | 'speech_click') => void;
  source?: 'overview' | 'features';
}

const ChatDemoFull = forwardRef<HTMLDivElement, ChatDemoFullProps>(
  ({ 
    scenarioIndex = 0, 
    isActive = true, 
    className = '', 
    onComplete,
    enableWaitlistInteraction,
    onInteractionAttempt,
    source
  }, ref) => {
    return (
      <ChatDemoContainer
        ref={ref}
        autoPlay={true}
        isActive={isActive}
        scenarioIndex={scenarioIndex}
        onComplete={onComplete}
        className={`w-full ${className}`}
        enableWaitlistInteraction={enableWaitlistInteraction}
        onInteractionAttempt={onInteractionAttempt}
        source={source}
      />
    );
  }
);

ChatDemoFull.displayName = 'ChatDemoFull';

export default ChatDemoFull;