import { Input as ChakraInput, InputProps as ChakraInputProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface InputProps extends ChakraInputProps {
  variant?: 'outline' | 'subtle' | 'flushed'
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant = 'outline', size = 'md', colorPalette = 'gray', ...props }, ref) => {
    return (
      <ChakraInput
        ref={ref}
        variant={variant}
        size={size}
        colorPalette={colorPalette}
        {...props}
      />
    )
  }
)

Input.displayName = 'Input'