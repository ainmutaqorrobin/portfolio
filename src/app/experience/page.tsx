import type { Metadata } from 'next'

import { PageTransition } from '@/components/site/page-transition'
import {
    buttonPrimary,
    Eyebrow,
    PageTitle,
    PlusList,
    reveal,
    SplitSection,
} from '@/components/ui'
import { ResumeLink } from '@/components/resume-link'
import { siteProfile } from '@/lib/content'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
    title: 'Experience',
    description:
        'Work history, education and certifications of Ain Mutaqorrobin, software engineer in Kuala Lumpur.',
    alternates: { canonical: '/experience' },
}

export default function ExperiencePage() {
    const { workExperience, education, certifications } = siteProfile

    return (
        <PageTransition>
            <section className="flex flex-col gap-5 pt-18 pb-10">
                <Eyebrow className="reveal" style={reveal(0)}>
                    Career so far
                </Eyebrow>
                <div className="reveal" style={reveal(1)}>
                    <PageTitle>Experience</PageTitle>
                </div>
                <p
                    className="reveal max-w-2xl text-[19px] leading-relaxed text-body"
                    style={reveal(2)}
                >
                    {workExperience.length} roles since 2023, from React intern
                    to leading a mobile team, by way of enterprise Angular.
                </p>
                <div
                    className="reveal flex flex-wrap items-center gap-x-5 gap-y-3"
                    style={reveal(3)}
                >
                    <ResumeLink className={buttonPrimary}>
                        Download resume (PDF, {siteProfile.resume.pages} pages)
                    </ResumeLink>
                </div>
            </section>

            <section className="border-t border-line">
                {workExperience.map((job, index) => (
                    <article
                        key={job.company}
                        className="reveal flex flex-wrap gap-x-8 gap-y-4 border-b border-line py-12"
                        style={reveal(index + 3)}
                    >
                        <div className="flex flex-[1_1_220px] flex-col gap-2 font-mono">
                            <span
                                className={cn(
                                    'text-lg font-semibold',
                                    index === 0 && 'text-accent'
                                )}
                            >
                                {job.period.replace(' - ', ' – ')}
                            </span>
                            <span className="text-xs text-faint">
                                {job.location}
                            </span>
                            {index === 0 ? (
                                <span className="mt-1 self-start border border-accent px-2 py-1 text-[11px] text-accent">
                                    Current role
                                </span>
                            ) : null}
                        </div>
                        <div className="flex min-w-0 flex-[3_1_480px] flex-col gap-3.5">
                            <h2 className="text-[26px] font-semibold">
                                {job.company}{' '}
                                <span className="font-normal text-faint">
                                    — {job.role}
                                </span>
                            </h2>
                            <PlusList items={job.highlights} />
                            <ul className="mt-1 flex flex-wrap gap-1.5">
                                {job.tags.map((tag) => (
                                    <li
                                        key={tag}
                                        className="bg-ink-2 px-2 py-1 font-mono text-[11px] text-dim"
                                    >
                                        {tag}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </article>
                ))}
            </section>

            <SplitSection order={workExperience.length + 3} label="Education">
                <div className="flex flex-col gap-7">
                    {education.map((entry) => (
                        <div
                            key={entry.school}
                            className="flex flex-col gap-1.5"
                        >
                            <h3 className="text-xl font-semibold">
                                {entry.title}
                            </h3>
                            <p className="text-body">{entry.school}</p>
                            <p className="font-mono text-xs text-faint">
                                {entry.period} · {entry.note}
                            </p>
                        </div>
                    ))}
                </div>
            </SplitSection>

            <SplitSection
                order={workExperience.length + 4}
                label="Certifications"
            >
                <ul className="flex flex-col font-mono text-sm">
                    {certifications.map((cert) => (
                        <li key={cert.url} className="border-b border-line">
                            <a
                                href={cert.url}
                                target="_blank"
                                rel="noreferrer"
                                className="group flex min-h-11 flex-wrap items-baseline gap-x-3.5 gap-y-1 py-3.5"
                            >
                                <span aria-hidden className="text-accent">
                                    ✓
                                </span>
                                <span className="min-w-0 flex-[1_1_260px] underline-offset-4 group-hover:text-accent group-hover:underline">
                                    {cert.name}
                                </span>
                                <span className="text-xs text-faint group-hover:text-accent">
                                    {cert.issuer} · View certificate ↗
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
            </SplitSection>
        </PageTransition>
    )
}
