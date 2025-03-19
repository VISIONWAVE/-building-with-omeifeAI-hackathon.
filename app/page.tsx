"use client"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import TranslationForm from "@/components/translation-form"
import TextToSpeechForm from "@/components/text-to-speech-form"
import { Globe, Headphones, Sparkles } from "lucide-react"
import Head from "next/head"

export default function Home() {
  return (
    <>
      {/* Adding Favicon */}
      <Head>
        <title>DreamWave Omeife</title>
        <meta name="description" content="AI-powered translation and text-to-speech" />
        <link rel="icon" href="/DREAMVISION.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
            <div className="flex gap-2 items-center text-primary">
              <Sparkles className="h-6 w-6" />
              <h1 className="text-xl font-bold">DreamWave Omeife</h1>
            </div>
            <div className="flex flex-1 items-center justify-end space-x-4">
              <nav className="flex items-center space-x-2">
                <a
                  href="https://apis.omeife.ai"
                  target="_blank"
                  rel="noreferrer"
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  API Docs
                </a>
              </nav>
            </div>
          </div>
        </header>

        <main className="container py-10">
          <div className="mx-auto max-w-5xl space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Omeife Translator & Text-to-Speech
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Translate text between languages and convert text to speech with Omeife AI.
              </p>
            </div>

            <Tabs defaultValue="translate" className="w-full">
              <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
                <TabsTrigger value="translate" className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <span>Translate</span>
                </TabsTrigger>
                <TabsTrigger value="tts" className="flex items-center gap-2">
                  <Headphones className="h-4 w-4" />
                  <span>Text to Speech</span>
                </TabsTrigger>
              </TabsList>
              <TabsContent value="translate" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Translation</CardTitle>
                    <CardDescription>Translate text between different languages using Omeife AI.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TranslationForm />
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tts" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Text to Speech</CardTitle>
                    <CardDescription>Convert text to natural-sounding speech in various languages.</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <TextToSpeechForm />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>

        <footer className="border-t bg-background">
          <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
            <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
              <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
                &copy; {new Date().getFullYear()} DreamWave Omeife. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}
