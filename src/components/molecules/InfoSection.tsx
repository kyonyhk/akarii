'use client';

import { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { cn } from '@/lib/utils';

interface InfoSectionProps {
  /** Main heading text */
  heading: string;
  /** Small eyebrow text above the heading */
  subheading: string;
  /** Description text below the heading */
  description: string;
  /** Whether the section starts in expanded state */
  defaultExpanded?: boolean;
  /** Additional CSS classes */
  className?: string;
  /** Trigger for entry animation */
  trigger?: boolean;
  /** Callback when section is toggled */
  onToggle?: () => void;
  /** Ref to get access to the entry animation timeline */
  timelineRef?: React.MutableRefObject<gsap.core.Timeline | null>;
}

export default function InfoSection({
  heading,
  subheading,
  description,
  defaultExpanded = true,
  className,
  trigger = false,
  onToggle,
  timelineRef,
}: InfoSectionProps) {
  // Use controlled state from parent via defaultExpanded prop
  const isExpanded = defaultExpanded;

  // Refs for animation elements
  const plusRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLParagraphElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const descriptionRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Entry animation timeline (exposed for ScrollTrigger toggle actions)
  const entryTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Entry animation effect (creates timeline once, never rebuilds)
  useEffect(() => {
    if (!plusRef.current || !eyebrowRef.current || !headingRef.current) return;

    // Create timeline and store ref for external control
    const tl = gsap.timeline({ paused: true });
    entryTimelineRef.current = tl;

    // Also expose timeline to parent if ref is provided
    if (timelineRef) {
      timelineRef.current = tl;
    }

    // Set initial states for entry animation
    gsap.set(plusRef.current, {
      rotation: -45,
      opacity: 0,
      scale: 1,
    });
    gsap.set([eyebrowRef.current, headingRef.current], {
      y: 20,
      opacity: 0,
    });

    if (descriptionRef.current) {
      gsap.set(descriptionRef.current, { y: 20, opacity: 0 });
    }

    // Build entry animation sequence: plus → eyebrow → heading → description
    // Always animate to inactive state first (0 rotation, scale 1)
    tl.to(plusRef.current, {
      rotation: 0,
      opacity: 1,
      scale: 1,
      duration: 0.6,
      ease: 'power4.out',
    })
      .to(
        eyebrowRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.2'
      )
      .to(
        headingRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.3'
      );

    if (descriptionRef.current) {
      tl.to(
        descriptionRef.current,
        {
          y: 0,
          opacity: 1,
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.3'
      );
    }

    return () => {
      entryTimelineRef.current = null;
      tl.kill();
    };
  }, []); // No dependencies - create once and never rebuild

  // Handle state changes from parent (when other InfoSection becomes active)
  // Create separate animations that don't interfere with entry timeline
  useEffect(() => {
    if (
      !plusRef.current ||
      !eyebrowRef.current ||
      !headingRef.current ||
      !descriptionRef.current
    )
      return;

    // Only animate state changes if elements are already visible
    // Check if entry animation has played by checking if timeline exists and has progress
    const hasEntryAnimationPlayed =
      entryTimelineRef.current && entryTimelineRef.current.progress() > 0;

    if (!hasEntryAnimationPlayed) return; // Don't interfere with entry animation

    // Create independent animations for state changes
    if (isExpanded) {
      // Active state: 90 degrees rotation, scaled up
      gsap.to(plusRef.current, {
        rotation: 90,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Text returns to default position
      gsap.to(
        [eyebrowRef.current, headingRef.current, descriptionRef.current],
        {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    } else {
      // Inactive state: 0 degrees rotation, normal scale
      gsap.to(plusRef.current, {
        rotation: 0,
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Text stays at default position
      gsap.to(
        [eyebrowRef.current, headingRef.current, descriptionRef.current],
        {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    }
  }, [isExpanded]);

  // Hover animation handlers (inactive state only)
  const handleMouseEnter = () => {
    if (
      !isExpanded &&
      plusRef.current &&
      eyebrowRef.current &&
      headingRef.current &&
      descriptionRef.current
    ) {
      // Plus icon rotates 45 degrees clockwise (from 0 to 45 degrees, + to x)
      gsap.to(plusRef.current, {
        rotation: 45,
        duration: 0.3,
        ease: 'power4.out',
      });

      // Text moves right 8px from default position (with stagger)
      gsap.to(eyebrowRef.current, {
        x: 8,
        duration: 0.3,
        ease: 'power4.out',
      });

      gsap.to(headingRef.current, {
        x: 8,
        duration: 0.3,
        ease: 'power4.out',
      });

      gsap.to(descriptionRef.current, {
        x: 8,
        duration: 0.3,
        ease: 'power4.out',
      });
    }
  };

  const handleMouseLeave = () => {
    if (
      !isExpanded &&
      plusRef.current &&
      eyebrowRef.current &&
      headingRef.current &&
      descriptionRef.current
    ) {
      // Plus icon rotates back to 0 degrees (inactive state, + shape)
      gsap.to(plusRef.current, {
        rotation: 0,
        duration: 0.3,
        ease: 'power2.out',
      });

      // All text elements move back to default position simultaneously (no delays)
      gsap.to(
        [eyebrowRef.current, headingRef.current, descriptionRef.current],
        {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    }
  };

  // Click handler with rotation and scale animation (only for inactive state)
  const handleClick = () => {
    // Don't allow clicks when already active
    if (isExpanded) return;

    if (
      plusRef.current &&
      eyebrowRef.current &&
      headingRef.current &&
      descriptionRef.current
    ) {
      // Plus: rotate back to 0 degrees (original position) and scale up
      gsap.to(plusRef.current, {
        rotation: 0,
        scale: 1.2,
        duration: 0.3,
        ease: 'power2.out',
      });

      // Text: return to default position
      gsap.to(
        [eyebrowRef.current, headingRef.current, descriptionRef.current],
        {
          x: 0,
          duration: 0.3,
          ease: 'power2.out',
        }
      );
    }

    // Call parent's toggle handler
    if (onToggle) {
      onToggle();
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn(
        'flex flex-row gap-4 items-start justify-start w-full text-left transition-opacity duration-300',
        'py-6 pl-0 lg:pl-6 pr-6 lg:pr-20', // Consistent padding
        !isExpanded && 'md:opacity-50', // Only apply opacity reduction on desktop
        isExpanded ? 'cursor-default' : 'cursor-pointer', // Remove pointer cursor for active state
        className
      )}
    >
      {/* Plus Icon */}
      <div className="flex flex-col gap-[13px] items-center justify-center p-0 shrink-0 w-10">
        <div
          ref={plusRef}
          className={cn(
            'text-white',
            'text-heading4 md:text-heading4-md', // Responsive text size
            'font-mondwest leading-none'
          )}
          style={{ opacity: 0, transform: 'rotate(-45deg)' }}
        >
          +
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 grow min-w-0">
        {/* Eyebrow and Heading */}
        <div className="flex flex-col gap-0 w-full">
          <p
            ref={eyebrowRef}
            className="eyebrow4 text-white/80 leading-none"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            {subheading}
          </p>
          <h3
            ref={headingRef}
            className="heading3 text-white leading-none"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            {heading}
          </h3>
        </div>

        {/* Description - always show */}
        <div className="w-full">
          <p
            ref={descriptionRef}
            className="paragraph1 text-white/80 leading-none"
            style={{ opacity: 0, transform: 'translateY(20px)' }}
          >
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}
