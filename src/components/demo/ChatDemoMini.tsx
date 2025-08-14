'use client';

import { forwardRef } from 'react';
import ChatDemoContainer from './ChatDemoContainer';

interface ChatDemoMiniProps {
  scenarioIndex?: number;
  isActive?: boolean;
  className?: string;
  onComplete?: () => void;
  enableWaitlistInteraction?: boolean;
  onInteractionAttempt?: (type: 'input_click' | 'send_click' | 'file_click' | 'speech_click') => void;
  source?: 'overview' | 'features';
}

const ChatDemoMini = forwardRef<HTMLDivElement, ChatDemoMiniProps>(
  ({ 
    scenarioIndex = 0, 
    isActive = false, 
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
        className={`w-full h-full ${className}`}
        enableWaitlistInteraction={enableWaitlistInteraction}
        onInteractionAttempt={onInteractionAttempt}
        source={source}
      />
    );
  }
);

ChatDemoMini.displayName = 'ChatDemoMini';

export default ChatDemoMini;
