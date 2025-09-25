import { useState, useEffect } from 'react'
import { usersApi } from '../api/users'
import { UserProfile, UserProfileFormData } from '../types'

// For now, we'll use a hardcoded username. In a real app, this would come from auth context
const CURRENT_USER = 'nicholas_user' // This matches the user in the backend

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchProfile = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usersApi.getProfile(CURRENT_USER)
      setProfile(data)
    } catch (err: any) {
      if (err.response?.status === 404) {
        // Profile doesn't exist yet, that's okay
        setProfile(null)
        setError(null)
      } else {
        setError(err.message || 'Failed to fetch user profile')
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const updateProfile = async (data: UserProfileFormData): Promise<UserProfile> => {
    try {
      setError(null)
      const updatedProfile = await usersApi.createOrUpdateProfile({
        ...data,
        username: CURRENT_USER // Ensure we use the current user
      })
      setProfile(updatedProfile)
      return updatedProfile
    } catch (err: any) {
      setError(err.message || 'Failed to update profile')
      throw err
    }
  }

  return {
    profile,
    loading,
    error,
    updateProfile,
    refetch: fetchProfile,
    currentUsername: CURRENT_USER
  }
}

export function useUserNotes() {
  const [notes, setNotes] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchNotes = async () => {
    try {
      setLoading(true)
      setError(null)
      const data = await usersApi.getUserNotes(CURRENT_USER)
      setNotes(data)
    } catch (err: any) {
      setError(err.message || 'Failed to fetch user notes')
      setNotes([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchNotes()
  }, [])

  const addOrUpdateNote = async (opportunityId: number, noteText: string) => {
    try {
      setError(null)
      await usersApi.createOrUpdateNote({
        user_profile: CURRENT_USER,
        opportunity: opportunityId,
        notes: noteText
      })
      // Refetch notes to get updated list
      await fetchNotes()
    } catch (err: any) {
      setError(err.message || 'Failed to save note')
      throw err
    }
  }

  const deleteNote = async (opportunityId: number) => {
    try {
      setError(null)
      await usersApi.deleteNote(CURRENT_USER, opportunityId)
      // Refetch notes to get updated list
      await fetchNotes()
    } catch (err: any) {
      setError(err.message || 'Failed to delete note')
      throw err
    }
  }

  return {
    notes,
    loading,
    error,
    addOrUpdateNote,
    deleteNote,
    refetch: fetchNotes
  }
}