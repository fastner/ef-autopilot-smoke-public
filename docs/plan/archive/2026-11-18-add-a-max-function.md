# Add a max function

**Plan status:** Implemented
**Source:** effective-flow plan
**Recommended workflow:** Feature (`effective-flow build`)

## Requirement

Add `max(values)` to `src/sum.mjs`, next to `sum`. It returns the largest number of a non-empty array. For an empty array it throws a `RangeError` with the message `max needs at least one value`. Like `sum`, `max` assumes an array of numbers and performs no further input validation (non-arrays, `NaN` or numeric strings are out of scope).

## Affected files

| File | Change |
| --- | --- |
| `src/sum.mjs` | New exported function `max(values)`. |
| `test/sum.test.mjs` | Tests for a normal case, negative numbers, a single value and the empty array. |
| `README.md` | One sentence naming `max(values)`. |

## Implementation details

1. Export `max(values)` from `src/sum.mjs`. Check `values.length === 0` first and throw `new RangeError('max needs at least one value')`; otherwise return the largest value with a `reduce` (`values.reduce((largest, value) => (value > largest ? value : largest))`), not `Math.max(...values)`: spreading a large array exceeds the engine's argument limit and would throw an unrelated `RangeError`.
2. Extend `test/sum.test.mjs` with the four cases above, using `node:test` and `node:assert/strict` like the existing test. The empty-array test asserts both class and message: `assert.throws(() => max([]), { name: 'RangeError', message: 'max needs at least one value' })`.
3. Add the sentence to `README.md`.

## Acceptance criteria

- [ ] `max([3, 9, 4])` returns `9` and `max([-5, -2])` returns `-2`.
- [ ] `max([7])` returns `7`.
- [ ] `max([])` throws a `RangeError` with the message `max needs at least one value`.
- [ ] `npm test` (`node --test`) passes.
- [ ] `README.md` names `max(values)`.

## Validation plan

- Run `node --test`.
- Run `grep -F 'max(values)' README.md` to prove the README criterion.

## Plan review

**Result:** Approved

### Summary

| Area | Critical | Important | Note |
| --- | --- | --- | --- |
| Architecture | 0 | 0 | 0 |
| Security | 0 | 0 | 0 |
| Data protection | 0 | 0 | 0 |
| Error cases | 0 | 1 | 1 |
| Testability | 0 | 0 | 2 |
| Scope | 0 | 0 | 0 |
| Maintainability | 0 | 0 | 0 |

### Findings

- **Error cases – Important:** `Math.max(...values)` throws a `RangeError` (argument limit) for large arrays, the same error class reserved for the empty array. Incorporated: implementation step 1 now uses a `reduce`, consistent with `sum`.
- **Error cases – Note:** The input contract beyond non-empty number arrays was unstated. Incorporated: the requirement states that `max`, like `sum`, performs no further input validation.
- **Testability – Note:** The empty-array test did not have to assert the message. Incorporated: step 2 asserts class and message.
- **Testability – Note:** The README criterion had no validation step. Incorporated: the validation plan adds a `grep` check.

## Build completion

**Requirement:** `max(values)` in `src/sum.mjs` returns the largest number of a non-empty array and throws `RangeError('max needs at least one value')` for an empty array; no further input validation, like `sum`.

**Architecture decisions:** `max` lives next to `sum` in `src/sum.mjs` and uses a `reduce` after the empty check instead of `Math.max(...values)`, so large arrays do not hit the engine's argument limit.

**Affected files:**

| File | Description |
| --- | --- |
| `src/sum.mjs` | New exported `max(values)`. |
| `test/sum.test.mjs` | Four `max` tests: normal case, negative numbers, single value, empty array (class and message). |
| `README.md` | The existing sentence now names `max(values)`. |

**Implementation details:** Implemented as planned in steps 1–3; in-code documentation was judged out of scope because the repository uses no JSDoc.

## Test results

- Full suite at validation (`node --test`): 5 tests, 5 passed, 0 failed.
- `grep -F 'max(values)' README.md`: passed.
- Final check: no file changed after the full run, so the tests were not rerun; `grep` passed again.

## Review findings

**Date:** 2026-11-18
**Reviewer:** Node.js reviewer

No findings found.

## Open points

- No open points.
