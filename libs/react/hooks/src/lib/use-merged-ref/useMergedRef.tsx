import React from 'react'

/**
 * React hook that merges multiple refs into one. Returns the merged ref when given >1 refs as arguments.
 *
 * Useful for implementing components that combine components from multiple libraries that require refs
 * to be set, e.g. react-hook-form + headlessui/react.
 *
 * Based on code from the MIT-licensed `react-hook` package: <https://github.com/jaredLunde/react-hook>
 */
export function useMergedRef<T>(...refs: (React.Ref<T> | undefined)[]): React.RefCallback<T> {
  return React.useCallback(
    (element: T) => {
      for (const ref of refs) {
        if (typeof ref === 'function') {
          ref(element)
        }

        if (ref && typeof ref === 'object') {
          ;(ref as React.MutableRefObject<T>).current = element
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    refs,
  )
}
