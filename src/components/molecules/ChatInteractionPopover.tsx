'use client';

import { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import posthog from '@/lib/posthog';
import { Input } from '@/components/atoms/Input';
import { Button } from '@/components/atoms/Button';
import { ExternalLink } from '../icons';

interface ChatInteractionPopoverProps {
  isOpen: boolean;
  onClose: () => void;
  source: 'overview' | 'features';
  interactionType: 'input_click' | 'send_click' | 'file_click' | 'speech_click';
  variant?: 'default' | 'casual' | 'urgent';
}

export default function ChatInteractionPopover({
  isOpen,
  onClose,
  source,
  interactionType,
  variant = 'default',
}: ChatInteractionPopoverProps) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<
    'idle' | 'loading' | 'success' | 'error'
  >('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const addToWaitlist = useMutation(api.waitlist.addEmail);

  // Track popover view
  useEffect(() => {
    if (isOpen) {
      posthog.capture('chat_demo_popover_viewed', {
        source,
        interaction_type: interactionType,
        variant,
      });
    }
  }, [isOpen, source, interactionType, variant]);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');

    posthog.capture('chat_demo_popover_email_submitted', {
      source,
      interaction_type: interactionType,
      variant,
      email_provided: true,
    });

    try {
      await addToWaitlist({
        email,
        source: `chat-demo-${source}`,
        referrer: typeof window !== 'undefined' ? document.referrer : undefined,
        userAgent:
          typeof window !== 'undefined' ? navigator.userAgent : undefined,
      });

      setStatus('success');
      setEmail('');

      posthog.capture('chat_demo_popover_conversion', {
        source,
        interaction_type: interactionType,
        variant,
        email: email,
      });
    } catch (error: any) {
      setStatus('error');
      setErrorMessage(
        error.message || 'Failed to join waitlist. Please try again.'
      );

      posthog.capture('chat_demo_popover_error', {
        source,
        interaction_type: interactionType,
        variant,
        error: error.message,
      });
    }
  };

  const handleClose = () => {
    posthog.capture('chat_demo_popover_closed', {
      source,
      interaction_type: interactionType,
      variant,
      status,
    });
    onClose();
  };

  if (!isOpen) return null;

  // Different message variants for A/B testing
  const getMessageContent = () => {
    switch (variant) {
      case 'casual':
        return {
          title: 'Hey, eager to try Akarii? 👋',
          message:
            "We love the enthusiasm! Join our waitlist and you'll be among the first to experience the future of AI-powered teamwork.",
        };
      case 'urgent':
        return {
          title: 'Ready to revolutionize your workflow?',
          message:
            "You're clearly excited about what Akarii can do! Get priority access by joining our waitlist now.",
        };
      default:
        return {
          title: "Looks like you're eager to try Akarii!",
          message:
            'Join our waitlist to be the first to get access when we launch. Your team collaboration will never be the same.',
        };
    }
  };

  // Success message variants to match initial message tonality
  const getSuccessContent = () => {
    switch (variant) {
      case 'casual':
        return {
          title: "You're all set! 🎉",
          message:
            "We're thrilled to have you on board! Keep an eye on your inbox. Exciting updates are coming your way.",
        };
      case 'urgent':
        return {
          title: 'Welcome to the future of teamwork!',
          message:
            "You're now in line for early access. Get ready to transform how your team collaborates.",
        };
      default:
        return {
          title: "You're in!",
          message:
            "Thanks for joining! We'll be in touch soon with exclusive updates about Akarii.",
        };
    }
  };

  const { title, message } = getMessageContent();
  const { title: successTitle, message: successMessage } = getSuccessContent();

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 max-w-sm w-full mx-4">
      <div className="backdrop-blur-xs bg-[rgba(219,219,219,0.05)] border border-[rgba(219,219,219,0.2)] rounded-3xl p-6 pt-12 shadow-xl animate-in slide-in-from-bottom-2 duration-300 relative">
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 w-4 h-4 text-white/40 hover:text-white/70 transition-colors"
        >
          <svg
            viewBox="0 0 16 16"
            fill="currentColor"
            className="w-full h-full"
          >
            <path
              d="M3.5 3.5L12.5 12.5M12.5 3.5L3.5 12.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>

        {status === 'success' ? (
          <div className="flex flex-col gap-6 justify-center items-center">
            <div className="flex flex-col justify-center items-center text-center space-y-1">
              <h4 className="heading5 text-white">{successTitle}</h4>
              <p className="paragraph2 text-white/50">{successMessage}</p>
            </div>
            <Button
              onClick={handleClose}
              className="w-full"
            >
              Close
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {/* Heading */}
            <div className="space-y-1">
              <h3 className="heading5 text-white">{title}</h3>
              <p className="paragraph2 text-white/50">{message}</p>
            </div>

            <form
              onSubmit={handleEmailSubmit}
              className="space-y-2"
            >
              {/* Email Input */}
              <Input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@example.com"
                disabled={status === 'loading'}
                className="w-full"
              />

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={status === 'loading'}
                fullWidth
                className="bg-white/10 border-white/20 hover:bg-white/20"
                icon={status !== 'loading' && <ExternalLink size={16} />}
                iconPosition="right"
              >
                {status === 'loading' ? 'Joining...' : 'Join Waitlist'}
              </Button>

              {status === 'error' && (
                <div className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-2xl p-3 mt-2">
                  {errorMessage}
                </div>
              )}
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
