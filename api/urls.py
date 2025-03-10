from django.urls import path
from api.views import Translate

urlpatterns = [
    path("translator", Translate.as_view())
]