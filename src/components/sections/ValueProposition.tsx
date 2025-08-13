'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import InfoCard from '../molecules/InfoCard';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function ValueProposition() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headingRef1 = useRef<HTMLHeadingElement>(null);
  const headingRef2 = useRef<HTMLHeadingElement>(null);

  // Timeline refs for InfoCards
  const leftCardTimelineRef = useRef<gsap.core.Timeline | null>(null);
  const rightCardTimelineRef = useRef<gsap.core.Timeline | null>(null);

  const [leftCardTriggered, setLeftCardTriggered] = useState(false);
  const [rightCardTriggered, setRightCardTriggered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Wait for InfoCard timelines to be created
      const timeoutId = setTimeout(() => {
        if (leftCardTimelineRef.current && rightCardTimelineRef.current) {
          const isDesktop = window.matchMedia('(min-width: 768px)').matches;

          if (isDesktop) {
            // Desktop: Use container as trigger, handle delay with ScrollTrigger delay
            ScrollTrigger.create({
              trigger: cardsContainerRef.current,
              start: 'top 60%',
              end: 'bottom 20%',
              animation: leftCardTimelineRef.current,
              toggleActions: 'play none none reverse',
            });

            // Right card with delay using ScrollTrigger's onToggle
            ScrollTrigger.create({
              trigger: cardsContainerRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              onToggle: (self) => {
                if (self.isActive) {
                  // Play with delay when entering
                  gsap.delayedCall(0.5, () => {
                    if (rightCardTimelineRef.current) {
                      rightCardTimelineRef.current.play();
                    }
                  });
                } else {
                  // Reverse immediately when leaving
                  if (rightCardTimelineRef.current) {
                    rightCardTimelineRef.current.reverse();
                  }
                }
              },
            });
          } else {
            // Mobile: Use individual card refs since they're stacked
            ScrollTrigger.create({
              trigger: leftCardRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              animation: leftCardTimelineRef.current,
              toggleActions: 'play none none reverse',
            });

            ScrollTrigger.create({
              trigger: rightCardRef.current,
              start: 'top 80%',
              end: 'bottom 20%',
              animation: rightCardTimelineRef.current,
              toggleActions: 'play none none reverse',
            });
          }
        }
      }, 100); // Wait for InfoCard timelines to be created

      // Heading animation with toggle actions
      const setupHeadingAnimation = () => {
        if (!headingRef1.current || !headingRef2.current) return;

        // Split the text into characters
        const splitHeading1 = new SplitType(headingRef1.current, {
          types: 'chars',
        });
        const splitHeading2 = new SplitType(headingRef2.current, {
          types: 'chars',
        });

        const chars1 = splitHeading1.chars;
        const chars2 = splitHeading2.chars;

        if (chars1 && chars2) {
          // Hide characters initially
          gsap.set([chars1, chars2], { opacity: 0 });
          gsap.set([headingRef1.current, headingRef2.current], { opacity: 1 });

          // Create heading animation timeline
          const headingTl = gsap.timeline({ paused: true });

          // First line animation - left to right
          headingTl.to(chars1, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.08,
            ease: 'none',
          });

          // Second line animation - starts after first line completes
          // Also left to right
          headingTl.to(chars2, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.08,
            ease: 'none',
          });

          ScrollTrigger.create({
            trigger: headingRef1.current,
            start: 'top 60%',
            end: 'bottom 20%',
            animation: headingTl,
            toggleActions: 'play none none reverse',
          });
        }
      };

      setupHeadingAnimation();

      return () => {
        clearTimeout(timeoutId);
      };
    }, sectionRef);

    return () => ctx.revert();
  }, [leftCardTimelineRef.current, rightCardTimelineRef.current]);

  return (
    <section
      ref={sectionRef}
      className="flex flex-col px-4 md:px-40 py-30 gap-20"
    >
      <div
        ref={cardsContainerRef}
        className="flex flex-col md:flex-row gap-2 md:gap-6 order-2 md:order-1"
      >
        <div ref={leftCardRef}>
          <InfoCard
            heading="Kill the copy and paste AI workflow."
            subheading="AI is your new teammate"
            description="Right now, teams talk to AI in silos, then waste time pasting outputs into meetings. Akarii puts humans and AI in one conversation, so ideas move faster and nothing gets lost."
            trigger={leftCardTriggered}
            timelineRef={leftCardTimelineRef}
          />
        </div>
        <div ref={rightCardRef}>
          <InfoCard
            heading="Think beyond human limits."
            subheading="Work like humans and AI were meant to"
            description="In a shared space, AI can surface context, recall decisions, and keep goals aligned. Your team and AI see the same information, work from the same thread, and build shared understanding in real time."
            trigger={rightCardTriggered}
            timelineRef={rightCardTimelineRef}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 order-1 md:order-2">
        <h2
          ref={headingRef1}
          className="heading-mega2 text-white opacity-0"
        >
          AI is here.
        </h2>
        <h2
          ref={headingRef2}
          className="heading-mega2 text-white opacity-0"
        >
          But teams are not ready.
        </h2>
      </div>
    </section>
  );
}
