import clsx from 'clsx'
import React from 'react'

export interface BouncyLoaderProps {
  variant?: 'lighter' | 'darker'
  appendClassName?: string
}

// @future idea for delayed loader/spinner e.g. 500ms -- isDelayed?: boolean

/**
 * Animated loader (spinner) component that renders three bouncing circles of varying opacity.
 *
 * Refer to tailwind-preset for definitions of the 'bouncy-opacity' animation and the animation-delay
 * custom utilities.
 */
export const BouncyLoader: React.FC<BouncyLoaderProps> = React.memo(function BouncyLoader({
  variant,
  appendClassName,
}) {
  const ballClassName = clsx('w-2 h-2 rounded-full animate-bouncy-opacity', {
    'bg-P-neutral-300': variant === 'lighter',
    'bg-P-neutral-500': variant === 'darker',
  })

  return (
    <div className="flex justify-center space-x-1.5">
      <span className={clsx(ballClassName, appendClassName)} />
      <span className={clsx(ballClassName, 'animation-delay-200', appendClassName)} />
      <span className={clsx(ballClassName, 'animation-delay-400', appendClassName)} />
    </div>
  )
})

BouncyLoader.defaultProps = {
  variant: 'lighter',
}
