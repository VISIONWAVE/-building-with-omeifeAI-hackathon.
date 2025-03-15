"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowRight, Check, ClipboardCopy, Loader2, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

// Updated language options with full language names as values
const languages = [
  { value: "english", label: "English" },
  { value: "igbo", label: "Igbo" },
  { value: "yoruba", label: "Yoruba" },
  { value: "hausa", label: "Hausa" },
  { value: "pidgin", label: "Nigerian Pidgin" },
]

export default function TranslationForm() {
  const [text, setText] = useState("")
  const [fromLanguage, setFromLanguage] = useState("english")
  const [toLanguage, setToLanguage] = useState("igbo")
  const [translatedText, setTranslatedText] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [copied, setCopied] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const { toast } = useToast()

  const handleTranslate = async () => {
    if (!text) {
      toast({
        title: "Text is required",
        description: "Please enter some text to translate",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)
    setApiError(null)

    try {
      const response = await fetch("/api/translator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          from: fromLanguage,
          to: toLanguage,
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setTranslatedText(data.message)
      } else {
        setApiError(data.error || "An error occurred during translation")
        toast({
          title: "Translation failed",
          description: data.error || "An error occurred during translation",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Translation error:", error)
      setApiError("An error occurred during translation")
      toast({
        title: "Translation failed",
        description: "An error occurred during translation",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopy = () => {
    navigator.clipboard.writeText(translatedText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSwapLanguages = () => {
    setFromLanguage(toLanguage)
    setToLanguage(fromLanguage)
    setText(translatedText)
    setTranslatedText(text)
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

      <div className="grid gap-4 md:grid-cols-[1fr,auto,1fr] items-start">
        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="from-language" className="text-sm font-medium">
              From
            </label>
          </div>
          <Select value={fromLanguage} onValueChange={setFromLanguage}>
            <SelectTrigger id="from-language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Textarea
            id="source-text"
            placeholder="Enter text to translate"
            className="min-h-[150px] resize-none"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-center pt-8">
          <Button
            variant="outline"
            size="icon"
            onClick={handleSwapLanguages}
            disabled={!translatedText || isLoading}
            className="rounded-full"
          >
            <ArrowRight className="h-4 w-4" />
            <span className="sr-only">Swap languages</span>
          </Button>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between">
            <label htmlFor="to-language" className="text-sm font-medium">
              To
            </label>
          </div>
          <Select value={toLanguage} onValueChange={setToLanguage}>
            <SelectTrigger id="to-language">
              <SelectValue placeholder="Select language" />
            </SelectTrigger>
            <SelectContent>
              {languages.map((language) => (
                <SelectItem key={language.value} value={language.value}>
                  {language.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="relative">
            <Textarea
              id="translated-text"
              placeholder="Translation will appear here"
              className="min-h-[150px] resize-none"
              value={translatedText}
              readOnly
            />
            {translatedText && (
              <Button variant="ghost" size="icon" className="absolute top-2 right-2" onClick={handleCopy}>
                {copied ? <Check className="h-4 w-4" /> : <ClipboardCopy className="h-4 w-4" />}
                <span className="sr-only">Copy to clipboard</span>
              </Button>
            )}
          </div>
        </div>
      </div>

      <Button onClick={handleTranslate} disabled={isLoading || !text} className="w-full md:w-auto md:self-end">
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Translating...
          </>
        ) : (
          "Translate"
        )}
      </Button>
    </div>
  )
}

