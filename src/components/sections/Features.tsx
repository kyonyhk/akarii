'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfoSection from '../molecules/InfoSection';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const [isMobile, setIsMobile] = useState(false);
  const [activeSection, setActiveSection] = useState<1 | 2 | 3 | 4>(1); // First section active by default

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

  // Click handlers for section toggling (desktop only)
  const handleSectionClick = (section: 1 | 2 | 3 | 4) => {
    if (!isMobile) {
      setActiveSection(section);
    }
  };

  // Check for mobile on mount
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

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
              start: 'top 70%',
              end: 'bottom 50%',
              animation: infoTimeline1Ref.current,
              toggleActions: 'play none none reverse',
            });
          }

          // InfoSection 2 animation
          if (infoTimeline2Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection2Ref.current,
              start: 'top 70%',
              end: 'bottom 50%',
              animation: infoTimeline2Ref.current,
              toggleActions: 'play none none reverse',
            });
          }

          // InfoSection 3 animation
          if (infoTimeline3Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection3Ref.current,
              start: 'top 70%',
              end: 'bottom 50%',
              animation: infoTimeline3Ref.current,
              toggleActions: 'play none none reverse',
            });
          }

          // InfoSection 4 animation
          if (infoTimeline4Ref.current) {
            ScrollTrigger.create({
              trigger: infoSection4Ref.current,
              start: 'top 70%',
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
              start: 'top 70%',
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

  // Get placeholder content based on active section
  const getPlaceholderContent = () => {
    const baseClasses =
      'h-full w-full border backdrop-blur-sm border-white/20 rounded-3xl flex items-center justify-center text-white font-mondwest text-heading4 md:text-heading3';

    switch (activeSection) {
      case 1:
        return (
          <div className={`${baseClasses} bg-blue-500/20`}>
            Collaboration Demo
          </div>
        );
      case 2:
        return (
          <div className={`${baseClasses} bg-green-500/20`}>
            Goal Tracking Demo
          </div>
        );
      case 3:
        return (
          <div className={`${baseClasses} bg-purple-500/20`}>
            Decision Memory Demo
          </div>
        );
      case 4:
        return (
          <div className={`${baseClasses} bg-orange-500/20`}>
            AI Intelligence Demo
          </div>
        );
      default:
        return (
          <div className={`${baseClasses} bg-white/10`}>Features Demo</div>
        );
    }
  };

  return (
    <section
      ref={sectionRef}
      data-section="features"
      className="min-h-screen flex flex-row"
    >
      <figure
        className="hidden md:flex flex-1 flex-col justify-center items-center p-10"
        aria-label="Features demonstration"
      >
        {getPlaceholderContent()}
      </figure>
      <aside className="bg-black/50 backdrop-blur-sm flex flex-1 flex-col justify-center items-center gap-10 py-10 px-4 md:px-10">
        <h2 className="sr-only">Product Features</h2>
        <div ref={infoSection1Ref}>
          <InfoSection
            heading="Collaborate with AI as a team"
            subheading="Humans and AI, side by side"
            description="A single conversation space where teammates and AI interact together, making collaboration faster and more transparent."
            defaultExpanded={activeSection === 1}
            timelineRef={infoTimeline1Ref}
            onToggle={() => handleSectionClick(1)}
          />
        </div>
        <div ref={infoSection2Ref}>
          <InfoSection
            heading="Keep every discussion tied to goals"
            subheading="Every word with purpose"
            description="Link conversations to objectives so the AI can help keep your team on-track and call out drift when it happens."
            defaultExpanded={activeSection === 2}
            timelineRef={infoTimeline2Ref}
            onToggle={() => handleSectionClick(2)}
          />
        </div>
        <div ref={infoSection3Ref}>
          <InfoSection
            heading="Instant decision memory"
            subheading="Decisions, remembered"
            description="Capture and recall every key decision with context-aware search. No more lost conclusions or 'what did we agree on?' moments."
            defaultExpanded={activeSection === 3}
            timelineRef={infoTimeline3Ref}
            onToggle={() => handleSectionClick(3)}
          />
        </div>
        <div ref={infoSection4Ref}>
          <InfoSection
            heading="Intelligence that speaks when it matters"
            subheading="Silent until it counts"
            description="Stay focused while AI listens in the background, stepping in only to flag risks, surface clarity, or point out what's missing."
            defaultExpanded={activeSection === 4}
            timelineRef={infoTimeline4Ref}
            onToggle={() => handleSectionClick(4)}
          />
        </div>
      </aside>
    </section>
  );
}
