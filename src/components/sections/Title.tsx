'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Title() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const akariiRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const layer3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const setupTextAnimations = () => {
        if (!akariiRef.current || !subtitleRef.current) return;

        // Split Akarii text into characters for typing animation
        const splitAkarii = new SplitType(akariiRef.current, {
          types: 'chars',
        });

        // Split subtitle text into words for word animation
        const splitSubtitle = new SplitType(subtitleRef.current, {
          types: 'words',
        });

        const akariiChars = splitAkarii.chars;
        const subtitleWords = splitSubtitle.words;

        if (akariiChars && subtitleWords) {
          // Hide elements initially
          gsap.set(akariiChars, { opacity: 0 });
          gsap.set(subtitleWords, { opacity: 0, y: 20 });
          gsap.set([akariiRef.current, subtitleRef.current], { opacity: 1 });

          // ScrollTrigger at 30% from bottom (70% from top)
          // Create text animation timeline
          const textTl = gsap.timeline({ paused: true });

          // Akarii typing animation (same as ValueProposition)
          textTl.to(akariiChars, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.08,
            ease: 'none',
          });

          // Subtitle words animation with slight overlap
          // Start slightly before Akarii animation completes
          textTl.to(
            subtitleWords,
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.2'
          ); // Start 0.2s before previous animation ends

          ScrollTrigger.create({
            trigger: headerRef.current,
            start: 'top 85%',
            end: 'bottom 20%',
            animation: textTl,
            toggleActions: 'play none none reverse',
          });
        }
      };

      const setupBackgroundAnimations = () => {
        if (!layer1Ref.current || !layer2Ref.current || !layer3Ref.current)
          return;

        // Initially hide all layers off-screen to the left
        gsap.set([layer1Ref.current, layer2Ref.current, layer3Ref.current], {
          x: '-100%',
          opacity: 0,
        });

        // Create background animation timeline
        const backgroundTl = gsap.timeline({ paused: true });

        // Layer 1 animates in from left (slower)
        backgroundTl.to(layer1Ref.current, {
          x: '0%',
          opacity: 1,
          duration: 0.4,
          ease: 'power2.out',
        });

        // Layer 2 animates in from left (staggered, slower)
        backgroundTl.to(
          layer2Ref.current,
          {
            x: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        );

        // Layer 3 animates in from left (staggered, slower)
        backgroundTl.to(
          layer3Ref.current,
          {
            x: '0%',
            opacity: 1,
            duration: 0.4,
            ease: 'power2.out',
          },
          '-=0.2'
        );

        // After a longer pause, animate layers 1 and 2 out to the right
        backgroundTl.to(
          [layer1Ref.current, layer2Ref.current],
          {
            x: '100%',
            opacity: 0,
            duration: 0.5,
            ease: 'power2.in',
          },
          '+=0.5'
        );

        // Background layer animation triggered at 20% from top with toggle actions
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 20%',
          end: 'bottom 20%',
          animation: backgroundTl,
          toggleActions: 'play none none reverse',
        });
      };

      setupTextAnimations();
      setupBackgroundAnimations();
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col items-center justify-end py-12 px-4 md:py-20 md:px-6 lg:px-10 relative overflow-hidden"
    >
      {/* Background layers */}
      <div
        ref={layer1Ref}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-10"
      />
      <div
        ref={layer2Ref}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-20"
      />
      <div
        ref={layer3Ref}
        className="absolute inset-0 bg-black/20 backdrop-blur-sm z-30"
      />

      <div className="max-w-7xl w-full ">
        <header
          className="flex flex-col gap-2 md:gap-0 relative z-40"
          ref={headerRef}
        >
          <h2
            ref={akariiRef}
            className="heading-mega2 md:heading-mega1 text-white opacity-0"
          >
            Akarii,
          </h2>
          <p
            ref={subtitleRef}
            className="heading2 md:heading1 text-white/80 opacity-0"
          >
            an intelligent workspace for AI native teams
          </p>
        </header>
      </div>
    </section>
  );
}
