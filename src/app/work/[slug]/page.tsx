import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { Fragment } from 'react'

import { NavLink } from '@/components/site/nav-link'
import { PageTransition } from '@/components/site/page-transition'
import {
    buttonGhost,
    buttonPrimary,
    reveal,
    SectionLabel,
    Shell,
    SplitSection,
} from '@/components/ui'
import { ArchitectureDiagram } from '@/components/work/architecture-diagram'
import { ProjectShot } from '@/components/work/project-shot'
import {
    caseStudyProjects,
    getProject,
    siteProjects,
    statusLabel,
    statusTone,
    type Project,
} from '@/lib/content'
import { cn } from '@/lib/utils'

export const dynamicParams = false

export function generateStaticParams() {
    return caseStudyProjects.map((project) => ({ slug: project.slug }))
}

export async function generateMetadata({
    params,
}: PageProps<'/work/[slug]'>): Promise<Metadata> {
    const { slug } = await params
    const project = getProject(slug)
    if (!project) return {}
    return {
        title: project.name,
        description: project.tagline,
        alternates: { canonical: `/work/${project.slug}` },
    }
}

function liveLabel(url: string) {
    if (url.includes('npmjs.com')) return 'View on npm ↗'
    if (url.includes('github.io')) return 'Read the docs ↗'
    return 'Visit live site ↗'
}

export default async function ProjectPage({
    params,
}: PageProps<'/work/[slug]'>) {
    const { slug } = await params
    const project = getProject(slug)
    const study = project?.caseStudy
    if (!project || !study) notFound()

    const index = siteProjects.indexOf(project)
    const prev = siteProjects[index - 1]
    const next = siteProjects[index + 1]

    return (
        <PageTransition>
            <section className="flex flex-col gap-6 pt-14 pb-12">
                <NavLink
                    href="/work"
                    className="reveal flex min-h-11 items-center self-start font-mono text-[13px] text-faint hover:text-accent"
                    style={reveal(0)}
                >
                    ← All work
                </NavLink>
                <div
                    className="reveal flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-faint"
                    style={reveal(1)}
                >
                    <span>{project.date}</span>
                    <span className={statusTone[project.status]}>
                        {statusLabel[project.status]}
                    </span>
                    <span>{project.stack.slice(0, 4).join(' · ')}</span>
                </div>
                <h1
                    className="reveal font-mono text-[clamp(36px,6.4vw,80px)] leading-[0.98] font-extrabold tracking-[-0.05em]"
                    style={reveal(2)}
                >
                    {project.name}
                </h1>
                <p
                    className="reveal max-w-3xl text-[clamp(20px,2.4vw,28px)] leading-snug"
                    style={reveal(3)}
                >
                    {study.headline}
                </p>
                <div className="reveal flex flex-wrap gap-3" style={reveal(4)}>
                    {project.hostedLink ? (
                        <a
                            href={project.hostedLink}
                            target="_blank"
                            rel="noreferrer"
                            className={buttonPrimary}
                        >
                            {liveLabel(project.hostedLink)}
                        </a>
                    ) : null}
                    <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className={buttonGhost}
                    >
                        View source code ↗
                    </a>
                </div>
                {project.image ? (
                    <figure className="mt-4 flex flex-col gap-2">
                        <ProjectShot
                            project={project}
                            priority
                            sizes="(min-width: 1120px) 1024px, 100vw"
                            className="aspect-16/10 w-full"
                        />
                        {project.hostedLink ? (
                            <figcaption className="font-mono text-xs text-faint">
                                {project.hostedLink.replace(/^https?:\/\//, '')}
                            </figcaption>
                        ) : null}
                    </figure>
                ) : project.command ? (
                    <figure className="mt-4 flex flex-col gap-2">
                        <figcaption className="font-mono text-xs text-faint">
                            How it&apos;s used: one command in a terminal
                        </figcaption>
                        <pre className="overflow-x-auto border border-line bg-ink-2 px-6 py-10 font-mono text-[clamp(18px,3vw,32px)] font-semibold">
                            <span className="text-faint">$ </span>
                            {project.command}
                            <span
                                aria-hidden
                                className="cursor-block ml-2 inline-block h-[0.9em] w-[0.5em] bg-accent align-[-0.1em]"
                            />
                        </pre>
                    </figure>
                ) : null}
            </section>

            <SplitSection order={5} label="Overview">
                <div className="flex flex-col gap-4 text-lg leading-relaxed text-body">
                    {project.summary.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </SplitSection>

            <section
                className="reveal grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6 border-t border-line py-12 font-mono text-[13px]"
                style={reveal(6)}
            >
                {study.stackGroups.map((group) => (
                    <div key={group.label} className="flex flex-col gap-2">
                        <span className="text-faint">{group.label}</span>
                        <span className="leading-relaxed">{group.items}</span>
                    </div>
                ))}
            </section>

            <SplitSection order={7} label="The problem">
                <div className="flex flex-col gap-4 text-lg leading-relaxed text-body">
                    {study.problem.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                    ))}
                </div>
            </SplitSection>

            <section className="flex flex-col gap-7 border-t border-line py-14">
                <SectionLabel>{study.diagram.title}</SectionLabel>
                <ArchitectureDiagram
                    diagram={study.diagram}
                    id={`diagram-${project.slug}`}
                />
                <p className="font-mono text-[11px] text-faint md:hidden">
                    Swipe sideways to see the whole diagram.
                </p>
            </section>

            <section className="flex flex-col gap-7 border-t border-line py-14">
                <SectionLabel>{study.flow.title}</SectionLabel>
                <div className="flex flex-wrap items-center gap-2.5 font-mono text-[13px]">
                    {study.flow.states.map((state, i) => {
                        const done = i === study.flow.states.length - 1
                        return (
                            <Fragment key={state}>
                                {i > 0 ? (
                                    <span aria-hidden className="text-faint">
                                        ──▶
                                    </span>
                                ) : null}
                                <span
                                    className={cn(
                                        'border px-3.5 py-2.5',
                                        done
                                            ? 'border-ok text-ok'
                                            : 'border-line-strong'
                                    )}
                                >
                                    {state}
                                </span>
                            </Fragment>
                        )
                    })}
                    {study.flow.failState ? (
                        <span className="border border-dashed border-err px-3.5 py-2.5 text-err sm:ml-4">
                            {study.flow.failState}
                        </span>
                    ) : null}
                </div>
                <ol className="flex flex-col gap-3 text-base leading-relaxed text-body">
                    {study.flow.steps.map((step, i) => (
                        <li key={step} className="flex gap-4">
                            <span className="w-7 flex-none font-mono text-accent">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <span>{step}</span>
                        </li>
                    ))}
                </ol>
            </section>

            <section className="flex flex-col gap-6 border-t border-line py-14">
                <SectionLabel>Key decisions</SectionLabel>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-line bg-line">
                    {study.decisions.map((decision, i) => (
                        <div
                            key={decision.title}
                            className="flex flex-col gap-2.5 bg-ink p-6"
                        >
                            <span className="font-mono text-xs text-faint">
                                {String(i + 1).padStart(2, '0')} /{' '}
                                {decision.tag}
                            </span>
                            <h3 className="text-[19px] font-semibold">
                                {decision.title}
                            </h3>
                            <p className="text-[15px] leading-relaxed text-dim">
                                {decision.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="flex flex-wrap gap-x-8 gap-y-6 border-t border-line py-14">
                <SectionLabel className="flex-[1_1_220px]">
                    Run it yourself
                </SectionLabel>
                <div className="flex min-w-0 flex-[3_1_480px] flex-col gap-3">
                    {study.deploy.map((step) => (
                        <Shell key={step.command}>
                            <span className="text-faint"># {step.comment}</span>
                            {'\n'}
                            <span className="text-faint">$</span> {step.command}
                        </Shell>
                    ))}
                </div>
            </section>

            {study.lessons.length > 0 ? (
                <section className="flex flex-wrap gap-x-8 gap-y-6 border-t border-line py-14">
                    <SectionLabel className="flex-[1_1_220px]">
                        What I&apos;d do differently
                    </SectionLabel>
                    <ul className="flex min-w-0 flex-[3_1_480px] flex-col gap-4 text-base leading-relaxed text-body">
                        {study.lessons.map((lesson) => (
                            <li key={lesson} className="flex gap-3">
                                <span
                                    aria-hidden
                                    className="font-mono text-accent"
                                >
                                    !
                                </span>
                                <span>{lesson}</span>
                            </li>
                        ))}
                    </ul>
                </section>
            ) : null}

            <nav
                aria-label="More projects"
                className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(240px,1fr))] gap-px border-t border-line bg-line font-mono"
            >
                {prev ? (
                    <SiblingLink project={prev} label="← Previous project" />
                ) : (
                    <span />
                )}
                {next ? (
                    <SiblingLink
                        project={next}
                        label="Next project →"
                        alignEnd
                    />
                ) : null}
            </nav>
        </PageTransition>
    )
}

function SiblingLink({
    project,
    label,
    alignEnd,
}: {
    project: Project
    label: string
    alignEnd?: boolean
}) {
    return (
        <NavLink
            href={`/work/${project.slug}`}
            className={cn(
                'flex flex-col gap-1.5 bg-ink py-7 hover:text-accent',
                alignEnd && 'items-end text-right'
            )}
        >
            <span className="text-xs text-faint">{label}</span>
            <span className="text-lg">{project.name}</span>
        </NavLink>
    )
}
