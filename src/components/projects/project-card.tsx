'use client'

import { motion } from 'framer-motion'
import { ProjectCardFront } from './project-card-front'
import { ProjectCardBack } from './project-card-back'
import type { Project } from '@/lib/content'

interface ProjectCardProps {
    project: Project
    isFlipped: boolean
    isExpanded: boolean
    onToggleFlip: () => void
    onToggleExpand: () => void
    itemVariants: any
}

export function ProjectCard({
    project,
    isFlipped,
    isExpanded,
    onToggleFlip,
    onToggleExpand,
    itemVariants,
}: ProjectCardProps) {
    return (
        <motion.div
            variants={itemVariants}
            className="h-96 sm:h-112 lg:h-120 cursor-pointer perspective mb-4 sm:mb-6"
            onClick={onToggleFlip}
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
                <ProjectCardFront project={project} />
                <ProjectCardBack
                    project={project}
                    isExpanded={isExpanded}
                    onToggleExpand={onToggleExpand}
                />
            </motion.div>
        </motion.div>
    )
}
