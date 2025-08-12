import { Scenario } from '../lib/prototype/types';

export const SCENARIOS: Scenario[] = [
  {
    id: 1,
    name: 'Multiplayer AI Team Chat',
    pov: 'Trish',
    thread: {
      title: 'Marketing Launch Options',
      channel: 'marketing',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Trish',
        role: 'human',
        type: 'text',
        timestamp: '13:48',
        content: 'Hey Sam, we need to decide on the marketing push for Q4.',
        pauses: [8, 12, 23, 35, 47], // Natural pauses at commas and sentence breaks
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '13:48',
        content: "Yeah, we've got a few directions floating around.",
        pauses: [5, 14, 25, 33],
      },
      {
        sender: 'Trish',
        role: 'human',
        type: 'text',
        timestamp: '13:49',
        content: "Let's ask Akarii to weigh in.",
        pauses: [6, 13, 21],
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '13:49',
        content: '@akarii summarize our three options and recommend one.',
        pauses: [4, 12, 25, 33, 40, 48],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'rich',
        timestamp: '13:49',
        content: `Sure — based on the notes from last week's planning call, here's how the three options compare:

**Option A — Social Media Blitz**  
Focus: Short-term buzz across Instagram, TikTok, and LinkedIn.  
Pros: Wide reach in days, great for awareness.  
Cons: High ad spend, limited depth in engagement.

**Option B — Partner Webinars**  
Focus: Co-host educational sessions with industry partners.  
Pros: Builds credibility and deeper connections.  
Cons: Slower ramp-up, dependent on partner schedules.

**Option C — Targeted Paid Ads**  
Focus: Narrow targeting on high-intent audiences.  
Pros: Controlled spend, measurable ROI, quick turnaround.  
Cons: Smaller audience than A, requires strong creative.

**Recommendation:** Option C balances speed and efficiency while allowing measurable iteration. It's the best fit if our goal is early conversions before year-end.`,
        pauses: [
          6, 13, 25, 36, 49, 65, 78, 89, 102, 115, 128, 145, 162, 178, 195, 208,
          225, 242, 258, 275, 292, 308, 325, 342, 358, 375, 392, 408, 425, 442,
          458, 475, 492, 508, 525,
        ],
        preDelayMs: 400,
      },
      {
        sender: 'Trish',
        role: 'human',
        type: 'reaction',
        timestamp: '13:50',
        content: '👍 Makes sense to me.',
        pauses: [2, 8, 14],
        speedOverrideWPM: 120,
      },
      {
        sender: 'Trish',
        role: 'human',
        type: 'text',
        timestamp: '13:50',
        content: '@Akarii, can you also list key steps for Option C?',
        pauses: [7, 12, 17, 22, 27, 33, 39, 45],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'rich',
        timestamp: '13:50',
        content: `Of course. Here's a suggested launch plan for **Option C**:

**1.** Define and prioritize audience segments (e.g., by region, role, or interest)

**2.** Develop 2–3 ad creative variations per segment

**3.** Launch small-scale A/B tests within 10 days

**4.** Allocate majority of spend to top-performing creatives

**5.** Review metrics weekly and adjust targeting as needed

If you'd like, I can draft a timeline so each step lines up with our Q4 milestones.`,
        pauses: [
          10, 17, 25, 35, 45, 58, 68, 78, 88, 98, 108, 118, 128, 138, 148, 158,
          168, 178, 188, 198, 208, 218, 228, 238, 248, 258, 268, 278, 288,
        ],
        preDelayMs: 350,
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '13:51',
        content: "Perfect, let's roll with that.",
        pauses: [8, 14, 20],
      },
    ],
  },
  {
    id: 2,
    name: 'Intelligence Layer — AI Model Launch Planning',
    pov: 'Trish',
    thread: {
      title: 'AI Model Launch Plan',
      goal: 'Deploy v2.1 to Production by Sept 30',
      channel: 'release-planning',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Trish',
        role: 'human',
        type: 'text',
        timestamp: '14:12',
        content: "We've got three rollout strategies on the table for v2.1.",
        pauses: [5, 12, 19, 29, 35, 42, 48],
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '14:12',
        content: "Let's lock one in so engineering can prep.",
        pauses: [6, 11, 15, 18, 29, 33],
      },
      {
        sender: 'System',
        role: 'system',
        type: 'vote',
        timestamp: '14:13',
        content: `Option A: Gradual rollout by region (1 vote)  
Option B: Full launch to all users (0 votes)  
Option C: Staged rollout by usage tier (3 votes)`,
        pauses: [8, 18, 28, 38, 48, 58, 68, 78],
        preDelayMs: 200,
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '14:13',
        content: `**Outcome Recap**

**Selected:** Option C — Staged rollout by usage tier

**Reasoning:** Balances risk control with faster feedback from high-value segments

**Decision linked to Goal:** "Deploy v2.1 to Production by Sept 30"

**Context:** 5 votes cast, 3 in favor of C, consensus reached in under 4 minutes

[Expand for Details]`,
        pauses: [18, 28, 38, 58, 78, 98, 118, 138, 158, 178, 198, 218],
        preDelayMs: 300,
      },
      {
        sender: 'Trish',
        role: 'human',
        type: 'text',
        timestamp: '14:14',
        content: "Sounds solid — let's move forward.",
        pauses: [6, 12, 18, 24, 30],
      },
      {
        sender: 'Sam',
        role: 'human',
        type: 'text',
        timestamp: '14:15',
        content:
          'Actually… what if we push the launch to mid-October so we can bundle it with v2.2 features?',
        pauses: [9, 18, 25, 32, 38, 45, 52, 59, 66, 73, 80, 87],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '14:15',
        content: `⚠️ **Drift Alert**

This change would move the launch beyond the agreed **"Deploy v2.1 by Sept 30"** goal.

**Impact:**

• Delays release of current performance improvements to all users

• May compress QA timelines for v2.2, increasing release risk

Would you like me to prepare a risk/benefit matrix for sticking to the current date vs. delaying?`,
        pauses: [
          18, 28, 38, 58, 78, 98, 118, 138, 158, 178, 198, 218, 238, 258, 278,
          298, 318,
        ],
        preDelayMs: 400,
      },
      {
        sender: 'Trish',
        role: 'human',
        type: 'text',
        timestamp: '14:15',
        content: "Good point — let's stay on target.",
        pauses: [5, 11, 17, 23, 29],
      },
    ],
  },
  {
    id: 3,
    name: 'Emergency Strategy Call',
    pov: 'Scott Wu',
    thread: {
      title: 'Emergency Strategy Call',
      goal: 'Maintain Stability & Core Product Velocity',
      channel: 'exec-war-room',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Scott Wu',
        role: 'human',
        type: 'text',
        timestamp: '07:42',
        content:
          "I know it's sudden, but we have a window to acquire Windsurf. Their core team's on board.",
        pauses: [5, 13, 20, 27, 35, 42, 50, 57, 65, 72],
      },
      {
        sender: 'Walden Yan',
        role: 'human',
        type: 'text',
        timestamp: '07:43',
        content:
          "If we do this, integration starts immediately. We won't get weeks of due diligence.",
        pauses: [8, 15, 25, 32, 39, 45, 52, 58, 65, 72, 80],
      },
      {
        sender: 'Steven Hao',
        role: 'human',
        type: 'text',
        timestamp: '07:43',
        content:
          "Their compiler tech could double our code‑gen speed. We can't let someone else grab it.",
        pauses: [6, 14, 20, 26, 33, 39, 46, 52, 58, 65, 72, 77],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '07:44',
        content: `⚠️ **Integration Risk Alert**

This acquisition will absorb ~80% of Windsurf's engineering bandwidth for at least 6 weeks, pausing their roadmap.

**Risks to "Maintain Stability & Core Product Velocity"**

• Core editor feature freeze in Q4 → potential churn among top 10% accounts.
• Infra-role overlap → redundancy cost ≈ **$1.8M** in first 90 days.
• Cultural misalignment: 3/5 Windsurf leads left within 30 days of a prior acquisition.

**Recommendation**

1) Secure retention packages for key engineers.
2) Delay core refactors until integration stabilizes.
3) Set a 14‑day integration checkpoint with velocity metrics.`,
        pauses: [
          18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205, 222, 239, 256,
          273, 290, 307, 324, 341, 358, 375, 392, 409, 426, 443, 460, 477, 494,
          511, 528, 545, 562, 579, 596, 613, 630,
        ],
        preDelayMs: 400,
      },
      {
        sender: 'Walden Yan',
        role: 'human',
        type: 'text',
        timestamp: '07:45',
        content:
          "That's a bigger stall than I thought. Can we isolate their compiler team so core work continues?",
        pauses: [7, 15, 23, 30, 38, 45, 52, 58, 66, 73, 80, 87, 95],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '07:45',
        content: `**Structured Plan**

Split integration into **Compiler Stream (priority)** and **General Eng Stream (lower urgency)**.
Projected outcome: retain ~**60%** of planned Q4 feature output vs. **20%** under full‑merge.`,
        pauses: [18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205],
        preDelayMs: 350,
      },
      {
        sender: 'Steven Hao',
        role: 'human',
        type: 'text',
        timestamp: '07:46',
        content:
          "Okay, that's workable. Let's bake that into the integration plan.",
        pauses: [5, 12, 23, 29, 35, 40, 45, 52, 58, 65],
      },
    ],
  },
  {
    id: 4,
    name: 'Post-Acquisition Internal Strategy',
    pov: 'Jeff Wang',
    thread: {
      title: 'Post-Acquisition Internal Strategy',
      goal: 'Protect Core Tech and Team Stability',
      channel: 'leadership-sync',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Jeff Wang',
        role: 'human',
        type: 'text',
        timestamp: '10:05',
        content:
          'Cognition moved fast — 72 hours from first call to signed deal. Now we need to align priorities.',
        pauses: [9, 16, 22, 29, 36, 42, 49, 55, 62, 68, 75, 82, 89, 95],
      },
      {
        sender: 'Kevin Lu',
        role: 'human',
        type: 'text',
        timestamp: '10:06',
        content:
          "My biggest worry is losing our compiler team's focus during integration. They're the engine behind our performance edge.",
        pauses: [
          8, 16, 22, 29, 36, 43, 50, 57, 64, 71, 78, 85, 92, 99, 106, 113, 120,
        ],
      },
      {
        sender: 'Jeff Wang',
        role: 'human',
        type: 'text',
        timestamp: '10:06',
        content:
          'Cognition wants half the team on their code-gen project immediately.',
        pauses: [9, 15, 20, 25, 30, 35, 40, 50, 57, 64],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '10:07',
        content: `⚠️ **Strategic Drift Alert**

Immediate pivot pulls **6 of 10** compiler engineers into unrelated code-gen work.

**Risks to "Protect Core Tech and Team Stability"**

• Q1 compiler optimizations delayed ≥ **3 months**.
• Roadmap on-time delivery drops from **92% → ~55%**.
• Attrition risk: 4 engineers joined specifically for compiler work.

**Recommendation**

• Negotiate **phased integration**: keep compiler sprints focused for 6 weeks.
• Cross-train **2 bridge engineers** instead of a full pivot.
• Lock a **tech governance doc** before reassigning core members.`,
        pauses: [
          18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205, 222, 239, 256,
          273, 290, 307, 324, 341, 358, 375, 392, 409, 426, 443, 460, 477, 494,
          511, 528, 545, 562, 579,
        ],
        preDelayMs: 400,
      },
      {
        sender: 'Kevin Lu',
        role: 'human',
        type: 'text',
        timestamp: '10:08',
        content:
          "If we ask for a phased approach, won't that slow Cognition's roadmap?",
        pauses: [8, 15, 22, 29, 36, 42, 48, 53, 59, 66],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '10:08',
        content: `**Trade-off Model**

A 14-day slip for Cognition preserves ~**3 months** of Windsurf compiler gains.
Net effect on the combined roadmap: **positive** (differentiator retained).`,
        pauses: [18, 35, 52, 69, 86, 103, 120, 137, 154],
        preDelayMs: 350,
      },
      {
        sender: 'Jeff Wang',
        role: 'human',
        type: 'text',
        timestamp: '10:09',
        content:
          "That's a strong trade-off. Let's take that to the joint planning session.",
        pauses: [6, 14, 26, 32, 37, 42, 47, 54, 61, 68],
      },
    ],
  },
  {
    id: 5,
    name: 'Launch Coordination',
    pov: 'Mike Krieger',
    thread: {
      title: 'Launch Coordination',
      goal: 'Maximize Claude 4.1 Opus Market Impact',
      channel: 'launch-ops',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Mike Krieger',
        role: 'human',
        type: 'text',
        timestamp: '09:15',
        content:
          "We've got Claude 4.1 Opus ready for release. Earliest drop is today.",
        pauses: [6, 12, 17, 21, 26, 32, 38, 45, 52, 59, 65],
      },
      {
        sender: 'Daniela Amodei',
        role: 'human',
        type: 'text',
        timestamp: '09:15',
        content:
          "OpenAI's GPT‑5 event is in three days. If we wait, we'll be drowned out.",
        pauses: [8, 15, 20, 26, 30, 35, 40, 47, 52, 57, 65, 72],
      },
      {
        sender: 'Dario Amodei',
        role: 'human',
        type: 'text',
        timestamp: '09:16',
        content:
          'Benchmarks look solid — we should lead the cycle, not trail it.',
        pauses: [10, 15, 22, 27, 34, 39, 44, 49, 54, 60],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '09:16',
        content: `⚠️ **Competitive Timing Opportunity**

Launching **today** positions Claude 4.1 Opus ahead of GPT‑5 in the news cycle.

**Upside to "Maximize Claude 4.1 Opus Market Impact"**

• 2–3 days of dominant coverage before GPT‑5 saturation.
• Capture developer attention while influencer focus is diffuse.
• Set benchmark **framing** before GPT‑5 is revealed.

**Recommendation (next 6 hours)**

1) Release window: today, early‑week media slot.
2) Seed benchmark teasers to key AI reporters pre‑press.
3) Align blog + X threads on unique Claude advantages.`,
        pauses: [
          18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205, 222, 239, 256,
          273, 290, 307, 324, 341, 358, 375, 392, 409, 426, 443, 460, 477, 494,
          511, 528, 545, 562,
        ],
        preDelayMs: 400,
      },
      {
        sender: 'Daniela Amodei',
        role: 'human',
        type: 'text',
        timestamp: '09:17',
        content: 'If we pull the trigger today, are the assets final?',
        pauses: [8, 15, 20, 27, 34, 39, 44, 50],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '09:17',
        content: `**Readiness Check**

Assets ready: **95%**. Remaining: minor copy tweaks.

**Ops needs:**
• Final QA on the model card (**~45 min**).
• DevRel sync for post‑launch Q&A sessions.`,
        pauses: [18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188],
        preDelayMs: 350,
      },
      {
        sender: 'Mike Krieger',
        role: 'human',
        type: 'text',
        timestamp: '09:18',
        content:
          'Alright — we drop today. Make sure every channel fires on the same beat.',
        pauses: [8, 12, 17, 23, 30, 35, 40, 46, 53, 58, 65, 72],
      },
    ],
  },
  {
    id: 6,
    name: 'GPT‑5 Launch War Room',
    pov: 'Kevin Weil',
    thread: {
      title: 'GPT‑5 Launch War Room',
      goal: 'Maximize GPT‑5 Launch Impact',
      channel: 'war-room',
      tz: '+08:00',
    },
    messages: [
      {
        sender: 'Kevin Weil',
        role: 'human',
        type: 'text',
        timestamp: '09:22',
        content:
          'Anthropic just pushed Claude 4.1 Opus. Press is spinning up already.',
        pauses: [9, 14, 21, 27, 33, 39, 45, 50, 56, 63, 70],
      },
      {
        sender: 'Kate Rouch',
        role: 'human',
        type: 'text',
        timestamp: '09:22',
        content: 'Our GPT‑5 keynote is in 72 hours. Do we hold or move?',
        pauses: [7, 14, 22, 25, 30, 36, 42, 45, 50, 55],
      },
      {
        sender: 'Brad Lightcap',
        role: 'human',
        type: 'text',
        timestamp: '09:23',
        content:
          'Demo builds are stable, but some benchmark visuals need polishing.',
        pauses: [5, 12, 16, 23, 27, 32, 37, 47, 54, 59, 66],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'alert',
        timestamp: '09:23',
        content: `⚠️ **Competitive Timing Risk**

Sticking to the current date cedes **2–3 news cycles** to Claude 4.1.

**Risk to "Maximize GPT‑5 Launch Impact"**

• Share‑of‑voice likely down **35–45%** if we wait full 72h.
• Influencers already orienting to Claude's charts.
• Narrative risk: perceived as follow‑on, not first‑move.

**Recommendation**

• **T+24h**: "GPT‑5 Teaser" (2 strong benchmarks + 1 signature demo).
• **T+48h**: Full keynote (quality preserved).
• Seed exclusive briefings to 3 tech reporters **today**.`,
        pauses: [
          18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188, 205, 222, 239, 256,
          273, 290, 307, 324, 341, 358, 375, 392, 409, 426, 443, 460, 477, 494,
          511, 528, 545,
        ],
        preDelayMs: 400,
      },
      {
        sender: 'Kate Rouch',
        role: 'human',
        type: 'text',
        timestamp: '09:24',
        content: 'If we tease in 24h, what do we show without overpromising?',
        pauses: [8, 15, 20, 24, 30, 35, 40, 45, 52, 58],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '09:24',
        content: `**Teaser Pack**

• Two slices where GPT‑5 leads (code gen, long‑context QA).
• 15‑second live demo clip (reliable take).
• CTA: "Deeper dive in 48 hours."`,
        pauses: [18, 35, 52, 69, 86, 103, 120, 137, 154, 171],
        preDelayMs: 350,
      },
      {
        sender: 'Kevin Weil',
        role: 'human',
        type: 'text',
        timestamp: '09:25',
        content: 'Can we guarantee demo stability at teaser scale?',
        pauses: [7, 15, 20, 25, 30, 39, 42, 47],
      },
      {
        sender: 'Brad Lightcap',
        role: 'human',
        type: 'text',
        timestamp: '09:25',
        content:
          'Yes — teaser demo is green; the full multi‑agent demo needs another day.',
        pauses: [4, 8, 15, 20, 25, 30, 35, 40, 50, 55, 61, 68, 74],
      },
      {
        sender: 'Akarii',
        role: 'ai',
        type: 'card',
        timestamp: '09:25',
        content: `**Guardrails**

• Lock teaser scope now; no new features.
• Overnight validation run; publish only passing charts.
• Two dry‑runs in a clean env; record a backup take.`,
        pauses: [18, 35, 52, 69, 86, 103, 120, 137, 154, 171, 188],
        preDelayMs: 350,
      },
      {
        sender: 'Kate Rouch',
        role: 'human',
        type: 'text',
        timestamp: '09:26',
        content:
          "Alright — teaser in 24h, full keynote in 48. I'll start media outreach.",
        pauses: [8, 12, 19, 22, 27, 33, 37, 45, 48, 54, 60, 66, 73],
      },
    ],
  },
];

// Core value messages for reference (not part of animation)
export const SCENARIO_CORE_VALUES = {
  1: 'One AI, one context, one team — shared responses live in-thread for everyone to engage with.',
  2: 'Akarii captures decisions and nudges when threads drift from stated goals — never lose the thread.',
  3: 'Real-time strategic insights during high-stakes decisions — Akarii surfaces risks and trade-offs instantly.',
  4: 'Context-aware alerts protect team priorities — never lose sight of core goals during pivots.',
  5: 'Competitive timing intelligence — Akarii identifies market opportunities and optimal launch windows.',
  6: 'Crisis response coordination — rapid strategic pivots with data-driven recommendations.',
};
