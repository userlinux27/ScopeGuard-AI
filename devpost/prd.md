---
doc: prd
status: approved
---

# ScopeGuard AI — Product Requirements

One line: An AI assistant that helps freelancers turn vague client requests into structured project briefs by identifying tasks, highlighting missing information, suggesting clarifying questions, distinguishing assumptions from confirmed requirements, and proposing acceptance criteria.

Source: scope.md > The Unique Kernel, Who It's For, The Core Loop

## The Core Journey
1. User opens the web app and sees the product name, tagline, input instructions, a text area with an example client request, and an "Analyze Request" button.
2. User pastes or types a client's request into the text area (can edit the example or replace it entirely).
3. User clicks the "Analyze Request" button.
4. Button changes to "Analyzing..." with a loading indicator while processing occurs.
5. Upon successful analysis, the structured brief appears below the input area in six clearly labeled sections.
6. User reviews the brief to understand what needs clarification before talking to the client.
7. User can edit the request and re-analyze to see how changes affect the output.
8. Success is demonstrated when the user can see how an unclear request becomes a more actionable project brief that reveals uncertainty rather than hiding it.

## Screens and Layout
Single-page web application with:
- Header: Product name "ScopeGuard AI" and tagline "Turn vague client requests into clear project scopes before you start building."
- Input section: 
  - Heading: "What does your client want to build?"
  - Instruction: Brief explanation to paste the client's request, even if details are missing
  - Text area: Large input field prefilled with example request, editable by user
  - Button: Primary "Analyze Request" button
  - Note: Brief explanation that the tool identifies missing information and assumptions
- Output section (appears after analysis):
  - Original request remains visible above
  - Six clearly separated sections in order:
    1. Request Summary
    2. Tasks and Deliverables
    3. Open Questions
    4. Assumptions
    5. Scope Boundaries
    6. Acceptance Criteria
- No navigation, login, dashboard, or other unnecessary features

## Look and Feel
Clean, minimalist, professional interface for freelancers:
- Dark theme with charcoal background
- Readable typography with plenty of spacing
- Restrained green and yellow accents:
  - Green indicates clear or confirmed information
  - Yellow highlights assumptions and items requiring clarification
  - Red reserved for genuine errors or important warnings
- Color supports meaning rather than decoration
- Calm, focused, and trustworthy feel
- Clear visual hierarchy and well-separated sections
- Concise text, avoiding excessive gradients, glowing effects, oversized headings, unnecessary animations
- Prioritizes clarity and usability over visual spectacle

## Features and Behavior

### Request Analysis
As a freelancer using ScopeGuard AI, I want to submit a client request and receive a structured analysis that reveals uncertainty so I can have better conversations with clients.
  - [ ] Acceptance criterion: When a valid request is submitted, the app displays all six sections of the structured brief
  - [ ] Acceptance criterion: The Request Summary accurately reflects the client's stated goal without inventing details
  - [ ] Acceptance criterion: The Open Questions section lists specific, relevant questions the freelancer should ask the client
  - [ ] Acceptance criterion: The Assumptions section explicitly labels any inferences as unconfirmed
  - [ ] Acceptance criterion: The Scope Boundaries section distinguishes what appears included from what needs confirmation
  - [ ] Acceptance criterion: The Acceptance Criteria section suggests testable conditions that need client agreement
  - [ ] Acceptance criterion: Different requests produce appropriately different outputs (not a fixed template)
  - [ ] Acceptance criterion: Changing the example or entering a different request produces an analysis based on the current input, not a fixed example or stale result
  - [ ] Acceptance criterion: Very short/vague requests trigger a notice about needing more detail while still providing proportional analysis
  - [ ] Acceptance criterion: If AI/provider is unavailable or analysis fails, preserve user input, show helpful non-technical error message, allow retrying, and never fabricate a successful result

### Input Validation and Feedback
As a user, I want clear feedback when I submit an empty request so I know to provide more information.
  - [ ] Acceptance criterion: Empty or whitespace-only submissions show an inline error message
  - [ ] Acceptance criterion: Analysis does not start for invalid inputs
  - [ ] Acceptance criterion: User can correct and resubmit after seeing the error

### Loading and State Management
As a user, I want to understand when the app is processing my request so I don't submit multiple times.
  - [ ] Acceptance criterion: Button changes to "Analyzing..." and disables during processing
  - [ ] Acceptance criterion: Visible loading indicator appears during analysis
  - [ ] Acceptance criterion: Button restores to "Analyze Request" after completion
  - [ ] Acceptance criterion: Previous results are not displayed as belonging to new requests
  - [ ] Acceptance criterion: On re-analysis, if the new analysis fails, show a clear error and do not present the previous result as the new result

## States and Boundaries
- **Initial state** — User sees input interface with example request, no output displayed
- **Processing state** — Button shows "Analyzing..." with loading indicator, output from previous request hidden
- **Success state** — Structured brief displayed in six sections below input area, original request visible above
- **Error state** — Helpful error message displayed, original request preserved, ability to retry
- **Empty input state** — Inline validation message asking user to enter a client request
- **Vague input state** — Notice about needing more detail displayed above structured brief, all six sections still shown with proportional analysis

## Product Decisions
- Focus on solo freelancer as primary user — their reason: clearer user and simpler workflow for proof of concept
- Website requests involving AI assistant as primary example domain — their reason: makes demo concrete and helps evaluate output against realistic scenario
- Dark theme with charcoal background and restrained accents — their reason: prefers clean, minimalist, professional interface that feels like a practical tool
- Six-section structured output — their reason: ensures uncertainty is visible throughout (summary, tasks, questions, assumptions, boundaries, criteria)
- Single-page web app without accounts/payments — their reason: keeps proof of concept small and focused on core idea

## What We're Building
- Single-page web interface with text input and analyze button
- Processing of one client request to generate structured output
- All six output sections: Request Summary, Tasks and Deliverables, Open Questions, Assumptions, Scope Boundaries, Acceptance Criteria
- Ability to demonstrate the workflow with at least one realistic example in a short video (primary example: website requests involving an AI assistant)
- Input validation for empty requests
- Loading states and button disabling during processing
- Proportional analysis for vague/short requests (notice about needing more detail)
- No user accounts, database, payment system, or deployment requirement
- Focus on making uncertainty visible rather than inventing details

## Deferred From the POC
- User accounts to save and revisit analyses — out because it adds complexity not needed to prove the core idea
- Collaboration features for teams or agencies — out because the focus is on individual freelancer workflow
- Integration with project management or proposal tools — out because it extends beyond the proof of concept boundary
- More sophisticated AI analysis with multiple reasoning steps — out because basic analysis is sufficient to demonstrate the concept
- Customizable output templates for different project types — out because fixed format is acceptable for proof of concept
- Deployment to a live web service — out because local demonstration meets submission requirements

## Possible Later Enhancements
- User accounts to save and revisit analyses
- Collaboration features for teams or agencies  
- Integration with project management or proposal tools
- More sophisticated AI analysis with multiple reasoning steps
- Customizable output templates for different project types
- Deployment to a live web service

## Non-Goals
- User authentication and account management — not needed for proof of concept core idea
- Database persistence for storing requests or analyses — adds complexity beyond scope
- Payment processing or subscription features — not relevant to demonstrating the analysis concept
- Project management integrations (e.g., with Trello, Asana, Jira) — extends beyond proof of concept boundary
- Team collaboration or sharing features — focuses on individual freelancer workflow
- Advanced AI features like multi-step reasoning or external tool use — basic analysis sufficient for concept demonstration
- Customizable branding or white-label options — not necessary for proof of concept
- Export to PDF or other document formats — core interaction happens in-browser

## Open Questions
- Specific AI implementation approach for generating the structured analysis — can wait for 4-spec
- Exact wording and prioritization of open questions for different request types — can wait for 4-spec
- Specific acceptance criteria examples for different domains — can wait for 4-spec