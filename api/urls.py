from django.urls import path
from api.views import Translate, TTS, Home

urlpatterns = [
    path("translator", Translate.as_view()),
    path("text-to-speech", TTS.as_view()),
    path("", Home.as_view())
]