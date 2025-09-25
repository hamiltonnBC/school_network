import { Badge as ChakraBadge, BadgeProps as ChakraBadgeProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface BadgeProps extends ChakraBadgeProps {
  variant?: 'solid' | 'subtle' | 'outline' | 'surface' | 'plain'
  size?: 'xs' | 'sm' | 'md' | 'lg'
  colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
}

export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
  ({ children, variant = 'subtle', size = 'sm', colorPalette = 'gray', ...props }, ref) => {
    return (
      <ChakraBadge
        ref={ref}
        variant={variant}
        size={size}
        colorPalette={colorPalette}
        {...props}
      >
        {children}
      </ChakraBadge>
    )
  }
)

Badge.displayName = 'Badge'