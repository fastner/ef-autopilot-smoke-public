import { test } from 'node:test';
import assert from 'node:assert/strict';
import { sum, max } from '../src/sum.mjs';
test('sum adds numbers', () => assert.equal(sum([1, 2, 3]), 6));
test('max returns the largest value', () => assert.equal(max([3, 9, 4]), 9));
test('max handles negative numbers', () => assert.equal(max([-5, -2]), -2));
test('max returns the only value of a single-element array', () => assert.equal(max([7]), 7));
test('max rejects an empty array with a RangeError', () =>
  assert.throws(() => max([]), { name: 'RangeError', message: 'max needs at least one value' }));
