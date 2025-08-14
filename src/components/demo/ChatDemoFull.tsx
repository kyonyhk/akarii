'use client';

import { forwardRef } from 'react';
import ChatDemoContainer from './ChatDemoContainer';

interface ChatDemoFullProps {
  className?: string;
  onComplete?: () => void;
}

const ChatDemoFull = forwardRef<HTMLDivElement, ChatDemoFullProps>(
  ({ className = '', onComplete }, ref) => {
    return (
      <ChatDemoContainer
        ref={ref}
        autoPlay={true}
        isActive={true}
        scenarioIndex={0}
        onComplete={onComplete}
        className={`w-full ${className}`}
      />
    );
  }
);

ChatDemoFull.displayName = 'ChatDemoFull';

export default ChatDemoFull;