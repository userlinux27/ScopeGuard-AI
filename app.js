const requestInput = document.getElementById('requestInput');
const analyzeBtn = document.getElementById('analyzeBtn');
const loadingIndicator = document.getElementById('loadingIndicator');
const errorMessage = document.getElementById('errorMessage');
const outputSection = document.getElementById('outputSection');
const clarityNotice = document.getElementById('clarityNotice');

function analyzeRequest() {
  const text = requestInput.value.trim();
  if (!text) {
    showError('Please enter a client request before analyzing.');
    return;
  }
  analyzeBtn.disabled = true;
  loadingIndicator.classList.remove('hidden');
  errorMessage.classList.add('hidden');
  outputSection.classList.add('hidden');
  document.getElementById('originalRequestDisplay').textContent = text;
  const isAmbiguous = text.length < 30 || !text.includes(' ');
  if (isAmbiguous) { clarityNotice.classList.remove('hidden'); } else { clarityNotice.classList.add('hidden'); }
  const prompt = 'Analyze the following client request and produce a structured brief with exactly these six sections: Request Summary, Tasks and Deliverables, Open Questions, Assumptions, Scope Boundaries, Acceptance Criteria.\n\nRules:\n- Distinguish stated facts (from the request) from assumptions (your inferences). Label assumptions clearly with ⚠️ Assumed: .\n- Do not invent specific technologies (e.g., Google Cloud AI, Microsoft Azure) or requirements not mentioned.\n- Open Questions must contain actual questions, not labels.\n- Scope Boundaries: distinguish what appears included from what needs confirmation. Do NOT claim unconfirmed features are excluded; say they need confirmation.\n- Acceptance Criteria: suggest testable conditions only where the request provides enough detail; otherwise mark them as needing clarification (e.g., "Needs clarification: ..."). Avoid subjective statements.\n- If the request is vague, keep analysis proportional and note ambiguity rather than inventing details.\n\nClient request: ' + text;
  fetch('http://localhost:11434/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: 'llama3.1:8b', prompt: prompt, stream: false })
  })
  .then(async (res) => {
    if (!res.ok) throw new Error('Ollama returned status ' + res.status);
    const data = await res.json();
    if (!data || typeof data.response !== 'string') throw new Error('Invalid response from Ollama');
    return data.response;
  })
  .then((responseText) => {
    const requiredSections = ['Request Summary', 'Tasks and Deliverables', 'Open Questions', 'Assumptions', 'Scope Boundaries', 'Acceptance Criteria'];
    const missing = requiredSections.filter(s => !responseText.includes(s));
    if (missing.length > 0) throw new Error('AI response did not contain all expected sections: ' + missing.join(', '));
    outputSection.classList.remove('hidden');
    document.getElementById('requestSummary').innerHTML = renderMarkdownSafe(cleanMarkdown(extractSection(responseText, 'Request Summary')));
    document.getElementById('tasksDeliverables').innerHTML = renderMarkdownSafe(cleanMarkdown(extractSection(responseText, 'Tasks and Deliverables')));
    document.getElementById('openQuestions').innerHTML = renderMarkdownSafe(cleanMarkdown(extractSection(responseText, 'Open Questions')));
    document.getElementById('assumptions').innerHTML = renderMarkdownSafe(cleanMarkdown(extractSection(responseText, 'Assumptions')));
    document.getElementById('scopeBoundaries').innerHTML = renderMarkdownSafe(cleanMarkdown(extractSection(responseText, 'Scope Boundaries')));
    document.getElementById('acceptanceCriteria').innerHTML = renderMarkdownSafe(cleanMarkdown(extractSection(responseText, 'Acceptance Criteria')));
  })
  .catch((err) => {
    const msg = err.message.includes('Failed to fetch') || err.message.includes('CORS') ? 'CORS blocked or unable to connect. Ensure Ollama allows your origin and is running.' : (err.message.includes('timed out') || err.message.includes('timeout')) ? 'Request to AI service timed out. Please check your connection and try again.' : 'AI analysis failed. Please check that the llama3.1:8b model is available and try again.';
    showError(msg);
  })
  .finally(() => { loadingIndicator.classList.add('hidden'); analyzeBtn.disabled = false; });
}

function cleanMarkdown(text) {
  // Remove lines that contain only backslash artifacts
  let cleaned = text.split('\n').filter(line => {
    const trimmed = line.trim();
    return !(trimmed === '\\' || trimmed === '\\*' || trimmed === '\\*\\*' || trimmed === '**');
  }).join('\n');

  // Only strip escaped markers; preserve normal Markdown for renderMarkdownSafe
  cleaned = cleaned
    .replace(/\\\*\\\*/g, '')
    .replace(/\\\* /g, '* ')
    .replace(/\\\*\*\*\*/g, '');

  // Remove leading + or escaped \+ at start of lines (common artifact)
  cleaned = cleaned.replace(/^\s*\\?\+\s*/gm, '');

  const assumedPrefix = '⚠️ Assumed:';
  const damagedPrefix = /âš\s*ï¸\s*Assumed:/g;

  cleaned = cleaned.replace(damagedPrefix, assumedPrefix);

  const repeatedPrefix = /⚠️ Assumed:\s*(?:⚠️ Assumed:\s*)+/g;
  cleaned = cleaned.replace(repeatedPrefix, assumedPrefix + ' ');

  // Collapse multiple blank lines to single line break
  cleaned = cleaned.replace(/\n{3,}/g, '\n\n');

  return cleaned.trim();
}

function extractSection(text, heading) {
  const idx = text.indexOf(heading);
  if (idx === -1) return '';
  const start = idx + heading.length;
  const nextHeadings = ['Request Summary', 'Tasks and Deliverables', 'Open Questions', 'Assumptions', 'Scope Boundaries', 'Acceptance Criteria'];
  let end = text.length;
  for (const h of nextHeadings) { if (h === heading) continue; const i = text.indexOf(h, start); if (i !== -1 && i < end) end = i; }
  return text.substring(start, end).trim() || '(No content for this section)';
}

function renderMarkdownSafe(text) {
  // Security: escape HTML first using a temporary element
  const div = document.createElement('div');
  div.textContent = text;
  let html = div.innerHTML;

  // Preserve line breaks
  html = html.replace(/\n/g, '<br>');

  // Bold: **text** -> <strong>text</strong> (multiline-safe)
  html = html.replace(/\*\*([\s\S]+?)\*\*/g, '<strong>$1</strong>');

  // Headings: ### Heading -> <h3>Heading</h3>
  html = html.replace(/###\s+(.+?)(?=<br>|$)/g, '<h3>$1</h3>');

  // List markers at start of lines (after splitting by <br>)
  const lines = html.split('<br>');
  let inList = false;
  const processed = lines.map(line => {
    const trimmed = line.trim();
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      const itemText = trimmed.substring(2);
      if (!inList) { inList = true; return '<ul><li>' + itemText + '</li>'; }
      return '<li>' + itemText + '</li>';
    } else {
      if (inList) { inList = false; return '</ul>' + line; }
      return line;
    }
  });
  if (inList) processed.push('</ul>');
  html = processed.join('');

  // Preserve special labels with styling
  html = html.replace(/⚠️ Assumed:/g, '<span class="label-assumed">⚠️ Assumed:</span>');
  html = html.replace(/Needs clarification:/g, '<span class="label-clarify">Needs clarification:</span>');

  return html;
}

function showError(msg) { errorMessage.textContent = msg; errorMessage.classList.remove('hidden'); }
