export function assertNumber(input: unknown, errorMessage?: string): asserts input is number {
  if (typeof input !== 'number') {
    throw Error(errorMessage ?? `Assertion error: value not a number (${input})`)
  }
}

export function assertFinite(input: unknown, errorMessage?: string): asserts input is number {
  if (typeof input !== 'number') {
    throw Error(errorMessage ?? `Assertion error: value not a number (${input})`)
  }

  if (!Number.isFinite(input)) {
    throw Error(errorMessage ?? `Assertion error: value not a finite number (${input})`)
  }
}

export function assertString(input: unknown, errorMessage?: string): asserts input is string {
  if (typeof input !== 'string') {
    throw Error(errorMessage ?? `Assertion error: value not a string (${input})`)
  }
}

export function assertBoolean(input: unknown, errorMessage?: string): asserts input is boolean {
  if (typeof input !== 'boolean') {
    throw Error(errorMessage ?? `Assertion error: value not a boolean (${input})`)
  }
}

export function getAssertNumberValue<T>(input: T, errorMessage?: string): number {
  assertNumber(input, errorMessage)
  return input
}

export function getAssertFiniteValue<T>(input: T, errorMessage?: string): number {
  assertFinite(input, errorMessage)
  return input
}

export function getAssertStringValue<T>(input: T, errorMessage?: string): string {
  assertString(input, errorMessage)
  return input
}

export function getAssertBooleanValue<T>(input: T, errorMessage?: string): boolean {
  assertBoolean(input, errorMessage)
  return input
}
