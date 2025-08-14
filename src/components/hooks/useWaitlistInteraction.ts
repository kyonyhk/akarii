import { useState, useCallback, useEffect } from 'react';
import { useFeatureFlagEnabled } from 'posthog-js/react';

export interface WaitlistInteractionState {
  isPopoverOpen: boolean;
  interactionType: 'input_click' | 'send_click' | 'file_click' | 'speech_click' | null;
  variant: 'default' | 'casual' | 'urgent';
  hasSeenPopover: boolean;
}

const STORAGE_KEY = 'akarii_waitlist_interaction_seen';

export function useWaitlistInteraction(source: 'overview' | 'features') {
  const [state, setState] = useState<WaitlistInteractionState>({
    isPopoverOpen: false,
    interactionType: null,
    variant: 'default',
    hasSeenPopover: false,
  });

  // Feature flags for A/B testing variants
  const casualVariantEnabled = useFeatureFlagEnabled('chat-demo-casual-variant');
  const urgentVariantEnabled = useFeatureFlagEnabled('chat-demo-urgent-variant');

  // Determine variant based on feature flags
  const getVariant = useCallback(() => {
    if (urgentVariantEnabled) return 'urgent';
    if (casualVariantEnabled) return 'casual';
    return 'default';
  }, [casualVariantEnabled, urgentVariantEnabled]);

  // Check if user has already seen the popover (to avoid spam)
  useEffect(() => {
    const hasSeenBefore = localStorage.getItem(STORAGE_KEY) === 'true';
    setState(prev => ({ ...prev, hasSeenPopover: hasSeenBefore }));
  }, []);

  const handleInteractionAttempt = useCallback((type: 'input_click' | 'send_click' | 'file_click' | 'speech_click') => {
    // Don't show popover if user has already seen it
    if (state.hasSeenPopover) return;

    const variant = getVariant();
    
    setState(prev => ({
      ...prev,
      isPopoverOpen: true,
      interactionType: type,
      variant,
    }));
  }, [state.hasSeenPopover, getVariant]);

  const closePopover = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPopoverOpen: false,
      interactionType: null,
    }));
    
    // Mark as seen so we don't show it again
    localStorage.setItem(STORAGE_KEY, 'true');
    setState(prev => ({ ...prev, hasSeenPopover: true }));
  }, []);

  const resetInteractionState = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    setState({
      isPopoverOpen: false,
      interactionType: null,
      variant: 'default',
      hasSeenPopover: false,
    });
  }, []);

  return {
    ...state,
    handleInteractionAttempt,
    closePopover,
    resetInteractionState,
  };
}