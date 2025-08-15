import { Logo } from '../../components/atoms';
import MarkdownContent from './MarkdownContent';
import AlertContainer from './AlertContainer';

interface AkariiMessageProps {
  time: string;
  akariiMessage: string;
  isTyping?: boolean;
  displayedContent?: string;
  messageType?: 'rich' | 'card' | 'alert';
}

export default function AkariiMessage({
  time,
  akariiMessage,
  isTyping = false,
  displayedContent,
  messageType = 'rich',
}: AkariiMessageProps) {
  const content = isTyping ? displayedContent || '' : akariiMessage;

  // Helper function to extract body content without alert title
  const getAlertBodyContent = (content: string): string => {
    // Remove the first line which contains the alert title (e.g., "⚠️ **Goal Drift Alert**")
    const lines = content.split('\n');
    // Skip the first line and any empty lines after it
    let startIndex = 1;
    while (startIndex < lines.length && lines[startIndex].trim() === '') {
      startIndex++;
    }
    return lines.slice(startIndex).join('\n');
  };

  // Helper function to determine alert type from full content
  const getAlertType = (content: string): 'goal-drift' | 'sprint-check' | 'focus' | 'generic' => {
    const lowerContent = content.toLowerCase();
    
    if (lowerContent.includes('goal drift') || lowerContent.includes('drift detected')) {
      return 'goal-drift';
    }
    if (lowerContent.includes('sprint planning') || lowerContent.includes('sprint') || lowerContent.includes('planning check')) {
      return 'sprint-check';
    }
    if (lowerContent.includes('focus') || lowerContent.includes('standup')) {
      return 'focus';
    }
    return 'generic';
  };

  // const getMessageStyle = () => {
  //   switch (messageType) {
  //     case 'card':
  //       return 'bg-gradient-to-b from-[#E6F3FF] to-[#CCEEFF] border-[#B3D9FF] text-black';
  //     case 'alert':
  //       return 'bg-gradient-to-b from-[#FFF4E6] to-[#FFE6CC] border-[#FFD9B3] text-black';
  //     default: // rich
  //       return 'bg-white/10 border-white/20 text-white';
  //   }
  // };
  return (
    <div className="w-full flex flex-col items-start">
      <div
        className={`max-w-[500px] md:max-w-[600px] w-fit flex flex-col gap-4 p-2 border border-white/10 bg-transparent rounded-3xl`}
      >
        {/* Alert Container - shown inside message container at top for alert type */}
        {messageType === 'alert' && (
          <AlertContainer
            content={content}
            alertType={getAlertType(akariiMessage)}
            className="w-full text-center"
          />
        )}

        <div className="flex flex-col gap-4 px-2 mt-2">
          <div className="flex flex-row gap-2">
            <div className="w-4 md:w-6 h-4 md:h-6 flex items-center justify-center">
              <Logo
                size={16}
                className="md:hidden"
              />
              <Logo
                size={24}
                className="hidden md:block"
              />
            </div>
            <div className="flex flex-1 flex-row justify-between items-center gap-10">
              <div className="app-subheading text-white/">Akarii</div>
              <div className="app-eyebrow text-white/50">{time}</div>
            </div>
          </div>

          {/* Only show markdown content for non-alert messages */}
          {messageType !== 'alert' && (
            <div>
              <MarkdownContent content={content} />
            </div>
          )}

          {/* For alert messages, show only the body content (without the alert title) */}
          {messageType === 'alert' && (
            <div>
              <MarkdownContent content={getAlertBodyContent(content)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
