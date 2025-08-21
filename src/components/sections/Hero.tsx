'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import SplitType from 'split-type';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { ExternalLink } from '../icons';
import { Input, Button, Logo } from '../atoms';

export default function Hero() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const addToWaitlist = useMutation(api.waitlist.addEmail);

  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitle1Ref = useRef<HTMLParagraphElement>(null);
  const subtitle2Ref = useRef<HTMLParagraphElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const buttonRef1 = useRef<HTMLButtonElement>(null);
  const buttonRef2 = useRef<HTMLButtonElement>(null);
  const prototypeRef = useRef<HTMLDivElement>(null);
  const mobileImageRef = useRef<HTMLImageElement>(null);
  const desktopImageRef = useRef<HTMLImageElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      // Set initial states - ensure buttons start completely hidden
      gsap.set(
        [
          subtitle1Ref.current,
          subtitle2Ref.current,
          descRef.current,
          inputRef.current,
          buttonRef1.current,
          buttonRef2.current,
          prototypeRef.current,
          logoRef.current,
        ],
        {
          opacity: 0,
          y: 30,
          visibility: 'hidden',
        }
      );

      // Hide prototype images separately (no transform, just opacity)
      gsap.set([mobileImageRef.current, desktopImageRef.current], {
        opacity: 0,
      });

      // Timeline for animations
      const tl = gsap.timeline();

      // 1. AKARII typing animation
      if (titleRef.current) {
        const splitTitle = new SplitType(titleRef.current, {
          types: ['words', 'chars'],
        });
        const chars = splitTitle.chars;

        if (chars) {
          // Hide characters initially like real typing
          gsap.set(chars, { opacity: 0 });
          gsap.set(titleRef.current, { opacity: 1 });

          // Check if desktop (right to left) or mobile (left to right)
          const isDesktop = window.matchMedia('(min-width: 768px)').matches;
          const orderedChars = isDesktop ? [...chars].reverse() : chars;

          // Characters appear one by one like typing
          tl.to(orderedChars, {
            opacity: 1,
            duration: 0.05,
            stagger: 0.08,
            ease: 'none',
          });
        }
      }

      // 2. AI Workspace subtitle (with overlap)
      tl.to(
        subtitle1Ref.current,
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.3'
      );

      // 2. AI Workspace subtitle (with overlap)
      tl.to(
        subtitle2Ref.current,
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.3'
      );

      // 3. Team chat description (with overlap)
      tl.to(
        descRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.6,
          ease: 'power4.out',
        },
        '-=0.3'
      );

      // 4. Input animation
      tl.to(
        inputRef.current,
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.3,
          ease: 'power4.out',
        },
        '-=0.1'
      );

      // 5. First button animation
      tl.to(
        buttonRef1.current,
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.3,
          ease: 'power4.out',
        },
        '-=0.1'
      );

      // 6. Second button animation
      tl.to(
        buttonRef2.current,
        {
          opacity: 1,
          y: 0,
          visibility: 'visible',
          duration: 0.3,
          ease: 'power4.out',
        },
        '-=0.1'
      );

      // 7. Demo video container - starts after buttons complete
      tl.to(prototypeRef.current, {
        opacity: 1,
        y: 0,
        visibility: 'visible',
        duration: 0.6,
        ease: 'power2.out',
      });

      // 8. Images fade in with container
      tl.to(
        [mobileImageRef.current, desktopImageRef.current],
        {
          opacity: 1,
          visibility: 'visible',
          duration: 0.6,
          ease: 'power2.out',
        },
        '-=0.6'
      );

      // 9. Logo fade in - final touch
      tl.to(logoRef.current, {
        opacity: 1,
        visibility: 'visible',
        duration: 0.6,
        ease: 'power2.out',
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    try {
      await addToWaitlist({
        email,
        source: 'hero',
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
    <section
      ref={heroRef}
      data-section="hero"
      className="min-h-screen flex flex-col items-center px-4 md:px-6 lg:px-10 pt-30 md:pt-40 pb-0 md:pb-20"
    >
      <div
        ref={logoRef}
        className="absolute top-0 md:top-0 left-[50%] transform -translate-x-1/2"
      >
        <Logo
          size={40}
          desktopSize={64}
        />
      </div>
      <div className="max-w-7xl w-full flex flex-col gap-10 md:gap-20">
        <div className="flex flex-col gap-6 md:gap-10">
          <div className="flex flex-col lg:flex-row justify-start lg:justify-between lg:items-end gap-4">
            <div className="h-fit max-w-[260px] lg:max-w-[320px] flex flex-col gap-0 order-2 lg:order-1">
              <p
                ref={subtitle1Ref}
                className="eyebrow2 xl:eyebrow1 text-white/80 opacity-0 invisible translate-y-[30px]"
              >
                New Intelligence
              </p>
              <p
                ref={subtitle2Ref}
                className="eyebrow2 xl:eyebrow1 text-white/80 opacity-0 invisible translate-y-[30px]"
              >
                Needs New Standards
              </p>
              <p
                ref={descRef}
                className="paragraph1 text-white/50 opacity-0 invisible translate-y-[30px]"
              >
                The workspace that thinks with you
              </p>
            </div>
            <h1
              ref={titleRef}
              className="heading-mega2 xl:heading-mega1 text-white order-1 lg:order-2 opacity-0"
            >
              AKARII
            </h1>
          </div>
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
              className="w-full flex flex-col md:flex-row gap-2"
            >
              <Input
                ref={inputRef}
                placeholder="example@email.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={status === 'loading'}
                className="w-full md:flex-1 opacity-0 invisible translate-y-[30px]"
              />

              <Button
                ref={buttonRef1}
                type="submit"
                disabled={status === 'loading'}
                icon={<ExternalLink size={16} />}
                className="w-full md:w-auto opacity-0 invisible translate-y-[30px]"
              >
                {status === 'loading'
                  ? 'Joining...'
                  : status === 'success'
                    ? 'Welcome to the future'
                    : 'Join Waitlist'}
              </Button>

              <Button
                ref={buttonRef2}
                type="button"
                icon={<ExternalLink size={16} />}
                className="w-full md:w-auto opacity-0 invisible translate-y-[30px]"
                onClick={() => (window.location.href = '/contact')}
              >
                Talk to Founder
              </Button>
            </form>
          </div>
        </div>
        <div
          ref={prototypeRef}
          className="opacity-0 invisible translate-y-[30px]"
        >
          {/* Mobile prototype */}
          <figure
            className="md:hidden h-[640px] w-full bg-white/5 backdrop-blur-sm rounded-[40px] overflow-hidden border border-white/10"
            aria-label="Product demo prototype"
          >
            <Image
              ref={mobileImageRef}
              src="/prototype1.png"
              alt="Akarii product prototype"
              width={800}
              height={640}
              className="w-full h-full object-cover opacity-0"
            />
          </figure>

          {/* Desktop prototype */}
          <figure
            className="hidden md:flex h-[640px] w-full bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden"
            aria-label="Product demo prototype"
          >
            <Image
              ref={desktopImageRef}
              src="/desktop-prototype1.png"
              alt="Akarii product prototype"
              width={800}
              height={640}
              className="w-full h-full object-cover opacity-0"
            />
          </figure>
        </div>
      </div>
    </section>
  );
}
