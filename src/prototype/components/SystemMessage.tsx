interface SystemMessageProps {
  time: string;
  content: string;
  type: 'vote' | 'alert' | 'card';
  isTyping?: boolean;
  displayedContent?: string;
}

export default function SystemMessage({
  time,
  content,
  type,
  isTyping = false,
  displayedContent,
}: SystemMessageProps) {
  const displayContent = isTyping ? displayedContent || '' : content;
  const getSystemStyles = () => {
    switch (type) {
      case 'vote':
        return {
          container: 'bg-blue-500/10 border-blue-500/30',
          icon: '🗳️',
          title: 'Team Vote',
          titleColor: 'text-blue-400',
        };
      case 'alert':
        return {
          container: 'bg-orange-500/10 border-orange-500/30',
          icon: '⚠️',
          title: 'Drift Alert',
          titleColor: 'text-orange-400',
        };
      case 'card':
        return {
          container: 'bg-purple-500/10 border-purple-500/30',
          icon: '📋',
          title: 'Decision Summary',
          titleColor: 'text-purple-400',
        };
      default:
        return {
          container: 'bg-white/10 border-white/20',
          icon: '📎',
          title: 'System',
          titleColor: 'text-white/80',
        };
    }
  };

  const styles = getSystemStyles();

  return (
    <div className="w-full flex flex-col items-center">
      <div className={`max-w-[400px] md:max-w-[500px] w-fit flex flex-col gap-2 p-4 border ${styles.container} rounded-3xl`}>
        <div className="flex flex-row gap-2 items-center">
          <span className="text-lg">{styles.icon}</span>
          <div className="flex flex-1 flex-row justify-between items-center gap-10">
            <div className={`app-subheading ${styles.titleColor}`}>
              {styles.title}
            </div>
            <div className="app-eyebrow text-white/50">
              {time}
            </div>
          </div>
        </div>
        <div className="app-paragraph2 text-white/80 whitespace-pre-line">
          {displayContent}
          {isTyping && <span className="animate-pulse">|</span>}
        </div>
      </div>
    </div>
  );
}