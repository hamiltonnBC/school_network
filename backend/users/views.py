from rest_framework import viewsets
from .models import UserProfile, UserOpportunityNotes, UserProfileSerializer, UserOpportunityNotesSerializer


class UserProfileViewSet(viewsets.ModelViewSet):
    queryset = UserProfile.objects.all()
    serializer_class = UserProfileSerializer
    lookup_field = 'username'


class UserOpportunityNotesViewSet(viewsets.ModelViewSet):
    queryset = UserOpportunityNotes.objects.all()
    serializer_class = UserOpportunityNotesSerializer