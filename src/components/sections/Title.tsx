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

          // ScrollTrigger at 20% from bottom (80% from top)
          ScrollTrigger.create({
            trigger: headerRef.current,
            start: 'top 80%',
            onEnter: () => {
              const tl = gsap.timeline();

              // Akarii typing animation (same as ValueProposition)
              tl.to(akariiChars, {
                opacity: 1,
                duration: 0.05,
                stagger: 0.08,
                ease: 'none',
              });

              // Subtitle words animation with slight overlap
              // Start slightly before Akarii animation completes
              tl.to(
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
            },
            once: true,
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

        // Background layer animation triggered at top of viewport
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: 'top 0%',
          onEnter: () => {
            const tl = gsap.timeline();

            // Layer 1 animates in from left
            tl.to(layer1Ref.current, {
              x: '0%',
              opacity: 1,
              duration: 0.25,
              ease: 'power2.out',
            });

            // Layer 2 animates in from left (staggered)
            tl.to(
              layer2Ref.current,
              {
                x: '0%',
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
              },
              '-=0.15'
            );

            // Layer 3 animates in from left (staggered)
            tl.to(
              layer3Ref.current,
              {
                x: '0%',
                opacity: 1,
                duration: 0.25,
                ease: 'power2.out',
              },
              '-=0.15'
            );

            // After a brief pause, animate layers 1 and 2 out to the right
            tl.to(
              [layer1Ref.current, layer2Ref.current],
              {
                x: '100%',
                opacity: 0,
                duration: 0.3,
                ease: 'power2.in',
                onComplete: () => {
                  // Remove the layers from DOM after animation
                  if (layer1Ref.current) layer1Ref.current.remove();
                  if (layer2Ref.current) layer2Ref.current.remove();
                },
              },
              '+=0.1'
            );
          },
          once: true,
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
      className="min-h-screen flex flex-col justify-end p-4 md:p-20 relative overflow-hidden"
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

      <header
        className="flex flex-col gap-2 md:gap-0 relative z-40"
        ref={headerRef}
      >
        <h2
          ref={akariiRef}
          className="heading-mega1 text-white opacity-0"
        >
          Akarii,
        </h2>
        <p
          ref={subtitleRef}
          className="heading1 text-white/80 opacity-0"
        >
          an intelligent AI workspace for AI native teams
        </p>
      </header>
    </section>
  );
}
