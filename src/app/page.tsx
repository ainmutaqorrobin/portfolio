import { siteDescription, siteProfile, siteProjects, siteUrl } from '@/lib/content'
import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { SiteHeader } from '@/components/sections/site-header'

const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
        {
            '@type': 'Person',
            '@id': `${siteUrl}/#person`,
            name: siteProfile.name,
            url: siteUrl,
            jobTitle: siteProfile.role,
            description: siteDescription,
            address: {
                '@type': 'PostalAddress',
                addressLocality: 'Kuala Lumpur',
                addressCountry: 'Malaysia',
            },
            email: `mailto:${siteProfile.contact.email}`,
            telephone: siteProfile.contact.phone,
            sameAs: [
                siteProfile.contact.github,
                siteProfile.contact.linkedin,
                siteProfile.contact.whatsapp,
            ],
        },
        {
            '@type': 'WebSite',
            '@id': `${siteUrl}/#website`,
            name: 'Ain Mutaqorrobin Portfolio',
            url: siteUrl,
            description: siteDescription,
            publisher: {
                '@id': `${siteUrl}/#person`,
            },
        },
    ],
}

export default function Home() {
    return (
        <main className="relative overflow-x-clip">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />
            <SiteHeader role={siteProfile.role} />
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                <HeroSection profile={siteProfile} />
                <AboutSection about={siteProfile.about} />
                <ExperienceSection
                    workExperience={siteProfile.workExperience}
                />
                <ProjectsSection projects={siteProjects} />
                <ContactSection contact={siteProfile.contact} />
            </div>
        </main>
    )
}
