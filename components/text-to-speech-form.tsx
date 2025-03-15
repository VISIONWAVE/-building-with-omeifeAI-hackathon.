"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Loader2, Play, Pause, Volume2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Slider } from "@/components/ui/slider"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Updated language options with full language names as values
const languages = [
  { value: "english", label: "English" },
  { value: "igbo", label: "Igbo" },
  { value: "yoruba", label: "Yoruba" },
  { value: "hausa", label: "Hausa" },
  { value: "pidgin", label: "Nigerian Pidgin" },
]

export default function TextToSpeechForm() {
  const [text, setText] = useState("")
  const [language, setLanguage] = useState("english")
  const [audioUrl, setAudioUrl] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(1)
  const [apiError, setApiError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement>(null)
  const { toast } = useToast()

  const handleTextToSpeech = async () => {
    if (!text) {
      toast({
        title: "Text is required",
        description: "Please enter some text to convert to speech",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setApiError(null)

    try {
      const response = await fetch("/api/text-to-speech", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          language,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setAudioUrl(data.message)
        // Preload the audio
        if (audioRef.current) {
          audioRef.current.load()
        }
      } else {
        setApiError(data.error || "An error occurred during text-to-speech conversion")
        toast({
          title: "Text-to-speech failed",
          description: data.error || "An error occurred during text-to-speech conversion",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Text-to-speech error:", error)
      setApiError("An error occurred during text-to-speech conversion")
      toast({
        title: "Text-to-speech failed",
        description: "An error occurred during text-to-speech conversion",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0]
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const handleAudioEnded = () => {
    setIsPlaying(false)
  }

  return (
    <div className="grid gap-6">
      {apiError && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{apiError}</AlertDescription>
        </Alert>
      )}

      <div className="space-y-2">
        <div className="flex justify-between">
          <label htmlFor="language" className="text-sm font-medium">
            Language
          </label>
        </div>
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger id="language">
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            {languages.map((lang) => (
              <SelectItem key={lang.value} value={lang.value}>
                {lang.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <label htmlFor="text" className="text-sm font-medium">
          Text
        </label>
        <Textarea
          id="text"
          placeholder="Enter text to convert to speech"
          className="min-h-[150px] resize-none"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>

      {audioUrl && (
        <div className="space-y-4 p-4 bg-muted rounded-lg">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" onClick={togglePlayPause} className="h-10 w-10 rounded-full">
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              <span className="sr-only">{isPlaying ? "Pause" : "Play"}</span>
            </Button>

            <div className="flex items-center gap-2 flex-1">
              <Volume2 className="h-4 w-4 text-muted-foreground" />
              <Slider
                value={[volume]}
                min={0}
                max={1}
                step={0.01}
                onValueChange={handleVolumeChange}
                className="flex-1"
              />
            </div>
          </div>

          <audio ref={audioRef} src={audioUrl} onEnded={handleAudioEnded} className="hidden" />
        </div>
      )}

      <Button onClick={handleTextToSpeech} disabled={isLoading || !text} className="w-full md:w-auto md:self-end">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Converting...
          </>
        ) : (
          "Convert to Speech"
        )}
      </Button>
    </div>
  )
}

