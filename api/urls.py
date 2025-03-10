from django.urls import path
from api.views import Translate, TTS

urlpatterns = [
    path("translator", Translate.as_view()),
    path("text-to-speech", TTS.as_view())
]