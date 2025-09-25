import { Heading as ChakraHeading, HeadingProps as ChakraHeadingProps } from '@chakra-ui/react'
import { forwardRef } from 'react'

export interface HeadingProps extends ChakraHeadingProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl'
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  colorPalette?: 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'teal' | 'blue' | 'cyan' | 'purple' | 'pink'
}

export const Heading = forwardRef<HTMLHeadingElement, HeadingProps>(
  ({ children, size = 'xl', as = 'h2', colorPalette = 'gray', ...props }, ref) => {
    return (
      <ChakraHeading
        ref={ref}
        size={size}
        as={as}
        colorPalette={colorPalette}
        {...props}
      >
        {children}
      </ChakraHeading>
    )
  }
)

Heading.displayName = 'Heading'