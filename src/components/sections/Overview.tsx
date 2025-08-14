'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfoSection from '../molecules/InfoSection';
import ChatDemoFull from '../demo/ChatDemoFull';
import ChatInteractionPopover from '../molecules/ChatInteractionPopover';
import { useWaitlistInteraction } from '../hooks/useWaitlistInteraction';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

// Scenario arrays for each feature - moved outside component to prevent recreation on every render
const stayOnTrackScenarios = [7, 9]; // Scenarios 8 and 10 (Intelligence Layer, Meeting Drift Prevention)
const sharedIntelligenceScenarios = [8, 10]; // Scenarios 9 and 11 (Multiplayer Chat, Distributed Team Knowledge)

export default function Overview() {
  
  // Use a stable seed for SSR, random for client
  const [randomSeed, setRandomSeed] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  // State for current scenarios - use deterministic selection based on seed
  const [currentStayOnTrackScenario, setCurrentStayOnTrackScenario] = useState(
    stayOnTrackScenarios[randomSeed % stayOnTrackScenarios.length]
  );
  const [currentSharedIntelligenceScenario, setCurrentSharedIntelligenceScenario] = useState(
    sharedIntelligenceScenarios[randomSeed % sharedIntelligenceScenarios.length]
  );
  
  // Shared state: 'left' or 'right' InfoSection is active
  const [activeSection, setActiveSection] = useState<'left' | 'right'>('left');
  const [isMobile, setIsMobile] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Waitlist interaction state
  const waitlistInteraction = useWaitlistInteraction('overview');

  // Refs for scroll animations
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const infoSectionLeftRef = useRef<HTMLDivElement>(null);
  const infoSectionRightRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const mobileImageLeftRef = useRef<HTMLDivElement>(null);
  const mobileImageRightRef = useRef<HTMLDivElement>(null);

  // Refs for demo containers (desktop)
  const demoContainerLeftRef = useRef<HTMLDivElement>(null);
  const demoContainerRightRef = useRef<HTMLDivElement>(null);

  // Refs for mobile demo containers  
  const mobileDemoLeftRef = useRef<HTMLDivElement>(null);
  const mobileDemoRightRef = useRef<HTMLDivElement>(null);

  // Timeline refs for InfoSections
  const leftInfoTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const rightInfoTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Helper functions to cycle scenarios within the same feature
  const getNextStayOnTrackScenario = () => {
    const currentIndex = stayOnTrackScenarios.indexOf(currentStayOnTrackScenario);
    const nextIndex = (currentIndex + 1) % stayOnTrackScenarios.length;
    return stayOnTrackScenarios[nextIndex];
  };

  const getNextSharedIntelligenceScenario = () => {
    const currentIndex = sharedIntelligenceScenarios.indexOf(currentSharedIntelligenceScenario);
    const nextIndex = (currentIndex + 1) % sharedIntelligenceScenarios.length;
    return sharedIntelligenceScenarios[nextIndex];
  };

  const handleSectionClick = (section: 'left' | 'right') => {
    if (!isMobile && section !== activeSection && !isTransitioning) {
      setIsTransitioning(true);
      
      // Randomize scenario when switching sections
      if (section === 'left') {
        const randomScenario = stayOnTrackScenarios[Math.floor(Math.random() * stayOnTrackScenarios.length)];
        setCurrentStayOnTrackScenario(randomScenario);
      } else {
        const randomScenario = sharedIntelligenceScenarios[Math.floor(Math.random() * sharedIntelligenceScenarios.length)];
        setCurrentSharedIntelligenceScenario(randomScenario);
      }

      // Get current and next container refs for desktop
      const getCurrentDesktopRef = () => {
        return activeSection === 'left' ? demoContainerLeftRef.current : demoContainerRightRef.current;
      };

      const getNextDesktopRef = () => {
        return section === 'left' ? demoContainerLeftRef.current : demoContainerRightRef.current;
      };

      // Get current and next container refs for mobile
      const getCurrentMobileRef = () => {
        return activeSection === 'left' ? mobileDemoLeftRef.current : mobileDemoRightRef.current;
      };

      const getNextMobileRef = () => {
        return section === 'left' ? mobileDemoLeftRef.current : mobileDemoRightRef.current;
      };

      const currentDesktopRef = getCurrentDesktopRef();
      const nextDesktopRef = getNextDesktopRef();
      const currentMobileRef = getCurrentMobileRef();
      const nextMobileRef = getNextMobileRef();

      // Animate out current demos
      const animateOut = () => {
        const targets = [currentDesktopRef, currentMobileRef].filter(Boolean);
        
        if (targets.length > 0) {
          gsap.to(targets, {
            opacity: 0,
            y: 20,
            duration: 0.3,
            ease: 'power2.out',
            onComplete: () => {
              // Set active section
              setActiveSection(section);

              // Animate in new demos
              const newTargets = [nextDesktopRef, nextMobileRef].filter(Boolean);
              
              if (newTargets.length > 0) {
                gsap.fromTo(
                  newTargets,
                  {
                    opacity: 0,
                    y: -20,
                  },
                  {
                    opacity: 1,
                    y: 0,
                    duration: 0.3,
                    ease: 'power2.out',
                    onComplete: () => {
                      setIsTransitioning(false);
                    },
                  }
                );
              } else {
                setIsTransitioning(false);
              }
            },
          });
        } else {
          // Fallback if refs are not available
          setActiveSection(section);
          setTimeout(() => {
            setIsTransitioning(false);
          }, 300);
        }
      };

      animateOut();
    } else if (isMobile) {
      // For mobile, just switch without animation but still randomize scenarios
      if (section === 'left') {
        const randomScenario = stayOnTrackScenarios[Math.floor(Math.random() * stayOnTrackScenarios.length)];
        setCurrentStayOnTrackScenario(randomScenario);
      } else {
        const randomScenario = sharedIntelligenceScenarios[Math.floor(Math.random() * sharedIntelligenceScenarios.length)];
        setCurrentSharedIntelligenceScenario(randomScenario);
      }
      setActiveSection(section);
    }
  };

  // Initialize GSAP properties for demo containers
  useEffect(() => {
    const desktopContainers = [demoContainerLeftRef.current, demoContainerRightRef.current];
    const mobileContainers = [mobileDemoLeftRef.current, mobileDemoRightRef.current];

    [...desktopContainers, ...mobileContainers].forEach((container, index) => {
      if (container) {
        const isLeftContainer = index % 2 === 0;
        const isActive = (activeSection === 'left' && isLeftContainer) || (activeSection === 'right' && !isLeftContainer);
        gsap.set(container, {
          opacity: isActive ? 1 : 0,
          y: 0,
        });
      }
    });
  }, [activeSection]);

  // Check for mobile on mount and initialize client-side random scenarios
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    // Set client flag and randomize seed on client side
    setIsClient(true);
    const clientSeed = Math.floor(Math.random() * 1000);
    setRandomSeed(clientSeed);
    
    // Update scenarios based on new random seed
    setCurrentStayOnTrackScenario(
      stayOnTrackScenarios[clientSeed % stayOnTrackScenarios.length]
    );
    setCurrentSharedIntelligenceScenario(
      sharedIntelligenceScenarios[clientSeed % sharedIntelligenceScenarios.length]
    );

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []); // Empty dependency array since arrays are now static


  // ScrollTrigger animations
  useEffect(() => {
    if (
      !sectionRef.current ||
      !backgroundLayerRef.current ||
      !infoSectionLeftRef.current ||
      !infoSectionRightRef.current ||
      !imageContainerRef.current ||
      !mobileDemoLeftRef.current ||
      !mobileDemoRightRef.current
    )
      return;

    const ctx = gsap.context(() => {
      // Create animation timelines
      const backgroundTl = gsap.timeline({ paused: true });
      const leftImageTl = gsap.timeline({ paused: true });
      const rightImageTl = gsap.timeline({ paused: true });
      const desktopImageTl = gsap.timeline({ paused: true });

      // Set initial states
      gsap.set(backgroundLayerRef.current, { x: '100%' });
      gsap.set(imageContainerRef.current, { opacity: 0, y: 60 });
      gsap.set([mobileDemoLeftRef.current, mobileDemoRightRef.current], {
        opacity: 0,
        y: 40,
      });

      // Build animation timelines
      backgroundTl.to(backgroundLayerRef.current, {
        x: '0%',
        duration: 1.2,
        ease: 'power4.out',
      });

      leftImageTl.to(mobileDemoLeftRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      });

      rightImageTl.to(mobileDemoRightRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      });

      desktopImageTl.to(imageContainerRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.0,
        ease: 'power4.out',
      });

      // Wait a bit for InfoSection timelines to be created before creating ScrollTriggers
      const timeoutId = setTimeout(() => {
        if (isMobile) {
          // Mobile: Individual element triggers

          // Background layer animation with toggle actions
          ScrollTrigger.create({
            trigger: infoSectionLeftRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            animation: backgroundTl,
            toggleActions: 'play none none reverse',
          });

          // Left InfoSection animation with toggle actions
          if (leftInfoTimelineRef.current) {
            ScrollTrigger.create({
              trigger: infoSectionLeftRef.current,
              start: 'top 70%',
              end: 'bottom 50%',
              animation: leftInfoTimelineRef.current,
              toggleActions: 'play none none reverse',
            });
          }

          // Right InfoSection animation with toggle actions (staggered later)
          if (rightInfoTimelineRef.current) {
            ScrollTrigger.create({
              trigger: infoSectionRightRef.current,
              start: 'top 70%', // Start later for stagger effect
              end: 'bottom 50%',
              animation: rightInfoTimelineRef.current,
              toggleActions: 'play none none reverse',
            });
          }

          // Mobile demo animations with toggle actions
          ScrollTrigger.create({
            trigger: mobileDemoLeftRef.current,
            start: 'top 60%',
            end: 'bottom 20%',
            animation: leftImageTl,
            toggleActions: 'play none none reverse',
          });

          ScrollTrigger.create({
            trigger: mobileDemoRightRef.current,
            start: 'top 60%',
            end: 'bottom 20%',
            animation: rightImageTl,
            toggleActions: 'play none none reverse',
          });
        } else {
          // Desktop: Section-based triggers

          // Background layer animation with toggle actions
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'bottom 20%',
            animation: backgroundTl,
            toggleActions: 'play none none reverse',
          });

          // InfoSections animation with manual staggered timing
          if (leftInfoTimelineRef.current && rightInfoTimelineRef.current) {
            let rightAnimationTimeout: NodeJS.Timeout | null = null;

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: 'top 70%',
              end: 'bottom 20%',
              onEnter: () => {
                // Start left InfoSection immediately
                if (leftInfoTimelineRef.current) {
                  leftInfoTimelineRef.current.play();
                }
                // Start right InfoSection with delay
                rightAnimationTimeout = setTimeout(() => {
                  if (rightInfoTimelineRef.current) {
                    rightInfoTimelineRef.current.play();
                  }
                }, 400); // 400ms delay for better stagger effect
              },
              onLeaveBack: () => {
                // Clear timeout and reverse both InfoSections when scrolling back up
                if (rightAnimationTimeout) {
                  clearTimeout(rightAnimationTimeout);
                  rightAnimationTimeout = null;
                }
                if (rightInfoTimelineRef.current) {
                  rightInfoTimelineRef.current.reverse();
                }
                if (leftInfoTimelineRef.current) {
                  leftInfoTimelineRef.current.reverse();
                }
              },
            });
          }

          // Image container animation with toggle actions
          ScrollTrigger.create({
            trigger: sectionRef.current,
            start: 'top 30%',
            end: 'bottom 20%',
            animation: desktopImageTl,
            toggleActions: 'play none none reverse',
          });
        }
      }, 100); // Wait 100ms for InfoSection timelines

      return () => {
        clearTimeout(timeoutId);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, [isMobile, leftInfoTimelineRef.current, rightInfoTimelineRef.current]);

  return (
    <section
      ref={sectionRef}
      data-section="overview"
      className="min-h-screen flex flex-col justify-center gap-10 px-4 md:px-50 py-10 bg-black/20 backdrop-blur-sm relative overflow-hidden"
    >
      {/* Animated background layer */}
      <div
        ref={backgroundLayerRef}
        className="absolute inset-0 bg-black/20 pointer-events-none"
        style={{ transform: 'translateX(100%)' }}
      />

      <div className="flex flex-col md:flex-row gap-4 md:gap-10 relative z-10">
        <div ref={infoSectionLeftRef}>
          <InfoSection
            heading="Stay aligned with AI-powered context"
            subheading="Stay on track"
            description="Never lose the thread. Akarii tracks decisions, spots drift, and flags what's missing, so your team stays focused on what matters."
            timelineRef={leftInfoTimelineRef}
            defaultExpanded={isMobile ? true : activeSection === 'left'}
            onToggle={isMobile ? undefined : () => handleSectionClick('left')}
          />
        </div>
        {/* Mobile Demo Container - Intelligence Layer */}
        <div
          ref={mobileDemoLeftRef}
          className="md:hidden h-[640px] w-full"
        >
          <ChatDemoFull 
            className="h-full" 
            scenarioIndex={currentStayOnTrackScenario} 
            isActive={isMobile ? true : activeSection === 'left'}
            enableWaitlistInteraction={true}
            onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
            source="overview"
            onComplete={() => {
              // Auto-restart with next scenario after 2 seconds
              setTimeout(() => {
                if (isMobile || activeSection === 'left') {
                  const nextScenario = getNextStayOnTrackScenario();
                  setCurrentStayOnTrackScenario(nextScenario);
                  // On mobile, just restart in place. On desktop, toggle sections
                  if (!isMobile) {
                    setActiveSection('right');
                    setTimeout(() => setActiveSection('left'), 100);
                  }
                }
              }, 2000);
            }}
          />
        </div>
        <div ref={infoSectionRightRef}>
          <InfoSection
            heading="One AI shared by the whole team"
            subheading="Shared intelligence"
            description="Work with AI the way you work with people. In the same space, seeing the same context. Everyone stays on the same page, instantly."
            timelineRef={rightInfoTimelineRef}
            defaultExpanded={isMobile ? true : activeSection === 'right'}
            onToggle={isMobile ? undefined : () => handleSectionClick('right')}
          />
        </div>
        {/* Mobile Demo Container - Multiplayer Chat */}
        <div
          ref={mobileDemoRightRef}
          className="md:hidden h-[640px] w-full"
        >
          <ChatDemoFull 
            className="h-full" 
            scenarioIndex={currentSharedIntelligenceScenario} 
            isActive={isMobile ? true : activeSection === 'right'}
            enableWaitlistInteraction={true}
            onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
            source="overview"
            onComplete={() => {
              // Auto-restart with next scenario after 2 seconds
              setTimeout(() => {
                if (isMobile || activeSection === 'right') {
                  const nextScenario = getNextSharedIntelligenceScenario();
                  setCurrentSharedIntelligenceScenario(nextScenario);
                  // On mobile, just restart in place. On desktop, toggle sections
                  if (!isMobile) {
                    setActiveSection('left');
                    setTimeout(() => setActiveSection('right'), 100);
                  }
                }
              }, 2000);
            }}
          />
        </div>
      </div>
      {/* Desktop Demo Container - Wrapper */}
      <div
        ref={imageContainerRef}
        className="hidden md:flex aspect-[3/2] h-auto w-full relative z-10"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        {/* Desktop Demo Container - Intelligence Layer */}
        <div
          ref={demoContainerLeftRef}
          className={`absolute inset-0 transition-opacity duration-300 ${
            activeSection === 'left' ? 'opacity-100 z-20' : 'opacity-0 z-10'
          } ${isTransitioning ? 'pointer-events-none' : ''}`}
        >
          <ChatDemoFull 
            className="w-full h-full" 
            scenarioIndex={currentStayOnTrackScenario} 
            isActive={activeSection === 'left'}
            enableWaitlistInteraction={true}
            onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
            source="overview"
            onComplete={() => {
              // Auto-restart with next scenario after 2 seconds
              setTimeout(() => {
                if (activeSection === 'left') {
                  const nextScenario = getNextStayOnTrackScenario();
                  setCurrentStayOnTrackScenario(nextScenario);
                  // Trigger restart by toggling isActive
                  setActiveSection('right');
                  setTimeout(() => setActiveSection('left'), 100);
                }
              }, 2000);
            }}
          />
        </div>
        {/* Desktop Demo Container - Multiplayer Chat */}
        <div
          ref={demoContainerRightRef}
          className={`absolute inset-0 transition-opacity duration-300 ${
            activeSection === 'right' ? 'opacity-100 z-20' : 'opacity-0 z-10'
          } ${isTransitioning ? 'pointer-events-none' : ''}`}
        >
          <ChatDemoFull 
            className="w-full h-full" 
            scenarioIndex={currentSharedIntelligenceScenario} 
            isActive={activeSection === 'right'}
            enableWaitlistInteraction={true}
            onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
            source="overview"
            onComplete={() => {
              // Auto-restart with next scenario after 2 seconds
              setTimeout(() => {
                if (activeSection === 'right') {
                  const nextScenario = getNextSharedIntelligenceScenario();
                  setCurrentSharedIntelligenceScenario(nextScenario);
                  // Trigger restart by toggling isActive
                  setActiveSection('left');
                  setTimeout(() => setActiveSection('right'), 100);
                }
              }, 2000);
            }}
          />
        </div>
      </div>

      {/* Waitlist Interaction Popover */}
      <ChatInteractionPopover
        isOpen={waitlistInteraction.isPopoverOpen}
        onClose={waitlistInteraction.closePopover}
        source="overview"
        interactionType={waitlistInteraction.interactionType!}
        variant={waitlistInteraction.variant}
      />
    </section>
  );
}
