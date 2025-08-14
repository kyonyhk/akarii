import React from 'react';

interface TypingIndicatorProps {
  sender: string;
  role: 'human' | 'ai' | 'system';
  isVisible: boolean;
  currentUser?: string;
}

export default function TypingIndicator({
  sender,
  role,
  isVisible,
  currentUser,
}: TypingIndicatorProps) {
  if (!isVisible) return null;

  const getIndicatorStyle = () => {
    switch (role) {
      case 'ai':
        return 'bg-white/10 text-white/70 border-white/10';
      case 'system':
        return 'bg-white/10 text-white/70 border-white/10';
      default: // human
        return 'bg-white/5 text-white border-white/10';
    }
  };

  const getSenderLabel = () => {
    if (role === 'system') return 'System';
    return sender;
  };

  return (
    <div
      className={`flex ${role === 'human' && sender === currentUser ? 'justify-end' : 'justify-start'} mb-2`}
    >
      <div
        className={`max-w-[280px] md:max-w-md px-4 py-3 rounded-[20px] border ${getIndicatorStyle()} animate-pulse`}
      >
        <div className="flex items-center gap-2">
          <span className="app-paragraph2 font-medium opacity-70">
            {getSenderLabel()}
          </span>
          <div className="flex gap-1">
            <div
              className="w-1 h-1 rounded-full bg-current animate-bounce"
              style={{ animationDelay: '0ms', animationDuration: '1000ms' }}
            />
            <div
              className="w-1 h-1 rounded-full bg-current animate-bounce"
              style={{ animationDelay: '200ms', animationDuration: '1000ms' }}
            />
            <div
              className="w-1 h-1 rounded-full bg-current animate-bounce"
              style={{ animationDelay: '400ms', animationDuration: '1000ms' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
