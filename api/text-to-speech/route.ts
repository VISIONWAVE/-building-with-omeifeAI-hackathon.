import { NextResponse } from "next/server"

// Use the correct endpoint from your Django backend
const BASE_URL = "https://building-with-omeifeai-hackathon.onrender.com/api/v1/"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { text, language } = body

    if (!text || !language) {
      return NextResponse.json({ error: "Text and language are required" }, { status: 400 })
    }

    // Structure the request exactly as shown in the example
    const requestData = {
      text: text,
      language: language,
    }

    console.log("Sending request to:", `${BASE_URL}text-to-speech`)
    console.log("Request body:", requestData)

    // Call your Django backend endpoint
    const response = await fetch(`${BASE_URL}text-to-speech`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestData),
    })

    // Handle non-JSON responses
    try {
      const data = await response.json()

      if (!response.ok) {
        console.error("API error:", data)
        return NextResponse.json(
          { error: data.error || "Failed to convert text to speech" },
          { status: response.status },
        )
      }

      return NextResponse.json(data)
    } catch (jsonError) {
      const textResponse = await response.text()
      console.error("Non-JSON response:", textResponse)
      return NextResponse.json({ error: "The API returned an invalid response format" }, { status: 500 })
    }
  } catch (error) {
    console.error("Text-to-speech error:", error)
    return NextResponse.json({ error: "An error occurred during text-to-speech conversion" }, { status: 500 })
  }
}

