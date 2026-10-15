// Focused verification for Slice 3 — can be run in browser console or as a quick script
// Records the verified success case from the vague request test.

const verifiedSuccessCase = {
  input: "I need a website with AI features that helps users manage their projects. It should be modern and easy to use.",
  result: "Ollama returned all six sections (verified in real browser-to-Ollama test).",
  issuesFixedInSlice3: [
    "Prompt strengthened to distinguish stated facts vs assumptions (⚠️ Assumed:)",
    "Scope Boundaries corrected: unconfirmed items marked as needing confirmation, not exclusions",
    "Acceptance Criteria: subjective/non-testable statements flagged; testable conditions preferred",
    "No invented technologies (Google Cloud AI, Microsoft Azure) in output",
    "Markdown rendering: escaped \\*\\* and \\* stripped via cleanMarkdown()"
  ],
  remainingLimitations: [
    "OLLAMA_ORIGINS exact syntax remains unverified (documented in spec.md)",
    "Assumption label enforcement relies on model following prompt; no automated parser validates ⚠️ Assumed: presence",
    "Clarity Notice derived from ambiguity heuristic (length < 30 or no spaces); may miss subtle ambiguity"
  ]
};

console.log('Slice 3 verification:', verifiedSuccessCase);
