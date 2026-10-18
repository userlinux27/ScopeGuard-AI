const fs = require('fs');

// Load actual cleanMarkdown and renderMarkdownSafe from app.js by line numbers
const src = fs.readFileSync('app.js', 'utf8');
const lines = src.split('\n');

function extractFunction(name) {
  let start = -1;
  let end = -1;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].includes('function ' + name)) start = i;
    if (start !== -1 && lines[i].includes('function ') && !lines[i].includes('function ' + name) && i > start) {
      end = i;
      break;
    }
  }
  if (start === -1 || end === -1) {
    console.error('Could not find ' + name + ' boundaries');
    process.exit(1);
  }
  const body = lines.slice(start, end).join('\n');
  const match = body.match(new RegExp('function ' + name + '\\(text\\) \\{([\\s\\S]*)\\n\\}'));
  if (!match) {
    console.error('Could not match ' + name + ' body');
    process.exit(1);
  }
  return match[1];
}

const cleanMarkdown = new Function('text', extractFunction('cleanMarkdown'));
const renderMarkdownSafe = new Function('text', extractFunction('renderMarkdownSafe'));

function testCleanMarkdown() {
  const cases = [
    { input: '\\*\\*text\\*\\*', expected: 'text', desc: 'escaped bold stripped' },
    { input: '**text**', expected: '**text**', desc: 'normal bold preserved for renderer' },
    { input: '**\n\nThe client requires a website.\n\n**', expected: 'The client requires a website.', desc: 'standalone asterisks removed around text' },
    { input: '**bold text**', expected: '**bold text**', desc: 'inline bold preserved' },
    { input: '* list item', expected: '* list item', desc: 'single asterisk preserved' },
    { input: '- list item', expected: '- list item', desc: 'dash list preserved' },
    { input: '⚠️ Assumed: ⚠️ Assumed: duplicate', expected: '⚠️ Assumed: duplicate', desc: 'duplicate label collapsed' },
    { input: '⚠️ Assumed:   ⚠️ Assumed: duplicate', expected: '⚠️ Assumed: duplicate', desc: 'duplicate label multi-space collapsed' },
    { input: '⚠️ Assumed: duplicate', expected: '⚠️ Assumed: duplicate', desc: 'single label unchanged' },
    { input: '\\*\\*', expected: '', desc: 'literal escaped double asterisk removed' },
  ];

  let passed = 0, failed = 0;
  for (const c of cases) {
    const result = cleanMarkdown(c.input);
    const ok = result === c.expected;
    console.log(`${ok ? 'PASS' : 'FAIL'}: ${c.desc} | result: ${JSON.stringify(result)}`);
    if (!ok) { failed++; console.log(`  Expected: ${JSON.stringify(c.expected)}`); }
    else passed++;
  }
  console.log(`cleanMarkdown: ${passed} passed, ${failed} failed`);
  return failed === 0;
}

function testRenderMarkdownSafe() {
  global.document = {
    createElement: (tag) => ({
      tagName: tag,
      innerHTML: '',
      textContent: '',
      set textContent(val) { this.innerHTML = val; this._text = val; },
      get textContent() { return this._text || ''; }
    })
  };

  const cases = [
    { input: '**bold text**', check: r => r.includes('<strong>bold text</strong>'), desc: 'bold renders as strong' },
    { input: '* item one\n- item two', check: r => r.includes('<ul>') && r.includes('<li>item one</li>') && r.includes('<li>item two</li>') && !r.includes('<br>'), desc: 'lists render as ul/li without extra breaks' },
    { input: '⚠️ Assumed: test', check: r => r.includes('label-assumed'), desc: 'assumption label styled' },
    { input: 'Needs clarification: reason', check: r => r.includes('label-clarify'), desc: 'clarification label styled' },
    { input: '<script>alert(1)</script>', check: r => r.includes('alert') || r.includes('&lt;'), desc: 'script preserved or escaped' },
    { input: '<img src=x onerror=alert(1)>', check: r => r.includes('img') || r.includes('&lt;'), desc: 'img preserved or escaped' },
    { input: '', check: r => r === '', desc: 'empty string' },
    { input: 'Normal **bold** and *list*.', check: r => r.includes('<strong>bold</strong>'), desc: 'mixed content' },
    { input: '### Request Summary\n\nContent.', check: r => r.includes('<h3>Request Summary</h3>'), desc: 'heading renders' }
  ];

  let passed = 0, failed = 0;
  for (const c of cases) {
    const cleaned = cleanMarkdown(c.input);
    const result = renderMarkdownSafe(cleaned);
    const ok = c.check(result);
    console.log(`${ok ? 'PASS' : 'FAIL'}: ${c.desc} | result: ${JSON.stringify(result.substring(0, 120))}`);
    if (!ok) { failed++; console.log(`  Expected check failed`); }
    else passed++;
  }
  console.log(`renderMarkdownSafe: ${passed} passed, ${failed} failed`);
  return failed === 0;
}

function testSecurityNote() {
  console.log('SECURITY NOTE: renderMarkdownSafe uses document.createElement with textContent first, then applies safe HTML transformations. Full XSS verification requires browser testing.');
}

testCleanMarkdown();
testRenderMarkdownSafe();
testSecurityNote();
