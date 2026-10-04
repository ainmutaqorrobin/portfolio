import type { MetadataRoute } from 'next'

import { caseStudyProjects, siteUrl } from '@/lib/content'
import { navItems } from '@/lib/navigation'

export default function sitemap(): MetadataRoute.Sitemap {
    const lastModified = new Date()

    return [
        ...navItems.map((item) => ({
            url: item.href === '/' ? siteUrl : `${siteUrl}${item.href}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: item.href === '/' ? 1 : 0.8,
        })),
        ...caseStudyProjects.map((project) => ({
            url: `${siteUrl}/work/${project.slug}`,
            lastModified,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        })),
    ]
}
