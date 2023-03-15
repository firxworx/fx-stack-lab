/**
 * Generic type assertion function asserts the given input is not `null` and not `undefined`;
 * in other words, that it is _non-nullable_ or _not nullish_.
 */
export function assertNumberArray(input: unknown, errorMessage?: string): asserts input is number[] {
  if (!(Array.isArray(input) && input.every((item) => typeof item === 'number'))) {
    throw new Error(errorMessage ?? 'Assertion error: input is not an array of numbers')
  }
}
