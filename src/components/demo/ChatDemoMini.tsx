'use client';

import { forwardRef } from 'react';
import ChatDemoContainer from './ChatDemoContainer';

interface ChatDemoMiniProps {
  scenarioIndex?: number;
  isActive?: boolean;
  className?: string;
  onComplete?: () => void;
}

const ChatDemoMini = forwardRef<HTMLDivElement, ChatDemoMiniProps>(
  ({ scenarioIndex = 0, isActive = false, className = '', onComplete }, ref) => {
    return (
      <ChatDemoContainer
        ref={ref}
        autoPlay={true}
        isActive={isActive}
        scenarioIndex={scenarioIndex}
        onComplete={onComplete}
        className={`w-full h-full ${className}`}
      />
    );
  }
);

ChatDemoMini.displayName = 'ChatDemoMini';

export default ChatDemoMini;
