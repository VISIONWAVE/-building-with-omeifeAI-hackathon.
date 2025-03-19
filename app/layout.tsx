import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Dreamwave',
  description: 'A powerful AI-driven project for the Building with Omeife AI Hackathon.',
  generator: 'v0.dev',
  keywords: ['AI', 'Next.js', 'Hackathon', 'Dreamwave', 'Omeife'],
  openGraph: {
    title: 'Dreamwave',
    description: 'An AI-powered translation and text-to-speech app.',
    url: 'https://building-with-omeifeai-frontend-colvniqwy.vercel.app',
    siteName: 'Dreamwave',
    images: [
      {
        url: '/DREAMVISION.ico', // ✅ Updated path
        width: 800,
        height: 600,
        alt: 'Dreamwave Project',
      },
    ],
    type: 'website',
  },
  icons: {
    icon: "/DREAMVISION.ico", // ✅ Updated path
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* ✅ Favicon Setup */}
        <link rel="icon" href="/DREAMVISION.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/DREAMVISION.ico" />
        
        {/* ✅ SEO Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:title" content="Dreamwave" />
        <meta property="og:description" content="An AI-powered translation and text-to-speech app." />
        <meta property="og:image" content="/DREAMVISION.ico" />
        <meta property="og:url" content="https://building-with-omeifeai-frontend-colvniqwy.vercel.app" />
      </head>
      <body>{children}</body>
    </html>
  )
}

// ✅ Note: Ensure that the DREAMVISION.ico file is placed in the public directory of your Next.js project.
// This will allow it to be served correctly when referenced in the code above.