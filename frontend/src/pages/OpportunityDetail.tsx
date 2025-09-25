import { VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'

export default function OpportunityDetail() {
  const { id } = useParams<{ id: string }>()
  
  return (
    <VStack align="start" gap={6} w="full">
      <Heading size="xl">Opportunity Details</Heading>
      <Text color="fg.muted">
        This page will show details for opportunity ID: {id}
      </Text>
    </VStack>
  )
}