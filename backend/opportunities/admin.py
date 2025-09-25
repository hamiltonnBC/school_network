from django.contrib import admin
from .models import Opportunity

@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    list_display = ['title', 'type', 'deadline', 'posted_by', 'created_at']
    list_filter = ['type', 'deadline', 'created_at']
    search_fields = ['title', 'posted_by']
    ordering = ['-created_at']