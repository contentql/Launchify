import { type VariantProps, cva } from 'class-variance-authority'
import React from 'react'

import { cn } from '@/utils/cn'

import Loading from './Loading'

const buttonVariants = cva(
  'relative inline-flex items-center justify-center whitespace-nowrap rounded text-sm font-medium ring-offset-base-100 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-content hover:bg-primary/90',
        outline:
          'border border-primary bg-transparent text-primary hover:bg-primary/10',
        secondary: 'bg-secondary/20 hover:bg-secondary/10',
        link: 'text-primary underline-offset-4 hover:underline',
        destructive:
          'text-error border-error border hover:bg-danger-foreground',
      },
      size: {
        default: 'h-10 px-4',
        sm: 'h-8 rounded px-3',
        icon: 'size-8',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children: React.ReactNode
  isLoading?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, children, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}>
        <span
          className={`${isLoading ? 'invisible' : 'visible'} inline-flex items-center gap-1`}>
          {children}
        </span>

        {isLoading && (
          <div className='absolute inset-0 flex items-center justify-center'>
            <Loading className='h-8 w-8' />
          </div>
        )}
      </button>
    )
  },
)

Button.displayName = 'Button'

export default Button
