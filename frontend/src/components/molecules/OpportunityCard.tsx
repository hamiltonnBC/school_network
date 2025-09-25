import { Card, HStack, VStack, Flex, Spacer } from '@chakra-ui/react'
import { formatDistanceToNow, parseISO } from 'date-fns'
import { Badge } from '../atoms/Badge'
import { Button } from '../atoms/Button'
import { Heading } from '../atoms/Heading'
import { Text } from '../atoms/Text'
import { type Opportunity } from '../../types'

export interface OpportunityCardProps {
  opportunity: Opportunity
  userNotes?: string
  onView?: (id: number) => void
  onEdit?: (id: number) => void
  onDelete?: (id: number) => void
  onAddNote?: (id: number) => void
  showActions?: boolean
}

const getTypeColor = (type: Opportunity['type']) => {
  switch (type) {
    case 'Job':
      return 'blue'
    case 'Internship':
      return 'green'
    case 'Conference':
      return 'purple'
    case 'Other':
      return 'gray'
    default:
      return 'gray'
  }
}

const getDeadlineColor = (deadline: string) => {
  const deadlineDate = parseISO(deadline)
  const now = new Date()
  const daysUntil = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))
  
  if (daysUntil < 0) return 'red'
  if (daysUntil <= 3) return 'orange'
  if (daysUntil <= 7) return 'yellow'
  return 'green'
}

export function OpportunityCard({
  opportunity,
  userNotes,
  onView,
  onEdit,
  onDelete,
  onAddNote,
  showActions = true
}: OpportunityCardProps) {
  const deadlineDate = parseISO(opportunity.deadline)
  const timeUntilDeadline = formatDistanceToNow(deadlineDate, { addSuffix: true })
  const isPastDeadline = deadlineDate < new Date()

  return (
    <Card.Root size="md" variant="outline">
      <Card.Header>
        <Flex align="start" justify="space-between">
          <VStack align="start" gap={2} flex={1}>
            <Heading size="md" lineHeight="short">
              {opportunity.title}
            </Heading>
            <HStack gap={2}>
              <Badge 
                colorPalette={getTypeColor(opportunity.type)}
                variant="subtle"
              >
                {opportunity.type}
              </Badge>
              <Badge 
                colorPalette={getDeadlineColor(opportunity.deadline)}
                variant={isPastDeadline ? 'solid' : 'subtle'}
              >
                {isPastDeadline ? 'Expired' : timeUntilDeadline}
              </Badge>
            </HStack>
          </VStack>
        </Flex>
      </Card.Header>

      <Card.Body>
        <VStack align="start" gap={3}>
          {opportunity.notes && (
            <Text textStyle="sm" color="fg.muted" noOfLines={3}>
              {opportunity.notes}
            </Text>
          )}
          
          <HStack gap={4} fontSize="sm" color="fg.muted">
            {opportunity.posted_by && (
              <Text textStyle="xs">
                Posted by: {opportunity.posted_by}
              </Text>
            )}
            <Text textStyle="xs">
              Deadline: {deadlineDate.toLocaleDateString()}
            </Text>
          </HStack>

          {userNotes && (
            <VStack align="start" gap={1} p={3} bg="bg.muted" borderRadius="md" w="full">
              <Text textStyle="xs" fontWeight="semibold" color="fg.muted">
                My Notes:
              </Text>
              <Text textStyle="sm" noOfLines={2}>
                {userNotes}
              </Text>
            </VStack>
          )}
        </VStack>
      </Card.Body>

      {showActions && (
        <Card.Footer>
          <HStack gap={2} w="full">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onView?.(opportunity.id)}
            >
              View
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onAddNote?.(opportunity.id)}
            >
              {userNotes ? 'Edit Note' : 'Add Note'}
            </Button>
            
            <Spacer />
            
            <Button
              size="sm"
              variant="ghost"
              onClick={() => onEdit?.(opportunity.id)}
            >
              Edit
            </Button>
            
            <Button
              size="sm"
              variant="ghost"
              colorPalette="red"
              onClick={() => onDelete?.(opportunity.id)}
            >
              Delete
            </Button>
          </HStack>
        </Card.Footer>
      )}
    </Card.Root>
  )
}