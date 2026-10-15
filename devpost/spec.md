---
doc: spec
status: draft
---

# ScopeGuard AI — Technical Spec

## How This Works, In Plain Language
The app is a single-page web application served locally over HTTP (to avoid CORS issues with the Ollama API). The user types or pastes a vague client request into a text area, clicks "Analyze Request", and the app sends that request to a local AI model (llama3.1:8b served by Ollama) with a prompt asking for a structured project brief. The AI returns text that the app parses into six sections: Request Summary, Tasks and Deliverables, Open Questions, Assumptions, Scope Boundaries, and Acceptance Criteria. When the input is too vague or ambiguous, a Clarity Notice appears above the six sections. The app displays those sections below the input area, preserving the original request for comparison. All processing happens client-side; no data is stored permanently.

## The Core Journey Through the System
1. User opens the web app and sees the input form with an example request.
2. User edits or replaces the request text.
3. User clicks "Analyze Request".
4. App shows loading state, disables the button.
5. App constructs a prompt that includes the user's request and instructions to output the six sections, with inferred items labeled `⚠️ Assumed:` where the model makes assumptions.
6. App sends the prompt to the local Ollama API (http://localhost:11434/api/generate) with model llama3.1:8b and `"stream": false`.
7. App receives the complete non-streaming response.
8. App validates that the response contains all six section headings and basic structure; if not, it treats it as a failure.
9. On success, app displays the original request above, a Clarity Notice if the input was too vague, and the six sections below.
10. On failure (network error, missing sections, etc.), app shows an error message, keeps the input, and allows retry.
11. User can edit the request and repeat.

## Stack
- HTML5
- CSS3 (vanilla, with possible use of CSS variables for theming)
- JavaScript (ES2022, vanilla DOM manipulation)
- Ollama API (local HTTP server) with model llama3.1:8b
Rationale: Keeping the stack minimal reduces setup complexity and focuses on the AI integration challenge. No build step or framework is needed for this PoC.

## Where It Runs and How Someone Tries It
Runs in a modern browser (Chrome, Firefox, Edge, Safari) on Windows, macOS, or Linux. Requires Ollama running with the llama3.1:8b model pulled and CORS configured for local origins.

**Ollama CORS Setup** (⚠️ Unverified — verify syntax for your Ollama version):
- Ad-hoc: `OLLAMA_ORIGINS=http://localhost:* http://127.0.0.1:* ollama serve` (space-separated; confirm separator)
- Background service: Set `OLLAMA_ORIGINS` in service config or shell profile, then restart Ollama service

To try: start Ollama with CORS enabled, ensure model is available (`ollama run llama3.1:8b` to warm up), open index.html in browser. For demo recording: use browser's screen recording or a tool like OBS to capture the interaction.

## Look and Feel
- Dark theme with charcoal background (#2d2d2d)
- Readable typography (system font or -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif)
- Restrained accents: green (#4CAF50) for confirmed information, yellow (#FFC107) for assumptions/items needing clarification, red (#F44336) for errors
- Calm, focused, trustworthy feel with ample spacing and clear visual hierarchy
- Concise text, avoiding unnecessary animations

## Components

### Input Component
What it does: Renders the form where the user enters or edits the client request, shows instructions, and provides the Analyze Request button.
What it talks to: Sends user requests to the Analysis Controller; receives loading/error/success states.
PRD ref: prd.md > Screens and Layout (input section)

### Analysis Controller
What it does: Validates input, manages loading state, constructs the prompt for the AI (instructing the model to label inferred items with `⚠️ Assumed:` and output six sections), calls the Ollama API with `"stream": false`, processes the response, detects vague/ambiguous input to show a Clarity Notice, and updates the UI with either the structured brief or an error.
What it talks to: Input Component (for user actions and state), Output Component (to display results), Ollama API (external service).
PRD ref: prd.md > Features and Behavior > Request Analysis, Loading and State Management

### Output Component
What it does: Renders the six sections of the project brief in a clearly formatted way, preserving the original request above for reference. Conditionally renders a Clarity Notice banner above the six sections when the Analysis Controller signals insufficient or ambiguous input.
What it talks to: Receives structured data and clarity flag from the Analysis Controller.
PRD ref: prd.md > Features and Behavior > Request Analysis (display of sections)

## Data Model
- Current request string (in memory)
- Loading state (boolean)
- Error state (string or null)
- Analysis result: either null (not yet attempted/failed) or an object with the six section strings (requestSummary, tasksDeliverables, openQuestions, assumptions, scopeBoundaries, acceptanceCriteria)
- Clarity flag (derived): boolean set by Analysis Controller when input is too vague or ambiguous; not a separate stored field
All state is ephemeral and lives only in the browser's memory while the page is open.

## File Structure
```
scopeguard-ai/
├── index.html
├── style.css
├── app.js
└── devpost/
    ├── learner-profile.md
    ├── scope.md
    ├── prd.md
    └── spec.md
```

## External Services and Dependencies
- Ollama API: POST http://localhost:11434/api/generate
  - Payload: { "model": "llama3.1:8b", "prompt": "<constructed prompt>", "stream": false }
  - Response: JSON with "response" field containing the generated text.
  - No API key required; assumes Ollama is running locally with CORS enabled for local origins and model is available.
  - Documentation: https://github.com/ollama/ollama/blob/main/docs/api.md

## Important Failure Modes
- Ollama server not running → App shows error: "Unable to connect to AI service. Please ensure Ollama is running with the llama3.1:8b model."
  - Fallback: Preserve input, allow retry after user starts Ollama.
- CORS blocked → App shows error: "CORS blocked. Ensure Ollama allows your origin — see setup instructions."
  - Fallback: Preserve input, allow retry after user restarts Ollama with correct CORS config.
- Model not available / generation fails → App shows error: "AI analysis failed. Please check that the llama3.1:8b model is available and try again."
  - Fallback: Preserve input, allow retry.
- Response missing required sections or basic structure → App treats as failure and shows: "AI response did not contain all expected sections. Please try again or rephrase your request."
  - Fallback: Preserve input, allow retry.
- Network timeout → App shows error: "Request to AI service timed out. Please check your connection and try again."
  - Fallback: Preserve input, allow retry.

## What Was Simplified and Why
- No persistent storage → Instead of saving histories, the app works only with the current request. This keeps the PoC focused on the core AI analysis loop.
- Single model choice → We start with llama3.1:8b as the analysis engine; switching models would only require changing a constant.
- No backend server → The frontend talks directly to Ollama; this avoids extra complexity but assumes the user can run Ollama locally. For a production deployment, a thin backend might be added to hide the API endpoint, but it's unnecessary for the PoC.

## Decisions and Open Issues
- Decision: Use llama3.1:8b as the initial AI model for analysis. Tradeoff: Slightly lower maximum capability than larger models, but fits comfortably in local resources and avoids download.
- Decision: Frontend-only architecture with direct Ollama API calls. Tradeoff: Exposes the Ollama port to the browser (CORS must be enabled; Ollama defaults to allowing localhost). For tighter security, a proxy could be added, but it's not needed for the PoC.
- Open question: How to best structure the prompt to reliably produce the six section format? This will be addressed during implementation by testing and refining the prompt based on actual outputs.