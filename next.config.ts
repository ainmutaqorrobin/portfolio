import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
    output: 'standalone',
    experimental: {
        // Lets React's <ViewTransition> animate route changes.
        viewTransition: true,
    },
}

export default nextConfig
