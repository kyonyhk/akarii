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
  {
    id: 5,
    name: 'Context Preservation Across Time',
    pov: 'Mike Krieger',
    thread: {
      title: 'Mobile App Redesign',
      channel: 'design',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Mike Krieger',
        role: 'human',
        type: 'text',
        timestamp: '10:00',
        content: 'Team, let\'s pick up where we left off on the mobile redesign.',
        pauses: [5, 11, 17, 22, 27, 32, 37, 42, 48, 53],
      },
      {
        sender: 'Jessica',
        role: 'human',
        type: 'text',
        timestamp: '10:00',
        content: 'Remind me what we decided about the navigation approach?',
        pauses: [7, 12, 16, 21, 28, 35, 39, 49, 58],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '10:01',
        content: `## Context from Previous Sessions

**Last Decision (3 days ago):** Tab-based navigation with gesture support

**Key Considerations:**
• Accessibility for thumb reach on larger screens
• Consistency with iOS/Android platform patterns  
• User testing showed 67% preference for bottom tabs

**Outstanding Questions:**
• Should we include a floating action button?
• How many tabs is optimal? (currently considering 4-5)

**Next:** Finalize icon set and interaction patterns`,
        pauses: [25, 45, 65, 85, 105, 125, 145, 165, 185, 205, 225, 245, 265, 285],
        preDelayMs: 400,
      },
      {
        sender: 'Tommy',
        role: 'human',
        type: 'text',
        timestamp: '10:01',
        content: 'Perfect context! I think we should stick with 4 tabs and add the FAB.',
        pauses: [8, 16, 20, 25, 31, 37, 43, 49, 53, 59, 62, 67],
      },
      {
        sender: 'Jessica',
        role: 'human',
        type: 'text',
        timestamp: '10:02',
        content: 'Agreed. That user testing data really helps inform the decision.',
        pauses: [7, 13, 18, 23, 30, 37, 42, 47, 52, 62],
      },
      {
        sender: 'Mike Krieger',
        role: 'human',
        type: 'text',
        timestamp: '10:02',
        content: 'Love how Akarii kept all that context fresh. No time wasted catching up!',
        pauses: [5, 9, 15, 21, 26, 30, 38, 44, 49, 54, 60, 67],
      },
    ],
  },
  {
    id: 6,
    name: 'Cross-Team Shared Intelligence',
    pov: 'Kevin Weil',
    thread: {
      title: 'Product Launch Coordination',
      channel: 'launch-planning',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Kevin Weil',
        role: 'human',
        type: 'text',
        timestamp: '14:30',
        content: 'Final launch checklist review. Marketing, Engineering, and Support teams present?',
        pauses: [6, 12, 19, 27, 36, 48, 54, 64, 67, 75],
      },
      {
        sender: 'Lisa Chen',
        role: 'human',
        type: 'text',
        timestamp: '14:30',
        content: 'Marketing ready! Press kit is done, social scheduled.',
        pauses: [9, 15, 22, 27, 32, 38, 46, 54],
      },
      {
        sender: 'Alex Rodriguez',
        role: 'human',
        type: 'text',
        timestamp: '14:31',
        content: 'Engineering all set. Monitoring dashboards are live.',
        pauses: [12, 16, 20, 31, 40, 50, 54],
      },
      {
        sender: 'Kevin Weil',
        role: 'human',
        type: 'text',
        timestamp: '14:31',
        content: 'What about support documentation? @Akarii, any gaps you\'re seeing?',
        pauses: [5, 11, 18, 30, 40, 44, 49, 55, 60],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'rich',
        timestamp: '14:31',
        content: `I've been tracking progress across all teams. Here's what I'm seeing:

## ✅ Complete
• **Marketing:** Press kit, social media, email campaigns
• **Engineering:** Deployment pipeline, monitoring, rollback procedures
• **Legal:** Terms updates, privacy policy reviewed

## ⚠️ Needs Attention
• **Support:** FAQ update is 60% complete (Sarah working on it)
• **Support:** Training session scheduled but materials not finalized
• **Sales:** Demo environment needs final QA testing

## 🔄 Cross-team Dependencies
The support FAQ references the new API endpoints that Alex's team documented yesterday. They're aligned.`,
        pauses: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270, 285, 300],
        preDelayMs: 500,
      },
      {
        sender: 'Sarah Kim',
        role: 'human',
        type: 'text',
        timestamp: '14:32',
        content: 'Just joined! I can finish the FAQ by EOD. The API docs Alex shared are perfect.',
        pauses: [5, 12, 18, 22, 27, 32, 37, 42, 48, 52, 57, 63, 69],
      },
      {
        sender: 'Kevin Weil',
        role: 'human',
        type: 'text',
        timestamp: '14:32',
        content: 'This is exactly why shared AI context works. Everyone stays informed.',
        pauses: [5, 9, 16, 20, 26, 32, 39, 45, 53, 62, 71],
      },
    ],
  },
  {
    id: 7,
    name: 'Preventing Knowledge Loss',
    pov: 'Alex',
    thread: {
      title: 'Critical Bug Investigation',
      channel: 'incident-response',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Alex',
        role: 'human',
        type: 'text',
        timestamp: '23:45',
        content: 'Emergency: Payment processing is down. Need all hands on deck.',
        pauses: [10, 18, 26, 34, 39, 44, 49, 56, 61, 67],
      },
      {
        sender: 'Jordan',
        role: 'human',
        type: 'text',
        timestamp: '23:46',
        content: 'I see 500 errors in the payment gateway logs. Started around 23:30.',
        pauses: [2, 6, 10, 17, 20, 27, 35, 42, 48, 54, 61],
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '23:47',
        content: 'Database connections look normal. Maybe the third-party API?',
        pauses: [8, 18, 23, 29, 36, 42, 47, 56, 64],
      },
      {
        sender: 'Alex',
        role: 'human',
        type: 'text',
        timestamp: '23:50',
        content: 'Fixed! It was a certificate expiration. Updating the incident report now.',
        pauses: [6, 9, 14, 20, 31, 41, 51, 54, 64, 70, 75],
      },
      {
        sender: 'System',
        role: 'system',
        type: 'alert',
        timestamp: '08:30',
        content: 'Thread archived: Critical Bug Investigation',
        pauses: [],
      },
      {
        sender: 'Dan',
        role: 'human',
        type: 'text',
        timestamp: '08:35',
        content: 'Good morning! Heard there was an incident last night. What happened?',
        pauses: [5, 12, 20, 26, 31, 36, 41, 47, 54, 63],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '08:35',
        content: `## Incident Summary (Last Night)

**Issue:** Payment processing outage (23:45 - 23:50 UTC)

**Root Cause:** SSL certificate expiration in payment gateway

**Investigation Steps:**
1. Alex identified 500 errors starting 23:30
2. Jordan confirmed payment gateway logs showed failures  
3. Sam ruled out database connectivity issues
4. Alex discovered certificate expiration and resolved

**Resolution:** Certificate renewed, service restored

**Duration:** 5 minutes total downtime

**Action Items:** Set up certificate expiration monitoring`,
        pauses: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
        preDelayMs: 300,
      },
      {
        sender: 'Dan',
        role: 'human',
        type: 'text',
        timestamp: '08:36',
        content: 'Amazing! I\'m completely caught up. This saves me from hunting through logs.',
        pauses: [8, 14, 20, 30, 39, 46, 52, 57, 64, 70, 77],
      },
    ],
  },
  {
    id: 8,
    name: 'Intelligence Layer - Context Tracking',
    pov: 'Priya',
    thread: {
      title: 'Feature Roadmap Planning',
      goal: 'Define Q1 feature priorities based on user feedback',
      channel: 'product-strategy',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Priya',
        role: 'human',
        type: 'text',
        timestamp: '14:00',
        content: 'Let\'s finalize our Q1 roadmap. We need to balance user requests with technical feasibility.',
        pauses: [6, 14, 20, 24, 30, 38, 43, 49, 55, 62, 68, 76, 84],
      },
      {
        sender: 'Harper',
        role: 'human',
        type: 'text',
        timestamp: '14:01',
        content: 'Users are asking for better search functionality and dark mode.',
        pauses: [6, 10, 17, 21, 28, 34, 40, 52, 56, 61, 66],
      },
      {
        sender: 'Leo',
        role: 'human',
        type: 'text',
        timestamp: '14:01',
        content: 'The mobile app performance issues should be our top priority though.',
        pauses: [4, 11, 15, 26, 34, 42, 47, 51, 55, 59, 64, 72],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '14:02',
        content: `⚠️ **Goal Drift Detected**

The discussion is expanding beyond the stated goal of "balancing user requests with technical feasibility."

## Current Goal
Define Q1 feature priorities based on user feedback

## Suggested Refocus
Consider creating a prioritization framework that weighs:
• User impact scores from recent feedback
• Technical implementation complexity
• Resource requirements for Q1 timeline`,
        pauses: [18, 35, 52, 68, 85, 102, 118, 135, 152, 168, 185, 202, 218, 235, 252],
        preDelayMs: 400,
      },
      {
        sender: 'Priya',
        role: 'human',
        type: 'text',
        timestamp: '14:02',
        content: 'Excellent point. Let\'s score each feature request systematically.',
        pauses: [9, 15, 21, 26, 31, 36, 43, 50, 63],
      },
      {
        sender: 'Harper',
        role: 'human',
        type: 'text',
        timestamp: '14:03',
        content: 'That framework approach will help us make data-driven decisions.',
        pauses: [5, 15, 24, 29, 34, 39, 45, 55, 68],
      },
    ],
  },
  {
    id: 9,
    name: 'Multiplayer Chat - Shared Context',
    pov: 'Harper',
    thread: {
      title: 'Cross-functional Project Sync',
      channel: 'project-coordination',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Harper',
        role: 'human',
        type: 'text',
        timestamp: '10:30',
        content: 'Morning everyone! Need a quick sync on the new feature launch.',
        pauses: [8, 18, 23, 27, 32, 37, 43, 46, 52, 59, 66],
      },
      {
        sender: 'Cole',
        role: 'human',
        type: 'text',
        timestamp: '10:30',
        content: 'Design is ready to go. All mockups approved by stakeholders.',
        pauses: [7, 10, 16, 19, 22, 27, 36, 45, 48, 60],
      },
      {
        sender: 'Mira',
        role: 'human',
        type: 'text',
        timestamp: '10:31',
        content: 'Engineering side looks good. Backend APIs are deployed and tested.',
        pauses: [12, 17, 22, 27, 39, 43, 47, 56, 60, 68],
      },
      {
        sender: 'Leo',
        role: 'human',
        type: 'text',
        timestamp: '10:31',
        content: 'Just joined from mobile team. Are we talking about the notification feature?',
        pauses: [5, 12, 17, 24, 29, 33, 37, 45, 49, 61, 69, 77],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'rich',
        timestamp: '10:32',
        content: `## Project Context for Leo

**Current Discussion:** New feature launch readiness check

**Feature:** Advanced notification system with custom triggers

**Status Update:**
• **Design:** ✅ Complete - All mockups approved
• **Backend:** ✅ Complete - APIs deployed and tested  
• **Frontend:** 🔄 In progress - 85% complete (Harper leading)
• **Mobile:** ❓ Pending your team's integration

**Next Steps:** Mobile team integration timeline needed for final launch date`,
        pauses: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225, 240, 255, 270],
        preDelayMs: 300,
      },
      {
        sender: 'Leo',
        role: 'human',
        type: 'text',
        timestamp: '10:32',
        content: 'Perfect context! Mobile integration can be done by Thursday.',
        pauses: [8, 16, 22, 28, 41, 45, 49, 55, 65],
      },
      {
        sender: 'Harper',
        role: 'human',
        type: 'text',
        timestamp: '10:33',
        content: 'Amazing how Akarii keeps everyone instantly on the same page!',
        pauses: [8, 12, 18, 25, 30, 39, 47, 56, 59, 64, 69],
      },
    ],
  },
];