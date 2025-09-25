import { 
  Box, 
  Container, 
  Flex, 
  HStack
} from '@chakra-ui/react'
import { useColorMode } from '../ui/color-mode'
import { Link, useLocation } from 'react-router-dom'
import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'

const navItems = [
  { label: 'Dashboard', path: '/' },
  { label: 'Opportunities', path: '/opportunities' },
  { label: 'Profile', path: '/profile' },
  { label: 'Settings', path: '/settings' }
]

export default function Header() {
  const location = useLocation()
  const { colorMode, toggleColorMode } = useColorMode()

  return (
    <Box as="header" bg="bg.surface" borderBottomWidth="1px" borderColor="border.muted">
      <Container maxW="7xl">
        <Flex align="center" justify="space-between" py={4}>
          {/* Logo */}
          <Link to="/">
            <Heading size="lg" color="blue.500">
              OpportunityHub
            </Heading>
          </Link>

          {/* Navigation */}
          <HStack gap={1} display={{ base: 'none', md: 'flex' }}>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  as={Link}
                  to={item.path}
                  variant={isActive ? 'subtle' : 'ghost'}
                  colorPalette={isActive ? 'blue' : 'gray'}
                  size="sm"
                >
                  {item.label}
                </Button>
              )
            })}
          </HStack>

          {/* Right side actions */}
          <HStack gap={2}>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleColorMode}
            >
              {colorMode === 'light' ? '🌙' : '☀️'}
            </Button>
            
            <Button
              as={Link}
              to="/opportunities/new"
              colorPalette="blue"
              size="sm"
            >
              Add Opportunity
            </Button>
          </HStack>
        </Flex>

        {/* Mobile Navigation */}
        <Box display={{ base: 'block', md: 'none' }} pb={4}>
          <HStack gap={1} wrap="wrap">
            {navItems.map((item) => {
              const isActive = location.pathname === item.path
              return (
                <Button
                  key={item.path}
                  as={Link}
                  to={item.path}
                  variant={isActive ? 'subtle' : 'ghost'}
                  colorPalette={isActive ? 'blue' : 'gray'}
                  size="xs"
                >
                  {item.label}
                </Button>
              )
            })}
          </HStack>
        </Box>
      </Container>
    </Box>
  )
}