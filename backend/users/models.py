from django.db import models
from django.contrib.auth.models import User
from rest_framework import serializers
from opportunities.models import Opportunity

class UserProfile(models.Model):
    NOTIFICATION_METHODS = [
        ('email', 'Email'),
        ('slack', 'Slack (Coming Soon)'),
        ('none', 'No Notifications'),
    ]
    
    # A simple model to store user preferences. In a real app, this would extend a User model.
    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(blank=True, null=True, help_text="Email address for notifications")
    # Storing preferences as a comma-separated string for simplicity
    preferences = models.CharField(max_length=255, default='')
    
    # Notification preferences
    enable_notifications = models.BooleanField(default=True, help_text="Enable deadline notifications")
    notification_method = models.CharField(
        max_length=10, 
        choices=NOTIFICATION_METHODS, 
        default='email',
        help_text="How to receive notifications"
    )
    slack_user_id = models.CharField(
        max_length=50, 
        blank=True, 
        null=True, 
        help_text="Slack user ID for notifications (optional, coming soon)"
    )
    
    # Alert preferences
    alert_time = models.TimeField(default='07:00', help_text="Time of day to receive alerts (24-hour format)")
    alert_days_ahead = models.PositiveIntegerField(default=7, help_text="How many days ahead to alert for deadlines")
    alert_types = models.CharField(
        max_length=255, 
        default='Job,Internship,Conference,Other',
        help_text="Comma-separated list of opportunity types to alert for"
    )
    
    # A many-to-many relationship with Opportunity through the UserOpportunityNotes model
    notes = models.ManyToManyField(Opportunity, through='UserOpportunityNotes', related_name='user_notes')

    def get_alert_types_list(self):
        """Return alert types as a list"""
        if not self.alert_types:
            return []
        return [t.strip() for t in self.alert_types.split(',') if t.strip()]
    
    def set_alert_types_list(self, types_list):
        """Set alert types from a list"""
        self.alert_types = ','.join(types_list)

    def __str__(self):
        return self.username

class UserProfileSerializer(serializers.ModelSerializer):
    alert_types_list = serializers.ListField(
        child=serializers.CharField(),
        write_only=True,
        required=False,
        help_text="List of opportunity types to alert for"
    )
    
    class Meta:
        model = UserProfile
        fields = [
            'username', 'email', 'preferences', 
            'enable_notifications', 'notification_method', 'slack_user_id',
            'alert_time', 'alert_days_ahead', 'alert_types', 'alert_types_list'
        ]
        extra_kwargs = {
            'alert_types': {'read_only': True},  # Use alert_types_list for writing
            'slack_user_id': {'required': False}
        }
    
    def create(self, validated_data):
        alert_types_list = validated_data.pop('alert_types_list', None)
        user_profile = super().create(validated_data)
        if alert_types_list:
            user_profile.set_alert_types_list(alert_types_list)
            user_profile.save()
        return user_profile
    
    def update(self, instance, validated_data):
        alert_types_list = validated_data.pop('alert_types_list', None)
        user_profile = super().update(instance, validated_data)
        if alert_types_list is not None:
            user_profile.set_alert_types_list(alert_types_list)
            user_profile.save()
        return user_profile
    
    def to_representation(self, instance):
        data = super().to_representation(instance)
        data['alert_types_list'] = instance.get_alert_types_list()
        return data

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