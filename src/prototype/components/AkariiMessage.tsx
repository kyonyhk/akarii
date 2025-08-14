import { Logo } from '../../components/atoms';
import MarkdownContent from './MarkdownContent';

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
        className={`max-w-[500px] md:max-w-[600px] w-fit flex flex-col gap-3 p-4 border-white/10 bg-white/10 rounded-3xl`}
      >
        <div className="flex flex-row gap-2">
          <div className="w-4 md:w-6 h-4 md:h-6 flex items-center justify-center">
            <Logo size={16} className="md:hidden" />
            <Logo size={24} className="hidden md:block" />
          </div>
          <div className="flex flex-1 flex-row justify-between items-center gap-10">
            <div className="app-subheading text-white/">Akarii</div>
            <div className="app-eyebrow text-white/50">{time}</div>
          </div>
        </div>
        <div>
          <MarkdownContent content={content} />
        </div>
      </div>
    </div>
  );
}
