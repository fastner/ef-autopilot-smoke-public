export function sum(values) {
  return values.reduce((total, value) => total + value, 0);
}

export function max(values) {
  if (values.length === 0) {
    throw new RangeError('max needs at least one value');
  }
  return values.reduce((largest, value) => (value > largest ? value : largest));
}
