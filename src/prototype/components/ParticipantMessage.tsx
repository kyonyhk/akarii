import { useEffect, useRef } from 'react';

interface ParticipantMessageProps {
  username: string;
  time: string;
  participantMessage: string;
  isTyping?: boolean;
  displayedContent?: string;
  messageId?: string;
  onObserveMessage?: (element: HTMLElement | null, messageId: string) => void;
}

export default function ParticipantMessage({
  username,
  time,
  participantMessage,
  isTyping = false,
  displayedContent,
  messageId,
  onObserveMessage,
}: ParticipantMessageProps) {
  const content = isTyping ? displayedContent || '' : participantMessage;
  const messageRef = useRef<HTMLDivElement>(null);

  // Observe message element for height changes
  useEffect(() => {
    if (messageRef.current && messageId && onObserveMessage) {
      onObserveMessage(messageRef.current, messageId);
    }
  }, [messageId, onObserveMessage]);

  return (
    <div ref={messageRef} className="w-full flex flex-col items-start message-container message-slide-up">
      <div className="max-w-[300px] md:max-w-[400px] w-fit flex flex-col gap-2 p-4 border border-white/5 bg-white/5 rounded-3xl message-height-transition">
        <div className="flex flex-row gap-2">
          <div className="w-4 md:w-6 h-4 md:h-6 bg-red-500 rounded-[40px]"></div>
          <div className="flex flex-1 flex-row justify-between items-center gap-10">
            <div className="app-subheading text-white">{username}</div>
            <div className="app-eyebrow text-white/50">{time}</div>
          </div>
        </div>
        <div className="app-paragraph2 text-white/80">
          {content}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  );
}
