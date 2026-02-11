/**
 * Kasa AI Test Runner
 * Usage: node tests/run-kasa-tests.mjs [base_url]
 */
import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const BASE_URL = process.argv[2] || 'https://haraya.vercel.app';
const API_URL = `${BASE_URL}/api/chat`;

const tests = JSON.parse(readFileSync(join(__dirname, 'kasa-test-conversations.json'), 'utf-8'));
const resultsDir = join(__dirname, 'results');
mkdirSync(resultsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const resultFile = join(resultsDir, `kasa-results-${timestamp}.md`);

let md = `# Kasa AI Test Results\n**Date:** ${new Date().toLocaleString()}\n**API:** ${API_URL}\n\n`;

let total = 0, passed = 0, failed = 0;

for (const group of tests.tests) {
  md += `---\n## ${group.persona}\n\n`;
  console.log(`\n--- ${group.persona} ---`);

  for (const conv of group.conversations) {
    total++;
    const lastUserMsg = [...conv.messages].reverse().find(m => m.role === 'user')?.content || '';
    process.stdout.write(`  ${conv.name}... `);

    try {
      const res = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: conv.messages, context: {} }),
        signal: AbortSignal.timeout(30000),
      });

      const body = await res.text();

      if (res.ok && body.length > 0) {
        passed++;
        console.log(`OK (${body.length} chars)`);
        md += `### ${conv.name} [PASS]\n`;
        md += `**User:** ${lastUserMsg}\n\n`;
        md += `**Kasa:**\n> ${body.replace(/\n/g, '\n> ')}\n\n`;
      } else {
        failed++;
        console.log(`FAIL (HTTP ${res.status})`);
        md += `### ${conv.name} [FAIL]\n`;
        md += `**User:** ${lastUserMsg}\n\n`;
        md += `**Error:** HTTP ${res.status} — ${body.slice(0, 200)}\n\n`;
      }
    } catch (err) {
      failed++;
      console.log(`ERROR: ${err.message}`);
      md += `### ${conv.name} [ERROR]\n`;
      md += `**User:** ${lastUserMsg}\n\n`;
      md += `**Error:** ${err.message}\n\n`;
    }

    // Small delay between requests
    await new Promise(r => setTimeout(r, 1000));
  }
}

md += `---\n## Summary\n`;
md += `- **Total:** ${total}\n`;
md += `- **Passed:** ${passed}\n`;
md += `- **Failed:** ${failed}\n`;

writeFileSync(resultFile, md);

console.log(`\n==============================`);
console.log(`  RESULTS: ${passed}/${total} passed`);
console.log(`  Output: ${resultFile}`);
console.log(`==============================`);
