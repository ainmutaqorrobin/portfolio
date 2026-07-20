'use client'

import { motion } from 'framer-motion'

import { SkillIcon } from '@/components/skill-icon'
import type { ProjectCover as ProjectCoverData } from '@/lib/content'

interface ProjectCoverProps {
    cover: ProjectCoverData
}

/**
 * Cover art for projects with no UI to screenshot — CLIs and infrastructure.
 * Drawn entirely in markup so it stays theme-aware and ships no image bytes.
 */
export function ProjectCover({ cover }: ProjectCoverProps) {
    return (
        <div className="relative h-full w-full bg-background">
            {/* Wash */}
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 via-primary/5 to-transparent" />

            {/* Grid */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage:
                        'repeating-linear-gradient(0deg, currentColor 0 1px, transparent 1px 24px), repeating-linear-gradient(90deg, currentColor 0 1px, transparent 1px 24px)',
                    color: 'var(--color-primary)',
                }}
            />

            <div className="relative flex h-full flex-col justify-center gap-4 px-6">
                {/* Prompt */}
                <div className="flex items-center gap-2 font-mono text-sm">
                    <span className="text-primary/60">$</span>
                    <span className="text-foreground/85">{cover.command}</span>
                    <motion.span
                        animate={{ opacity: [1, 0, 1] }}
                        transition={{ duration: 1.2, repeat: Infinity }}
                        className="inline-block h-4 w-0.5 bg-primary"
                    />
                </div>

                {/* Glyphs */}
                <div className="flex items-center gap-3">
                    {cover.glyphs.map((glyph) => (
                        <div
                            key={glyph}
                            className="rounded-lg border border-primary/25 bg-background/60 p-2 text-primary/80 backdrop-blur-sm"
                        >
                            <SkillIcon skill={glyph} className="size-5" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
