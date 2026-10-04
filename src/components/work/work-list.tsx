'use client'

import { useState, type CSSProperties } from 'react'

import { NavLink } from '@/components/site/nav-link'
import { ProjectShot } from '@/components/work/project-shot'
import {
    statusLabel,
    statusTone,
    type Project,
    type ProjectStatus,
} from '@/lib/content'
import { cn } from '@/lib/utils'

type Filter = 'all' | ProjectStatus

const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: 'All' },
    { key: 'live', label: 'Live' },
    { key: 'development', label: 'In development' },
    { key: 'deprecated', label: 'Archived' },
]

export function WorkList({ projects }: { projects: Project[] }) {
    const [filter, setFilter] = useState<Filter>('all')
    const shown =
        filter === 'all'
            ? projects
            : projects.filter((project) => project.status === filter)

    return (
        <>
            <div
                role="group"
                aria-label="Filter by status"
                className="flex flex-wrap gap-2"
            >
                {filters.map(({ key, label }) => {
                    const on = filter === key
                    const count =
                        key === 'all'
                            ? projects.length
                            : projects.filter((p) => p.status === key).length
                    return (
                        <button
                            key={key}
                            type="button"
                            aria-pressed={on}
                            onClick={() => setFilter(key)}
                            className={cn(
                                'min-h-11 border px-4 font-mono text-[13px] transition-colors',
                                on
                                    ? 'border-accent bg-accent text-ink'
                                    : 'border-line-strong text-fg hover:border-accent'
                            )}
                        >
                            {label}{' '}
                            <span className="opacity-70">({count})</span>
                        </button>
                    )
                })}
            </div>

            <div className="mt-8">
                <div className="hidden gap-4 border-b border-line py-3 font-mono text-[11px] tracking-wider text-faint md:flex">
                    <span className="flex-[0_0_120px]">YEAR</span>
                    <span className="flex-[1_1_420px]">PROJECT</span>
                    <span>STATUS</span>
                </div>
                {/* Re-keyed per filter so the visible rows cascade in again. */}
                <div key={filter}>
                    {shown.map((project, index) => (
                        <WorkRow
                            key={project.slug}
                            project={project}
                            order={index}
                        />
                    ))}
                </div>
                <p className="py-5 font-mono text-xs text-faint">
                    {shown.length} {shown.length === 1 ? 'project' : 'projects'}
                </p>
            </div>
        </>
    )
}

function WorkRow({ project, order }: { project: Project; order: number }) {
    return (
        <article
            id={project.slug}
            className="row-in flex scroll-mt-24 flex-wrap items-start gap-x-6 gap-y-4 border-b border-line py-7"
            style={{ '--i': order } as CSSProperties}
        >
            <div className="flex-[0_0_120px] font-mono text-xs leading-relaxed text-faint">
                {project.date}
            </div>
            <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-2.5">
                <h2 className="font-mono text-[22px] font-semibold">
                    <NavLink
                        href={`/work/${project.slug}`}
                        className="group/title inline-flex items-baseline gap-2 decoration-accent decoration-2 underline-offset-[6px] hover:text-accent hover:underline"
                    >
                        {project.name}
                        <span
                            aria-hidden
                            className="text-accent opacity-0 transition-[opacity,translate] group-hover/title:translate-x-1 group-hover/title:opacity-100 group-focus-visible/title:opacity-100"
                        >
                            →
                        </span>
                    </NavLink>
                </h2>
                {project.command ? (
                    <code className="self-start bg-ink-2 px-3 py-2 font-mono text-[13px] text-body">
                        <span className="text-faint">$</span> {project.command}
                    </code>
                ) : null}
                <p className="max-w-2xl leading-relaxed text-dim">
                    {project.tagline}
                </p>
                <p className="font-mono text-xs text-faint">
                    {project.stack.join(' · ').toLowerCase()}
                </p>
            </div>
            {project.image ? (
                // Same destination as the title, so keep it out of the tab order.
                <NavLink
                    href={`/work/${project.slug}`}
                    tabIndex={-1}
                    aria-hidden
                    className="flex-none transition-opacity hover:opacity-85"
                >
                    <ProjectShot
                        project={project}
                        sizes="200px"
                        className="aspect-16/10 w-[200px]"
                    />
                </NavLink>
            ) : null}
            <div className="flex w-32 flex-none flex-col items-end gap-1 font-mono text-xs">
                <span className={statusTone[project.status]}>
                    {statusLabel[project.status]}
                </span>
                <div className="flex gap-3.5">
                    <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        className="flex min-h-11 items-center underline hover:text-accent"
                    >
                        Code
                    </a>
                    {project.hostedLink ? (
                        <a
                            href={project.hostedLink}
                            target="_blank"
                            rel="noreferrer"
                            className="flex min-h-11 items-center underline hover:text-accent"
                        >
                            Visit
                        </a>
                    ) : null}
                </div>
            </div>
        </article>
    )
}
