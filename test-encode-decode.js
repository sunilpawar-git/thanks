// Round-trip test for the ?d= payload shared between gen.html (encode) and script.js (decode).
// Run with: node test-encode-decode.js
const assert = require('node:assert');

// --- encode, mirrors gen.html buildEncodedUrl() ---
function encode(name, msg) {
  const obj = { n: name };
  if (msg) obj.m = msg;
  const json = JSON.stringify(obj);
  const b64 = Buffer.from(json, 'utf8').toString('base64')
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
  return b64;
}

// --- decode, mirrors script.js ?d= handling ---
function decode(dParam) {
  const padded = dParam.replace(/-/g, '+').replace(/_/g, '/');
  const pad = (4 - padded.length % 4) % 4;
  const json = Buffer.from(padded + '='.repeat(pad), 'base64').toString('utf8');
  return JSON.parse(json);
}

const cases = [
  { name: 'name + msg', n: 'Mrs Joe', m: 'Hiya. Do well' },
  { name: 'name only, no msg', n: 'Amit', m: '' },
  { name: 'unicode + emoji', n: 'Priya \u{1F600}', m: 'Wishing you the best! ❤️\u{1F382}' },
  { name: 'multiline message', n: 'Raj', m: 'Line one\nLine two\nLine three' },
  { name: 'special/HTML characters', n: 'O\'Brien & Co <script>', m: '"quoted" & <b>bold</b>' },
  { name: 'long message', n: 'Sam', m: 'x'.repeat(500) },
];

let failures = 0;
for (const c of cases) {
  try {
    const b64 = encode(c.n, c.m);
    // encoded payload must be URL-safe (no +, /, =)
    assert.ok(!/[+/=]/.test(b64), 'payload must be URL-safe (no +, /, =)');

    const obj = decode(b64);
    assert.strictEqual(obj.n, c.n, 'name round-trip mismatch');
    if (c.m) {
      assert.strictEqual(obj.m, c.m, 'message round-trip mismatch');
    } else {
      assert.strictEqual(obj.m, undefined, 'empty message should be omitted, not round-tripped as empty string');
    }
    console.log(`PASS: ${c.name}`);
  } catch (err) {
    failures++;
    console.error(`FAIL: ${c.name} -> ${err.message}`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} test(s) failed.`);
  process.exit(1);
} else {
  console.log(`\nAll ${cases.length} tests passed.`);
}
