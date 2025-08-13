'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import InfoSection from '../molecules/InfoSection';
import Image from 'next/image';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Overview() {
  // Shared state: 'left' or 'right' InfoSection is active
  const [activeSection, setActiveSection] = useState<'left' | 'right'>('left');
  const [isMobile, setIsMobile] = useState(false);

  // Refs for scroll animations
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundLayerRef = useRef<HTMLDivElement>(null);
  const infoSectionLeftRef = useRef<HTMLDivElement>(null);
  const infoSectionRightRef = useRef<HTMLDivElement>(null);
  const imageContainerRef = useRef<HTMLElement>(null);
  const mobileImageLeftRef = useRef<HTMLElement>(null);
  const mobileImageRightRef = useRef<HTMLElement>(null);

  // Timeline refs for InfoSections
  const leftInfoTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const rightInfoTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const handleSectionClick = (section: 'left' | 'right') => {
    setActiveSection(section);
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
      !backgroundLayerRef.current ||
      !infoSectionLeftRef.current ||
      !infoSectionRightRef.current ||
      !imageContainerRef.current ||
      !mobileImageLeftRef.current ||
      !mobileImageRightRef.current
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
      gsap.set([mobileImageLeftRef.current, mobileImageRightRef.current], {
        opacity: 0,
        y: 40,
      });

      // Build animation timelines
      backgroundTl.to(backgroundLayerRef.current, {
        x: '0%',
        duration: 1.2,
        ease: 'power4.out',
      });

      leftImageTl.to(mobileImageLeftRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power4.out',
      });

      rightImageTl.to(mobileImageRightRef.current, {
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

          // Mobile image animations with toggle actions
          ScrollTrigger.create({
            trigger: mobileImageLeftRef.current,
            start: 'top 60%',
            end: 'bottom 20%',
            animation: leftImageTl,
            toggleActions: 'play none none reverse',
          });

          ScrollTrigger.create({
            trigger: mobileImageRightRef.current,
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
        <figure
          ref={mobileImageLeftRef}
          className="md:hidden h-[640px] w-full bg-white/5 backdrop-blur-sm rounded-[40px] overflow-hidden border border-white/10"
          aria-label="Product demo prototype"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          <Image
            src="/prototype1.png"
            alt="Akarii product prototype"
            width={800}
            height={640}
            className="w-full h-full object-cover object-top"
          />
        </figure>
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
        <figure
          ref={mobileImageRightRef}
          className="md:hidden h-[640px] w-full bg-white/5 backdrop-blur-sm rounded-[40px] overflow-hidden border border-white/10"
          aria-label="Product demo prototype"
          style={{ opacity: 0, transform: 'translateY(40px)' }}
        >
          <Image
            src="/prototype1.png"
            alt="Akarii product prototype"
            width={800}
            height={640}
            className="w-full h-full object-cover object-bottom"
          />
        </figure>
      </div>
      <figure
        ref={imageContainerRef}
        className="hidden md:flex h-[640px] w-full bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden relative z-10"
        aria-label="Product demo prototype"
        style={{ opacity: 0, transform: 'translateY(60px)' }}
      >
        <Image
          src="/desktop-prototype1.png"
          alt="Akarii product prototype"
          width={800}
          height={640}
          className="w-full h-full object-cover"
        />
      </figure>
    </section>
  );
}
