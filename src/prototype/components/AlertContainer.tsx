interface AlertContainerProps {
  content: string;
  alertType?: 'goal-drift' | 'sprint-check' | 'focus' | 'generic';
  className?: string;
}

export default function AlertContainer({ content, alertType, className = '' }: AlertContainerProps) {
  // Extract alert type from content to determine styling (only if not provided)
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

  // Extract the alert title from markdown content
  const getAlertTitle = (content: string): string => {
    // Look for patterns like "⚠️ **Goal Drift Alert**" or "📊 **Sprint Planning Check**"
    const titleMatch = content.match(/^.*?\*\*(.*?)\*\*/);
    if (titleMatch) {
      // Remove emoji and clean up
      return titleMatch[1].trim();
    }
    
    // Fallback: look for first line
    const firstLine = content.split('\n')[0].trim();
    return firstLine.replace(/[⚠️📊🔄]/g, '').replace(/\*\*/g, '').trim();
  };

  const finalAlertType = alertType || getAlertType(content);
  const alertTitle = getAlertTitle(content);

  // Define styling for each alert type based on Figma design
  const getAlertStyles = () => {
    switch (finalAlertType) {
      case 'goal-drift':
        return 'bg-red-500/10 border-red-500/30 text-red-400';
      case 'sprint-check':
        return 'bg-blue-500/10 border-blue-500/30 text-blue-400';
      case 'focus':
        return 'bg-orange-500/10 border-orange-500/30 text-orange-400';
      default:
        return 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400';
    }
  };

  return (
    <div className={`w-fit px-4 py-2 rounded-full border ${getAlertStyles()} ${className}`}>
      <div className="app-subheading font-medium">
        {alertTitle}
      </div>
    </div>
  );
}