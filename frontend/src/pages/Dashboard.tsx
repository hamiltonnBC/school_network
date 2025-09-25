import { VStack, SimpleGrid, Box, HStack, Spinner, Alert } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'
import { Button } from '../components/atoms/Button'
import { OpportunityCard } from '../components/molecules/OpportunityCard'
import { useUpcomingOpportunities } from '../hooks/useOpportunities'
import { useUserProfile } from '../hooks/useUserProfile'

export default function Dashboard() {
  const { opportunities: upcomingOpportunities, loading: upcomingLoading, error: upcomingError } = useUpcomingOpportunities(7)
  const { profile, loading: profileLoading } = useUserProfile()

  return (
    <VStack align="start" gap={8} w="full">
      {/* Hero Section */}
      <Box>
        <Heading size="2xl" mb={4}>
          Welcome to OpportunityHub
          {profile && (
            <Text as="span" color="blue.500" ml={2}>
              {profile.username}
            </Text>
          )}
        </Heading>
        <Text textStyle="lg" color="fg.muted" maxW="2xl">
          Stay on top of deadlines and never miss an opportunity. 
          Manage your applications, set personalized alerts, and track your progress.
        </Text>
      </Box>

      {/* Quick Actions */}
      <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} gap={4} w="full">
        <Box p={6} bg="bg.surface" borderRadius="lg" borderWidth="1px">
          <Heading size="md" mb={2}>
            Add Opportunity
          </Heading>
          <Text textStyle="sm" color="fg.muted" mb={4}>
            Create a new opportunity with deadline tracking
          </Text>
          <Button as={Link} to="/opportunities/new" colorPalette="blue" size="sm">
            Get Started
          </Button>
        </Box>

        <Box p={6} bg="bg.surface" borderRadius="lg" borderWidth="1px">
          <Heading size="md" mb={2}>
            Browse All
          </Heading>
          <Text textStyle="sm" color="fg.muted" mb={4}>
            View and search through all opportunities
          </Text>
          <Button as={Link} to="/opportunities" variant="outline" size="sm">
            Browse
          </Button>
        </Box>

        <Box p={6} bg="bg.surface" borderRadius="lg" borderWidth="1px">
          <Heading size="md" mb={2}>
            My Profile
          </Heading>
          <Text textStyle="sm" color="fg.muted" mb={4}>
            Manage your notification preferences
          </Text>
          <Button as={Link} to="/profile" variant="outline" size="sm">
            Settings
          </Button>
        </Box>

        <Box p={6} bg="bg.surface" borderRadius="lg" borderWidth="1px">
          <Heading size="md" mb={2}>
            Notifications
          </Heading>
          <Text textStyle="sm" color="fg.muted" mb={4}>
            {profile?.enable_notifications ? 'Enabled' : 'Disabled'}
            {profile?.alert_time && ` at ${profile.alert_time}`}
          </Text>
          <Button as={Link} to="/profile" variant="ghost" size="sm">
            Configure
          </Button>
        </Box>
      </SimpleGrid>

      {/* Upcoming Deadlines Section */}
      <Box w="full">
        <HStack justify="space-between" align="center" mb={4}>
          <Heading size="lg">
            Upcoming Deadlines
          </Heading>
          <Button as={Link} to="/opportunities" variant="outline" size="sm">
            View All
          </Button>
        </HStack>

        {upcomingLoading ? (
          <Box p={8} bg="bg.surface" borderRadius="lg" borderWidth="1px" textAlign="center">
            <Spinner size="lg" colorPalette="blue" />
            <Text mt={4} color="fg.muted">Loading upcoming opportunities...</Text>
          </Box>
        ) : upcomingError ? (
          <Alert.Root status="error">
            <Alert.Icon />
            <Alert.Title>Error loading opportunities</Alert.Title>
            <Alert.Description>{upcomingError}</Alert.Description>
          </Alert.Root>
        ) : upcomingOpportunities.length > 0 ? (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={4} w="full">
            {upcomingOpportunities.slice(0, 6).map((opportunity) => (
              <OpportunityCard
                key={opportunity.id}
                opportunity={opportunity}
                onView={(id) => window.location.href = `/opportunities/${id}`}
                showActions={false}
              />
            ))}
          </SimpleGrid>
        ) : (
          <Box p={8} bg="bg.surface" borderRadius="lg" borderWidth="1px" textAlign="center">
            <Text color="fg.muted">
              No opportunities with upcoming deadlines. 
              <Button as={Link} to="/opportunities/new" variant="plain" colorPalette="blue" ml={1}>
                Add your first opportunity
              </Button>
            </Text>
          </Box>
        )}
      </Box>
    </VStack>
  )
}