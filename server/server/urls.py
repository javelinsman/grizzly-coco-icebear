"""server URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from obgy.views import ObgyViewSet, BloodPressureViewSet, BodyWeightViewSet, BloodSugarViewSet
from chatbot.views import ChatbotViewSet

router = routers.DefaultRouter()
router.register('obgy', ObgyViewSet, basename='obgy')
router.register('bp', BloodPressureViewSet)
router.register('bw', BodyWeightViewSet)
router.register('bs', BloodSugarViewSet)
router.register('chatbot', ChatbotViewSet, basename='chatbot')

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls')),
    path('admin/', admin.site.urls),
]