import Image from 'next/image'
import { ViewTransition } from 'react'

import type { Project } from '@/lib/content'
import { cn } from '@/lib/utils'

/**
 * A project's real screenshot. It shares a transition name across pages, so
 * the same screenshot on the list and on the case study morphs between them.
 */
export function ProjectShot({
    project,
    sizes,
    priority,
    className,
}: {
    project: Project
    sizes: string
    priority?: boolean
    className?: string
}) {
    if (!project.image) return null

    return (
        <ViewTransition
            name={`shot-${project.slug}`}
            share="shot-morph"
            default="none"
        >
            <div
                className={cn(
                    'relative overflow-hidden border border-line bg-ink-2',
                    className
                )}
            >
                <Image
                    src={project.image}
                    alt={`Screenshot of ${project.name}`}
                    fill
                    sizes={sizes}
                    priority={priority}
                    className="object-cover object-top"
                />
            </div>
        </ViewTransition>
    )
}
