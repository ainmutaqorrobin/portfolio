'use client'

import { motion } from 'framer-motion'
import { ExternalLink, ChevronsDown } from 'lucide-react'
import { GithubIcon } from '@/components/icons/github-icon'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import type { Project } from '@/lib/content'

interface ProjectCardBackProps {
    project: Project
    isExpanded: boolean
    onToggleExpand: () => void
}

export function ProjectCardBack({
    project,
    isExpanded,
    onToggleExpand,
}: ProjectCardBackProps) {
    return (
        <motion.div
            className="absolute w-full h-full rounded-xl border border-primary/40 bg-gradient-to-br from-primary/10 to-accent/10 backdrop-blur-sm overflow-y-auto lg:overflow-hidden"
            style={{
                backfaceVisibility: 'hidden',
                transform: 'rotateY(180deg)',
            }}
        >
            <div className="flex flex-col gap-4 p-6 sm:p-8 pb-10 sm:pb-10 h-full">
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
                    {project.summary.map((para, idx) => (
                        <div
                            key={para}
                            className={
                                isExpanded
                                    ? ''
                                    : idx > 0
                                      ? 'hidden lg:block'
                                      : ''
                            }
                        >
                            <p
                                className={`text-xs leading-relaxed text-foreground/80 ${!isExpanded && idx === 0 ? 'sm:line-clamp-2 lg:line-clamp-none' : ''}`}
                            >
                                {para}
                            </p>
                        </div>
                    ))}
                    {project.summary.length > 1 && (
                        <button
                            onClick={(e) => {
                                e.stopPropagation()
                                onToggleExpand()
                            }}
                            className="lg:hidden w-full flex flex-col items-center justify-center text-primary hover:text-primary/80 transition-colors pt-3"
                        >
                            {!isExpanded && (
                                <span className="text-xs mb-1">Read more</span>
                            )}
                            <motion.div
                                animate={{
                                    rotate: isExpanded ? 180 : 0,
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
                        {project.stack.map((tech) => (
                            <Badge
                                key={tech}
                                variant="outline"
                                className="text-xs"
                            >
                                {tech}
                            </Badge>
                        ))}
                    </div>
                </div>

                {/* Links */}
                <div className="mt-auto flex gap-2 border-t border-border/30 pt-3">
                    <a
                        href={project.githubRepo}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className={buttonVariants({
                            size: 'sm',
                            variant: 'outline',
                            className: 'flex-1 text-xs',
                        })}
                    >
                        <GithubIcon className="size-3" />
                        GitHub
                    </a>
                    {project.hostedLink && (
                        <a
                            href={project.hostedLink}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(e) => e.stopPropagation()}
                            className={buttonVariants({
                                size: 'sm',
                                className: 'flex-1 text-xs',
                            })}
                        >
                            <ExternalLink className="size-3" />
                            Live
                        </a>
                    )}
                </div>
            </div>
        </motion.div>
    )
}
