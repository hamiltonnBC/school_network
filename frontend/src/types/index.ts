// API Types based on Django backend models

export interface Opportunity {
  id: number;
  title: string;
  deadline: string; // ISO date string
  type: 'Job' | 'Internship' | 'Conference' | 'Other';
  notes?: string;
  posted_by?: string;
  created_at: string; // ISO datetime string
  updated_at: string; // ISO datetime string
}

export interface UserProfile {
  username: string;
  email?: string;
  preferences: string;
  enable_notifications: boolean;
  notification_method: 'email' | 'slack' | 'none';
  slack_user_id?: string;
  alert_time: string; // HH:MM format
  alert_days_ahead: number;
  alert_types: string; // comma-separated
  alert_types_list: string[]; // for API requests
}

export interface UserOpportunityNotes {
  user_profile: string; // username
  opportunity: number; // opportunity ID
  notes: string;
}

// UI Component Props Types
export interface OpportunityCardProps {
  opportunity: Opportunity;
  userNotes?: string;
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onAddNote?: (id: number, notes: string) => void;
}

export interface FilterOptions {
  type?: string;
  deadlineStart?: string;
  deadlineEnd?: string;
  search?: string;
}

// API Response Types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> {
  count: number;
  next?: string;
  previous?: string;
  results: T[];
}

// Form Types
export interface OpportunityFormData {
  title: string;
  deadline: string;
  type: Opportunity['type'];
  notes?: string;
  posted_by?: string;
}

export interface UserProfileFormData {
  username: string;
  email?: string;
  preferences: string;
  enable_notifications: boolean;
  notification_method: UserProfile['notification_method'];
  slack_user_id?: string;
  alert_time: string;
  alert_days_ahead: number;
  alert_types_list: string[];
}