import requests
from omeifeproj.settings import TOKEN

BASE_URL = "https://apis.omeife.ai/api/v1/"

def generate_api_key(token):
    """Fetch a new API key using the provided token."""
    url = f"{BASE_URL}user/developer/generate-key"
    headers = {'Authorization': f'Bearer {token}', 'Content-Type': 'application/json'}

    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status() 
        response_json = response.json()
        return response_json.get("data", {}).get("key")
    except requests.exceptions.RequestException as e:
        print(f"Error fetching API key: {e}")
        return None 

def make_request(endpoint, data, api_key=None):
    """Send a POST request to the specified API endpoint."""
    if api_key is None:
        api_key = generate_api_key(TOKEN)
    
    if not api_key:
        return {"error": "Failed to retrieve API key"}

    headers = {
        'Authorization': f'Bearer {api_key}',
        'Content-Type': 'application/vnd.api+json',
        'Accept': 'application/vnd.api+json'
    }

    full_endpoint = f"{BASE_URL}{endpoint}"

    try:
        response = requests.post(full_endpoint, headers=headers, json=data)
        response.raise_for_status()
        return response.json()
    except requests.exceptions.RequestException as e:
        print(f"API request failed: {e}")
        return {"error": "Request failed", "details": str(e)}
    