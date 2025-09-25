import { apiClient } from './client'
import { 
  Opportunity, 
  OpportunityFormData, 
  PaginatedResponse,
  FilterOptions 
} from '../types'

export const opportunitiesApi = {
  // Get all opportunities with optional filtering and pagination
  getAll: async (params?: {
    page?: number
    page_size?: number
    search?: string
    type?: string
    deadline_start?: string
    deadline_end?: string
  }): Promise<PaginatedResponse<Opportunity>> => {
    const response = await apiClient.get('/opportunities/', { params })
    return response.data
  },

  // Get single opportunity by ID
  getById: async (id: number): Promise<Opportunity> => {
    const response = await apiClient.get(`/opportunities/${id}/`)
    return response.data
  },

  // Create new opportunity
  create: async (data: OpportunityFormData): Promise<Opportunity> => {
    const response = await apiClient.post('/opportunities/', data)
    return response.data
  },

  // Update existing opportunity
  update: async (id: number, data: Partial<OpportunityFormData>): Promise<Opportunity> => {
    const response = await apiClient.put(`/opportunities/${id}/`, data)
    return response.data
  },

  // Delete opportunity
  delete: async (id: number): Promise<void> => {
    await apiClient.delete(`/opportunities/${id}/`)
  },

  // Get opportunities with upcoming deadlines (for dashboard)
  getUpcoming: async (days: number = 7): Promise<Opportunity[]> => {
    const endDate = new Date()
    endDate.setDate(endDate.getDate() + days)
    
    const params = {
      deadline_end: endDate.toISOString().split('T')[0],
      ordering: 'deadline'
    }
    
    const response = await apiClient.get('/opportunities/', { params })
    return response.data.results || response.data
  },

  // Get recent opportunities (for dashboard)
  getRecent: async (limit: number = 5): Promise<Opportunity[]> => {
    const params = {
      page_size: limit,
      ordering: '-created_at'
    }
    
    const response = await apiClient.get('/opportunities/', { params })
    return response.data.results || response.data
  }
}