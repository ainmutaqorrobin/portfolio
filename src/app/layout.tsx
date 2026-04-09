import type { Metadata } from 'next'
import { Space_Grotesk, Instrument_Sans } from 'next/font/google'
import { ThemeProvider } from '@/components/theme-provider'
import { siteDescription, siteTitle, siteUrl } from '@/lib/content'
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
    metadataBase: new URL(siteUrl),
    title: siteTitle,
    description: siteDescription,
    alternates: {
        canonical: '/',
    },
    openGraph: {
        type: 'website',
        url: '/',
        title: siteTitle,
        description: siteDescription,
        siteName: 'Ain Mutaqorrobin Portfolio',
        locale: 'en_MY',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'Ain Mutaqorrobin portfolio preview',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: siteTitle,
        description: siteDescription,
        images: ['/og-image.png'],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
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
