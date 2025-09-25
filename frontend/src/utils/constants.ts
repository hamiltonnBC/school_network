import { Opportunity } from '../types'

// Opportunity types with display labels and colors
export const OPPORTUNITY_TYPES: Array<{
  value: Opportunity['type']
  label: string
  color: string
}> = [
  { value: 'Job', label: 'Job', color: 'blue' },
  { value: 'Internship', label: 'Internship', color: 'green' },
  { value: 'Conference', label: 'Conference', color: 'purple' },
  { value: 'Other', label: 'Other', color: 'gray' }
]

// Notification methods
export const NOTIFICATION_METHODS = [
  { value: 'email', label: 'Email' },
  { value: 'slack', label: 'Slack (Coming Soon)' },
  { value: 'none', label: 'No Notifications' }
] as const

// Default alert preferences
export const DEFAULT_ALERT_PREFERENCES = {
  alert_time: '07:00',
  alert_days_ahead: 7,
  alert_types_list: ['Job', 'Internship', 'Conference', 'Other']
}

// Form validation messages
export const VALIDATION_MESSAGES = {
  required: 'This field is required',
  email: 'Please enter a valid email address',
  minLength: (min: number) => `Must be at least ${min} characters`,
  maxLength: (max: number) => `Must be no more than ${max} characters`,
  futureDate: 'Date must be in the future',
  invalidDate: 'Please enter a valid date'
}

// API endpoints (for reference)
export const API_ENDPOINTS = {
  opportunities: '/opportunities/',
  userProfiles: '/users/profiles/',
  userNotes: '/users/notes/'
} as const

// Pagination defaults
export const PAGINATION_DEFAULTS = {
  pageSize: 12,
  maxPageSize: 50
}

// Search and filter defaults
export const FILTER_DEFAULTS = {
  debounceMs: 300,
  minSearchLength: 2
}

// UI constants
export const UI_CONSTANTS = {
  maxCardTitleLength: 60,
  maxCardDescriptionLength: 150,
  maxNotePreviewLength: 100
}