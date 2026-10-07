// Shared DFA logic — same states as the preview: q0 start, q1 name,
// q2 after dot, q3 ext (accepting), dead = reject.
// Returns { valid, trace } where trace shows every transition taken.

const isLetter = (c) => /[a-zA-Z]/.test(c);
const isLower = (c) => /[a-z]/.test(c);
const isDigit = (c) => /[0-9]/.test(c);

function validate(name) {
  let state = 'q0';
  let extLen = 0;
  const trace = [`start → q0`];

  for (const ch of name) {
    const from = state;
    if (state === 'q0') {
      state = isLetter(ch) ? 'q1' : 'dead';
    } else if (state === 'q1') {
      if (isLetter(ch) || isDigit(ch) || ch === '_' || ch === '-') state = 'q1';
      else if (ch === '.') state = 'q2';
      else state = 'dead';
    } else if (state === 'q2') {
      if (isLower(ch)) { state = 'q3'; extLen = 1; }
      else state = 'dead';
    } else if (state === 'q3') {
      if (isLower(ch) && extLen < 4) extLen++;
      else state = 'dead';
    }
    trace.push(`${from} -'${ch}'→ ${state}`);
    if (state === 'dead') return { valid: false, trace };
  }

  const valid = state === 'q3' && extLen >= 2;
  trace.push(valid ? `q3 is accepting ✓` : `end in ${state}, not accepting ✗`);
  return { valid, trace };
}

module.exports = { validate };
