import { useState, useEffect } from 'react'
import { opportunitiesApi } from '../api/opportunities'
import { Opportunity, FilterOptions } from '../types'

export function useOpportunities(filters?: FilterOptions) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [totalCount, setTotalCount] = useState(0)

  const fetchOpportunities = async () => {
    try {
      setLoading(true)
      setError(null)
      
      const params = {
        search: filters?.search,
        type: filters?.type,
        deadline_start: filters?.deadlineStart,
        deadline_end: filters?.deadlineEnd,
      }

      const response = await opportunitiesApi.getAll(params)
      
      if ('results' in response) {
        // Paginated response
        setOpportunities(response.results)
        setTotalCount(response.count)
      } else {
        // Direct array response
        setOpportunities(response as any)
        setTotalCount((response as any).length)
      }
    } catch (err: any) {
      setError(err.message || 'Failed to fetch opportunities')
      setOpportunities([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOpportunities()
  }, [filters?.search, filters?.type, filters?.deadlineStart, filters?.deadlineEnd])

  const refetch = () => {
    fetchOpportunities()
  }

  return {
    opportunities,
    loading,
    error,
    totalCount,
    refetch
  }
}

export function useOpportunity(id: number) {
  const [opportunity, setOpportunity] = useState<Opportunity | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await opportunitiesApi.getById(id)
        setOpportunity(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch opportunity')
        setOpportunity(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOpportunity()
    }
  }, [id])

  return { opportunity, loading, error }
}

export function useUpcomingOpportunities(days: number = 7) {
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchUpcoming = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await opportunitiesApi.getUpcoming(days)
        setOpportunities(data)
      } catch (err: any) {
        setError(err.message || 'Failed to fetch upcoming opportunities')
        setOpportunities([])
      } finally {
        setLoading(false)
      }
    }

    fetchUpcoming()
  }, [days])

  return { opportunities, loading, error }
}