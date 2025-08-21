'use client';

import { useState, useEffect } from 'react';
import ChatDemoFull from '../../components/demo/ChatDemoFull';
import { SettingsIcon, CloseIcon } from '../../components/icons';

export default function TeaserVideoPage() {
  const [isReady, setIsReady] = useState(false);
  const [currentScenario, setCurrentScenario] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [restartKey, setRestartKey] = useState(0);
  const [isContextPanelOpen, setIsContextPanelOpen] = useState(true);
  const [showContextPanel, setShowContextPanel] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCanvasOpen, setIsMobileCanvasOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [containerWidth, setContainerWidth] = useState(1400);
  const [containerHeight, setContainerHeight] = useState(900);
  const [mobileWidth, setMobileWidth] = useState(400);
  const [mobileHeight, setMobileHeight] = useState(700);

  // Scenario-specific team members with darker, muted colors
  const scenarioTeamMembers = [
    // Scenario 1: Team Collaboration with AI
    [
      {
        name: 'Sarah',
        role: 'Product Lead',
        color: 'bg-slate-600',
        borderColor: 'border-slate-600',
        bgColor: 'bg-slate-600/20',
      },
      {
        name: 'Marcus',
        role: 'CTO',
        color: 'bg-blue-600',
        borderColor: 'border-blue-600',
        bgColor: 'bg-blue-600/20',
      },
      {
        name: 'Elena',
        role: 'Designer',
        color: 'bg-orange-600',
        borderColor: 'border-orange-600',
        bgColor: 'bg-orange-600/20',
      },
    ],
    // Scenario 2: Goal-Aligned Discussions
    [
      {
        name: 'Marcus',
        role: 'CTO',
        color: 'bg-blue-600',
        borderColor: 'border-blue-600',
        bgColor: 'bg-blue-600/20',
      },
      {
        name: 'Lisa',
        role: 'Marketing',
        color: 'bg-purple-600',
        borderColor: 'border-purple-600',
        bgColor: 'bg-purple-600/20',
      },
      {
        name: 'Ryan',
        role: 'Developer',
        color: 'bg-green-600',
        borderColor: 'border-green-600',
        bgColor: 'bg-green-600/20',
      },
    ],
    // Scenario 3: Decision Memory
    [
      {
        name: 'Elena',
        role: 'Designer',
        color: 'bg-orange-600',
        borderColor: 'border-orange-600',
        bgColor: 'bg-orange-600/20',
      },
      {
        name: 'Carlos',
        role: 'Engineer',
        color: 'bg-red-600',
        borderColor: 'border-red-600',
        bgColor: 'bg-red-600/20',
      },
      {
        name: 'Zoe',
        role: 'Developer',
        color: 'bg-yellow-600',
        borderColor: 'border-yellow-600',
        bgColor: 'bg-yellow-600/20',
      },
    ],
    // Scenario 4: Smart AI Intervention
    [
      {
        name: 'David',
        role: 'PM',
        color: 'bg-green-600',
        borderColor: 'border-green-600',
        bgColor: 'bg-green-600/20',
      },
      {
        name: 'Amy',
        role: 'Engineer',
        color: 'bg-pink-600',
        borderColor: 'border-pink-600',
        bgColor: 'bg-pink-600/20',
      },
      {
        name: 'Josh',
        role: 'Developer',
        color: 'bg-blue-500',
        borderColor: 'border-blue-500',
        bgColor: 'bg-blue-500/20',
      },
      {
        name: 'Sam',
        role: 'Developer',
        color: 'bg-teal-600',
        borderColor: 'border-teal-600',
        bgColor: 'bg-teal-600/20',
      },
    ],
    // Scenario 5: Context Preservation Across Time
    [
      {
        name: 'Mike Krieger',
        role: 'CPO',
        color: 'bg-indigo-600',
        borderColor: 'border-indigo-600',
        bgColor: 'bg-indigo-600/20',
      },
      {
        name: 'Jessica',
        role: 'Designer',
        color: 'bg-pink-500',
        borderColor: 'border-pink-500',
        bgColor: 'bg-pink-500/20',
      },
      {
        name: 'Tommy',
        role: 'Engineer',
        color: 'bg-cyan-600',
        borderColor: 'border-cyan-600',
        bgColor: 'bg-cyan-600/20',
      },
    ],
    // Scenario 6: Cross-Team Shared Intelligence
    [
      {
        name: 'Kevin Weil',
        role: 'VP Product',
        color: 'bg-purple-700',
        borderColor: 'border-purple-700',
        bgColor: 'bg-purple-700/20',
      },
      {
        name: 'Lisa Chen',
        role: 'Marketing',
        color: 'bg-purple-600',
        borderColor: 'border-purple-600',
        bgColor: 'bg-purple-600/20',
      },
      {
        name: 'Alex Rodriguez',
        role: 'Engineering',
        color: 'bg-red-600',
        borderColor: 'border-red-600',
        bgColor: 'bg-red-600/20',
      },
      {
        name: 'Sarah Kim',
        role: 'Support',
        color: 'bg-green-500',
        borderColor: 'border-green-500',
        bgColor: 'bg-green-500/20',
      },
    ],
    // Scenario 7: Preventing Knowledge Loss
    [
      {
        name: 'Alex',
        role: 'Engineer',
        color: 'bg-pink-600',
        borderColor: 'border-pink-600',
        bgColor: 'bg-pink-600/20',
      },
      {
        name: 'Dan',
        role: 'DevOps',
        color: 'bg-orange-500',
        borderColor: 'border-orange-500',
        bgColor: 'bg-orange-500/20',
      },
      {
        name: 'Sam',
        role: 'Backend',
        color: 'bg-teal-600',
        borderColor: 'border-teal-600',
        bgColor: 'bg-teal-600/20',
      },
    ],
    // Scenario 8: Intelligence Layer - Context Tracking
    [
      {
        name: 'Priya',
        role: 'Product',
        color: 'bg-violet-600',
        borderColor: 'border-violet-600',
        bgColor: 'bg-violet-600/20',
      },
      {
        name: 'Harper',
        role: 'Developer',
        color: 'bg-yellow-600',
        borderColor: 'border-yellow-600',
        bgColor: 'bg-yellow-600/20',
      },
      {
        name: 'Leo',
        role: 'Engineer',
        color: 'bg-blue-700',
        borderColor: 'border-blue-700',
        bgColor: 'bg-blue-700/20',
      },
    ],
    // Scenario 9: Multiplayer Chat - Shared Context
    [
      {
        name: 'Harper',
        role: 'Developer',
        color: 'bg-yellow-600',
        borderColor: 'border-yellow-600',
        bgColor: 'bg-yellow-600/20',
      },
      {
        name: 'Cole',
        role: 'Designer',
        color: 'bg-emerald-600',
        borderColor: 'border-emerald-600',
        bgColor: 'bg-emerald-600/20',
      },
      {
        name: 'Mira',
        role: 'Backend',
        color: 'bg-slate-600',
        borderColor: 'border-slate-600',
        bgColor: 'bg-slate-600/20',
      },
      {
        name: 'Leo',
        role: 'Mobile',
        color: 'bg-blue-700',
        borderColor: 'border-blue-700',
        bgColor: 'bg-blue-700/20',
      },
    ],
    // Scenario 10: Meeting Drift Prevention
    [
      {
        name: 'Dan',
        role: 'Team Lead',
        color: 'bg-orange-500',
        borderColor: 'border-orange-500',
        bgColor: 'bg-orange-500/20',
      },
      {
        name: 'Maya',
        role: 'Frontend',
        color: 'bg-rose-600',
        borderColor: 'border-rose-600',
        bgColor: 'bg-rose-600/20',
      },
      {
        name: 'Ryan',
        role: 'Backend',
        color: 'bg-green-600',
        borderColor: 'border-green-600',
        bgColor: 'bg-green-600/20',
      },
    ],
    // Scenario 11: Distributed Team Knowledge Sharing
    [
      {
        name: 'Elena',
        role: 'Designer',
        color: 'bg-orange-600',
        borderColor: 'border-orange-600',
        bgColor: 'bg-orange-600/20',
      },
      {
        name: 'Leo',
        role: 'Stockholm',
        color: 'bg-blue-700',
        borderColor: 'border-blue-700',
        bgColor: 'bg-blue-700/20',
      },
      {
        name: 'Josh',
        role: 'Tokyo',
        color: 'bg-blue-500',
        borderColor: 'border-blue-500',
        bgColor: 'bg-blue-500/20',
      },
    ],
  ];

  const currentTeamMembers =
    scenarioTeamMembers[currentScenario] || scenarioTeamMembers[0];

  // Get scenario-specific data from the SCENARIOS array
  const getScenarioData = (scenarioIndex: number) => {
    const SCENARIOS = [
      { pov: 'Sarah', channel: 'product' },
      { pov: 'Marcus', channel: 'marketing' },
      { pov: 'Elena', channel: 'engineering' },
      { pov: 'David', channel: 'dev-team' },
      { pov: 'Mike Krieger', channel: 'design' },
      { pov: 'Kevin Weil', channel: 'launch-planning' },
      { pov: 'Alex', channel: 'incident-response' },
      { pov: 'Priya', channel: 'product-strategy' },
      { pov: 'Harper', channel: 'project-coordination' },
      { pov: 'Dan', channel: 'dev-standup' },
      { pov: 'Elena', channel: 'global-sync' },
    ];
    return SCENARIOS[scenarioIndex] || SCENARIOS[0];
  };

  const currentScenarioData = getScenarioData(currentScenario);

  // Generate channels list with current scenario's channel first
  const generateChannels = (primaryChannel: string) => {
    const baseChannels = ['memes', 'general', 'announcements'];
    return [
      primaryChannel,
      ...baseChannels.filter((ch) => ch !== primaryChannel),
    ];
  };

  const currentChannels = generateChannels(currentScenarioData.channel);

  // Initialize after mount to ensure smooth animations
  useEffect(() => {
    console.log('TeaserVideoPage mounted');

    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      console.log('Setting isReady to true');
      setIsReady(true);
    }, 100); // Reduced delay for faster loading

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Debug current scenario
  useEffect(() => {
    console.log('Current scenario changed to:', currentScenario);
  }, [currentScenario]);

  // Mobile and panel handlers
  const handleContextPanelToggle = () => {
    if (isContextPanelOpen) {
      setShowContextPanel(false);
      setIsContextPanelOpen(false);
    } else {
      setIsContextPanelOpen(true);
      setTimeout(() => {
        setShowContextPanel(true);
      }, 400);
    }
  };

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileCanvasToggle = () => {
    setIsMobileCanvasOpen(!isMobileCanvasOpen);
  };

  // Keyboard controls for easy scenario switching during recording
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key.toLowerCase()) {
        case 'n':
          // Next scenario
          setCurrentScenario((prev) => (prev + 1) % 11);
          break;
        case 'p':
          // Previous scenario
          setCurrentScenario((prev) => (prev - 1 + 11) % 11);
          break;
        case 'r':
          // Restart current scenario by incrementing restart key
          console.log('Restarting scenario:', currentScenario);
          setRestartKey((prev) => prev + 1);
          break;
        case 'c':
          // Toggle controls visibility
          setShowControls((prev) => !prev);
          break;
        case 'm':
          // Toggle mobile view
          setIsMobile((prev) => !prev);
          break;
        case 's':
          // Toggle sidebar (context panel)
          handleContextPanelToggle();
          break;
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          // Direct scenario selection (1-9)
          const scenarioNum = parseInt(e.key) - 1;
          if (scenarioNum >= 0 && scenarioNum < 11) {
            setCurrentScenario(scenarioNum);
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center p-4 gap-4">
      {/* External Controls */}
      <div className="flex flex-wrap items-center gap-4 text-white text-sm">
        <div className="flex items-center gap-2">
          <span>Scenario:</span>
          <span className="bg-white/20 px-2 py-1 rounded">
            {currentScenario + 1}/11
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span>Mode:</span>
          <button
            onClick={() => setIsMobile(!isMobile)}
            className="bg-white/20 px-2 py-1 rounded hover:bg-white/30"
          >
            {isMobile ? 'Mobile' : 'Desktop'}
          </button>
        </div>
        <div className="flex items-center gap-2">
          <span>Size:</span>
          <input
            type="number"
            value={isMobile ? mobileWidth : containerWidth}
            onChange={(e) =>
              isMobile
                ? setMobileWidth(parseInt(e.target.value))
                : setContainerWidth(parseInt(e.target.value))
            }
            className="bg-white/20 text-white px-2 py-1 rounded w-16 text-center"
            min="300"
            max="2000"
          />
          <span>×</span>
          <input
            type="number"
            value={isMobile ? mobileHeight : containerHeight}
            onChange={(e) =>
              isMobile
                ? setMobileHeight(parseInt(e.target.value))
                : setContainerHeight(parseInt(e.target.value))
            }
            className="bg-white/20 text-white px-2 py-1 rounded w-16 text-center"
            min="300"
            max="1200"
          />
        </div>
        <button
          onClick={() => setShowControls(!showControls)}
          className="bg-white/20 px-2 py-1 rounded hover:bg-white/30"
        >
          {showControls ? 'Hide' : 'Show'} Controls
        </button>
      </div>

      {/* Keyboard controls info */}
      {showControls && (
        <div className="bg-black/90 rounded-lg p-3 text-white text-sm backdrop-blur-sm border border-white/20">
          <div className="font-medium mb-2">Keyboard Controls</div>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-white/80">
            <div>
              <kbd className="bg-white/20 px-1 rounded">N</kbd> Next scenario
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">P</kbd> Previous
              scenario
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">R</kbd> Restart current
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">M</kbd> Toggle mobile
              view
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">S</kbd> Toggle sidebar
            </div>
            <div>
              <kbd className="bg-white/20 px-1 rounded">C</kbd> Toggle controls
            </div>
          </div>
        </div>
      )}

      {/* Border container for screenshot boundaries */}
      <div
        className="border-2 border-white/20 rounded-lg overflow-hidden relative"
        style={{
          width: isMobile ? `${mobileWidth}px` : `${containerWidth}px`,
          height: isMobile ? `${mobileHeight}px` : `${containerHeight}px`,
        }}
      >
        {/* Full UI Layout */}
        <div className="h-full bg-black overflow-hidden relative">
          {/* Mobile Navigation Row - Only visible on mobile */}
          {isMobile && (
            <div className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between p-4">
              <button
                onClick={handleMobileMenuToggle}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white app-heading"
              >
                <span>Menu</span>
                <div className="w-1.5 h-1.5 bg-white/60 rounded-full"></div>
              </button>
              <button
                onClick={handleMobileCanvasToggle}
                className="flex items-center gap-2 px-4 py-3 bg-white/10 border border-white/20 rounded-full text-white app-heading"
              >
                <span>+</span>
                <span>Canvas</span>
              </button>
            </div>
          )}

          {/* Mobile Chat Header - Positioned independently like in prototype */}
          {isMobile && (
            <div className="absolute top-[64px] left-4 right-4 z-30 pointer-events-auto">
              <div className="px-4 py-3 bg-white/1 border border-white/10 text-white/80 flex flex-row items-center justify-between rounded-[40px] backdrop-blur-sm">
                <div className="app-subheading text-white/70">
                  #{currentScenarioData.channel || 'general'}
                </div>
                <div className="app-paragraph2 text-white/50">
                  {/* Get the current scenario title */}
                  {currentScenario === 0 && "Feature Discovery Session"}
                  {currentScenario === 1 && "Marketing Launch Options"}
                  {currentScenario === 2 && "Architecture Review"}
                  {currentScenario === 3 && "Sprint Planning Session"}
                  {currentScenario === 4 && "Design System Updates"}
                  {currentScenario === 5 && "Launch Planning"}
                  {currentScenario === 6 && "Incident Response"}
                  {currentScenario === 7 && "Product Strategy"}
                  {currentScenario === 8 && "Project Coordination"}
                  {currentScenario === 9 && "Dev Standup"}
                  {currentScenario === 10 && "Global Sync"}
                </div>
              </div>
            </div>
          )}

          {/* Left Sidebar - Hidden on mobile */}
          {!isMobile && (
            <div className="absolute left-6 top-6 bottom-6 w-[300px] flex flex-col gap-4 z-30">
              {/* User Profile Header */}
              <div className="py-2 pl-2 pr-4 bg-white/1 border border-white/5 rounded-full">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-gray-600"></div>
                  <span className="text-white/70 text-sm font-medium">
                    {currentScenarioData.pov}
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
              <div className="flex-1 flex flex-col gap-10 px-4 py-6 border border-white/5 rounded-2xl">
                <div className="flex flex-col gap-4">
                  <h3 className="text-white/70 text-sm font-medium pl-2">
                    Channels
                  </h3>
                  <div className="space-y-2">
                    {currentChannels.map((channel, index) => (
                      <div
                        key={channel}
                        className={`px-4 py-3 rounded-full text-sm cursor-pointer transition-all ${
                          index === 0
                            ? 'bg-white/10 border border-white/20 text-white'
                            : 'text-white/50 bg-white/1 border border-white/5 hover:bg-white/5'
                        }`}
                      >
                        # {channel}
                      </div>
                    ))}
                  </div>
                </div>

                {/* DMs Section */}
                <div className="flex flex-col gap-4">
                  <h3 className="text-white/70 text-sm font-medium pl-2">
                    Direct Messages
                  </h3>
                  <div className="space-y-2">
                    {currentTeamMembers.map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center py-2 pl-2 pr-4 gap-2 text-sm border border-white/10 bg-white/1 hover:bg-white/5 text-gray-400 rounded-full cursor-pointer"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border ${member.borderColor} ${member.bgColor}`}
                        ></div>
                        <div className="flex-1 flex justify-between items-center">
                          <span>{member.name}</span>
                          <span className="text-xs text-white/40">
                            {member.role}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Center Chat Area */}
          <div
            className={`absolute inset-0 transition-all duration-500 overflow-hidden ${
              isMobile
                ? 'left-0 right-0 top-[120px]'
                : isContextPanelOpen
                  ? 'left-[330px] right-[410px]'
                  : 'left-[330px] right-0'
            }`}
          >
            {!isReady && (
              <div className="h-full flex items-center justify-center">
                <div className="text-white/60">Loading demo...</div>
              </div>
            )}
            {isReady && (
              <ChatDemoFull
                key={`scenario-${currentScenario}-${restartKey}`}
                scenarioIndex={currentScenario}
                isActive={true}
                className="h-full"
                onComplete={() => {
                  console.log('Scenario completed, moving to next');
                  setCurrentScenario((prev) => (prev + 1) % 11);
                }}
                userColors={currentTeamMembers.reduce(
                  (acc, member) => {
                    acc[member.name] = {
                      borderColor: member.borderColor,
                      bgColor: member.bgColor,
                    };
                    return acc;
                  },
                  {} as Record<string, { borderColor: string; bgColor: string }>
                )}
                forceMobileMode={isMobile}
              />
            )}
          </div>

          {/* Right Sidebar - Context Panel - Hidden on mobile */}
          {!isMobile && showContextPanel && (
            <div className="absolute right-6 top-6 bottom-6 w-[380px] flex flex-col justify-between bg-white/5 border border-white/10 px-4 pt-14 pb-4 rounded-2xl z-30">
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
                {/* Context Content */}
                <div>
                  <h3 className="text-white/80 text-lg font-semibold mb-3">
                    Decision Context
                  </h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-white/80 text-sm font-medium mb-1">
                        Chosen Path
                      </div>
                      <div className="text-white/60 text-sm">
                        Option C - Targeted campaign approach
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/70 text-sm font-medium mb-1">
                        Pros
                      </h4>
                      <div className="text-white/50 text-sm space-y-1">
                        <div>• Controlled spend and measurable ROI</div>
                        <div>• Quick turnaround and faster results</div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white/70 text-sm font-medium mb-1">
                        Success Metric
                      </h4>
                      <div className="text-white/50 text-sm">
                        Track conversion rates and cost per acquisition
                      </div>
                    </div>
                  </div>
                </div>

                {/* Owners */}
                <div className="flex flex-col gap-2">
                  <h4 className="text-white/80 text-sm font-medium">Owners</h4>
                  <div className="space-y-1">
                    {currentTeamMembers.slice(0, 2).map((member) => (
                      <div
                        key={member.name}
                        className="flex items-center py-2 pl-2 pr-4 gap-2 text-sm border border-white/10 bg-white/1 text-gray-400 rounded-full"
                      >
                        <div
                          className={`w-6 h-6 rounded-full border ${member.borderColor} ${member.bgColor}`}
                        ></div>
                        <div className="flex-1 flex justify-between items-center">
                          <span>{member.name}</span>
                          <span className="text-xs">{member.role}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Bottom Action */}
              <button className="w-full px-4 py-3 bg-white/5 hover:bg-white/10 rounded-full text-sm text-white/50 border border-white/10">
                Create Tickets
              </button>
            </div>
          )}

          {/* Mobile Menu Overlay */}
          {isMobile && isMobileMenuOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white text-lg font-semibold">Menu</span>
                  <button
                    onClick={handleMobileMenuToggle}
                    className="w-8 h-8 flex items-center justify-center text-white/70"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white/70 text-sm font-medium mb-4">
                      Channels
                    </h3>
                    <div className="space-y-2">
                      {currentChannels.map((channel, index) => (
                        <div
                          key={channel}
                          className="px-4 py-4 rounded-full text-sm cursor-pointer bg-white/5 border border-white/10 text-white/70"
                        >
                          # {channel}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-white/70 text-sm font-medium mb-4">
                      Team Members
                    </h3>
                    <div className="space-y-2">
                      {currentTeamMembers.map((member) => (
                        <div
                          key={member.name}
                          className="flex items-center py-3 pl-2 pr-4 gap-3 text-sm cursor-pointer bg-white/5 border border-white/10 text-white/70 rounded-full"
                        >
                          <div
                            className={`w-6 h-6 rounded-full border ${member.borderColor} ${member.bgColor}`}
                          ></div>
                          <div className="flex-1 flex justify-between items-center">
                            <span>{member.name}</span>
                            <span className="text-xs text-white/40">
                              {member.role}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Mobile Canvas Overlay */}
          {isMobile && isMobileCanvasOpen && (
            <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <span className="text-white text-lg font-semibold">
                    Canvas
                  </span>
                  <button
                    onClick={handleMobileCanvasToggle}
                    className="w-8 h-8 flex items-center justify-center text-white/70"
                  >
                    ✕
                  </button>
                </div>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white/80 text-lg font-semibold mb-3">
                      Decision Context
                    </h3>
                    <div className="text-white/60 text-sm mb-4">
                      Option C - Targeted campaign approach
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h4 className="text-white/70 text-sm font-medium mb-2">
                          Success Metric
                        </h4>
                        <div className="text-white/50 text-sm">
                          Track conversion rates and cost per acquisition
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
