import type { Metadata } from 'next'
import { Space_Grotesk, Instrument_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const headingFont = Space_Grotesk({
    subsets: ['latin'],
    variable: '--font-heading',
})

const bodyFont = Instrument_Sans({
    subsets: ['latin'],
    variable: '--font-body',
})

export const metadata: Metadata = {
    title: 'Ain Mutaqorrobin | Full-Stack Developer',
    description:
        'Portfolio of Ain Mutaqorrobin, a full-stack developer focused on web, mobile, backend, and DevOps-oriented delivery.',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${headingFont.variable} ${bodyFont.variable} bg-background font-body text-foreground antialiased`}
            >
                <ThemeProvider>{children}</ThemeProvider>
            </body>
        </html>
    )
}
