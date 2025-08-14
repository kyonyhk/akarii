'use client';

import { forwardRef } from 'react';
import ChatDemoContainer from './ChatDemoContainer';

interface ChatDemoFullProps {
  scenarioIndex?: number;
  isActive?: boolean;
  className?: string;
  onComplete?: () => void;
}

const ChatDemoFull = forwardRef<HTMLDivElement, ChatDemoFullProps>(
  ({ scenarioIndex = 0, isActive = true, className = '', onComplete }, ref) => {
    return (
      <ChatDemoContainer
        ref={ref}
        autoPlay={true}
        isActive={isActive}
        scenarioIndex={scenarioIndex}
        onComplete={onComplete}
        className={`w-full ${className}`}
      />
    );
  }
);

ChatDemoFull.displayName = 'ChatDemoFull';

export default ChatDemoFull;