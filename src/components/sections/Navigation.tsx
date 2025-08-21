'use client';

import { useState } from 'react';
import WaitlistForm from '../molecules/WaitlistForm';

export default function Navigation() {
  const [isJoinWaitlistOpen, setIsJoinWaitlistOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background-overlay backdrop-blur-sm border-b border-primary-600 border-opacity-20">
      <div className="container">
        <div className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="text-text-primary font-medium">
              AI Workplace for Teams Who Move Fast
            </div>
            <div className="text-text-secondary text-body-sm">
              We help teams see what they didn't see.
            </div>
          </div>

          <div className="flex items-center space-x-6">
            <button
              onClick={() => setIsJoinWaitlistOpen(true)}
              className="text-text-secondary hover:text-text-primary transition-colors text-body-sm"
            >
              Join Waitlist
            </button>
            <button 
              onClick={() => window.location.href = '/contact'}
              className="text-text-secondary hover:text-text-primary transition-colors text-body-sm"
            >
              Talk to Founder
            </button>
          </div>
        </div>
      </div>

      <WaitlistForm
        isOpen={isJoinWaitlistOpen}
        onClose={() => setIsJoinWaitlistOpen(false)}
        source="navigation"
      />
    </nav>
  );
}
