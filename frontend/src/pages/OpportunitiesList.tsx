import { VStack } from '@chakra-ui/react'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'

export default function OpportunitiesList() {
  return (
    <VStack align="start" gap={6} w="full">
      <Heading size="xl">All Opportunities</Heading>
      <Text color="fg.muted">
        This page will show a filterable list of all opportunities.
      </Text>
    </VStack>
  )
}