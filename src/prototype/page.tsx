'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { SCENARIOS } from './data/scenarios';
import { useMessageSequencer } from './hooks/useMessageSequencer';
import {
  SettingsIcon,
  FileIcon,
  SpeechIcon,
  SendIcon,
  CloseIcon,
} from '../components/icons';
import UserMessage from './components/UserMessage';
import ParticipantMessage from './components/ParticipantMessage';
import AkariiMessage from './components/AkariiMessage';
import SystemMessage from './components/SystemMessage';
import TypingIndicator from './components/TypingIndicator';

export default function PrototypeChatPage() {
  // Prevent body scroll on mobile and hide scrollbars
  if (typeof window !== 'undefined') {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.height = '100%';
    document.documentElement.style.overflow = 'hidden';
  }

  // State management
  const [activeScenarioId, setActiveScenarioId] = useState(1);
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true);
  const [showContextPanel, setShowContextPanel] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCanvasOpen, setIsMobileCanvasOpen] = useState(false);
  const [inputTypingContent, setInputTypingContent] = useState('');
  const [isSendButtonAnimating, setIsSendButtonAnimating] = useState(false);

  // Get active scenario
  const scenarios = SCENARIOS;
  const activeScenario =
    scenarios.find((s) => s.id === activeScenarioId) || scenarios[0];

  // Get the current user name based on scenario
  const getCurrentUserName = (scenarioId: number) => {
    switch (scenarioId) {
      case 1:
        return 'Trish'; // Original scenario
      case 2:
        return 'Trish'; // Original scenario
      case 3:
        return 'Scott Wu'; // Cognition CEO
      case 4:
        return 'Jeff Wang'; // Windsurf CEO
      case 5:
        return 'Mike Krieger'; // Anthropic CPO
      case 6:
        return 'Kevin Weil'; // OpenAI CPO
      case 7:
        return 'Alex'; // Conductor Engineer
      case 8:
        return 'Dan'; // Every Editor
      case 9:
        return 'Priya'; // VC Partner
      case 10:
        return 'Harper'; // Podcast Producer
      default:
        return 'Trish';
    }
  };

  // Animation system
  const {
    messages,
    isPlaying,
    isComplete,
    typingIndicator,
    start: startAnimation,
    stop: stopAnimation,
    reset: resetAnimation,
  } = useMessageSequencer({
    scenario: activeScenario,
    autoPlay: true,
    onComplete: () => {
      console.log('Animation completed - staying on current scenario');
      // No auto-switching - user must manually select channels
    },
    onMessageStart: (message, index) => {
      console.log('Message started:', message.sender, index);
      // Auto-scroll to bottom when message starts
      scrollToBottom();
    },
    onMessageComplete: (message, index) => {
      console.log('Message completed:', message.sender, index);
    },
  });

  // Scroll management
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTo({
        top: messagesContainerRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  // Handle input typing animation for Trish
  const inputTypingTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastInputMessageIdRef = useRef<string | null>(null);
  const isInputTypingActiveRef = useRef(false);

  const startInputTyping = useCallback((content: string, messageId: string) => {
    if (
      isInputTypingActiveRef.current ||
      lastInputMessageIdRef.current === messageId
    ) {
      return; // Already typing this message
    }

    const startTime = Date.now();
    console.log(
      '🎯 Starting input typing for:',
      content,
      'ID:',
      messageId,
      'Length:',
      content.length,
      'Start time:',
      startTime
    );
    isInputTypingActiveRef.current = true;
    lastInputMessageIdRef.current = messageId;

    // Clear any existing timeout
    if (inputTypingTimeoutRef.current) {
      clearTimeout(inputTypingTimeoutRef.current);
    }

    let currentIndex = 0;
    const wpm = 180; // 1.5x faster human typing for demo (was 120)
    const charsPerMinute = wpm * 5;
    const charsPerSecond = charsPerMinute / 60;
    const baseDelay = 1000 / charsPerSecond;

    setInputTypingContent('');

    const typeInInput = () => {
      if (currentIndex < content.length) {
        const newContent = content.substring(0, currentIndex + 1);
        setInputTypingContent(newContent);
        currentIndex++;
        inputTypingTimeoutRef.current = setTimeout(
          typeInInput,
          baseDelay + Math.random() * 20
        );
      } else {
        const endTime = Date.now();
        const typingDuration = endTime - startTime;
        console.log(
          '✅ Input typing complete for:',
          content,
          'Duration:',
          typingDuration + 'ms',
          'End time:',
          endTime
        );
        // Trigger send button animation
        setIsSendButtonAnimating(true);
        setTimeout(() => {
          setIsSendButtonAnimating(false);
          console.log(
            '📤 Send button animation complete at:',
            Date.now(),
            '(+200ms from typing end)'
          );

          // Clear input immediately when send animation completes
          setInputTypingContent('');
          isInputTypingActiveRef.current = false;
          console.log('🧹 Input cleared immediately with send animation');

          // Trigger custom event to notify message sequencer
          window.dispatchEvent(
            new CustomEvent('userMessageSent', {
              detail: { messageId, content },
            })
          );
        }, 200);
      }
    };

    // Start typing immediately
    inputTypingTimeoutRef.current = setTimeout(typeInInput, 100);
  }, []); // No dependencies needed as content and messageId are parameters

  useEffect(() => {
    const currentUserName = getCurrentUserName(activeScenarioId);
    const currentInputTypingMessage = messages.find(
      (m) => m.inputTyping && m.isVisible && m.sender === currentUserName
    );

    console.log('🔍 Looking for input typing message:', {
      found: !!currentInputTypingMessage,
      messageId: currentInputTypingMessage?.id,
      content: currentInputTypingMessage?.content?.substring(0, 50) + '...',
      scenarioId: activeScenarioId,
      isTypingActive: isInputTypingActiveRef.current,
      lastMessageId: lastInputMessageIdRef.current,
    });

    if (currentInputTypingMessage && !isInputTypingActiveRef.current) {
      // Check if this message belongs to the current scenario
      const messageScenarioId = parseInt(
        currentInputTypingMessage.id.split('-')[0]
      );

      console.log('📝 Message scenario check:', {
        messageScenarioId,
        activeScenarioId,
        matches: messageScenarioId === activeScenarioId,
      });

      if (messageScenarioId === activeScenarioId) {
        startInputTyping(
          currentInputTypingMessage.content,
          currentInputTypingMessage.id
        );
      }
    }
  }, [messages, startInputTyping, activeScenarioId]);

  // Cleanup input typing timeout
  useEffect(() => {
    return () => {
      if (inputTypingTimeoutRef.current) {
        clearTimeout(inputTypingTimeoutRef.current);
      }
      isInputTypingActiveRef.current = false;
    };
  }, []);

  // Control functions
  const handleReplay = () => {
    // Clear input typing state
    if (inputTypingTimeoutRef.current) {
      clearTimeout(inputTypingTimeoutRef.current);
    }
    setInputTypingContent('');
    setIsSendButtonAnimating(false);
    isInputTypingActiveRef.current = false;
    lastInputMessageIdRef.current = null;

    resetAnimation();
    setTimeout(() => {
      startAnimation();
    }, 300);
  };

  // Channel to scenario mapping
  const getScenarioIdByChannel = (channel: string): number => {
    const channelToScenarioMap: { [key: string]: number } = {
      marketing: 1,
      'release-planning': 2,
      'exec-war-room': 3,
      'leadership-sync': 4,
      'launch-ops': 5,
      'war-room': 6,
      'product-design': 7,
      'launch-room': 8,
      'investment-review': 9,
      'show-run': 10,
    };
    return channelToScenarioMap[channel] || 1;
  };

  // Handle channel click
  const handleChannelClick = (channel: string) => {
    const scenarioId = getScenarioIdByChannel(channel);
    handleScenarioSwitch(scenarioId);
  };

  // Scenario switching
  const handleScenarioSwitch = (scenarioId: number) => {
    if (scenarioId === activeScenarioId) return;

    console.log(
      '🔄 Switching to scenario',
      scenarioId,
      'from',
      activeScenarioId
    );

    // Stop current animation first
    stopAnimation();

    // Clear input typing state thoroughly
    if (inputTypingTimeoutRef.current) {
      clearTimeout(inputTypingTimeoutRef.current);
      inputTypingTimeoutRef.current = null;
    }
    setInputTypingContent('');
    setIsSendButtonAnimating(false);
    isInputTypingActiveRef.current = false;
    lastInputMessageIdRef.current = null;

    console.log('🧹 Cleared all state for clean scenario switch');

    // Switch scenario
    setActiveScenarioId(scenarioId);
    // Animation will auto-start due to scenario change via useEffect
  };

  const handleContextPanelToggle = () => {
    if (isContextPanelOpen) {
      // Closing: hide panel immediately, then update layout
      setShowContextPanel(false);
      setIsContextPanelOpen(false);
    } else {
      // Opening: update layout first, then show panel after delay
      setIsContextPanelOpen(true);
      setTimeout(() => {
        setShowContextPanel(true);
      }, 400); // Start panel animation 20% before message container ends (400ms instead of 500ms)
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileCanvasToggle = () => {
    setIsMobileCanvasOpen(!isMobileCanvasOpen);
  };

  // Dynamic context content based on scenario
  const getScenarioContext = () => {
    switch (activeScenarioId) {
      case 1:
        return {
          title: 'Chosen Path',
          content: {
            option: 'Option C - Targeted Paid Ads',
            pros: ['Controlled spend', 'Measurable ROI', 'Quick turnaround'],
            cons: ['Smaller audience than A', 'Requires strong creative'],
            metric: 'Track conversion rates and cost per acquisition',
            owners: [
              { name: 'Sam', role: 'CTO', avatar: 'gray' },
              { name: 'Trish', role: 'Marketing', avatar: 'gray' },
            ],
          },
        };
      case 2:
        return {
          title: 'Decision Recap',
          content: {
            option: 'Option C - Staged rollout by usage tier',
            pros: ['Risk control', 'Faster feedback', 'High-value segments'],
            cons: ['Complex rollout', 'Monitoring overhead'],
            metric: 'Deploy v2.1 to Production by Sept 30',
            owners: [
              { name: 'Sam', role: 'CTO', avatar: 'gray' },
              { name: 'Trish', role: 'Release Lead', avatar: 'gray' },
            ],
          },
        };
      case 3:
        return {
          title: 'Strategic Decision',
          content: {
            option: 'Phased integration approach',
            pros: [
              'Core velocity protected',
              'Retention packages secured',
              'Clear metrics checkpoint',
            ],
            cons: [
              'Delayed full integration',
              'Complex dual-stream management',
            ],
            metric: 'Maintain Stability & Core Product Velocity',
            owners: [
              { name: 'Sam', role: 'CTO', avatar: 'gray' },
              { name: 'Trish', role: 'CEO', avatar: 'gray' },
            ],
          },
        };
      case 4:
        return {
          title: 'Strategic Response',
          content: {
            option: 'Negotiate phased integration timeline',
            pros: [
              'Compiler expertise preserved',
              'Reduced attrition risk',
              'Better long-term outcomes',
            ],
            cons: [
              'Slower Cognition integration',
              'Complex coordination needed',
            ],
            metric: 'Protect Core Tech and Team Stability',
            owners: [
              { name: 'Sam', role: 'CTO', avatar: 'gray' },
              { name: 'Trish', role: 'CEO', avatar: 'gray' },
            ],
          },
        };
      case 5:
        return {
          title: 'Launch Strategy',
          content: {
            option: 'Launch today ahead of GPT-5',
            pros: [
              'First-mover advantage',
              '2-3 days dominant coverage',
              'Set benchmark framing',
            ],
            cons: ['Compressed final QA', 'Risk of rushed messaging'],
            metric: 'Maximize Claude 4.1 Opus Market Impact',
            owners: [
              { name: 'Sam', role: 'President', avatar: 'gray' },
              { name: 'Trish', role: 'CPO', avatar: 'gray' },
            ],
          },
        };
      case 6:
        return {
          title: 'Competitive Response',
          content: {
            option: 'T+24h teaser, T+48h full keynote',
            pros: [
              'Counter Claude momentum',
              'Preserve keynote quality',
              'Media briefings today',
            ],
            cons: [
              'Compressed timeline',
              'Limited teaser content',
              'Higher execution risk',
            ],
            metric: 'Maximize GPT-5 Launch Impact',
            owners: [
              { name: 'Sam', role: 'CMO', avatar: 'gray' },
              { name: 'Trish', role: 'CPO', avatar: 'gray' },
            ],
          },
        };
      case 7:
        return {
          title: 'UI Design Strategy',
          content: {
            option: 'User-friendly multi-agent flow',
            pros: [
              'Clear step-by-step process',
              'Non-technical user friendly',
              'Action verbs for control',
            ],
            cons: ['More complex navigation', 'Additional UI states'],
            metric: 'Ship a friendly multi-agent UI',
            owners: [
              { name: 'Alex', role: 'Engineer', avatar: 'gray' },
              { name: 'Jamie', role: 'Designer', avatar: 'gray' },
            ],
          },
        };
      case 8:
        return {
          title: 'Launch Execution',
          content: {
            option: 'Headline #1 with coordinated assets',
            pros: [
              'Clear thought-leadership angle',
              'Coordinated launch assets',
              'Accessibility considerations',
            ],
            cons: ['Compressed timeline', 'Multiple deliverables'],
            metric: "Ship today's newsletter and tool launch",
            owners: [
              { name: 'Dan', role: 'Editor', avatar: 'gray' },
              { name: 'Mira', role: 'Writer', avatar: 'gray' },
            ],
          },
        };
      case 9:
        return {
          title: 'Investment Decision',
          content: {
            option: 'Focus on sub-10ms optimization edge',
            pros: [
              'Clear technical differentiator',
              'Hard to replicate advantage',
              'Market size validation',
            ],
            cons: ['Competitive landscape risks', 'Execution complexity'],
            metric: 'Decide whether to advance an AI logistics deal',
            owners: [
              { name: 'Priya', role: 'Partner', avatar: 'gray' },
              { name: 'Leo', role: 'Associate', avatar: 'gray' },
            ],
          },
        };
      case 10:
        return {
          title: 'Episode Planning',
          content: {
            option: 'Structured flow with strong openers',
            pros: [
              'Balanced narrative depth',
              'Strong opener questions',
              'Social media ready',
            ],
            cons: ['Guest coordination needed', 'Multiple asset creation'],
            metric: 'Lock outline, questions, and promo copy',
            owners: [
              { name: 'Harper', role: 'Producer', avatar: 'gray' },
              { name: 'Lenny', role: 'Host', avatar: 'gray' },
            ],
          },
        };
      default:
        return {
          title: 'Chosen Path',
          content: {
            option: 'Option C - Targeted Paid Ads',
            pros: ['Controlled spend', 'Measurable ROI', 'Quick turnaround'],
            cons: ['Smaller audience than A', 'Requires strong creative'],
            metric: 'Track conversion rates and cost per acquisition',
            owners: [
              { name: 'Sam', role: 'CTO', avatar: 'gray' },
              { name: 'Trish', role: 'Marketing', avatar: 'gray' },
            ],
          },
        };
    }
  };

  const scenarioContext = getScenarioContext();
  const currentUserName = getCurrentUserName(activeScenarioId);

  return (
    <div className="h-screen bg-black overflow-hidden relative fixed inset-0">
      {/* Mobile Navigation Row - Only visible on mobile */}
      <div className="md:hidden absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-4">
        <button
          onClick={handleMobileMenuToggle}
          className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-full app-heading text-white"
        >
          <span>Menu</span>
          <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
        </button>

        <button
          onClick={handleMobileCanvasToggle}
          className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-full app-heading text-white"
        >
          <span>+</span>
          <span>Canvas</span>
        </button>
      </div>

      {/* Left Sidebar - Hidden on mobile, positioned absolutely on desktop */}
      <div className="hidden md:flex absolute left-6 top-6 bottom-6 w-[300px] flex-col gap-4 z-30">
        {/* User Profile Header */}
        <div className="py-2 pl-2 pr-4 bg-white/1 border border-white/5 rounded-[40px]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-600"></div>
            <span className="app-subheading opacity-70">
              {getCurrentUserName(activeScenarioId)}
            </span>
            <div className="ml-auto">
              <SettingsIcon
                size={20}
                className="opacity-50 hover:opacity-100 cursor-pointer"
                color="#DBDBDB"
              />
            </div>
          </div>
        </div>

        {/* Channels Section */}
        <div className="flex-1 flex flex-col gap-10 px-4 py-6 border border-white/5 rounded-[40px]">
          <div className="flex flex-col gap-4">
            <h3 className="app-subheading text-white/70 pl-2">Channels</h3>
            <div className="space-y-2">
              {[
                'marketing',
                'release-planning',
                'exec-war-room',
                'leadership-sync',
                'launch-ops',
                'war-room',
                'product-design',
                'launch-room',
                'investment-review',
                'show-run',
              ].map((channel) => (
                <div
                  key={channel}
                  onClick={() => handleChannelClick(channel)}
                  className={`px-4 py-3 rounded-[40px] app-paragraph2 cursor-pointer transition-all ${
                    activeScenario.thread.channel === channel
                      ? 'bg-white/10 border border-white/20 text-white'
                      : 'text-white/50 bg-white/1 border border-white/5 hover:bg-white/5 hover:border-white/10'
                  }`}
                >
                  {channel}
                </div>
              ))}
            </div>
          </div>

          {/* DMs Section */}
          <div className="flex flex-col gap-4">
            <h3 className="app-subheading text-white/70 pl-2">
              Direct Messages
            </h3>
            <div className="space-y-2">
              <div className="flex items-center py-2 pl-2 pr-4 gap-2 app-paragraph2 border border-white/10 bg-white/1 hover:bg-white/5 text-gray-400 rounded-[40px] cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                <div className="flex-1 flex flex-row justify-between items-baseline">
                  <span>Sam</span>
                  <span className="app-support">CTO</span>
                </div>
              </div>

              <div className="flex items-center py-2 pl-2 pr-4 gap-2 app-paragraph2 border border-white/10 bg-white/1 hover:bg-white/5 text-gray-400 rounded-[40px] cursor-pointer">
                <div className="w-6 h-6 rounded-full bg-orange-500"></div>
                <div className="flex-1 flex flex-row justify-between items-baseline">
                  <span>Eli</span>
                  <span className="app-support">CTO</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Center Chat Area - Responsive layout */}
      <div
        className={`absolute inset-0 transition-all duration-500 ease-out ${
          // Desktop dynamic positioning via classes
          isContextPanelOpen
            ? 'md:left-[330px] md:right-[410px]'
            : 'md:left-[330px] md:right-0'
        }`}
      >
        {/* Bottom Layer: Messages Container (Full Height) */}
        <div
          ref={messagesContainerRef}
          className="absolute inset-0 overflow-y-auto scrollbar-hide"
          id="messages-container"
        >
          <div
            id="messages-list"
            className="flex flex-col space-y-2 min-h-full justify-end px-6 pt-[140px] md:pt-20 pb-20 md:pb-20"
          >
            {/* Render animated messages */}
            {messages.map((message) => {
              if (!message.isVisible) return null;

              // Skip user's messages when they're in input typing mode
              if (message.sender === currentUserName && message.inputTyping) {
                return null;
              }

              if (message.sender === currentUserName) {
                return (
                  <UserMessage
                    key={message.id}
                    username={message.sender}
                    time={message.timestamp || ''}
                    userMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              } else if (message.sender === 'Sam') {
                return (
                  <ParticipantMessage
                    key={message.id}
                    username={message.sender}
                    time={message.timestamp || ''}
                    participantMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              } else if (message.sender === 'Akarii') {
                return (
                  <AkariiMessage
                    key={message.id}
                    time={message.timestamp || ''}
                    akariiMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                    messageType={message.type as 'rich' | 'card' | 'alert'}
                  />
                );
              } else if (message.sender === 'System') {
                return (
                  <SystemMessage
                    key={message.id}
                    time={message.timestamp || ''}
                    content={message.content}
                    type={message.type as 'vote' | 'alert' | 'card'}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              } else if (message.role === 'human') {
                // Handle other human participants
                return (
                  <ParticipantMessage
                    key={message.id}
                    username={message.sender}
                    time={message.timestamp || ''}
                    participantMessage={message.content}
                    isTyping={message.isTyping}
                    displayedContent={message.displayedContent}
                  />
                );
              }
              return null;
            })}

            {/* Typing Indicator */}
            {typingIndicator && (
              <TypingIndicator
                sender={typingIndicator.sender}
                role={typingIndicator.role}
                isVisible={typingIndicator.isVisible}
                currentUser={currentUserName}
              />
            )}
          </div>
        </div>

        {/* Middle Layer: Gradient Overlays */}
        <div className="absolute inset-0 pointer-events-none z-10">
          {/* Top Gradient - Mobile: Cover nav + header area, Desktop: Standard height */}
          <div
            className="absolute top-0 left-0 right-0 h-[180px] md:h-[140px]"
            style={{
              background:
                'linear-gradient(180deg, rgba(10, 10, 10, 0.80) 50%, rgba(10, 10, 10, 0.00) 100%)',
            }}
          />

          {/* Bottom Gradient - Mobile: Cover input area, Desktop: Standard height */}
          <div
            className="absolute bottom-0 left-0 right-0 h-30 md:h-16"
            style={{
              background:
                'linear-gradient(180deg, rgba(10, 10, 10, 0.00) 0%, rgba(10, 10, 10, 0.80) 100%)',
            }}
          />
        </div>

        {/* Mobile Chat Header Container - 8px below navigation */}
        <div className="md:hidden absolute top-[64px] left-4 right-4 z-30 pointer-events-auto">
          <div className="px-6 py-3 bg-white/1 border border-white/10 text-white/80 flex flex-row items-center justify-between rounded-[40px] backdrop-blur-sm">
            <div className="app-subheading text-white/70 mb-1">
              #{activeScenario.thread.channel || 'general'}
            </div>
            <div className="app-paragraph2 text-white">
              {activeScenario.thread.title}
            </div>
          </div>
        </div>

        {/* Top Layer: UI Elements */}
        <div className="relative z-20 flex flex-col h-full pointer-events-none">
          {/* Desktop Chat Header Row - Hidden on mobile */}
          <div className="hidden md:flex items-center gap-4 pointer-events-auto p-6">
            {/* Chat Header */}
            <div className="flex-1 px-6 py-3 bg-white/1 border border-white/10 text-white/80 flex items-center justify-between rounded-[40px] backdrop-blur-sm">
              <div className="flex items-center gap-2">
                <span className="app-heading">
                  #{activeScenario.thread.channel || 'general'}
                </span>
              </div>
              {/* Thread context */}
              <div className="app-paragraph2 text-white/50">
                {activeScenario.thread.title}
                {activeScenario.thread.goal && (
                  <span className="ml-2 px-2 py-1 bg-blue-500/10 text-blue-400 rounded-[40px] app-support">
                    Goal: {activeScenario.thread.goal}
                  </span>
                )}
              </div>
            </div>

            {/* Context Panel Toggle Button - Outside header with 16px gap */}
            {!isContextPanelOpen && (
              <button
                onClick={handleContextPanelToggle}
                className="w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 flex items-center justify-center cursor-pointer transition-all flex-shrink-0"
              >
                <span className="text-white/80 text-app-heading">+</span>
              </button>
            )}
          </div>

          {/* Spacer to push input to bottom */}
          <div className="flex-1"></div>

          {/* Message Input Area */}
          <div className="flex items-start gap-1 md:gap-2 pointer-events-auto px-2 md:px-6 pb-7 md:pb-6">
            <div className="w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border border-white/10 bg-white/1 backdrop-blur-sm rounded-[40px] hover:bg-white/5 cursor-pointer">
              <FileIcon
                size={16}
                className="opacity-50 md:w-5 md:h-5"
                color="#DBDBDB"
              />
            </div>
            <div className="min-h-10 md:min-h-12 flex items-center flex-1 bg-white/1 border border-white/10 rounded-[40px] px-4 py-2 backdrop-blur-sm">
              {inputTypingContent ? (
                <div className="w-full app-paragraph2 text-white/80 leading-relaxed">
                  {inputTypingContent}
                  <span className="animate-pulse ml-1">|</span>
                </div>
              ) : (
                <input
                  type="text"
                  placeholder="Type a message..."
                  className="w-full bg-transparent outline-none app-paragraph2 p-0 border-none text-white/50"
                  disabled
                />
              )}
            </div>
            <div className="w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border border-white/10 bg-white/1 backdrop-blur-sm rounded-[40px] hover:bg-white/5 cursor-pointer">
              <SpeechIcon
                size={16}
                className="opacity-50 md:w-5 md:h-5"
                color="#DBDBDB"
              />
            </div>
            <div
              className={`w-10 md:w-12 h-10 md:h-12 flex flex-col justify-center items-center border backdrop-blur-sm rounded-[40px] cursor-pointer transition-all duration-200 ${
                isSendButtonAnimating
                  ? 'bg-white/20 border-white/40 scale-110'
                  : 'bg-white/1 border-white/10 hover:bg-white/5'
              }`}
            >
              <SendIcon
                size={16}
                className={`md:w-5 md:h-5 transition-all duration-200 ${
                  isSendButtonAnimating ? 'opacity-100' : 'opacity-50'
                }`}
                color={isSendButtonAnimating ? '#FFFFFF' : '#DBDBDB'}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Right Sidebar - Context Panel - Hidden on mobile, positioned absolutely on desktop */}
      {showContextPanel && (
        <div
          className="hidden md:flex absolute right-6 top-6 bottom-6 w-[380px] flex-col justify-between bg-white/5 border border-white/10 px-4 pt-14 pb-4 rounded-[40px] z-30"
          style={{
            animation: 'panelSlideIn 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        >
          {/* Close Icon */}
          <div
            onClick={handleContextPanelToggle}
            className="absolute top-4 left-1/2 transform -translate-x-1/2 hover:opacity-100 opacity-50 cursor-pointer"
          >
            <CloseIcon
              size={16}
              color="#DBDBDB"
            />
          </div>

          <div className="space-y-6">
            {/* Dynamic Decision Section */}
            <div>
              <h3 className="app-h1 text-white/80 mb-3">
                {scenarioContext.title}
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="app-h3 text-white/80 mb-1">
                    {scenarioContext.content.option}
                  </div>
                </div>

                <div>
                  <h4 className="app-h3 text-white/70 mb-1">Pros</h4>
                  <div className="app-p text-white/50 space-y-1">
                    {scenarioContext.content.pros.map((pro, index) => (
                      <div key={index}>• {pro}</div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="app-h3 text-white/70 mb-1">Cons</h4>
                  <div className="app-p text-white/50 space-y-1">
                    {scenarioContext.content.cons.map((con, index) => (
                      <div key={index}>• {con}</div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Success Metric */}
            <div>
              <h4 className="app-h3 text-white/70 mb-1">
                {activeScenarioId === 1
                  ? 'Success Metric'
                  : activeScenarioId === 2
                    ? 'Target Goal'
                    : 'Strategic Goal'}
              </h4>
              <div className="app-p text-white/50">
                {scenarioContext.content.metric}
              </div>
            </div>

            {/* Owners */}
            <div className="flex flex-col	gap-2">
              <h4 className="app-subheading text-white/80">Owners</h4>
              <div className="space-y-1">
                {scenarioContext.content.owners.map((owner, index) => (
                  <div
                    key={index}
                    className="flex items-center py-2 pl-2 pr-4 gap-2 app-paragraph2 border border-white/10 bg-white/1 hover:bg-white/5 text-gray-400 rounded-[40px] cursor-pointer"
                  >
                    <div className="w-6 h-6 rounded-full bg-gray-600"></div>
                    <div className="flex-1 flex flex-row justify-between items-baseline">
                      <span>{owner.name}</span>
                      <span className="app-support">{owner.role}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Action */}
          <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-[40px] app-paragraph1 text-white/50 border border-white/10 cursor-pointer">
            Create Tickets
          </button>
        </div>
      )}

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur">
          <div className="p-6">
            {/* Close button */}
            <div className="flex justify-between items-center mb-6">
              <span className="app-heading text-white">Menu</span>
              <button
                onClick={handleMobileMenuToggle}
                className="w-8 h-8 flex items-center justify-center text-white/70"
              >
                ✕
              </button>
            </div>

            {/* Menu content - Copy from left sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="app-subheading text-white/70 mb-4">Channels</h3>
                <div className="space-y-2">
                  {[
                    'marketing',
                    'release-planning',
                    'exec-war-room',
                    'leadership-sync',
                    'launch-ops',
                    'war-room',
                    'product-design',
                    'launch-room',
                    'investment-review',
                    'show-run',
                  ].map((channel) => (
                    <div
                      key={channel}
                      onClick={() => {
                        handleChannelClick(channel);
                        handleMobileMenuToggle(); // Close mobile menu after selection
                      }}
                      className={`px-4 py-4 rounded-[40px] app-paragraph2 cursor-pointer transition-all ${
                        activeScenario.thread.channel === channel
                          ? 'bg-white/10 border border-white/20 text-white'
                          : 'text-white/50 bg-white/1 border border-white/5 hover:bg-white/5 hover:border-white/10'
                      }`}
                    >
                      {channel}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="app-subheading text-white/70 mb-4">
                  Direct Messages
                </h3>
                <div className="space-y-2">
                  <div className="flex items-center py-2 pl-2 pr-4 gap-2 app-paragraph2 border border-white/10 bg-white/1 text-gray-400 rounded-[40px]">
                    <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                    <div className="flex-1 flex flex-row justify-between items-baseline">
                      <span>Sam</span>
                      <span className="app-support">CTO</span>
                    </div>
                  </div>
                  <div className="flex items-center py-2 pl-2 pr-4 gap-2 app-paragraph2 border border-white/10 bg-white/1 text-gray-400 rounded-[40px]">
                    <div className="w-8 h-8 rounded-full bg-orange-500"></div>
                    <div className="flex-1 flex flex-row justify-between items-baseline">
                      <span>Eli</span>
                      <span className="app-support">CTO</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Canvas Overlay */}
      {isMobileCanvasOpen && (
        <div className="md:hidden fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
          <div className="p-6">
            {/* Close button */}
            <div className="flex justify-between items-center mb-6">
              <span className="app-heading text-white">Canvas</span>
              <button
                onClick={handleMobileCanvasToggle}
                className="w-8 h-8 flex items-center justify-center text-white/70"
              >
                ✕
              </button>
            </div>

            {/* Canvas content - Copy from right sidebar */}
            <div className="space-y-6">
              <div>
                <h3 className="app-h1 text-white/80 mb-3">
                  {scenarioContext.title}
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="app-h3 text-white/80 mb-1">
                      {scenarioContext.content.option}
                    </div>
                  </div>

                  <div>
                    <h4 className="app-h3 text-white/70 mb-1">Pros</h4>
                    <div className="app-p text-white/50 space-y-1">
                      {scenarioContext.content.pros.map((pro, index) => (
                        <div key={index}>• {pro}</div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="app-h3 text-white/70 mb-1">Cons</h4>
                    <div className="app-p text-white/50 space-y-1">
                      {scenarioContext.content.cons.map((con, index) => (
                        <div key={index}>• {con}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 className="app-h3 text-white/70 mb-1">
                  {activeScenarioId === 1
                    ? 'Success Metric'
                    : activeScenarioId === 2
                      ? 'Target Goal'
                      : 'Strategic Goal'}
                </h4>
                <div className="app-p text-white/50">
                  {scenarioContext.content.metric}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <h4 className="app-subheading text-white/80">Owners</h4>
                <div className="space-y-2">
                  {scenarioContext.content.owners.map((owner, index) => (
                    <div
                      key={index}
                      className="flex items-center py-2 pl-2 pr-4 gap-2 app-paragraph2 border border-white/10 bg-white/1 text-gray-400 rounded-[40px]"
                    >
                      <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                      <div className="flex-1 flex flex-row justify-between items-baseline">
                        <span>{owner.name}</span>
                        <span className="app-support">{owner.role}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Development Info - Hidden for recording */}
      <div className="hidden fixed top-4 right-4 bg-black/90 text-white p-3 rounded-[12px] text-xs opacity-75 z-50 border border-white/20">
        <div>Scenarios: {scenarios.length} loaded</div>
        <div>Active: Scenario {activeScenarioId}</div>
        <div>
          Status: {isPlaying ? 'Playing' : isComplete ? 'Complete' : 'Ready'}
        </div>
        <div>
          Messages: {messages.filter((m) => m.isVisible).length}/
          {messages.length}
        </div>
        <div className="text-green-400">✓ Animation Ready</div>
      </div>

      {/* Scenario Selector - Hidden for auto-play demo */}
      <div className="hidden fixed bottom-4 left-4 bg-black/80 border border-white/20 p-3 rounded-[20px] backdrop-blur-sm z-50">
        <div className="app-support text-gray-400 mb-2">Scenario</div>
        <div className="flex gap-2">
          {scenarios.map((scenario) => (
            <button
              key={scenario.id}
              onClick={() => handleScenarioSwitch(scenario.id)}
              className={`px-3 py-2 rounded-[12px] app-support transition-all ${
                activeScenarioId === scenario.id
                  ? 'bg-white/20 text-white border border-white/30'
                  : 'bg-white/5 text-gray-400 border border-white/10 hover:bg-white/10 hover:text-gray-300'
              }`}
            >
              {scenario.id}
            </button>
          ))}
        </div>
        <div className="app-support text-gray-500 mt-2 max-w-[200px]">
          {activeScenario.name}
        </div>
      </div>

      {/* Replay Controls - Hidden for auto-play demo */}
      <div className="hidden fixed md:bottom-4 md:right-4 top-16 left-1/2 transform -translate-x-1/2 md:transform-none md:left-auto md:top-auto bg-black/80 border border-white/20 p-3 rounded-[20px] backdrop-blur-sm z-50">
        <div className="flex items-center gap-3">
          <div className="app-support text-gray-400">
            {isPlaying ? 'Playing...' : isComplete ? 'Complete' : 'Ready'}
          </div>
          <div className="flex gap-2">
            {!isPlaying && (
              <button
                onClick={startAnimation}
                className="px-4 py-2 bg-green-600/20 text-green-400 border border-green-500/30 rounded-[12px] app-support hover:bg-green-600/30 transition-all"
              >
                ▶ Play
              </button>
            )}
            {isPlaying && (
              <button
                onClick={stopAnimation}
                className="px-4 py-2 bg-red-600/20 text-red-400 border border-red-500/30 rounded-[12px] app-support hover:bg-red-600/30 transition-all"
              >
                ⏸ Stop
              </button>
            )}
            <button
              onClick={handleReplay}
              className="px-4 py-2 bg-blue-600/20 text-blue-400 border border-blue-500/30 rounded-[12px] app-support hover:bg-blue-600/30 transition-all"
            >
              ↻ Replay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
