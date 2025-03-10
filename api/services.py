import requests
from omeifeproj.settings import TOKEN

BASE_URL = "https://apis.omeife.ai/api/v1/"

def generate_api_key(TOKEN):
    url = BASE_URL + "user/developer/generate-key"

    headers = {
        'Authorization': f'Bearer {TOKEN}',
        'Content-Type': 'application/json'
    }

    response = requests.get(url, headers=headers)

    response_json = response.json() 

    """
    Return only API KEY
    """
    return response_json["data"]["key"]

def make_request(endpoint, data):
    KEY = generate_api_key(TOKEN)
    print(KEY)
    
    headers = {
        'Authorization': f'Bearer {KEY}',
        'Content-Type': 'application/json'
    }

    """
    Create endpoint
    """
    full_enpoint = BASE_URL + endpoint
    
    """
    Send requests
    """
    response = requests.post(full_enpoint, headers=headers, json=data)


    """
    Return response
    """
    return response.json()