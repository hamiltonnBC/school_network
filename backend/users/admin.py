from django.contrib import admin
from .models import UserProfile, UserOpportunityNotes

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['username', 'preferences']
    search_fields = ['username']

@admin.register(UserOpportunityNotes)
class UserOpportunityNotesAdmin(admin.ModelAdmin):
    list_display = ['user_profile', 'opportunity', 'notes']
    list_filter = ['user_profile', 'opportunity']