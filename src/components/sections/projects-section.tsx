'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion } from 'framer-motion'
import {
    Github,
    ExternalLink,
    Code2,
    ChevronDown,
    ChevronsDown,
} from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
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

const projectImages: Record<string, string> = {
    'AI-Powered Notes with RAG': '/ai-notes.png',
    'Book Review Platform': '/book-review.png',
    'Ticketing App': '/ticket-app.png',
    'Recipe Shop': '/recipe-shop.png',
}

export function ProjectsSection({ projects }: { projects: Project[] }) {
    const [flipped, setFlipped] = useState<Record<string, boolean>>({})
    const [expandedDesc, setExpandedDesc] = useState<Record<string, boolean>>(
        {}
    )

    const toggleFlip = (projectName: string) => {
        setFlipped((prev) => ({
            ...prev,
            [projectName]: !prev[projectName],
        }))
    }

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <SectionReveal id="projects" delay={160}>
            <div className="space-y-12 sm:space-y-16">
                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="space-y-4 sm:space-y-6 text-center lg:text-left"
                >
                    <motion.div
                        variants={itemVariants}
                        className="inline-flex mx-auto lg:mx-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 sm:px-4 py-2"
                    >
                        <Code2 className="size-4 text-primary" />
                        <span className="text-xs sm:text-sm font-medium">
                            Featured Work
                        </span>
                    </motion.div>
                    <motion.h2
                        variants={itemVariants}
                        className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold"
                    >
                        Projects That Matter
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto lg:mx-0 max-w-3xl text-sm sm:text-base lg:text-lg text-muted-foreground"
                    >
                        A showcase of products I've built, from MVPs to
                        production systems. Click any project to see more
                        details.
                    </motion.p>
                </motion.div>

                {/* 3D Flip Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project, index) => {
                        const isFlipped = flipped[project.name] || false
                        const statusInfo = statusConfig[project.status]

                        return (
                            <motion.div
                                key={project.name}
                                variants={itemVariants}
                                className="h-80 sm:h-96 lg:h-112 cursor-pointer perspective"
                                onClick={() => toggleFlip(project.name)}
                            >
                                <motion.div
                                    className="relative w-full h-full"
                                    animate={{ rotateY: isFlipped ? 180 : 0 }}
                                    transition={{
                                        duration: 0.6,
                                        type: 'spring',
                                        stiffness: 100,
                                    }}
                                    style={{ transformStyle: 'preserve-3d' }}
                                >
                                    {/* Front side */}
                                    <motion.div
                                        className="absolute w-full h-full rounded-xl border border-primary/30 bg-background/40 overflow-hidden backdrop-blur-sm"
                                        style={{ backfaceVisibility: 'hidden' }}
                                    >
                                        {/* Image */}
                                        {projectImages[project.name] && (
                                            <div className="relative h-48 w-full overflow-hidden bg-background">
                                                <Image
                                                    src={
                                                        projectImages[
                                                            project.name
                                                        ]
                                                    }
                                                    alt={project.name}
                                                    fill
                                                    className="object-cover object-top"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                            </div>
                                        )}

                                        {/* Content */}
                                        <div className="flex flex-col gap-4 p-6">
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
                                            <div className="mt-auto flex flex-wrap gap-1.5">
                                                {project.stack
                                                    .slice(0, 2)
                                                    .map((tech) => (
                                                        <Badge
                                                            key={tech}
                                                            variant="outline"
                                                            className="text-xs"
                                                        >
                                                            {tech}
                                                        </Badge>
                                                    ))}
                                                {project.stack.length > 2 && (
                                                    <Badge
                                                        variant="outline"
                                                        className="text-xs"
                                                    >
                                                        +
                                                        {project.stack.length -
                                                            2}
                                                    </Badge>
                                                )}
                                            </div>
                                            <div className="text-center text-xs text-muted-foreground pt-4 border-t border-border/30">
                                                Click to see details →
                                            </div>
                                        </div>
                                    </motion.div>

                                    {/* Back side */}
                                    <motion.div
                                        className="absolute w-full h-full rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm overflow-y-auto lg:overflow-hidden"
                                        style={{
                                            backfaceVisibility: 'hidden',
                                            transform: 'rotateY(180deg)',
                                        }}
                                    >
                                        <div className="flex flex-col gap-4 p-4 sm:p-6 h-full">
                                            <div className="space-y-2">
                                                <h4 className="font-heading text-lg font-bold">
                                                    {project.name}
                                                </h4>
                                                <p className="text-xs text-muted-foreground">
                                                    Full details and links
                                                </p>
                                            </div>

                                            {/* Description with expand/collapse */}
                                            <div className="space-y-2">
                                                {project.summary.map(
                                                    (para, idx) => (
                                                        <div
                                                            key={para}
                                                            className={
                                                                expandedDesc[
                                                                    project.name
                                                                ]
                                                                    ? ''
                                                                    : idx > 0
                                                                      ? 'hidden'
                                                                      : ''
                                                            }
                                                        >
                                                            <p
                                                                className={`text-xs leading-relaxed text-foreground/80 ${!expandedDesc[project.name] && idx === 0 ? 'line-clamp-2' : ''}`}
                                                            >
                                                                {para}
                                                            </p>
                                                        </div>
                                                    )
                                                )}
                                                {project.summary.length > 1 && (
                                                    <button
                                                        onClick={(e) => {
                                                            e.stopPropagation()
                                                            setExpandedDesc(
                                                                (prev) => ({
                                                                    ...prev,
                                                                    [project.name]:
                                                                        !prev[
                                                                            project
                                                                                .name
                                                                        ],
                                                                })
                                                            )
                                                        }}
                                                        className="lg:hidden w-full flex flex-col items-center justify-center text-primary hover:text-primary/80 transition-colors pt-3"
                                                    >
                                                        {!expandedDesc[
                                                            project.name
                                                        ] && (
                                                            <span className="text-xs mb-1">
                                                                Read more
                                                            </span>
                                                        )}
                                                        <motion.div
                                                            animate={{
                                                                rotate: expandedDesc[
                                                                    project.name
                                                                ]
                                                                    ? 180
                                                                    : 0,
                                                            }}
                                                            transition={{
                                                                duration: 0.3,
                                                            }}
                                                        >
                                                            <ChevronsDown className="size-4" />
                                                        </motion.div>
                                                    </button>
                                                )}
                                            </div>

                                            {/* All tech stack */}
                                            <div className="space-y-2 border-t border-border/30 pt-3">
                                                <p className="text-xs font-semibold uppercase tracking-wider text-primary">
                                                    Tech Stack
                                                </p>
                                                <div className="flex flex-wrap gap-1.5">
                                                    {project.stack.map(
                                                        (tech) => (
                                                            <Badge
                                                                key={tech}
                                                                variant="outline"
                                                                className="text-xs"
                                                            >
                                                                {tech}
                                                            </Badge>
                                                        )
                                                    )}
                                                </div>
                                            </div>

                                            {/* Links */}
                                            <div className="flex gap-2 border-t border-border/30 pt-3">
                                                <a
                                                    href={project.githubRepo}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    onClick={(e) =>
                                                        e.stopPropagation()
                                                    }
                                                    className={buttonVariants({
                                                        size: 'sm',
                                                        variant: 'outline',
                                                        className:
                                                            'flex-1 text-xs',
                                                    })}
                                                >
                                                    <Github className="size-3" />
                                                    GitHub
                                                </a>
                                                {project.hostedLink && (
                                                    <a
                                                        href={
                                                            project.hostedLink
                                                        }
                                                        target="_blank"
                                                        rel="noreferrer"
                                                        onClick={(e) =>
                                                            e.stopPropagation()
                                                        }
                                                        className={buttonVariants(
                                                            {
                                                                size: 'sm',
                                                                className:
                                                                    'flex-1 text-xs',
                                                            }
                                                        )}
                                                    >
                                                        <ExternalLink className="size-3" />
                                                        Live
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            </motion.div>
                        )
                    })}
                </motion.div>

                {/* Stats section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3"
                >
                    {[
                        { label: 'Lines of Code', value: '50K+' },
                        { label: 'Deployment Cycles', value: '200+' },
                        { label: 'Technologies', value: '15+' },
                    ].map((stat, index) => (
                        <motion.div
                            key={stat.label}
                            variants={itemVariants}
                            whileHover={{
                                y: -5,
                                boxShadow:
                                    '0 20px 40px rgba(var(--primary), 0.1)',
                            }}
                            className="relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-background/60 to-background/30 p-6 backdrop-blur-sm"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 hover:opacity-100" />
                            <div className="relative space-y-2 text-center sm:text-left">
                                <p className="text-3xl font-bold text-primary">
                                    {stat.value}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </SectionReveal>
    )
}
