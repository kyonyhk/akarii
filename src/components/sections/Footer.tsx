'use client';

import { useRef, useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Button, Input, Logo } from '../atoms';
import { ExternalLink } from '../icons';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const addToWaitlist = useMutation(api.waitlist.addEmail);

  // Refs for animation elements
  const footerRef = useRef<HTMLElement>(null);
  const headerContainerRef = useRef<HTMLDivElement>(null);
  const headingLine1Ref = useRef<HTMLHeadingElement>(null);
  const headingLine2Ref = useRef<HTMLHeadingElement>(null);
  const bePartRef = useRef<HTMLParagraphElement>(null);
  const waitlistContainerRef = useRef<HTMLDivElement>(null);
  const waitlistHeadingRef = useRef<HTMLHeadingElement>(null);
  const helpTextRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const logoContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerRef.current) return;

    const ctx = gsap.context(() => {
      // Setup header animations (Group 1: triggered at top 50%)
      const setupHeaderAnimations = () => {
        if (
          !headingLine1Ref.current ||
          !headingLine2Ref.current ||
          !bePartRef.current
        )
          return;

        // Split headings into words
        const splitHeading1 = new SplitType(headingLine1Ref.current, {
          types: 'words',
        });
        const splitHeading2 = new SplitType(headingLine2Ref.current, {
          types: 'words',
        });

        const words1 = splitHeading1.words;
        const words2 = splitHeading2.words;

        if (words1 && words2) {
          // Set initial states
          gsap.set([words1, words2], { opacity: 0, y: 20 });
          gsap.set(bePartRef.current, { opacity: 0, y: 20 });
          gsap.set([headingLine1Ref.current, headingLine2Ref.current], {
            opacity: 1,
          });

          // Create header animation timeline
          const headerTl = gsap.timeline({ paused: true });

          // 1. First line words animate from bottom up
          headerTl.to(words1, {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            ease: 'power2.out',
          });

          // Second line words animate from bottom up
          headerTl.to(
            words2,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              stagger: 0.1,
              ease: 'power2.out',
            },
            '-=0.3'
          ); // Start before first line completes

          // 2. "Be part..." with overlap
          headerTl.to(
            bePartRef.current,
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: 'power2.out',
            },
            '-=0.3'
          ); // Overlap with heading animations

          // 3. Trigger when container hits top 50%
          ScrollTrigger.create({
            trigger: headerContainerRef.current,
            start: 'top 50%',
            end: 'bottom 20%',
            animation: headerTl,
            toggleActions: 'play none none reverse',
          });
        }
      };

      // No animations for waitlist section - keep CTA visible

      // Setup logo animation (Group 3: triggered when page hits bottom)
      const setupLogoAnimation = () => {
        if (!logoContainerRef.current) return;

        // Set initial state
        gsap.set(logoContainerRef.current, { opacity: 0 });

        // Create logo animation timeline
        const logoTl = gsap.timeline({ paused: true });

        // 9. Logo fade in when page hits bottom with 1 second delay
        logoTl
          .to({}, { duration: 0.5 }) // 1 second delay
          .to(logoContainerRef.current, {
            opacity: 1,
            duration: 2.5,
            ease: 'power4.out',
          });

        // Trigger when page hits bottom
        ScrollTrigger.create({
          trigger: footerRef.current,
          start: 'bottom bottom',
          end: 'bottom bottom',
          animation: logoTl,
          toggleActions: 'play none none reverse',
        });
      };

      setupHeaderAnimations();
      setupLogoAnimation();
    }, footerRef);

    return () => ctx.revert();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await addToWaitlist({
        email,
        source: 'footer',
        referrer: typeof window !== 'undefined' ? document.referrer : undefined,
        userAgent:
          typeof window !== 'undefined' ? navigator.userAgent : undefined,
      });

      setStatus('success');
      setEmail('');

      // Reset success state after 3 seconds
      setTimeout(() => {
        setStatus('idle');
      }, 3000);
    } catch (error: any) {
      setStatus('error');
      // Check for specific error types and provide user-friendly messages
      if (error.message && error.message.includes('already registered')) {
        setErrorMessage(
          "You're already on the list. Something special is coming."
        );
      } else if (error.message && error.message.includes('Invalid email')) {
        setErrorMessage('Please enter a valid email address.');
      } else {
        setErrorMessage('Something went wrong. Please try again.');
      }

      // Reset error state after 5 seconds
      setTimeout(() => {
        setStatus('idle');
        setErrorMessage('');
      }, 5000);
    }
  };

  return (
    <footer
      ref={footerRef}
      className="min-h-screen flex flex-col justify-between items-center px-4 md:px-50 pt-20 md:pt-50 pb-4 md:pb-10"
    >
      <div
        ref={headerContainerRef}
        className="flex flex-col justify-center items-center"
      >
        <header className="flex flex-col justify-center items-center">
          <h2
            ref={headingLine1Ref}
            className="heading2 md:heading1 text-white align-center opacity-0"
          >
            New intelligence
          </h2>
          <h2
            ref={headingLine2Ref}
            className="heading2 md:heading1 text-white text-center opacity-0"
          >
            requires new standards
          </h2>
        </header>
        <p
          ref={bePartRef}
          className="eyebrow2 text-white/50 opacity-0"
        >
          Be part of the first wave.
        </p>
      </div>
      <div
        ref={waitlistContainerRef}
        className="w-full flex flex-col justify-center items-center gap-4 md:gap-6"
      >
        <header className="flex flex-col justify-center items-center">
          <h3
            ref={waitlistHeadingRef}
            className="heading4 text-white"
          >
            Waitlist is now open.
          </h3>
          <p
            ref={helpTextRef}
            className="eyebrow4 text-white/50"
          >
            Help shape the future of team intelligence.
          </p>
        </header>
        <div className="w-full flex flex-col gap-2 items-center">
          {status === 'error' && (
            <div className="text-red-400 paragraph2 bg-red-500/10 border border-red-500/20 rounded-[40px] py-3 px-6">
              {errorMessage}
            </div>
          )}
          {status === 'success' && (
            <div className="w-full text-white heading5 text-center">
              You're in. Something special is coming.
            </div>
          )}
          <form
            onSubmit={handleEmailSubmit}
            className="max-w-[640px] w-full md:w-[640px] flex flex-col gap-2 justify-center items-center"
          >
            <Input
              ref={inputRef}
              placeholder="example@email.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full"
              aria-label="Email address"
              required
              disabled={status === 'loading'}
            />
            <Button
              ref={buttonRef}
              type="submit"
              disabled={status === 'loading'}
              icon={<ExternalLink size={16} />}
              className="w-full"
            >
              {status === 'loading'
                ? 'Joining...'
                : status === 'success'
                  ? 'Welcome to the future'
                  : 'Join Waitlist'}
            </Button>
          </form>
        </div>
      </div>
      <div
        ref={logoContainerRef}
        className="flex flex-col md:flex-row items-center gap-1 opacity-0"
      >
        <Logo
          size={40}
          desktopSize={24}
          alt="Akarii company logo"
        />
        <p className="heading5 text-white">AKARII</p>
      </div>
    </footer>
  );
}
