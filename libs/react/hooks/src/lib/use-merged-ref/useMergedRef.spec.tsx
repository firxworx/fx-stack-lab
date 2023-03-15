import React from 'react'

import { render, screen, waitFor } from '@testing-library/react'
import { useMergedRef } from '../../index'

const TEST_VALUE = 'test-value' as const

interface TestComponentProps {
  refs: React.ForwardedRef<HTMLDivElement>[]
}

/**
 * Test component that implements `React.forwardRef()` and accepts an array of refs via its `refs` prop.
 *
 * All refs are merged using the `useMergedRef()` hook and the combined ref is applied to a div element.
 */
const TestComponent = React.forwardRef<HTMLDivElement, TestComponentProps>(function TestComponent(props, forwardedRef) {
  const componentRef = React.useRef<HTMLDivElement>(null)
  const combinedRef = useMergedRef<HTMLDivElement>(...props.refs, forwardedRef, componentRef)

  return <div ref={combinedRef}>{TEST_VALUE}</div>
})

describe('useMergedRef', () => {
  it('should return a merged ref that combines the refs provided as input args', async () => {
    const testObjectRefForward = React.createRef<HTMLDivElement>()
    const testObjectRefMerged = React.createRef<HTMLDivElement>()

    let testFunctionRefValue: HTMLDivElement | null = null
    const testFunctionRef = (node: HTMLDivElement | null): void => {
      testFunctionRefValue = node
    }

    render(<TestComponent ref={testObjectRefForward} refs={[testObjectRefMerged, testFunctionRef]} />)

    // await new Promise((resolve) => setTimeout(resolve)) // not required
    const rerendered = await waitFor(() => screen.getByText(TEST_VALUE))

    expect(rerendered instanceof HTMLElement).toBe(true)
    expect(testObjectRefForward.current).not.toBeNull()
    expect(testObjectRefMerged.current).not.toBeNull()

    expect(testObjectRefForward.current instanceof HTMLDivElement).toBe(true)
    expect(testObjectRefMerged.current instanceof HTMLDivElement).toBe(true)
    expect((testFunctionRefValue ?? {}) instanceof HTMLDivElement).toBe(true)

    // const value = testObjectRefForward.current
    // console.log(value)

    // the jest default testEnvironment (jsdom) does not implement innerText because jasdom has no layout engine
    expect(testObjectRefForward.current?.textContent).toBe(TEST_VALUE)
    expect(testObjectRefMerged.current?.textContent).toBe(TEST_VALUE)
    expect(testFunctionRefValue !== null ? (testFunctionRefValue as HTMLDivElement).textContent : '').toBe(TEST_VALUE)
  })
})
