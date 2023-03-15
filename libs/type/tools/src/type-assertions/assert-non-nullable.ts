/**
 * Generic type assertion function asserts the given input is not `null` and not `undefined`;
 * in other words, that it is _non-nullable_ or _not nullish_.
 */
export function assertNonNullable<T>(input: T, errorMessage?: string): asserts input is NonNullable<T> {
  if (input === null || input === undefined) {
    throw Error(errorMessage ?? 'NonNullable assertion error: input value is not defined')
  }
}

/**
 * Return the given input value after asserting that it is defined (non-nullable).
 *
 * @throws Error if the input value is `null` or `undefined`.
 */
export function getAssertNonNullableValue<T>(input: T, errorMessage?: string): NonNullable<T> {
  assertNonNullable(input, errorMessage)

  return input
}
