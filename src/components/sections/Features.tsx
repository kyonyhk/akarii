'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfoSection from '../molecules/InfoSection';
import ChatDemoMini from '../demo/ChatDemoMini';
import ChatInteractionPopover from '../molecules/ChatInteractionPopover';
import { useWaitlistInteraction } from '../hooks/useWaitlistInteraction';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<1 | 2 | 3 | 4>(1); // First section active by default
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [restartTrigger, setRestartTrigger] = useState(0); // For triggering demo restarts

  // Waitlist interaction state
  const waitlistInteraction = useWaitlistInteraction('features');

  // Refs for scroll animations
  const sectionRef = useRef<HTMLElement>(null);
  const infoSection1Ref = useRef<HTMLDivElement>(null);
  const infoSection2Ref = useRef<HTMLDivElement>(null);
  const infoSection3Ref = useRef<HTMLDivElement>(null);
  const infoSection4Ref = useRef<HTMLDivElement>(null);

  // Timeline refs for InfoSections
  const infoTimeline1Ref = useRef<gsap.core.Timeline | null>(null);
  const infoTimeline2Ref = useRef<gsap.core.Timeline | null>(null);
  const infoTimeline3Ref = useRef<gsap.core.Timeline | null>(null);
  const infoTimeline4Ref = useRef<gsap.core.Timeline | null>(null);

  // Refs for individual demo containers
  const demoContainer1Ref = useRef<HTMLDivElement>(null);
  const demoContainer2Ref = useRef<HTMLDivElement>(null);
  const demoContainer3Ref = useRef<HTMLDivElement>(null);
  const demoContainer4Ref = useRef<HTMLDivElement>(null);

  // Refs for background layers
  const backgroundLayer1Ref = useRef<HTMLDivElement>(null);
  const backgroundLayer2Ref = useRef<HTMLDivElement>(null);
  const backgroundLayer3Ref = useRef<HTMLDivElement>(null);
  const backgroundLayer4Ref = useRef<HTMLDivElement>(null);

  // Click handlers for section toggling (desktop only)
  const handleSectionClick = (section: 1 | 2 | 3 | 4) => {
    if (!isMobile && section !== activeSection && !isTransitioning) {
      setIsTransitioning(true);

      // Get current and next container refs
      const getCurrentRef = () => {
        switch (activeSection) {
          case 1:
            return demoContainer1Ref.current;
          case 2:
            return demoContainer2Ref.current;
          case 3:
            return demoContainer3Ref.current;
          case 4:
            return demoContainer4Ref.current;
          default:
            return demoContainer1Ref.current;
        }
      };

      const getNextRef = () => {
        switch (section) {
          case 1:
            return demoContainer1Ref.current;
          case 2:
            return demoContainer2Ref.current;
          case 3:
            return demoContainer3Ref.current;
          case 4:
            return demoContainer4Ref.current;
          default:
            return demoContainer1Ref.current;
        }
      };

      const currentRef = getCurrentRef();
      const nextRef = getNextRef();

      // Animate out current demo
      if (currentRef) {
        gsap.to(currentRef, {
          opacity: 0,
          y: 20,
          duration: 0.2,
          ease: 'power2.out',
          onComplete: () => {
            // Set active section
            setActiveSection(section);

            // Animate in new demo
            if (nextRef) {
              gsap.fromTo(
                nextRef,
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
                    // The chat will start automatically after this completes due to the isActive prop change
                  },
                }
              );
            } else {
              setIsTransitioning(false);
            }
          },
        });
      } else {
        // Fallback if ref is not available
        setActiveSection(section);
        setIsTransitioning(false);
      }
    }
  };

  // Initialize GSAP properties for all containers
  useEffect(() => {
    const containers = [
      demoContainer1Ref.current,
      demoContainer2Ref.current,
      demoContainer3Ref.current,
      demoContainer4Ref.current,
    ];

    containers.forEach((container, index) => {
      if (container) {
        const isActive = index + 1 === activeSection;
        gsap.set(container, {
          opacity: isActive ? 1 : 0,
          y: 0,
        });
      }
    });
  }, [activeSection]);

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Background animations
  useEffect(() => {
    if (!sectionRef.current || !backgroundLayer1Ref.current || !backgroundLayer2Ref.current || !backgroundLayer3Ref.current || !backgroundLayer4Ref.current) return;

    const ctx = gsap.context(() => {
      // Initially hide all layers off-screen from bottom
      gsap.set([backgroundLayer1Ref.current, backgroundLayer2Ref.current, backgroundLayer3Ref.current, backgroundLayer4Ref.current], {
        y: '100%',
        opacity: 0,
      });

      // Create entry animation timeline
      const entryTl = gsap.timeline({ 
        paused: true,
        onStart: () => {
          console.log('Background animation started'); // Debug log
        }
      });

      // Adjust timing for mobile vs desktop
      const animationDuration = isMobile ? 0.8 : 0.6;
      const staggerOffset = isMobile ? 0.4 : 0.3;
      
      // Layer 1 animates in from bottom
      entryTl.to(backgroundLayer1Ref.current, {
        y: '0%',
        opacity: 1,
        duration: animationDuration,
        ease: 'power2.out',
      });

      // Layer 2 animates in from bottom (staggered)
      entryTl.to(
        backgroundLayer2Ref.current,
        {
          y: '0%',
          opacity: 1,
          duration: animationDuration,
          ease: 'power2.out',
        },
        `-=${staggerOffset}`
      );

      // Layer 3 animates in from bottom (staggered)
      entryTl.to(
        backgroundLayer3Ref.current,
        {
          y: '0%',
          opacity: 1,
          duration: animationDuration,
          ease: 'power2.out',
        },
        `-=${staggerOffset}`
      );

      // Layer 4 animates in from bottom (staggered)
      entryTl.to(
        backgroundLayer4Ref.current,
        {
          y: '0%',
          opacity: 1,
          duration: animationDuration,
          ease: 'power2.out',
        },
        `-=${staggerOffset}`
      );

      // After a pause, animate layer 4 (top layer) out to the top during entry
      entryTl.to(
        backgroundLayer4Ref.current,
        {
          y: '-100%',
          opacity: 0,
          duration: 0.5,
          ease: 'power2.in',
        },
        '+=0.5'
      );

      // Create separate exit animation timeline
      const exitTl = gsap.timeline({ 
        paused: true,
        onComplete: () => {
          console.log('Background animation completed'); // Debug log
        }
      });

      // All remaining layers (1, 2, 3) animate out to the top
      const exitDuration = isMobile ? 1.0 : 0.8;
      const exitStagger = isMobile ? 0.15 : 0.1;
      
      exitTl.to(
        [backgroundLayer1Ref.current, backgroundLayer2Ref.current, backgroundLayer3Ref.current],
        {
          y: '-100%',
          opacity: 0,
          duration: exitDuration,
          ease: 'power2.in',
          stagger: exitStagger, // Small stagger for smoother exit
        }
      );

      // Entry animation triggered when section comes into view
      // Use different trigger points for mobile vs desktop for better visibility
      const startTrigger = isMobile ? 'top 70%' : 'top 60%';
      const endTrigger = isMobile ? 'bottom 70%' : 'bottom 60%';
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: startTrigger,
        end: endTrigger,
        animation: entryTl,
        toggleActions: 'play none none reverse',
      });

      // Exit animation triggered when section is leaving view
      const exitStartTrigger = isMobile ? 'bottom 50%' : 'bottom 40%';
      const exitEndTrigger = isMobile ? 'bottom 30%' : 'bottom 20%';
      
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: exitStartTrigger,
        end: exitEndTrigger,
        animation: exitTl,
        toggleActions: 'play none none reverse',
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]); // Re-run when mobile state changes

  // ScrollTrigger animations
  useEffect(() => {
    if (
      !sectionRef.current ||
      !infoSection1Ref.current ||
      !infoSection2Ref.current ||
      !infoSection3Ref.current ||
      !infoSection4Ref.current
    )
      return;

    const ctx = gsap.context(() => {
      // Wait a bit for InfoSection timelines to be created before creating ScrollTriggers
      const timeoutId = setTimeout(() => {
        if (isMobile) {
          // Mobile: Individual element triggers

          // InfoSection 1 animation
          if (infoTimeline1Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection1Ref.current,
              start: 'top 80%',
              end: 'bottom 50%',
              animation: infoTimeline1Ref.current,
              toggleActions: 'play none none reverse',
            });
          }

          // InfoSection 2 animation
          if (infoTimeline2Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection2Ref.current,
              start: 'top 80%',
              end: 'bottom 50%',
              animation: infoTimeline2Ref.current,
              toggleActions: 'play none none reverse',
            });
          }

          // InfoSection 3 animation
          if (infoTimeline3Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection3Ref.current,
              start: 'top 80%',
              end: 'bottom 50%',
              animation: infoTimeline3Ref.current,
              toggleActions: 'play none none reverse',
            });
          }

          // InfoSection 4 animation
          if (infoTimeline4Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection4Ref.current,
              start: 'top 80%',
              end: 'bottom 50%',
              animation: infoTimeline4Ref.current,
              toggleActions: 'play none none reverse',
            });
          }
        } else {
          // Desktop: Section-based triggers with cascading effect

          if (
            infoTimeline1Ref.current &&
            infoTimeline2Ref.current &&
            infoTimeline3Ref.current &&
            infoTimeline4Ref.current
          ) {
            let animation2Timeout: NodeJS.Timeout | null = null;
            let animation3Timeout: NodeJS.Timeout | null = null;
            let animation4Timeout: NodeJS.Timeout | null = null;

            ScrollTrigger.create({
              trigger: sectionRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              onEnter: () => {
                // Start first InfoSection immediately
                if (infoTimeline1Ref.current) {
                  infoTimeline1Ref.current.play();
                }
                // Start second InfoSection with delay
                animation2Timeout = setTimeout(() => {
                  if (infoTimeline2Ref.current) {
                    infoTimeline2Ref.current.play();
                  }
                }, 200); // 200ms delay

                // Start third InfoSection with delay
                animation3Timeout = setTimeout(() => {
                  if (infoTimeline3Ref.current) {
                    infoTimeline3Ref.current.play();
                  }
                }, 400); // 400ms delay

                // Start fourth InfoSection with delay
                animation4Timeout = setTimeout(() => {
                  if (infoTimeline4Ref.current) {
                    infoTimeline4Ref.current.play();
                  }
                }, 600); // 600ms delay
              },
              onLeaveBack: () => {
                // Clear timeouts and reverse all InfoSections when scrolling back up
                if (animation2Timeout) {
                  clearTimeout(animation2Timeout);
                  animation2Timeout = null;
                }
                if (animation3Timeout) {
                  clearTimeout(animation3Timeout);
                  animation3Timeout = null;
                }
                if (animation4Timeout) {
                  clearTimeout(animation4Timeout);
                  animation4Timeout = null;
                }

                // Reverse in reverse order for smooth exit
                if (infoTimeline4Ref.current) {
                  infoTimeline4Ref.current.reverse();
                }
                if (infoTimeline3Ref.current) {
                  infoTimeline3Ref.current.reverse();
                }
                if (infoTimeline2Ref.current) {
                  infoTimeline2Ref.current.reverse();
                }
                if (infoTimeline1Ref.current) {
                  infoTimeline1Ref.current.reverse();
                }
              },
            });
          }
        }
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        ScrollTrigger.getAll().forEach((trigger) => {
          if (
            trigger.trigger === sectionRef.current ||
            trigger.trigger === infoSection1Ref.current ||
            trigger.trigger === infoSection2Ref.current ||
            trigger.trigger === infoSection3Ref.current ||
            trigger.trigger === infoSection4Ref.current
          ) {
            trigger.kill();
          }
        });
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      data-section="features"
      className="relative min-h-screen flex flex-row overflow-hidden"
    >
      {/* Background layers - mobile: full width, desktop: right side only */}
      <div
        ref={backgroundLayer1Ref}
        className="absolute inset-0 md:left-1/2 bg-gradient-to-br from-black/25 via-black/20 to-transparent md:bg-black/15 backdrop-blur-sm z-10"
      />
      <div
        ref={backgroundLayer2Ref}
        className="absolute inset-0 md:left-1/2 bg-gradient-to-tr from-black/30 via-black/25 to-black/10 md:bg-black/15 z-20"
      />
      <div
        ref={backgroundLayer3Ref}
        className="absolute inset-0 md:left-1/2 bg-gradient-to-bl from-transparent via-black/30 to-black/25 md:bg-black/15 z-30"
      />
      <div
        ref={backgroundLayer4Ref}
        className="absolute inset-0 md:left-1/2 bg-gradient-to-tl from-black/40 via-black/35 to-black/20 md:bg-black/20 z-35"
      />

      <div className="hidden md:flex flex-1 flex-col justify-center items-center p-10 relative z-40">
        {/* Wrapper container that constrains all demo containers */}
        <div className="relative w-full h-full">
          {/* Demo Container 1 - Context preservation across time */}
          <div
            ref={demoContainer1Ref}
            className={`absolute transition-all duration-300 ${
              activeSection === 1 ? 'opacity-100 z-40' : 'opacity-0 z-10'
            } ${isTransitioning ? 'pointer-events-none' : ''}`}
            style={{
              top: '0%',
              left: '0%',
              right: '0%',
              height: '60%',
            }}
          >
            <ChatDemoMini
              scenarioIndex={4}
              isActive={activeSection === 1}
              key={`demo-1-${restartTrigger}`} // Force re-render on restart
              enableWaitlistInteraction={true}
              onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
              source="features"
              onComplete={() => {
                // Auto-restart after 2 seconds if still on this section
                setTimeout(() => {
                  if (activeSection === 1) {
                    // Trigger restart by incrementing trigger
                    setRestartTrigger(prev => prev + 1);
                  }
                }, 2000);
              }}
            />
          </div>

          {/* Demo Container 2 - Cross-team shared intelligence */}
          <div
            ref={demoContainer2Ref}
            className={`absolute transition-all duration-300 ${
              activeSection === 2 ? 'opacity-100 z-40' : 'opacity-0 z-20'
            } ${isTransitioning ? 'pointer-events-none' : ''}`}
            style={{
              top: '10%',
              left: '0%',
              right: '0%',
              height: '60%',
            }}
          >
            <ChatDemoMini
              scenarioIndex={5}
              isActive={activeSection === 2}
              key={`demo-2-${restartTrigger}`} // Force re-render on restart
              enableWaitlistInteraction={true}
              onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
              source="features"
              onComplete={() => {
                // Auto-restart after 2 seconds if still on this section
                setTimeout(() => {
                  if (activeSection === 2) {
                    // Trigger restart by incrementing trigger
                    setRestartTrigger(prev => prev + 1);
                  }
                }, 2000);
              }}
            />
          </div>

          {/* Demo Container 3 - Preventing knowledge loss */}
          <div
            ref={demoContainer3Ref}
            className={`absolute transition-all duration-300 ${
              activeSection === 3 ? 'opacity-100 z-40' : 'opacity-0 z-30'
            } ${isTransitioning ? 'pointer-events-none' : ''}`}
            style={{
              top: '30%',
              left: '0%',
              right: '0%',
              height: '60%',
            }}
          >
            <ChatDemoMini
              scenarioIndex={6}
              isActive={activeSection === 3}
              key={`demo-3-${restartTrigger}`} // Force re-render on restart
              enableWaitlistInteraction={true}
              onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
              source="features"
              onComplete={() => {
                // Auto-restart after 2 seconds if still on this section
                setTimeout(() => {
                  if (activeSection === 3) {
                    // Trigger restart by incrementing trigger
                    setRestartTrigger(prev => prev + 1);
                  }
                }, 2000);
              }}
            />
          </div>

          {/* Demo Container 4 - Smart AI intervention */}
          <div
            ref={demoContainer4Ref}
            className={`absolute transition-all duration-300 ${
              activeSection === 4 ? 'opacity-100 z-40' : 'opacity-0 z-35'
            } ${isTransitioning ? 'pointer-events-none' : ''}`}
            style={{
              top: '40%',
              left: '0%',
              right: '0%',
              height: '60%',
            }}
          >
            <ChatDemoMini
              scenarioIndex={3}
              isActive={activeSection === 4}
              key={`demo-4-${restartTrigger}`} // Force re-render on restart
              enableWaitlistInteraction={true}
              onInteractionAttempt={waitlistInteraction.handleInteractionAttempt}
              source="features"
              onComplete={() => {
                // Auto-restart after 2 seconds if still on this section
                setTimeout(() => {
                  if (activeSection === 4) {
                    // Trigger restart by incrementing trigger
                    setRestartTrigger(prev => prev + 1);
                  }
                }, 2000);
              }}
            />
          </div>
        </div>
      </div>
      <aside className="relative flex flex-1 flex-col justify-center items-center gap-10 py-10 px-4 md:px-10 z-40">
        
        <h2 className="sr-only">Product Features</h2>
        <div
          ref={infoSection1Ref}
          className={`relative z-50 transition-opacity duration-200 ${
            isTransitioning ? 'opacity-60 pointer-events-none' : 'opacity-100'
          }`}
        >
          <InfoSection
            heading="Never lose context across time"
            subheading="Stay aligned with AI-powered context"
            description="Akarii remembers every decision, discussion, and detail—even across days or weeks. No more time wasted catching up or reconstructing lost context."
            defaultExpanded={activeSection === 1}
            timelineRef={infoTimeline1Ref}
            onToggle={() => handleSectionClick(1)}
          />
        </div>
        <div
          ref={infoSection2Ref}
          className={`relative z-50 md:transition-opacity md:duration-200 ${
            isTransitioning
              ? 'opacity-100 md:opacity-60 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <InfoSection
            heading="One AI shared by the whole team"
            subheading="Shared intelligence across teams"
            description="Work with AI the way you work with people—in the same space, seeing the same context. Cross-team visibility means everyone stays informed instantly."
            defaultExpanded={activeSection === 2}
            timelineRef={infoTimeline2Ref}
            onToggle={() => handleSectionClick(2)}
          />
        </div>
        <div
          ref={infoSection3Ref}
          className={`relative z-50 md:transition-opacity md:duration-200 ${
            isTransitioning
              ? 'opacity-100 md:opacity-60 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <InfoSection
            heading="Prevent knowledge from vanishing"
            subheading="Critical insights, always accessible"
            description="Late-night fixes, emergency decisions, scattered conversations—Akarii captures it all and makes it instantly searchable when you need it most."
            defaultExpanded={activeSection === 3}
            timelineRef={infoTimeline3Ref}
            onToggle={() => handleSectionClick(3)}
          />
        </div>
        <div
          ref={infoSection4Ref}
          className={`relative z-50 md:transition-opacity md:duration-200 ${
            isTransitioning
              ? 'opacity-100 md:opacity-60 pointer-events-none'
              : 'opacity-100'
          }`}
        >
          <InfoSection
            heading="Intelligence that speaks when it matters"
            subheading="Silent until it counts"
            description="Stay focused while AI monitors in the background, stepping in only to flag risks, surface critical insights, or point out what's missing."
            defaultExpanded={activeSection === 4}
            timelineRef={infoTimeline4Ref}
            onToggle={() => handleSectionClick(4)}
          />
        </div>
      </aside>

      {/* Waitlist Interaction Popover */}
      <ChatInteractionPopover
        isOpen={waitlistInteraction.isPopoverOpen}
        onClose={waitlistInteraction.closePopover}
        source="features"
        interactionType={waitlistInteraction.interactionType!}
        variant={waitlistInteraction.variant}
      />
    </section>
  );
}
