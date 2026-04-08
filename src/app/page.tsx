import { AboutSection } from '@/components/sections/about-section'
import { ContactSection } from '@/components/sections/contact-section'
import { ExperienceSection } from '@/components/sections/experience-section'
import { HeroSection } from '@/components/sections/hero-section'
import { ProjectsSection } from '@/components/sections/projects-section'
import { SiteHeader } from '@/components/sections/site-header'
import { siteProfile, siteProjects } from '@/lib/content'

export default function Home() {
    return (
        <main className="relative overflow-x-clip">
            <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col gap-8 px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
                <SiteHeader role={siteProfile.role} />
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
