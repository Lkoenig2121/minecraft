import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Minecraft Game',
  description: 'A Minecraft-like game built with Next.js and Three.js',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

