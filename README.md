# ScopeGuard AI

**Turn vague client requests into clear project scopes before you start building.**

ScopeGuard AI helps freelancers turn unclear client requests into structured project briefs without inventing missing requirements.

## Features

- Request Summary
- Tasks and Deliverables
- Open Questions
- Assumptions
- Scope Boundaries
- Acceptance Criteria

The goal is to make uncertainty visible before development begins.

## Technology

- HTML, CSS, and JavaScript
- Ollama for local AI inference
- Llama 3.1 8B

## Requirements

- A modern web browser
- [Ollama](https://ollama.com/) installed and running
- The `llama3.1:8b` model downloaded in Ollama

## Running locally

Start Ollama and make sure the `llama3.1:8b` model is available. Then start the local web server using the same method you used to run the project during development.

Open the local address provided by your web server.

## Testing

Run the JavaScript syntax check:

```bash
node --check app.js
```

Run the regression tests:

```bash
node test-slice3-regression.js
```

## Project documents

The project planning documents are available in the `devpost/` directory:

- `scope.md`
- `prd.md`
- `spec.md`

## Disclaimer

AI-generated results may be incomplete or inaccurate. Review the output before relying on it.
