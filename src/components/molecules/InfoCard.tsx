'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface InfoCardProps {
  heading: string;
  subheading: string;
  description: string;
  trigger?: boolean;
}

export default function InfoCard({
  heading,
  subheading,
  description,
  trigger = false,
}: InfoCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const plusRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const tl = gsap.timeline({ paused: true });

    // Set initial states
    tl.set(cardRef.current, {
      opacity: 0,
      y: 20
    })
    .set([plusRef.current, eyebrowRef.current, headingRef.current, descriptionRef.current], {
      opacity: 0
    })
    .set(plusRef.current, { scale: 0, rotation: 0 })
    .set([eyebrowRef.current, headingRef.current, descriptionRef.current], { y: 20 })
    // Container animation: animate from bottom up with opacity fade-in
    .to(cardRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power4.out'
    })
    // Plus sign animation: scale up and rotate 90deg
    .to(plusRef.current, {
      scale: 1,
      rotation: 90,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.2')
    // Text animations: animate from bottom with opacity fade-in
    .to(eyebrowRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.4')
    .to(headingRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.6')
    .to(descriptionRef.current, {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power4.out'
    }, '-=0.4');

    // Only play animation when triggered
    if (trigger) {
      tl.play();
    }

    return () => {
      tl.kill();
    };
  }, [trigger]);

  return (
    <div 
      ref={cardRef}
      className="flex flex-col gap-6 md:gap-20 rounded-[40px] bg-white/10 backdrop-blur-sm border border-white/10 p-6"
      style={{ opacity: 0, transform: 'translateY(20px)' }}
    >
      <div className="flex flex-col">
        <div className="w-4 h-4 mb-2 flex items-center justify-center">
          <div
            ref={plusRef}
            className="eyebrow1 text-white/50"
            style={{ opacity: 0, transform: 'scale(0)' }}
          >
            +
          </div>
        </div>
        <div 
          ref={eyebrowRef} 
          className="eyebrow4 text-white/80"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {subheading}
        </div>
        <div 
          ref={headingRef} 
          className="heading3 text-white"
          style={{ opacity: 0, transform: 'translateY(20px)' }}
        >
          {heading}
        </div>
      </div>
      <div 
        ref={descriptionRef} 
        className="paragraph1 text-white/50"
        style={{ opacity: 0, transform: 'translateY(20px)' }}
      >
        {description}
      </div>
    </div>
  );
}
