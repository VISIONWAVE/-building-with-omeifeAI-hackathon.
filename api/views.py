from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from api.services import make_request

class Home(APIView):
    def get(self, request):
        return Response({"status": "success", "message": "Welcome to DreamWave's Omeife Translator and TTS"})

class Translate(APIView):
    def post(self, request):
        """
        Get requests from user
        """
        text = request.data.get('text')
        from_language = request.data.get('from')
        to = request.data.get('to')

        """
        Validate requests
        """
        if text is None or from_language is None or to is None:
            return Response({'error': "Fields are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        """
        Prepare request
        """
        data = {
            "text": text,
            "from": from_language,
            "to": to
        }

        """
        Target endpoint and send request
        """
        endpoint = "user/developer/translate"
        response = make_request(endpoint, data)
        required_response = response['data']['translated_text']

        """
        Return response
        """
        return Response({'status': 'success', 'message': required_response}, status=status.HTTP_200_OK)
    
class TTS(APIView):
    def post(self, request):
        """
        Get requests from user
        """
        text = request.data.get('text')
        language = request.data.get('language')

        """
        Validate requests
        """
        if text is None or language is None:
            return Response({'error': "Fields are required."}, status=status.HTTP_400_BAD_REQUEST)
        
        """
        Prepare request
        """
        data = {
            "text": text,
            "language": language
        }

        """
        Target endpoint, validate and send request
        """
        endpoint = "user/developer/text-to-speech"

        try:
            response = make_request(endpoint, data)
            required_response = response['data']['audio_url']
        except Exception:
            return Response({'status': 'Error'})

        """
        Return response
        """
        return Response({'status': 'success', 'message': required_response}, status=status.HTTP_200_OK)