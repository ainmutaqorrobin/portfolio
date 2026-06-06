'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'

import { SectionReveal } from '@/components/section-reveal'
import { ProjectCard } from '@/components/projects/project-card'
import { ProjectsHeader } from '@/components/projects/projects-header'
import { ProjectsStats } from '@/components/projects/projects-stats'
import { fadeInItem, staggerContainer } from '@/lib/motion'
import type { Project } from '@/lib/content'

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

    const toggleExpand = (projectName: string) => {
        setExpandedDesc((prev) => ({
            ...prev,
            [projectName]: !prev[projectName],
        }))
    }

    const containerVariants = staggerContainer(0.15, 0.1)
    const itemVariants = fadeInItem({ y: 30 })

    return (
        <SectionReveal id="projects" delay={160}>
            <div className="space-y-12 sm:space-y-16">
                <ProjectsHeader
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />

                {/* 3D Flip Cards Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {projects.map((project) => (
                        <ProjectCard
                            key={project.name}
                            project={project}
                            isFlipped={flipped[project.name] || false}
                            isExpanded={expandedDesc[project.name] || false}
                            onToggleFlip={() => toggleFlip(project.name)}
                            onToggleExpand={() => toggleExpand(project.name)}
                            itemVariants={itemVariants}
                        />
                    ))}
                </motion.div>

                <ProjectsStats
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />
            </div>
        </SectionReveal>
    )
}
