from rest_framework import viewsets
from .models import Opportunity, OpportunitySerializer


class OpportunityViewSet(viewsets.ModelViewSet):
    queryset = Opportunity.objects.all().order_by('-created_at')
    serializer_class = OpportunitySerializer