from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers
from opportunities.models import Opportunity

class UserProfile(models.Model):
    # A simple model to store user preferences. In a real app, this would extend a User model.
    username = models.CharField(max_length=100, unique=True)
    # Storing preferences as a comma-separated string for simplicity
    preferences = models.CharField(max_length=255, default='')
    # A many-to-many relationship with Opportunity through the UserOpportunityNotes model
    notes = models.ManyToManyField(Opportunity, through='UserOpportunityNotes', related_name='user_notes')

    def __str__(self):
        return self.username

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserProfile
        fields = ['username', 'preferences']

class UserOpportunityNotes(models.Model):
    user_profile = models.ForeignKey(UserProfile, on_delete=models.CASCADE)
    opportunity = models.ForeignKey(Opportunity, on_delete=models.CASCADE)
    notes = models.TextField(blank=True)

    class Meta:
        # Ensures that a user can only have one set of notes per opportunity
        unique_together = ('user_profile', 'opportunity')

    def __str__(self):
        return f"{self.user_profile.username}'s note on {self.opportunity.title}"

class UserOpportunityNotesSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserOpportunityNotes
        fields = ['user_profile', 'opportunity', 'notes']