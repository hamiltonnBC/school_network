import { formatDistanceToNow, parseISO, format, isAfter, isBefore, addDays } from 'date-fns'

export const dateUtils = {
  // Format date for display
  formatDate: (dateString: string): string => {
    try {
      const date = parseISO(dateString)
      return format(date, 'MMM dd, yyyy')
    } catch {
      return dateString
    }
  },

  // Format date and time for display
  formatDateTime: (dateString: string): string => {
    try {
      const date = parseISO(dateString)
      return format(date, 'MMM dd, yyyy h:mm a')
    } catch {
      return dateString
    }
  },

  // Get relative time (e.g., "in 3 days", "2 days ago")
  getRelativeTime: (dateString: string): string => {
    try {
      const date = parseISO(dateString)
      return formatDistanceToNow(date, { addSuffix: true })
    } catch {
      return dateString
    }
  },

  // Check if date is in the past
  isPast: (dateString: string): boolean => {
    try {
      const date = parseISO(dateString)
      return isBefore(date, new Date())
    } catch {
      return false
    }
  },

  // Check if date is in the future
  isFuture: (dateString: string): boolean => {
    try {
      const date = parseISO(dateString)
      return isAfter(date, new Date())
    } catch {
      return false
    }
  },

  // Get days until deadline
  getDaysUntil: (dateString: string): number => {
    try {
      const date = parseISO(dateString)
      const now = new Date()
      const diffTime = date.getTime() - now.getTime()
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    } catch {
      return 0
    }
  },

  // Check if deadline is urgent (within specified days)
  isUrgent: (dateString: string, urgentDays: number = 3): boolean => {
    const daysUntil = dateUtils.getDaysUntil(dateString)
    return daysUntil >= 0 && daysUntil <= urgentDays
  },

  // Get deadline status color
  getDeadlineStatus: (dateString: string): {
    color: string
    status: 'expired' | 'urgent' | 'warning' | 'normal'
  } => {
    const daysUntil = dateUtils.getDaysUntil(dateString)
    
    if (daysUntil < 0) {
      return { color: 'red', status: 'expired' }
    } else if (daysUntil <= 3) {
      return { color: 'orange', status: 'urgent' }
    } else if (daysUntil <= 7) {
      return { color: 'yellow', status: 'warning' }
    } else {
      return { color: 'green', status: 'normal' }
    }
  },

  // Format date for HTML input (YYYY-MM-DD)
  formatForInput: (dateString: string): string => {
    try {
      const date = parseISO(dateString)
      return format(date, 'yyyy-MM-dd')
    } catch {
      return ''
    }
  },

  // Get today's date in YYYY-MM-DD format
  getTodayForInput: (): string => {
    return format(new Date(), 'yyyy-MM-dd')
  },

  // Get date N days from now in YYYY-MM-DD format
  getFutureDateForInput: (days: number): string => {
    const futureDate = addDays(new Date(), days)
    return format(futureDate, 'yyyy-MM-dd')
  }
}