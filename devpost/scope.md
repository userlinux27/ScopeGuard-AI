---
doc: scope
status: approved
---

# ScopeGuard AI

One line: An AI assistant that helps freelancers turn vague client requests into structured project briefs by identifying tasks, highlighting missing information, suggesting clarifying questions, distinguishing assumptions from confirmed requirements, and proposing acceptance criteria.

## The Unique Kernel
ScopeGuard AI doesn't invent or assume missing details—it makes uncertainty visible by flagging what needs clarification, helping freelancers have better conversations with clients before work begins.

## Who It's For
A solo freelancer who builds websites, APIs, automations, or AI-powered applications and receives vague client requests like "I need a website with an AI assistant." Instead of guessing what the client wants or starting work with unclear expectations, they use ScopeGuard AI to analyze the request and identify what needs clarification before committing to the project.

## The Core Loop
The user opens the web app, sees a text area with an example vague client request (or enters their own), clicks "Analyze Request," and reviews the structured output containing: Request Summary, Tasks and Deliverables, Open Questions, Assumptions, Scope Boundaries, and Acceptance Criteria. They use this brief to guide their next conversation with the client.

## Inspiration & Identity
The tool should feel like a thoughtful assistant that helps the user think more clearly—not a magic solution that makes decisions for them. It should have a clean, practical interface focused on revealing uncertainty rather than hiding it. No specific visual references were mentioned, but the tone should be helpful and professional.

## Why This Matters to the Learner
This project combines programming and creativity to address a practical challenge the learner has observed: freelancers often start work based on incomplete client descriptions, leading to misunderstandings, scope creep, and unpaid work. By building ScopeGuard AI, they want to practice guiding an AI coding agent through a complete plan-first workflow while creating something useful that reflects their interest in AI-assisted development and turning technical ideas into practical tools.

## What "Working" Looks Like
A user opens a simple web page, sees a text area with a vague client request example (e.g., "I need a website with an AI assistant that can answer questions about my services"), clicks "Analyze Request," and sees a structured draft with all six sections clearly labeled. The output makes uncertainty visible—for example, if the client hasn't specified what data the AI assistant can use, that appears as an open question rather than an assumed detail. The user can review the result and see how an unclear request becomes a more actionable project brief they can use in a client conversation.

## The POC Boundary
- Single-page web interface with text input and analyze button
- Processing of one client request to generate structured output
- All six output sections: Request Summary, Tasks and Deliverables, Open Questions, Assumptions, Scope Boundaries, Acceptance Criteria
- Ability to demonstrate the workflow with at least one realistic example in a short video (primary example: website requests involving an AI assistant)
- No user accounts, database, payment system, or deployment requirement
- Focus on making uncertainty visible rather than inventing details

## Later
- User accounts to save and revisit analyses
- Collaboration features for teams or agencies
- Integration with project management or proposal tools
- More sophisticated AI analysis with multiple reasoning steps
- Customizable output templates for different project types
- Deployment to a live web service

## Explicitly Cut
- User authentication and account management
- Database persistence for storing requests or analyses
- Payment processing or subscription features
- Project management integrations (e.g., with Trello, Asana, Jira)
- Team collaboration or sharing features
- Advanced AI features like multi-step reasoning or external tool use
- Customizable branding or white-label options
- Export to PDF or other document formats