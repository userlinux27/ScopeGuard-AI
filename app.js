// ScopeGuard AI — Analysis Controller (Slice 1: scaffold + layout)
// Full AI integration (non-streaming Ollama) arrives in Slice 2.

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

  // Slice 1: show loading and reveal layout; AI call deferred to Slice 2
  analyzeBtn.disabled = true;
  loadingIndicator.classList.remove('hidden');
  errorMessage.classList.add('hidden');
  outputSection.classList.remove('hidden');

  // Preserve original request
  document.getElementById('originalRequestDisplay').textContent = text;

  // Clarity Notice: derived from ambiguity (not a fixed length threshold)
  const isAmbiguous = text.length < 30 || !text.includes(' ');
  if (isAmbiguous) {
    clarityNotice.classList.remove('hidden');
  } else {
    clarityNotice.classList.add('hidden');
  }

  // Placeholder sections (Slice 2 will populate from Ollama response)
  document.getElementById('requestSummary').textContent = 'Awaiting AI analysis...';
  document.getElementById('tasksDeliverables').textContent = 'Awaiting AI analysis...';
  document.getElementById('openQuestions').textContent = 'Awaiting AI analysis...';
  document.getElementById('assumptions').textContent = 'Awaiting AI analysis...';
  document.getElementById('scopeBoundaries').textContent = 'Awaiting AI analysis...';
  document.getElementById('acceptanceCriteria').textContent = 'Awaiting AI analysis...';

  // Simulate brief delay for UX demonstration in Slice 1
  setTimeout(() => {
    loadingIndicator.classList.add('hidden');
    analyzeBtn.disabled = false;
  }, 800);
}

function showError(msg) {
  errorMessage.textContent = msg;
  errorMessage.classList.remove('hidden');
}
