from django.db import models
from rest_framework import serializers

class Opportunity(models.Model):
    OPPORTUNITY_TYPES = [
        ('Job', 'Job'),
        ('Internship', 'Internship'),
        ('Conference', 'Conference'),
        ('Other', 'Other'),
    ]
    
    title = models.CharField(max_length=200)
    deadline = models.DateField()
    type = models.CharField(max_length=50, choices=OPPORTUNITY_TYPES)
    notes = models.TextField(blank=True, null=True)  # Added notes field
    posted_by = models.CharField(max_length=100, blank=True, null=True)  # Added posted_by field
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.title} ({self.deadline})"

class OpportunitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Opportunity
        fields = ['id', 'title', 'deadline', 'type', 'notes', 'posted_by', 'created_at', 'updated_at']