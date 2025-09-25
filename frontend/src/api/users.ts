import { apiClient } from './client'
import { 
  UserProfile, 
  UserProfileFormData, 
  UserOpportunityNotes 
} from '../types'

export const usersApi = {
  // Get all user profiles
  getProfiles: async (): Promise<UserProfile[]> => {
    const response = await apiClient.get('/users/profiles/')
    return response.data.results || response.data
  },

  // Get user profile by username
  getProfile: async (username: string): Promise<UserProfile> => {
    const response = await apiClient.get(`/users/profiles/${username}/`)
    return response.data
  },

  // Create or update user profile
  createOrUpdateProfile: async (data: UserProfileFormData): Promise<UserProfile> => {
    try {
      // Try to update existing profile first
      const response = await apiClient.put(`/users/profiles/${data.username}/`, data)
      return response.data
    } catch (error: any) {
      if (error.response?.status === 404) {
        // Profile doesn't exist, create new one
        const response = await apiClient.post('/users/profiles/', data)
        return response.data
      }
      throw error
    }
  },

  // Get user's notes on opportunities
  getUserNotes: async (username: string): Promise<UserOpportunityNotes[]> => {
    const response = await apiClient.get('/users/notes/', {
      params: { user_profile: username }
    })
    return response.data.results || response.data
  },

  // Get user's note for specific opportunity
  getUserNoteForOpportunity: async (username: string, opportunityId: number): Promise<UserOpportunityNotes | null> => {
    try {
      const response = await apiClient.get('/users/notes/', {
        params: { 
          user_profile: username,
          opportunity: opportunityId 
        }
      })
      const notes = response.data.results || response.data
      return notes.length > 0 ? notes[0] : null
    } catch (error) {
      return null
    }
  },

  // Create or update user's note for opportunity
  createOrUpdateNote: async (data: {
    user_profile: string
    opportunity: number
    notes: string
  }): Promise<UserOpportunityNotes> => {
    try {
      // Try to find existing note
      const existing = await usersApi.getUserNoteForOpportunity(data.user_profile, data.opportunity)
      
      if (existing) {
        // Update existing note
        const response = await apiClient.put(`/users/notes/${existing.user_profile}_${existing.opportunity}/`, data)
        return response.data
      } else {
        // Create new note
        const response = await apiClient.post('/users/notes/', data)
        return response.data
      }
    } catch (error) {
      // Fallback to POST if PUT fails
      const response = await apiClient.post('/users/notes/', data)
      return response.data
    }
  },

  // Delete user's note for opportunity
  deleteNote: async (username: string, opportunityId: number): Promise<void> => {
    await apiClient.delete(`/users/notes/${username}_${opportunityId}/`)
  }
}