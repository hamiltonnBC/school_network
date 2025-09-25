import { useState, useEffect } from 'react'
import {
  VStack,
  HStack,
  Box,
  SimpleGrid,
  Spinner,
  Separator
} from '@chakra-ui/react'
import { Alert } from '@chakra-ui/react'
import { Field } from '@chakra-ui/react'
import { NativeSelect } from '@chakra-ui/react'
import { Switch } from '@chakra-ui/react'
import { Heading } from '../components/atoms/Heading'
import { Text } from '../components/atoms/Text'
import { Button } from '../components/atoms/Button'
import { Input } from '../components/atoms/Input'
import { useUserProfile } from '../hooks/useUserProfile'
import { UserProfileFormData } from '../types'
import { NOTIFICATION_METHODS, OPPORTUNITY_TYPES, DEFAULT_ALERT_PREFERENCES } from '../utils/constants'

export default function UserProfile() {
  const { profile, loading, error, updateProfile, currentUsername } = useUserProfile()
  const [formData, setFormData] = useState<UserProfileFormData>({
    username: currentUsername,
    email: '',
    preferences: '',
    enable_notifications: true,
    notification_method: 'email',
    slack_user_id: '',
    alert_time: DEFAULT_ALERT_PREFERENCES.alert_time,
    alert_days_ahead: DEFAULT_ALERT_PREFERENCES.alert_days_ahead,
    alert_types_list: DEFAULT_ALERT_PREFERENCES.alert_types_list
  })
  const [saving, setSaving] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [saveSuccess, setSaveSuccess] = useState(false)

  // Update form data when profile loads
  useEffect(() => {
    if (profile) {
      setFormData({
        username: profile.username,
        email: profile.email || '',
        preferences: profile.preferences,
        enable_notifications: profile.enable_notifications,
        notification_method: profile.notification_method,
        slack_user_id: profile.slack_user_id || '',
        alert_time: profile.alert_time,
        alert_days_ahead: profile.alert_days_ahead,
        alert_types_list: profile.alert_types_list || DEFAULT_ALERT_PREFERENCES.alert_types_list
      })
    }
  }, [profile])

  const handleInputChange = (field: keyof UserProfileFormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
    // Clear success message when user starts editing
    if (saveSuccess) setSaveSuccess(false)
  }

  const handleAlertTypeToggle = (type: string, checked: boolean) => {
    const currentTypes = formData.alert_types_list
    let newTypes: string[]

    if (checked) {
      newTypes = [...currentTypes, type]
    } else {
      newTypes = currentTypes.filter(t => t !== type)
    }

    handleInputChange('alert_types_list', newTypes)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaveError(null)
    setSaveSuccess(false)

    try {
      await updateProfile(formData)
      setSaveSuccess(true)
      // Clear success message after 3 seconds
      setTimeout(() => setSaveSuccess(false), 3000)
    } catch (err: any) {
      setSaveError(err.message || 'Failed to save profile')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <VStack align="center" justify="center" minH="400px" gap={4}>
        <Spinner size="lg" colorPalette="blue" />
        <Text color="fg.muted">Loading your profile...</Text>
      </VStack>
    )
  }

  return (
    <VStack align="start" gap={8} w="full" maxW="4xl" mx="auto">
      {/* Header */}
      <Box>
        <Heading size="2xl" mb={2}>
          Profile Settings
        </Heading>
        <Text textStyle="lg" color="fg.muted">
          Manage your notification preferences and account settings
        </Text>
      </Box>

      {/* Error Alert */}
      {error && (
        <Alert.Root status="error" w="full">
          <Alert.Icon />
          <Alert.Title>Error loading profile</Alert.Title>
          <Alert.Description>{error}</Alert.Description>
        </Alert.Root>
      )}

      {/* Save Error Alert */}
      {saveError && (
        <Alert.Root status="error" w="full">
          <Alert.Icon />
          <Alert.Title>Error saving profile</Alert.Title>
          <Alert.Description>{saveError}</Alert.Description>
        </Alert.Root>
      )}

      {/* Success Alert */}
      {saveSuccess && (
        <Alert.Root status="success" w="full">
          <Alert.Icon />
          <Alert.Title>Profile saved successfully!</Alert.Title>
          <Alert.Description>Your notification preferences have been updated.</Alert.Description>
        </Alert.Root>
      )}

      {/* Profile Form */}
      <Box as="form" onSubmit={handleSubmit} w="full">
        <VStack gap={8} align="start">
          {/* Basic Information */}
          <Box w="full">
            <Heading size="lg" mb={4}>
              Basic Information
            </Heading>
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4}>
              <Field.Root>
                <Field.Label>Username</Field.Label>
                <Input
                  value={formData.username}
                  disabled
                  bg="bg.muted"
                />
                <Field.HelperText>
                  Username cannot be changed
                </Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label>Email Address</Field.Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder="your.email@example.com"
                />
                <Field.HelperText>
                  Required for email notifications
                </Field.HelperText>
              </Field.Root>
            </SimpleGrid>

            <Field.Root mt={4}>
              <Field.Label>Preferences & Notes</Field.Label>
              <textarea
                value={formData.preferences}
                onChange={(e) => handleInputChange('preferences', e.target.value)}
                placeholder="Add any personal notes or preferences about opportunities..."
                rows={3}
                style={{
                  width: '100%',
                  padding: '12px',
                  borderRadius: '8px',
                  border: '1px solid',
                  borderColor: 'var(--chakra-colors-border-default)',
                  backgroundColor: 'var(--chakra-colors-bg-default)',
                  color: 'var(--chakra-colors-fg-default)',
                  fontSize: '14px',
                  fontFamily: 'inherit',
                  resize: 'vertical',
                  outline: 'none'
                }}
              />
              <Field.HelperText>
                Optional personal notes about your opportunity preferences
              </Field.HelperText>
            </Field.Root>
          </Box>

          <Separator />

          {/* Notification Settings */}
          <Box w="full">
            <Heading size="lg" mb={4}>
              Notification Settings
            </Heading>

            {/* Enable Notifications Toggle */}
            <Field.Root mb={6}>
              <HStack justify="space-between" align="center">
                <Box>
                  <Field.Label mb={1}>Enable Notifications</Field.Label>
                  <Text textStyle="sm" color="fg.muted">
                    Receive alerts about upcoming opportunity deadlines
                  </Text>
                </Box>
                <Switch.Root
                  checked={formData.enable_notifications}
                  onCheckedChange={(e) => handleInputChange('enable_notifications', e.checked)}
                  colorPalette="blue"
                >
                  <Switch.HiddenInput />
                  <Switch.Control>
                    <Switch.Thumb />
                  </Switch.Control>
                </Switch.Root>
              </HStack>
            </Field.Root>

            {/* Notification Method */}
            <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mb={6}>
              <Field.Root>
                <Field.Label>Notification Method</Field.Label>
                <NativeSelect.Root disabled={!formData.enable_notifications}>
                  <NativeSelect.Field
                    placeholder="Select method"
                    value={formData.notification_method}
                    onChange={(e) => handleInputChange('notification_method', e.target.value)}
                  >
                    {NOTIFICATION_METHODS.map((method) => (
                      <option key={method.value} value={method.value}>
                        {method.label}
                      </option>
                    ))}
                  </NativeSelect.Field>
                  <NativeSelect.Indicator />
                </NativeSelect.Root>
                <Field.HelperText>
                  How you'd like to receive notifications
                </Field.HelperText>
              </Field.Root>

              <Field.Root>
                <Field.Label>Alert Time</Field.Label>
                <Input
                  type="time"
                  value={formData.alert_time}
                  onChange={(e) => handleInputChange('alert_time', e.target.value)}
                  disabled={!formData.enable_notifications}
                />
                <Field.HelperText>
                  What time to send daily alerts
                </Field.HelperText>
              </Field.Root>
            </SimpleGrid>

            {/* Slack User ID (if slack is selected) */}
            {formData.notification_method === 'slack' && (
              <Field.Root mb={6}>
                <Field.Label>Slack User ID</Field.Label>
                <Input
                  value={formData.slack_user_id}
                  onChange={(e) => handleInputChange('slack_user_id', e.target.value)}
                  placeholder="U1234567890"
                  disabled={!formData.enable_notifications}
                />
                <Field.HelperText>
                  Your Slack user ID for direct messages (coming soon)
                </Field.HelperText>
              </Field.Root>
            )}

            {/* Alert Timing */}
            <Field.Root mb={6}>
              <Field.Label>Days Ahead to Alert</Field.Label>
              <Input
                type="number"
                min="1"
                max="30"
                value={formData.alert_days_ahead}
                onChange={(e) => handleInputChange('alert_days_ahead', parseInt(e.target.value) || 1)}
                disabled={!formData.enable_notifications}
              />
              <Field.HelperText>
                How many days before a deadline to send alerts (1-30 days)
              </Field.HelperText>
            </Field.Root>

            {/* Alert Types */}
            <Field.Root>
              <Field.Label mb={3}>Alert Types</Field.Label>
              <Text textStyle="sm" color="fg.muted" mb={4}>
                Choose which types of opportunities you want to be alerted about
              </Text>
              <SimpleGrid columns={{ base: 1, sm: 2 }} gap={3}>
                {OPPORTUNITY_TYPES.map((type) => (
                  <HStack key={type.value} justify="space-between" align="center" p={3} bg="bg.subtle" borderRadius="md">
                    <HStack gap={2}>
                      <Box
                        w={3}
                        h={3}
                        borderRadius="full"
                        bg={`${type.color}.500`}
                      />
                      <Text>{type.label}</Text>
                    </HStack>
                    <Switch.Root
                      checked={formData.alert_types_list.includes(type.value)}
                      onCheckedChange={(e) => handleAlertTypeToggle(type.value, e.checked)}
                      disabled={!formData.enable_notifications}
                      size="sm"
                      colorPalette={type.color as any}
                    >
                      <Switch.HiddenInput />
                      <Switch.Control>
                        <Switch.Thumb />
                      </Switch.Control>
                    </Switch.Root>
                  </HStack>
                ))}
              </SimpleGrid>
              <Field.HelperText mt={2}>
                You must select at least one type to receive notifications
              </Field.HelperText>
            </Field.Root>
          </Box>

          {/* Save Button */}
          <HStack justify="end" w="full" pt={4}>
            <Button
              type="submit"
              colorPalette="blue"
              loading={saving}
              disabled={formData.enable_notifications && formData.alert_types_list.length === 0}
            >
              {saving ? 'Saving...' : 'Save Profile'}
            </Button>
          </HStack>
        </VStack>
      </Box>
    </VStack>
  )
}