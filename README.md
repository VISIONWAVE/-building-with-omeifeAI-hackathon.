# Omeife API Integration for Translation and Text-to-Speech (TTS)

This project provides a Django-based API for integrating translation and text-to-speech (TTS) functionalities using an external service. The API allows users to send text for translation or conversion to speech and receive the processed results.

## Features

- **Translation API**: Translates text from one language to another.
- **Text-to-Speech API**: Converts text into speech in a specified language.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add the following:
   ```plaintext
   TOKEN=<your-api-token>
   ```

4. **Run migrations**:
   ```bash
   python manage.py migrate
   ```

5. **Start the development server**:
   ```bash
   python manage.py runserver
   ```

## API Endpoints

### 1. Translation

- **Endpoint**: `/api/v1/translator`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "text": "Hello, world!",
    "from": "en",
    "to": "es"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "response": "Hola, mundo!"
  }
  ```

### 2. Text-to-Speech (TTS)

- **Endpoint**: `/api/v1/text-to-speech`
- **Method**: `POST`
- **Request Body**:
  ```json
  {
    "text": "Hello, world!",
    "language": "en"
  }
  ```
- **Response**:
  ```json
  {
    "status": "success",
    "response": "https://example.com/audio-file.mp3"
  }
  ```

## Error Handling

- **Missing Fields**: If any required field is missing, the API will return a `400 Bad Request` with an error message.
- **API Request Failure**: If the external API request fails, the API will return an error message with details.

## Code Structure

- **`api/views.py`**: Contains the `Translate` and `TTS` API views.
- **`api/services.py`**: Contains the `make_request` function for making external API requests.
- **`api/urls.py`**: Defines the API endpoints.
- **`settings.py`**: Contains the `TOKEN` environment variable for API authentication.

## Dependencies

- Django
- Django REST Framework
- Requests

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---