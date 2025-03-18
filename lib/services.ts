// This file is for reference only - showing how your Django backend works
// It's not used directly in the frontend code

export async function generateApiKey(token: string) {
  const BASE_URL = "https://apis.omeife.ai/api/v1/"
  const url = `${BASE_URL}user/developer/generate-key`
  const headers = {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  }

  try {
    const response = await fetch(url, { headers })
    if (!response.ok) {
      throw new Error(`Failed to generate API key: ${response.status}`)
    }
    const data = await response.json()
    return data?.data?.key
  } catch (error) {
    console.error("Error generating API key:", error)
    return null
  }
}

export async function makeRequest(
  endpoint: string,
  data: any,
  apiKey: string | null = null,
  token: string | null = null,
) {
  if (!apiKey && token) {
    apiKey = await generateApiKey(token)
  }

  if (!apiKey) {
    return { error: "Failed to retrieve API key" }
  }

  const BASE_URL = "https://apis.omeife.ai/api/v1/"
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/vnd.api+json",
    Accept: "application/vnd.api+json",
  }

  const fullEndpoint = `${BASE_URL}${endpoint}`

  try {
    const response = await fetch(fullEndpoint, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
    })

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status} ${response.statusText}`)
    }

    return await response.json()
  } catch (error) {
    console.error("API request failed:", error)
    return { error: "Request failed", details: String(error) }
  }
}

