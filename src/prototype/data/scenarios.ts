import { Scenario } from '../config/types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    name: 'Team Collaboration with AI',
    pov: 'Sarah',
    thread: {
      title: 'Feature Discovery Session',
      channel: 'product',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Sarah',
        role: 'human',
        type: 'text',
        timestamp: '10:30',
        content: 'Morning team! Ready to brainstorm the new dashboard features?',
        pauses: [7, 13, 19, 25, 34, 44, 52],
      },
      {
        sender: 'Marcus',
        role: 'human',
        type: 'text',
        timestamp: '10:30',
        content: "Absolutely! I've been thinking about user engagement metrics.",
        pauses: [10, 16, 22, 32, 40, 47, 57],
      },
      {
        sender: 'Elena',
        role: 'human',
        type: 'text',
        timestamp: '10:31',
        content: 'What about real-time collaboration features?',
        pauses: [5, 11, 21, 32, 42],
      },
      {
        sender: 'Sarah',
        role: 'human',
        type: 'text',
        timestamp: '10:31',
        content: 'Good ideas! @Akarii, what patterns are you seeing in user feedback?',
        pauses: [5, 12, 19, 26, 35, 42, 47, 53, 60],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'rich',
        timestamp: '10:31',
        content: `Based on the latest user interviews, I'm seeing three key themes:

## Most Requested Features
• **Quick filters** — Users want to slice data without navigating away
• **Team annotations** — Shared notes on specific data points  
• **Export presets** — Save common report configurations

## User Pain Points
Users spend ~40% of their time recreating the same views. The "save view" feature could address this directly.`,
        pauses: [6, 18, 28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 128, 138, 148, 158, 168, 178, 188, 198],
        preDelayMs: 300,
      },
      {
        sender: 'Marcus',
        role: 'human',
        type: 'text',
        timestamp: '10:32',
        content: 'That export preset idea is brilliant! We could package them as templates.',
        pauses: [5, 12, 18, 25, 35, 42, 48, 56, 65],
      },
      {
        sender: 'Elena',
        role: 'human',
        type: 'text',
        timestamp: '10:32',
        content: 'And team annotations would solve the context-sharing problem.',
        pauses: [4, 9, 19, 25, 31, 35, 47, 55],
      },
      {
        sender: 'Sarah',
        role: 'human',
        type: 'text',
        timestamp: '10:33',
        content: 'Love seeing how we build on each other\'s ideas. This is exactly what we need!',
        pauses: [5, 12, 18, 23, 28, 35, 42, 48, 55, 62, 72],
      },
    ],
  },
  {
    id: 2,
    name: 'Goal-Aligned Discussions',
    pov: 'Marcus',
    thread: {
      title: 'Q4 Campaign Planning',
      goal: 'Increase conversion rate by 25% through targeted campaigns',
      channel: 'marketing',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Marcus',
        role: 'human',
        type: 'text',
        timestamp: '14:15',
        content: 'Let\'s finalize the Q4 campaign strategy. Goal is 25% conversion improvement.',
        pauses: [6, 13, 20, 26, 33, 39, 44, 50, 58, 67],
      },
      {
        sender: 'Lisa',
        role: 'human',
        type: 'text',
        timestamp: '14:15',
        content: 'I love the video content idea. Should we do a full rebrand too?',
        pauses: [2, 7, 12, 18, 25, 32, 38, 43, 49, 56, 60],
      },
      {
        sender: 'Ryan',
        role: 'human',
        type: 'text',
        timestamp: '14:16',
        content: 'Actually, what if we focus on influencer partnerships instead?',
        pauses: [9, 15, 18, 23, 29, 32, 42, 54, 62],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '14:16',
        content: `⚠️ **Goal Drift Alert**

The conversation is expanding beyond targeted campaigns into broader brand initiatives.

## Current Goal Reminder
"Increase conversion rate by 25% through targeted campaigns"

## Suggested Refocus
Consider how video content and partnerships specifically drive conversions, rather than general brand awareness.`,
        pauses: [18, 35, 48, 65, 82, 98, 115, 132, 148, 165, 182, 198, 215, 232],
        preDelayMs: 400,
      },
      {
        sender: 'Marcus',
        role: 'human',
        type: 'text',
        timestamp: '14:17',
        content: 'Good catch, Akarii. Let\'s stick to conversion-focused tactics.',
        pauses: [5, 11, 19, 26, 32, 38, 48, 57],
      },
      {
        sender: 'Lisa',
        role: 'human',
        type: 'text',
        timestamp: '14:17',
        content: 'Right! Video testimonials could directly showcase conversion benefits.',
        pauses: [6, 12, 23, 29, 38, 46, 56, 67],
      },
      {
        sender: 'Ryan',
        role: 'human',
        type: 'text',
        timestamp: '14:18',
        content: 'And we could partner with conversion-focused influencers who share metrics.',
        pauses: [4, 7, 13, 20, 25, 32, 41, 51, 58, 63, 69],
      },
    ],
  },
  {
    id: 3,
    name: 'Decision Memory',
    pov: 'Elena',
    thread: {
      title: 'Architecture Review',
      channel: 'engineering',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Elena',
        role: 'human',
        type: 'text',
        timestamp: '09:45',
        content: 'We need to decide on the database architecture for the new service.',
        pauses: [3, 8, 12, 18, 23, 32, 42, 47, 53, 60, 68],
      },
      {
        sender: 'Carlos',
        role: 'human',
        type: 'text',
        timestamp: '09:45',
        content: 'I\'m leaning towards PostgreSQL for the relational data model.',
        pauses: [4, 11, 19, 28, 31, 40, 49, 54, 61],
      },
      {
        sender: 'Zoe',
        role: 'human',
        type: 'text',
        timestamp: '09:46',
        content: 'What about MongoDB for the flexibility with document structure?',
        pauses: [5, 11, 18, 21, 27, 36, 40, 46, 55, 64],
      },
      {
        sender: 'Elena',
        role: 'human',
        type: 'text',
        timestamp: '09:46',
        content: 'Good points. Let\'s go with PostgreSQL for consistency with our main app.',
        pauses: [5, 11, 16, 20, 25, 35, 38, 49, 54, 59, 64, 68],
      },
      {
        sender: 'Carlos',
        role: 'human',
        type: 'text',
        timestamp: '09:47',
        content: 'Sounds good. I\'ll start setting up the schemas.',
        pauses: [6, 11, 17, 22, 28, 35, 38, 45],
      },
      {
        sender: 'Zoe',
        role: 'human',
        type: 'text',
        timestamp: '11:30',
        content: 'Wait, what did we decide about the database choice earlier?',
        pauses: [5, 10, 13, 16, 22, 27, 31, 39, 46, 54],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '11:30',
        content: `## Decision Recall

**Decision Made:** PostgreSQL for new service database

**Context:** Architecture Review meeting at 09:46

**Reasoning:** Consistency with main app architecture

**Participants:** Elena, Carlos, Zoe

**Next Steps:** Carlos setting up schemas`,
        pauses: [18, 28, 38, 48, 58, 68, 78, 88, 98, 108, 118, 128, 138, 148, 158],
        preDelayMs: 300,
      },
      {
        sender: 'Zoe',
        role: 'human',
        type: 'text',
        timestamp: '11:31',
        content: 'Perfect! Thanks Akarii. That context helps a lot.',
        pauses: [8, 15, 22, 30, 35, 43, 48],
      },
    ],
  },
  {
    id: 4,
    name: 'Smart AI Intervention',
    pov: 'David',
    thread: {
      title: 'Sprint Planning',
      channel: 'dev-team',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'David',
        role: 'human',
        type: 'text',
        timestamp: '15:00',
        content: 'Alright team, let\'s plan the next sprint. We have 8 story points to allocate.',
        pauses: [7, 12, 19, 25, 30, 34, 40, 46, 50, 56, 61, 68, 76],
      },
      {
        sender: 'Amy',
        role: 'human',
        type: 'text',
        timestamp: '15:00',
        content: 'I can take the user authentication feature - that\'s about 5 points.',
        pauses: [2, 6, 11, 15, 20, 33, 41, 47, 53, 58, 64],
      },
      {
        sender: 'Josh',
        role: 'human',
        type: 'text',
        timestamp: '15:01',
        content: 'And I\'ll handle the database migration, probably 3 points.',
        pauses: [4, 9, 16, 20, 28, 38, 47, 49, 55],
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '15:01',
        content: 'The payment integration looks straightforward, I can do that.',
        pauses: [4, 12, 23, 29, 43, 45, 49, 55, 59],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '15:01',
        content: `⚠️ **Sprint Capacity Risk**

**Issue:** Total commitment (8+ points) exceeds sprint capacity

**Breakdown:**
• User authentication: 5 points
• Database migration: 3 points  
• Payment integration: ~2-3 points

**Recommendation:** Consider deferring one feature or breaking down into smaller tasks.`,
        pauses: [18, 35, 52, 68, 85, 102, 118, 135, 152, 168, 185, 202, 218],
        preDelayMs: 400,
      },
      {
        sender: 'David',
        role: 'human',
        type: 'text',
        timestamp: '15:02',
        content: 'Great point! Let\'s move payment integration to next sprint.',
        pauses: [6, 12, 18, 24, 32, 42, 45, 50, 56],
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '15:02',
        content: 'Works for me. I\'ll focus on testing the auth feature instead.',
        pauses: [6, 9, 12, 18, 24, 29, 36, 39, 44, 52, 60],
      },
    ],
  },
];