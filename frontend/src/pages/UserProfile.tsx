import { VStack } from '@chakra-ui/react'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'

export default function UserProfile() {
  return (
    <VStack align="start" gap={6} w="full">
      <Heading size="xl">My Profile</Heading>
      <Text color="fg.muted">
        This page will show user profile and notification preferences.
      </Text>
    </VStack>
  )
}