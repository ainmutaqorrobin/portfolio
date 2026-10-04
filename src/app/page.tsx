import { NavLink } from '@/components/site/nav-link'
import { PageTransition } from '@/components/site/page-transition'
import {
    buttonGhost,
    buttonPrimary,
    Eyebrow,
    Cursor,
    PlusList,
    reveal,
    SectionLabel,
    SplitSection,
} from '@/components/ui'
import { ResumeLink } from '@/components/resume-link'
import { ProjectShot } from '@/components/work/project-shot'
import {
    siteDescription,
    siteProfile,
    siteProjects,
    siteUrl,
    statusLabel,
} from '@/lib/content'
import { cn } from '@/lib/utils'

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
            sameAs: [siteProfile.contact.github, siteProfile.contact.linkedin],
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

export default function HomePage() {
    const [current, ...past] = siteProfile.workExperience
    const featured = siteProjects.filter((project) => project.featured)

    return (
        <PageTransition>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(structuredData),
                }}
            />

            <section className="flex flex-col gap-7 pt-[clamp(56px,10vw,112px)] pb-16">
                <Eyebrow className="reveal" style={reveal(0)}>
                    Hi, I'm
                </Eyebrow>
                <h1
                    style={reveal(1)}
                    className="reveal font-mono text-[clamp(40px,8.6vw,120px)] leading-[0.95] font-extrabold tracking-[-0.05em]"
                >
                    AIN
                    <br />
                    MUTAQORROBIN
                    <Cursor />
                </h1>
                <div
                    style={reveal(2)}
                    className="reveal flex flex-wrap gap-x-7 gap-y-2 font-mono text-[13px] text-dim"
                >
                    <span>{siteProfile.role}</span>
                    <span>{siteProfile.location}</span>
                    <span>{siteProfile.timezone}</span>
                    <span className="text-accent">● open to work</span>
                </div>
                <p
                    style={reveal(3)}
                    className="reveal max-w-3xl text-[clamp(18px,2.2vw,24px)] leading-snug"
                >
                    {siteProfile.tagline}
                </p>
                <div style={reveal(4)} className="reveal flex flex-wrap gap-3">
                    <NavLink href="/work" className={buttonPrimary}>
                        See my work
                    </NavLink>
                    <NavLink href="/contact" className={buttonGhost}>
                        Get in touch
                    </NavLink>
                    <ResumeLink className={buttonGhost}>
                        Download resume
                    </ResumeLink>
                </div>
            </section>

            <SplitSection
                order={5}
                label={
                    <>
                        Currently
                        <span className="mt-2 block text-lg font-semibold text-fg">
                            Since {current.period.replace(' - Present', '')}
                        </span>
                        <span className="mt-2 block text-xs text-faint">
                            {current.location}
                        </span>
                    </>
                }
            >
                <div className="flex flex-col gap-3">
                    <h3 className="text-[22px] font-semibold">
                        {current.company}{' '}
                        <span className="font-normal text-faint">
                            — {current.role}
                        </span>
                    </h3>
                    <PlusList items={current.highlights.slice(0, 3)} />
                    <NavLink
                        href="/experience"
                        className="flex min-h-11 items-center self-start font-mono text-[13px] text-accent"
                    >
                        Full experience →
                    </NavLink>
                </div>
            </SplitSection>

            <section
                style={reveal(6)}
                className="reveal flex flex-col gap-6 border-t border-line py-14"
            >
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <SectionLabel>Featured work</SectionLabel>
                    <NavLink
                        href="/work"
                        className="flex min-h-11 items-center font-mono text-[13px] hover:text-accent"
                    >
                        All {siteProjects.length} projects →
                    </NavLink>
                </div>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-px border border-line bg-line">
                    {featured.map((project) => (
                        <NavLink
                            key={project.slug}
                            href={`/work/${project.slug}`}
                            className="group flex min-h-72 flex-col gap-4 bg-ink p-7 transition-colors hover:bg-ink-2"
                        >
                            <div className="flex justify-between font-mono text-xs text-faint">
                                <span>{project.date}</span>
                                <span className="text-ok">
                                    {statusLabel[project.status]}
                                </span>
                            </div>
                            <h3 className="font-mono text-xl font-semibold group-hover:text-accent">
                                {project.name}
                            </h3>
                            {project.image ? (
                                <ProjectShot
                                    project={project}
                                    sizes="(min-width: 1024px) 340px, 90vw"
                                    className="aspect-16/10"
                                />
                            ) : project.command ? (
                                <code className="bg-ink-2 px-3 py-2.5 font-mono text-[13px] text-body">
                                    <span className="text-faint">$</span>{' '}
                                    {project.command}
                                </code>
                            ) : null}
                            <p className="text-[15px] leading-relaxed text-dim">
                                {project.tagline}
                            </p>
                            <span className="mt-auto font-mono text-xs text-faint group-hover:text-accent">
                                {project.stack.slice(0, 3).join(' · ')} →
                            </span>
                        </NavLink>
                    ))}
                </div>
            </section>

            <section
                style={reveal(7)}
                className="reveal flex flex-col gap-5 border-t border-line py-14 font-mono text-sm"
            >
                <SectionLabel>Career</SectionLabel>
                <ol className="flex flex-col gap-2.5 leading-relaxed">
                    {[current, ...past].map((job, index) => (
                        <li
                            key={job.company}
                            className="flex flex-wrap gap-x-5 gap-y-1"
                        >
                            <span
                                className={cn(
                                    'flex-[0_0_190px]',
                                    index === 0 ? 'text-accent' : 'text-faint'
                                )}
                            >
                                {job.period.replace(' - ', ' – ')}
                            </span>
                            <span
                                className={cn(
                                    'min-w-0 flex-[1_1_360px]',
                                    index === 0 ? 'text-fg' : 'text-body'
                                )}
                            >
                                {job.company} · {job.role}
                            </span>
                        </li>
                    ))}
                </ol>
                <NavLink
                    href="/experience"
                    className="flex min-h-11 items-center self-start text-accent"
                >
                    Full experience →
                </NavLink>
            </section>
        </PageTransition>
    )
}
