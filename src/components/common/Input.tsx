import * as React from 'react'

import { cn } from '@/utils/cn'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          ' file:text-accent-content focus-visible:ring-offset-primary-focus border-none bg-base-200 text-base-content placeholder:text-base-content/80 focus-visible:ring-1 focus-visible:ring-primary focus-visible:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50',
          'flex h-10 w-full rounded-md border px-3 py-2 text-sm file:text-sm file:font-medium focus-visible:outline-none',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  },
)
Input.displayName = 'Input'

export default Input
