'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import { MousePointerClick } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { ProjectCover } from '@/components/projects/project-cover'
import type { Project, ProjectStatus } from '@/lib/content'

const statusConfig: Record<ProjectStatus, { label: string; color: string }> = {
    live: { label: '🚀 Live', color: 'from-emerald-500/20 to-emerald-500/5' },
    development: {
        label: '🔨 In Development',
        color: 'from-amber-500/20 to-amber-500/5',
    },
    deprecated: {
        label: '📦 Archived',
        color: 'from-slate-500/20 to-slate-500/5',
    },
}

interface ProjectCardFrontProps {
    project: Project
}

/**
 * Shared band around whichever visual a project carries, so the screenshot and
 * generated-cover paths keep identical height, scrim, and click affordance.
 */
function CardVisual({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative h-48 w-full overflow-hidden bg-background">
            {children}
            <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

            {/* Clickable indicator */}
            <motion.div
                animate={{ scale: [1, 1.08, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-background/70 px-2.5 py-1 backdrop-blur-sm"
            >
                <MousePointerClick className="size-3.5 text-primary" />
                <span className="text-[10px] font-medium text-primary">
                    Click
                </span>
            </motion.div>
        </div>
    )
}

export function ProjectCardFront({ project }: ProjectCardFrontProps) {
    const statusInfo = statusConfig[project.status]

    return (
        <motion.div
            className="absolute w-full h-full rounded-xl border border-primary/30 bg-background/40 overflow-hidden backdrop-blur-sm"
            style={{ backfaceVisibility: 'hidden' }}
        >
            {/* Visual: screenshot for UI projects, generated cover otherwise */}
            {project.image ? (
                <CardVisual>
                    <Image
                        src={project.image}
                        alt={project.name}
                        fill
                        className="object-cover object-top"
                    />
                </CardVisual>
            ) : project.cover ? (
                <CardVisual>
                    <ProjectCover cover={project.cover} />
                </CardVisual>
            ) : null}

            {/* Content */}
            <div className="flex flex-col h-full gap-5 p-6 sm:p-7 pb-9 sm:pb-9">
                <div className="space-y-2">
                    <div className="flex items-start justify-between gap-2">
                        <h3 className="font-heading text-xl font-bold leading-tight">
                            {project.name}
                        </h3>
                        <Badge
                            className={`shrink-0 bg-linear-to-r ${statusInfo.color} border-primary/20`}
                        >
                            {statusInfo.label}
                        </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground">
                        {project.date}
                    </p>
                </div>
                <p className="line-clamp-2 text-sm text-muted-foreground">
                    {project.summary[0]}
                </p>
                <div className="mt-auto flex items-center justify-center gap-1.5 pt-4 border-t border-border/30 text-xs text-primary">
                    <span>Click to see details</span>
                    <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        →
                    </motion.span>
                </div>
            </div>
        </motion.div>
    )
}
