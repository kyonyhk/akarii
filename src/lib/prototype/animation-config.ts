import { AnimationConfig } from './types';

// Default animation configuration based on PRD specifications
export const DEFAULT_ANIMATION_CONFIG: AnimationConfig = {
  humanWPM: 58,
  aiWPM: 105,
  randomCharDelayMs: { min: 30, max: 100 },
  preDelayMs: 250,
  postDelayMs: 350,
  typingIndicatorDelayMs: 800,
  pauseMultiplier: 2.5,
};

// WPM ranges from PRD
export const WPM_RANGES = {
  human: { min: 50, max: 65 },
  ai: { min: 90, max: 120 },
};

// Character-specific pause multipliers for natural typing
export const PAUSE_CHARACTERS = {
  sentence: ['.', '!', '?'],
  comma: [','],
  colon: [':', ';'],
  dash: ['-', '—'],
  newline: ['\n'],
} as const;

export const PAUSE_MULTIPLIERS = {
  sentence: 4,
  comma: 2,
  colon: 2.5,
  dash: 2,
  newline: 3,
  default: 1,
} as const;

// Message type specific overrides
export const MESSAGE_TYPE_OVERRIDES = {
  text: {},
  rich: { 
    speedMultiplier: 0.95 as number, // Slightly slower for rich content
    pauseMultiplier: 1.2 as number
  },
  alert: { 
    preDelayMs: 400 as number,
    speedMultiplier: 0.9 as number
  },
  vote: { 
    preDelayMs: 200 as number,
    speedMultiplier: 1.1 as number
  },
  card: { 
    preDelayMs: 300 as number,
    speedMultiplier: 0.85 as number
  },
  reaction: { 
    preDelayMs: 150 as number,
    postDelayMs: 200 as number,
    speedMultiplier: 2 as number // Very fast for reactions
  },
} as const;

// Type for message overrides
export type MessageTypeOverride = {
  speedMultiplier?: number;
  pauseMultiplier?: number;
  preDelayMs?: number;
  postDelayMs?: number;
};

// Sender-specific configurations
export const SENDER_CONFIGS = {
  // Original scenarios (1-2)
  Trish: { baseWPM: 58, variance: 0.1 },
  Sam: { baseWPM: 62, variance: 0.12 },
  
  // Scenario 3: Cognition team
  'Scott Wu': { baseWPM: 65, variance: 0.12 },
  'Walden Yan': { baseWPM: 60, variance: 0.11 },
  'Steven Hao': { baseWPM: 63, variance: 0.13 },
  
  // Scenario 4: Windsurf team  
  'Jeff Wang': { baseWPM: 61, variance: 0.12 },
  'Kevin Lu': { baseWPM: 64, variance: 0.11 },
  
  // Scenario 5: Anthropic team
  'Mike Krieger': { baseWPM: 67, variance: 0.10 },
  'Daniela Amodei': { baseWPM: 59, variance: 0.11 },
  'Dario Amodei': { baseWPM: 62, variance: 0.12 },
  
  // Scenario 6: OpenAI team
  'Kevin Weil': { baseWPM: 66, variance: 0.11 },
  'Kate Rouch': { baseWPM: 60, variance: 0.12 },
  'Brad Lightcap': { baseWPM: 63, variance: 0.11 },
  
  // AI and System
  Akarii: { baseWPM: 105, variance: 0.08 },
  System: { baseWPM: 80, variance: 0.05 },
} as const;

// Animation timing constants
export const ANIMATION_TIMINGS = {
  cursorBlinkRate: 530, // ms
  scrollDelay: 200, // ms after message appears before scrolling
  scenarioSwitchDelay: 300, // ms delay when switching scenarios
  typingIndicatorDuration: 1200, // ms to show typing indicator
} as const;