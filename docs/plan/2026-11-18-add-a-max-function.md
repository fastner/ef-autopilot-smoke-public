# Add a max function

**Plan status:** Not implemented
**Source:** effective-flow plan
**Recommended workflow:** Feature (`effective-flow build`)

## Requirement

Add `max(values)` to `src/sum.mjs`, next to `sum`. It returns the largest number of a non-empty array. For an empty array it throws a `RangeError` with the message `max needs at least one value`.

## Affected files

| File | Change |
| --- | --- |
| `src/sum.mjs` | New exported function `max(values)`. |
| `test/sum.test.mjs` | Tests for a normal case, negative numbers, a single value and the empty array. |
| `README.md` | One sentence naming `max(values)`. |

## Implementation details

1. Export `max(values)` from `src/sum.mjs`. Check `values.length === 0` first and throw `new RangeError('max needs at least one value')`; otherwise return `Math.max(...values)`.
2. Extend `test/sum.test.mjs` with the four cases above, using `node:test` and `node:assert/strict` like the existing test.
3. Add the sentence to `README.md`.

## Acceptance criteria

- [ ] `max([3, 9, 4])` returns `9` and `max([-5, -2])` returns `-2`.
- [ ] `max([7])` returns `7`.
- [ ] `max([])` throws a `RangeError` with the message `max needs at least one value`.
- [ ] `npm test` (`node --test`) passes.
- [ ] `README.md` names `max(values)`.

## Validation plan

Run `node --test`.
