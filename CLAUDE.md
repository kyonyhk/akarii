# Claude Code Instructions

## Task Master AI Instructions
**Import Task Master's development workflow commands and guidelines, treat as if import is in the main CLAUDE.md file.**
@./.taskmaster/CLAUDE.md

## Project Task Development Workflow

### Standard Task Implementation Process

When working on any task or subtask:

1. **Branch Setup**
   ```bash
   # Ensure we're on main and get latest changes
   git checkout main
   git pull origin main
   
   # Create new feature branch for the task
   git checkout -b feature/task-<id>-<brief-description>
   # Example: git checkout -b feature/task-1.2-user-auth
   ```

2. **Implementation**
   - Work on the subtask implementation on the feature branch
   - Make commits with clear messages referencing the task ID
   - Use `task-master update-subtask --id=<id> --prompt="progress notes"` to log progress

3. **Testing & Validation**
   - Complete implementation
   - Mark subtask as done: `task-master set-status --id=<id> --status=done`
   - User will test on development server (no need to start server automatically)

4. **PR Creation & Merge**
   - Once user confirms changes are good, they will request:
     - Push changes to remote branch
     - Create PR for merging into main
   - User handles the actual merge process

### Important Notes
- Always start from latest main branch
- One feature branch per task/subtask
- Don't automatically start development servers
- Wait for user confirmation before creating PRs
- Use descriptive branch names with task IDs

## Project Setup Requirements

### Package Manager
- **Use Bun as the package manager** for all operations (install, run, build, etc.)
- Replace `npm` commands with `bun` equivalents:
  - `npm install` → `bun install`
  - `npm run dev` → `bun run dev`
  - `npm run build` → `bun run build`
  - `npx` → `bunx`

### Tech Stack
- **Frontend**: Next.js with TypeScript and Tailwind CSS
- **Backend**: Convex for email capture and data storage
- **Package Manager**: Bun
- **Design**: Figma designs accessible via MCP

## Project Context Documents

### Product Strategy & Timeline

- **Product Roadmap**: `claude_docs/roadmap-latest.xml` - Comprehensive product vision, phases, and technical architecture for Akarii intelligence layer
- **Master Timeline**: `claude_docs/akarii-master-timeline-risk.xml` - 12-week development timeline with milestones, risks, and mitigation strategies

### Key Project Information

- **Product Vision**: Intelligence layer for teamwork living inside chat
- **Current Phase**: Phase 1 - Multiplayer Chat Foundations (Aug 2025 - Oct 2025)
- **Key Milestones**:
  - Private Alpha (Design Partners): Sept 6, 2025
  - Public Waitlist + Demos: Sept 20, 2025  
  - Open Beta (Gated): Oct 31, 2025
- **Core Components**: ThreadMemory, InsightTracker, AgendaGoalMapping, RecallEngine
