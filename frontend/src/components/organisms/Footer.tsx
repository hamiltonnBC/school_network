import { Box, Container, HStack, Spacer } from '@chakra-ui/react'
import { Text } from '../atoms/Text'

export default function Footer() {
  return (
    <Box as="footer" bg="bg.muted" borderTopWidth="1px" borderColor="border.muted">
      <Container maxW="7xl">
        <HStack py={6}>
          <Text textStyle="sm" color="fg.muted">
            © 2025 Opportunities Alert System
          </Text>
          <Spacer />
          <Text textStyle="sm" color="fg.muted">
            Built with React + Chakra UI
          </Text>
        </HStack>
      </Container>
    </Box>
  )
}