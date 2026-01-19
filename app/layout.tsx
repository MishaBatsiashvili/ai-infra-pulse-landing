import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'

export const metadata: Metadata = {
  title: 'AI Infra Pulse - Daily AI Infrastructure Signal',
  description: 'A calm, daily signal on whether the AI infrastructure story is still holding together. Cuts through AI hype and shows what\'s actually changing upstream.',
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0a0a0f',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" data-theme="dark" style={{ colorScheme: 'dark' }}>
      <body style={{ backgroundColor: '#0a0a0f' }}>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
