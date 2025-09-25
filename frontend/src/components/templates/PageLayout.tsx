import { Box, Container, Flex } from '@chakra-ui/react'
import { ReactNode } from 'react'
import Header from '../organisms/Header'
import Footer from '../organisms/Footer'

export interface PageLayoutProps {
  children: ReactNode
  maxWidth?: string
  showHeader?: boolean
  showFooter?: boolean
}

export default function PageLayout({
  children,
  maxWidth = '7xl',
  showHeader = true,
  showFooter = true
}: PageLayoutProps) {
  return (
    <Flex direction="column" minH="100vh">
      {showHeader && <Header />}
      
      <Box as="main" flex={1} py={8}>
        <Container maxW={maxWidth}>
          {children}
        </Container>
      </Box>
      
      {showFooter && <Footer />}
    </Flex>
  )
}