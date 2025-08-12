import { 
  Message, 
  Sender, 
  AnimationConfig, 
  AnimationState 
} from './types';
import { 
  DEFAULT_ANIMATION_CONFIG,
  PAUSE_CHARACTERS,
  PAUSE_MULTIPLIERS,
  MESSAGE_TYPE_OVERRIDES,
  SENDER_CONFIGS,
  MessageTypeOverride
} from './animation-config';

// Calculate typing speed in milliseconds per character
export function calculateTypingSpeed(
  sender: Sender, 
  messageType: Message['type'], 
  config: AnimationConfig = DEFAULT_ANIMATION_CONFIG
): number {
  const senderConfig = SENDER_CONFIGS[sender as keyof typeof SENDER_CONFIGS];
  const baseWPM = senderConfig?.baseWPM ?? config.humanWPM;
  const typeOverride = MESSAGE_TYPE_OVERRIDES[messageType] as MessageTypeOverride;
  
  // Apply message type speed multiplier
  const adjustedWPM = baseWPM * (typeOverride.speedMultiplier ?? 1);
  
  // Convert WPM to characters per minute (assuming 5 chars per word)
  const charactersPerMinute = adjustedWPM * 5;
  const millisecondsPerCharacter = 60000 / charactersPerMinute;
  
  return millisecondsPerCharacter;
}

// Generate random delay within specified range
export function generateRandomDelay(
  min: number = DEFAULT_ANIMATION_CONFIG.randomCharDelayMs.min,
  max: number = DEFAULT_ANIMATION_CONFIG.randomCharDelayMs.max
): number {
  return Math.random() * (max - min) + min;
}

// Identify natural pause points in text
export function identifyPausePoints(content: string): number[] {
  const pausePoints: number[] = [];
  
  for (let i = 0; i < content.length; i++) {
    const char = content[i];
    
    // Check for sentence endings
    if (['.', '!', '?'].includes(char)) {
      pausePoints.push(i);
    }
    // Check for commas
    else if (char === ',') {
      pausePoints.push(i);
    }
    // Check for colons and semicolons
    else if ([':',  ';'].includes(char)) {
      pausePoints.push(i);
    }
    // Check for dashes
    else if (['-', '—'].includes(char)) {
      pausePoints.push(i);
    }
    // Check for line breaks
    else if (char === '\n') {
      pausePoints.push(i);
    }
  }
  
  return pausePoints;
}

// Calculate pause duration based on character type
export function calculatePauseDelay(char: string, baseDelay: number): number {
  let multiplier = 1; // default
  
  if (['.', '!', '?'].includes(char)) {
    multiplier = 4; // sentence
  } else if (char === ',') {
    multiplier = 2; // comma
  } else if ([':',  ';'].includes(char)) {
    multiplier = 2.5; // colon
  } else if (['-', '—'].includes(char)) {
    multiplier = 2; // dash
  } else if (char === '\n') {
    multiplier = 3; // newline
  }
  
  return baseDelay * multiplier;
}

// Generate character timing sequence for a message
export interface CharacterTiming {
  character: string;
  delay: number;
  cumulativeDelay: number;
  isPause: boolean;
}

export function generateCharacterTimings(
  message: Message, 
  config: AnimationConfig = DEFAULT_ANIMATION_CONFIG
): CharacterTiming[] {
  const { content, sender, type, pauses = [] } = message;
  const baseSpeed = calculateTypingSpeed(sender, type, config);
  const timings: CharacterTiming[] = [];
  let cumulativeDelay = 0;
  
  for (let i = 0; i < content.length; i++) {
    const character = content[i];
    let delay = baseSpeed + generateRandomDelay();
    let isPause = false;
    
    // Check if this position has a defined pause
    if (pauses.includes(i)) {
      delay = calculatePauseDelay(character, baseSpeed);
      isPause = true;
    }
    // Check for natural pause points
    else if (['.', '!', '?', ',', ':', ';', '-', '—', '\n'].includes(character)) {
      delay = calculatePauseDelay(character, baseSpeed);
      isPause = true;
    }
    
    cumulativeDelay += delay;
    
    timings.push({
      character,
      delay,
      cumulativeDelay,
      isPause
    });
  }
  
  return timings;
}

// Calculate total message duration
export function calculateMessageDuration(
  message: Message, 
  config: AnimationConfig = DEFAULT_ANIMATION_CONFIG
): number {
  const timings = generateCharacterTimings(message, config);
  const typingDuration = timings[timings.length - 1]?.cumulativeDelay || 0;
  
  const typeOverride = MESSAGE_TYPE_OVERRIDES[message.type] as MessageTypeOverride;
  const preDelay = message.preDelayMs ?? typeOverride.preDelayMs ?? config.preDelayMs;
  const postDelay = message.postDelayMs ?? config.postDelayMs;
  
  return preDelay + typingDuration + postDelay;
}

// Calculate total scenario duration
export function calculateScenarioDuration(
  messages: Message[], 
  config: AnimationConfig = DEFAULT_ANIMATION_CONFIG
): number {
  return messages.reduce((total, message) => {
    return total + calculateMessageDuration(message, config) + config.typingIndicatorDelayMs;
  }, 0);
}

// Generate animation sequence for a scenario
export interface AnimationStep {
  type: 'typing-indicator' | 'start-typing' | 'character' | 'complete-message' | 'pause';
  messageIndex: number;
  characterIndex?: number;
  character?: string;
  delay: number;
  cumulativeDelay: number;
  sender?: Sender;
}

export function generateAnimationSequence(
  messages: Message[], 
  config: AnimationConfig = DEFAULT_ANIMATION_CONFIG
): AnimationStep[] {
  const sequence: AnimationStep[] = [];
  let totalCumulativeDelay = 0;
  
  messages.forEach((message, messageIndex) => {
    const { sender, type } = message;
    const typeOverride = MESSAGE_TYPE_OVERRIDES[type] as MessageTypeOverride;
    const preDelay = message.preDelayMs ?? typeOverride.preDelayMs ?? config.preDelayMs;
    const postDelay = message.postDelayMs ?? config.postDelayMs;
    
    // Show typing indicator
    sequence.push({
      type: 'typing-indicator',
      messageIndex,
      delay: config.typingIndicatorDelayMs,
      cumulativeDelay: totalCumulativeDelay,
      sender
    });
    totalCumulativeDelay += config.typingIndicatorDelayMs;
    
    // Start typing after pre-delay
    sequence.push({
      type: 'start-typing',
      messageIndex,
      delay: preDelay,
      cumulativeDelay: totalCumulativeDelay,
      sender
    });
    totalCumulativeDelay += preDelay;
    
    // Character-by-character typing
    const timings = generateCharacterTimings(message, config);
    timings.forEach((timing, charIndex) => {
      sequence.push({
        type: 'character',
        messageIndex,
        characterIndex: charIndex,
        character: timing.character,
        delay: timing.delay,
        cumulativeDelay: totalCumulativeDelay,
        sender
      });
      totalCumulativeDelay += timing.delay;
    });
    
    // Complete message
    sequence.push({
      type: 'complete-message',
      messageIndex,
      delay: postDelay,
      cumulativeDelay: totalCumulativeDelay,
      sender
    });
    totalCumulativeDelay += postDelay;
  });
  
  return sequence;
}

// Utility to get animation state at specific time
export function getAnimationStateAtTime(
  sequence: AnimationStep[], 
  currentTime: number
): AnimationState {
  let currentStep: AnimationStep | null = null;
  let currentMessageIndex = 0;
  let currentCharacterIndex = 0;
  let showTypingIndicator = false;
  let typingIndicatorSender: Sender | undefined;
  
  // Find the current step
  for (const step of sequence) {
    if (step.cumulativeDelay <= currentTime) {
      currentStep = step;
      
      if (step.type === 'typing-indicator') {
        showTypingIndicator = true;
        typingIndicatorSender = step.sender;
      } else if (step.type === 'start-typing') {
        showTypingIndicator = false;
        currentMessageIndex = step.messageIndex;
        currentCharacterIndex = 0;
      } else if (step.type === 'character') {
        currentMessageIndex = step.messageIndex;
        currentCharacterIndex = step.characterIndex || 0;
      } else if (step.type === 'complete-message') {
        showTypingIndicator = false;
      }
    } else {
      break;
    }
  }
  
  const totalDuration = sequence[sequence.length - 1]?.cumulativeDelay || 0;
  const isComplete = currentTime >= totalDuration;
  
  return {
    currentScenarioId: 1, // This would be set externally
    currentMessageIndex,
    currentCharacterIndex,
    isPlaying: !isComplete,
    isComplete,
    showTypingIndicator,
    typingIndicatorSender
  };
}

// Reset animation state
export function createInitialAnimationState(scenarioId: number = 1): AnimationState {
  return {
    currentScenarioId: scenarioId,
    currentMessageIndex: 0,
    currentCharacterIndex: 0,
    isPlaying: false,
    isComplete: false,
    showTypingIndicator: false,
    typingIndicatorSender: undefined
  };
}

// Deterministic random number generator for consistent playback
export class SeededRandom {
  private seed: number;
  
  constructor(seed: number = 12345) {
    this.seed = seed;
  }
  
  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }
  
  range(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }
}

// Generate deterministic random delays for consistent playback
export function generateDeterministicDelay(
  index: number,
  min: number = DEFAULT_ANIMATION_CONFIG.randomCharDelayMs.min,
  max: number = DEFAULT_ANIMATION_CONFIG.randomCharDelayMs.max
): number {
  const rng = new SeededRandom(index * 1337);
  return rng.range(min, max);
}