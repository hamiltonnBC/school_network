import { Button as ChakraButton, ButtonProps as ChakraButtonProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface ButtonProps extends ChakraButtonProps {
  variant?: 'solid' | 'subtle' | 'surface' | 'outline' | 'ghost' | 'plain'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
  loading?: boolean
  loadingText?: string
  as?: any // Allow any component to be passed as 'as' prop
  to?: string // Allow 'to' prop for Link components
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, variant = 'solid', size = 'md', colorPalette = 'blue', ...props }, ref) => {
    return (
      <ChakraButton
        ref={ref}
        variant={variant}
        size={size}
        colorPalette={colorPalette}
        {...props}
      >
        {children}
      </ChakraButton>
    )
  }
)

Button.displayName = 'Button'