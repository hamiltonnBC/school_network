import { VStack } from '@chakra-ui/react'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'

export default function Settings() {
  return (
    <VStack align="start" gap={6} w="full">
      <Heading size="xl">Settings</Heading>
      <Text color="fg.muted">
        This page will contain application settings and preferences.
      </Text>
    </VStack>
  )
}