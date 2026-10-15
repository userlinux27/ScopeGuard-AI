---
doc: checklist
status: draft
---

# Build Checklist — ScopeGuard AI

Build mode: learn

## Slices

- [ ] **1. Scaffold + input form + six-section output layout**
  Becomes usable: A running single-page app with the input form, original request preserved, and six labeled output sections visible (even if empty before analysis).
  Why now: Proves the full UI path end-to-end before adding the AI integration.
  PRD ref: `prd.md > Screens and Layout`, `prd.md > The Core Journey` (steps 1-3, 9)
  Spec ref: `spec.md > Components` (Input, Output), `spec.md > File Structure`, `spec.md > Look and Feel`
  Build: Create `index.html`, `style.css`, `app.js` with scaffold, input form, six-section output layout, and basic state variables.
  Verify (mechanical): Open `index.html` in browser; confirm form renders, six sections visible, no JS errors.
  Learner check: Open the app, see the input area and the six labeled sections below, and confirm the layout matches the spec's dark theme.
  Commit: `Scaffold app with input form and six-section layout`

- [ ] **2. Analysis Controller + non-streaming Ollama (`"stream": false`)**
  Becomes usable: Clicking "Analyze Request" sends a prompt to Ollama and displays parsed results in the six sections.
  Why now: The core AI loop is the unique kernel; it must work before refining quality.
  PRD ref: `prd.md > Features and Behavior > Request Analysis`
  Spec ref: `spec.md > The Core Journey` (steps 5-8), `spec.md > External Services and Dependencies`, `spec.md > Analysis Controller`
  Build: Implement prompt construction, `fetch` with `"stream": false`, response parsing, six-section validation, loading/error states.
  Verify (mechanical): Confirm `"stream": false` in payload; test with Ollama running; verify non-streaming JSON response parsed correctly.
  Learner check: Submit a request, observe loading state, then see the six sections populated from the AI response.
  Commit: `Add Analysis Controller with non-streaming Ollama integration`

- [ ] **3. Clarity Notice + assumption labeling + error handling**
  Becomes usable: Vague input shows a Clarity Notice banner; inferred items labeled `⚠️ Assumed:`; CORS/timeout/missing-section errors handled gracefully.
  Why now: Quality and reliability are the spec's key requirements; they must be verified before considering the PoC complete.
  PRD ref: `prd.md > States and Boundaries` (Vague input state), `prd.md > Features and Behavior > Request Analysis` (assumptions labeled)
  Spec ref: `spec.md > How This Works` (Clarity Notice), `spec.md > Analysis Controller` (`⚠️ Assumed:`), `spec.md > Important Failure Modes` (CORS, timeout, missing sections)
  Build: Add ambiguity detection (derived, not length-only), Clarity Notice banner, `⚠️ Assumed:` labeling in output, CORS/timeout/missing-section error messages.
  Verify (mechanical): Test with very short/vague input (Clarity Notice appears); test with missing sections (error shown); confirm CORS setup instructions referenced.
  Learner check: Try a vague request, see the notice; try a normal request, see labeled assumptions; disconnect Ollama and see the helpful error.
  Commit: `Add Clarity Notice, assumption labels, and error handling`

## Hands-on Checkpoints

- [ ] Early usable behavior explored — after Slice 1 (scaffold + layout)
- [ ] Final kick-the-tires exploration and feedback completed — after Slice 3

## Final Review

- [ ] Final review complete — feedback resolved and learner confirms ready to ship

## Code Tour and App Map

- [ ] Learning activity complete — guided route, focused alternative, prior practice connected, or brief recap
- [ ] Optional edit and transfer reflection addressed — offered/declined/already covered/not applicable as appropriate
- [ ] `devpost/app-map.html` generated from finished code, checked, and shown, including a project-grounded practice to reuse

Activity and evidence: [to be filled after build]
Route and stops: [to be filled after build]
Edit outcome: [to be filled after build]
Reflection: [to be filled after build]
Activity mode: [live app and editor, explicit static fallback, focused alternative, prior practice, or recap]

## Revisions
