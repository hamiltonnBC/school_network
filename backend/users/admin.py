from django.contrib import admin
from .models import UserProfile, UserOpportunityNotes

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['username', 'email', 'enable_notifications', 'notification_method', 'alert_time', 'alert_days_ahead']
    search_fields = ['username', 'email']
    list_filter = ['enable_notifications', 'notification_method', 'alert_time', 'alert_days_ahead']
    
    fieldsets = (
        ('User Info', {
            'fields': ('username', 'email', 'preferences')
        }),
        ('Notification Settings', {
            'fields': ('enable_notifications', 'notification_method', 'slack_user_id')
        }),
        ('Alert Preferences', {
            'fields': ('alert_time', 'alert_days_ahead', 'alert_types')
        }),
    )
    
    def get_form(self, request, obj=None, **kwargs):
        form = super().get_form(request, obj, **kwargs)
        # Add help text for alert_types field
        if 'alert_types' in form.base_fields:
            form.base_fields['alert_types'].help_text = "Comma-separated list: Job,Internship,Conference,Other"
        return form

@admin.register(UserOpportunityNotes)
class UserOpportunityNotesAdmin(admin.ModelAdmin):
    list_display = ['user_profile', 'opportunity', 'notes']
    list_filter = ['user_profile', 'opportunity']