from django.shortcuts import render
import requests
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response

from api.services import make_request

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

        """
        Return response
        """
        return Response({'success': 'Success', 'response': response}, status=status.HTTP_200_OK)

