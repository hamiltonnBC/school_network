// Export all API functions
export { apiClient } from './client'
export { opportunitiesApi } from './opportunities'
export { usersApi } from './users'

// Re-export types for convenience
export type {
  Opportunity,
  UserProfile,
  UserOpportunityNotes,
  OpportunityFormData,
  UserProfileFormData,
  FilterOptions,
  PaginatedResponse,
  ApiResponse
} from '../types'