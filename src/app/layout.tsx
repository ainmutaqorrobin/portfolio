import type { Metadata } from 'next'
import { Geist, Martian_Mono } from 'next/font/google'

import { SiteFooter } from '@/components/site/site-footer'
import { SiteHeader } from '@/components/site/site-header'
import { siteDescription, siteTitle, siteUrl } from '@/lib/content'
import './globals.css'

const monoFont = Martian_Mono({
    subsets: ['latin'],
    variable: '--font-martian',
})

const sansFont = Geist({
    subsets: ['latin'],
    variable: '--font-geist',
})

export const metadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: siteTitle,
        template: '%s · Ain Mutaqorrobin',
    },
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
        // Extensions stamp attributes onto <html> before React loads (e.g.
        // data-expander-initialized); only this element's own attributes are
        // exempted, so real mismatches deeper in the tree still surface.
        <html
            lang="en"
            className={`${monoFont.variable} ${sansFont.variable}`}
            suppressHydrationWarning
        >
            <body className="min-h-dvh bg-ink font-sans text-fg antialiased">
                <a href="#main" className="skip-link">
                    Skip to content
                </a>
                <SiteHeader />
                <main id="main" className="shell">
                    {children}
                </main>
                <SiteFooter />
            </body>
        </html>
    )
}
