import { Space_Grotesk } from 'next/font/google'
import { Toaster } from 'sonner'

import '@/app/(app)/globals.css'
import Provider from '@/trpc/Provider'

const inter = Space_Grotesk({ subsets: ['latin'] })

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en' className='dark'>
      <head>
        {/* added a explicit link tag because favicon is coming from site-settings */}
        {/* <link rel='icon' type='image/x-icon' href={faviconUrl} /> */}
      </head>
      <body className={`${inter.className}`}>
        <Provider>{children}</Provider>

        {/* Sonnar toast library */}
        <Toaster richColors />
      </body>
    </html>
  )
}
