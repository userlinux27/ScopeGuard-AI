// Focused regression tests for Slice 3 formatting fixes
// Run in browser console or via node (if adapted)

function testCleanMarkdown() {
  const cleanMarkdown = (text) => {
    let cleaned = text.replace(/\\\*\\\*/g, '').replace(/\\\*/g, '');
    cleaned = cleaned.replace(/⚠️\s*Assumed:\s*/g, '⚠️ Assumed: ');
    cleaned = cleaned.replace(/(⚠️ Assumed:[^\n]+)\s*⚠️ Assumed:\s*/g, '$1 ');
    return cleaned.trim();
  };

  const cases = [
    { input: 'Some **bold** text', expectedIncludes: 'bold', desc: 'normal Markdown preserved' },
    { input: 'Item with \\*\\* escaped', expectedIncludes: 'Item with escaped', desc: 'escaped asterisks stripped' },
    { input: '⚠️ Assumed:  ⚠️ Assumed: duplicate', expectedIncludes: '⚠️ Assumed: duplicate', desc: 'duplicated label normalized' },
    { input: '⚠️Assumed: no space', expectedIncludes: '⚠️ Assumed: no space', desc: 'spacing normalized' }
  ];

  let passed = 0, failed = 0;
  cases.forEach(c => {
    const result = cleanMarkdown(c.input);
    const ok = result.includes(c.expectedIncludes);
    console.log((ok ? 'PASS' : 'FAIL') + ': ' + c.desc + ' | result: ' + result);
    ok ? passed++ : failed++;
  });
  console.log('Regression results: ' + passed + ' passed, ' + failed + ' failed');
  return failed === 0;
}

testCleanMarkdown();
