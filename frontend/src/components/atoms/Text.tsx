import { Text as ChakraText, TextProps as ChakraTextProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface TextProps extends ChakraTextProps {
  textStyle?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | 'label'
  as?: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Text = forwardRef<HTMLElement, TextProps>(
  ({ children, textStyle = 'md', as = 'p', ...props }, ref) => {
    return (
      <ChakraText
        ref={ref}
        textStyle={textStyle}
        as={as}
        {...props}
      >
        {children}
      </ChakraText>
    )
  }
)

Text.displayName = 'Text'