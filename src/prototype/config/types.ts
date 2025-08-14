export type Sender = "Sarah" | "Marcus" | "Elena" | "Carlos" | "Zoe" | "Lisa" | "Ryan" | "David" | "Amy" | "Josh" | "Sam" | "Akarii" | "System" | "Trish" | "Scott Wu" | "Walden Yan" | "Steven Hao" | "Jeff Wang" | "Kevin Lu" | "Mike Krieger" | "Daniela Amodei" | "Dario Amodei" | "Kevin Weil" | "Kate Rouch" | "Brad Lightcap" | "Alex" | "Jamie" | "Maya" | "Dan" | "Mira" | "Cole" | "Priya" | "Leo" | "Harper" | "Lenny" | "Jessica" | "Tommy" | "Lisa Chen" | "Alex Rodriguez" | "Sarah Kim" | "Jordan";
export type Role = "human" | "ai" | "system";
export type MsgType = "text" | "rich" | "alert" | "vote" | "card" | "reaction";

export interface Message {
  sender: Sender;
  role: Role;
  type: MsgType;
  timestamp?: string;       // display-only
  content: string;          // markdown-friendly
  pauses?: number[];        // character indices for micro-pauses
  speedOverrideWPM?: number;
  preDelayMs?: number;      // delay before typing starts
  postDelayMs?: number;     // delay after commit
}

export interface Scenario {
  id: number;
  name: string;
  pov: "Sarah" | "Marcus" | "Elena" | "David" | "Trish" | "Scott Wu" | "Jeff Wang" | "Mike Krieger" | "Kevin Weil" | "Alex" | "Dan" | "Priya" | "Harper";
  thread: { title: string; goal?: string; channel?: string; tz?: string };
  messages: Message[];
}

// Animation state and control types
export interface AnimationState {
  currentScenarioId: number;
  currentMessageIndex: number;
  currentCharacterIndex: number;
  isPlaying: boolean;
  isComplete: boolean;
  showTypingIndicator: boolean;
  typingIndicatorSender?: Sender;
}

export interface AnimationConfig {
  humanWPM: number;
  aiWPM: number;
  randomCharDelayMs: { min: number; max: number };
  preDelayMs: number;
  postDelayMs: number;
  typingIndicatorDelayMs: number;
  pauseMultiplier: number;
}

export interface PlaybackControls {
  play: () => void;
  pause: () => void;
  replay: () => void;
  switchScenario: (id: number) => void;
}