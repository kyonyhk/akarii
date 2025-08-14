'use client';

import { useState, useEffect } from 'react';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import posthog from '@/lib/posthog';

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
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
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

  const handleQuickJoin = () => {
    posthog.capture('chat_demo_popover_quick_join_clicked', {
      source,
      interaction_type: interactionType,
      variant,
    });
    
    // Open the full waitlist form (you'll need to implement this)
    onClose();
    // TODO: Trigger main waitlist form
  };

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
        userAgent: typeof window !== 'undefined' ? navigator.userAgent : undefined,
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
      setErrorMessage(error.message || 'Failed to join waitlist. Please try again.');
      
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
          title: "Hey, eager to try Akarii? 👋",
          message: "We love the enthusiasm! Join our waitlist and you'll be among the first to experience the future of AI-powered teamwork."
        };
      case 'urgent':
        return {
          title: "Ready to revolutionize your workflow?",
          message: "You're clearly excited about what Akarii can do! Get priority access by joining our waitlist now."
        };
      default:
        return {
          title: "Looks like you're eager to try Akarii!",
          message: "Join our waitlist to be the first to get access when we launch. Your team collaboration will never be the same."
        };
    }
  };

  const { title, message } = getMessageContent();

  return (
    <div className="fixed bottom-20 left-1/2 transform -translate-x-1/2 z-50 max-w-xs w-full mx-3">
      <div className="bg-[#2A2A2A]/95 backdrop-blur-md border border-white/20 rounded-xl p-3 shadow-xl animate-in slide-in-from-bottom-2 duration-300">
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 pr-2">
            <h3 className="text-sm font-medium text-white mb-1">
              {title}
            </h3>
            <p className="text-white/70 text-xs leading-relaxed">
              {message}
            </p>
          </div>
          <button
            onClick={handleClose}
            className="text-white/40 hover:text-white/70 transition-colors text-sm leading-none"
          >
            ✕
          </button>
        </div>

        {status === 'success' ? (
          <div className="text-center py-2">
            <div className="w-6 h-6 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-1">
              <span className="text-green-400 text-sm">✓</span>
            </div>
            <h4 className="text-white font-medium text-sm mb-1">You're in!</h4>
            <p className="text-white/60 text-xs mb-2">
              Thanks for joining! We'll be in touch soon.
            </p>
            <button
              onClick={handleClose}
              className="px-2 py-1 bg-white/10 hover:bg-white/20 text-white rounded text-xs"
            >
              Close
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <form onSubmit={handleEmailSubmit} className="space-y-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full px-2 py-1.5 bg-white/5 border border-white/10 rounded text-white placeholder-white/40 focus:outline-none focus:border-white/30 focus:bg-white/10 transition-all text-xs"
                disabled={status === 'loading'}
              />
              
              {status === 'error' && (
                <div className="text-red-400 text-xs bg-red-500/10 border border-red-500/20 rounded p-1.5">
                  {errorMessage}
                </div>
              )}

              <div className="flex gap-1.5">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-2 py-1.5 text-white/60 border border-white/10 rounded hover:bg-white/5 transition-all text-xs"
                  disabled={status === 'loading'}
                >
                  Later
                </button>
                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex-1 px-2 py-1.5 bg-white text-black rounded hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-xs font-medium"
                >
                  {status === 'loading' ? 'Joining...' : 'Join'}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}