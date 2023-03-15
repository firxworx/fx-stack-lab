import { assertNonNullable } from './assert-non-nullable'

// pnpm nx test common-type-tools -t assertNonNullable

describe('assertNonNullable', () => {
  it('throws on null', () => {
    const value = null
    expect(() => assertNonNullable(value)).toThrow()
  })

  it('throws on undefined', () => {
    const value = undefined
    expect(() => assertNonNullable(value)).toThrow()
  })

  it('does not throw on falsey values', () => {
    const emptyString = ''
    const zero = 0
    const bool = false

    expect(() => assertNonNullable(emptyString)).not.toThrow()
    expect(() => assertNonNullable(zero)).not.toThrow()
    expect(() => assertNonNullable(bool)).not.toThrow()
  })

  it('does not throw on various nontrivial values', () => {
    const func = (): string => 'hello'
    const num = 100
    const str = 'hey there'
    const obj = {}
    const arr: string[] = []

    expect(() => assertNonNullable(func)).not.toThrow()
    expect(() => assertNonNullable(num)).not.toThrow()
    expect(() => assertNonNullable(str)).not.toThrow()
    expect(() => assertNonNullable(obj)).not.toThrow()
    expect(() => assertNonNullable(arr)).not.toThrow()
  })
})
