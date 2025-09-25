from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'profiles', views.UserProfileViewSet)
router.register(r'notes', views.UserOpportunityNotesViewSet)

urlpatterns = [
    path('', include(router.urls)),
]