import { VStack } from '@chakra-ui/react'
import { useParams } from 'react-router-dom'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'

export default function OpportunityForm() {
  const { id } = useParams<{ id: string }>()
  const isEditing = Boolean(id)
  
  return (
    <VStack align="start" gap={6} w="full">
      <Heading size="xl">
        {isEditing ? 'Edit Opportunity' : 'Add New Opportunity'}
      </Heading>
      <Text color="fg.muted">
        This page will contain the opportunity form.
      </Text>
    </VStack>
  )
}