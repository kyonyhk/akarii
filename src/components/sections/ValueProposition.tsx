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
  
  const [leftCardTriggered, setLeftCardTriggered] = useState(false);
  const [rightCardTriggered, setRightCardTriggered] = useState(false);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Cards ScrollTrigger - trigger at 40% from bottom
      ScrollTrigger.create({
        trigger: cardsContainerRef.current,
        start: 'top 60%', // 60% from top = 40% from bottom
        onEnter: () => {
          // Left card animates first
          setLeftCardTriggered(true);
          
          // Right card animates with some overlap
          setTimeout(() => {
            setRightCardTriggered(true);
          }, 300);
        },
        once: true
      });

      // Heading animation - same technique as AKARII
      const setupHeadingAnimation = () => {
        if (!headingRef1.current || !headingRef2.current) return;

        // Split the text into characters
        const splitHeading1 = new SplitType(headingRef1.current, { types: 'chars' });
        const splitHeading2 = new SplitType(headingRef2.current, { types: 'chars' });
        
        const chars1 = splitHeading1.chars;
        const chars2 = splitHeading2.chars;

        if (chars1 && chars2) {
          // Hide characters initially
          gsap.set([chars1, chars2], { opacity: 0 });
          gsap.set([headingRef1.current, headingRef2.current], { opacity: 1 });

          ScrollTrigger.create({
            trigger: headingRef1.current,
            start: 'top 60%',
            onEnter: () => {
              const tl = gsap.timeline();

              // First line animation - left to right
              tl.to(chars1, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.08,
                ease: 'none',
              });

              // Second line animation - starts after first line completes
              // Also left to right
              tl.to(chars2, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.08,
                ease: 'none',
              });
            },
            once: true
          });
        }
      };

      setupHeadingAnimation();

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="flex flex-col px-4 md:px-40 py-30 gap-20">
      <div ref={cardsContainerRef} className="flex flex-col md:flex-row gap-2 md:gap-6 order-2 md:order-1">
        <div ref={leftCardRef}>
          <InfoCard
            heading="Kill the copy and paste AI workflow."
            subheading="AI is your new teammate"
            description="Right now, teams talk to AI in silos, then waste time pasting outputs into meetings. Akarii puts humans and AI in one conversation, so ideas move faster and nothing gets lost."
            trigger={leftCardTriggered}
          />
        </div>
        <div ref={rightCardRef}>
          <InfoCard
            heading="Think beyond human limits."
            subheading="Work like humans and AI were meant to"
            description="In a shared space, AI can surface context, recall decisions, and keep goals aligned. Your team and AI see the same information, work from the same thread, and build shared understanding in real time."
            trigger={rightCardTriggered}
          />
        </div>
      </div>
      <div className="flex flex-col gap-1 order-1 md:order-2">
        <h2 ref={headingRef1} className="heading-mega2 text-white opacity-0">AI is here.</h2>
        <h2 ref={headingRef2} className="heading-mega2 text-white opacity-0">But teams are not ready.</h2>
      </div>
    </section>
  );
}
