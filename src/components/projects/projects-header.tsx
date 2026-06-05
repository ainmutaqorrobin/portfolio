'use client'

import { motion } from 'framer-motion'
import { Code2 } from 'lucide-react'

interface ProjectsHeaderProps {
    containerVariants: any
    itemVariants: any
}

export function ProjectsHeader({
    containerVariants,
    itemVariants,
}: ProjectsHeaderProps) {
    return (
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
                A showcase of products I've built, from MVPs to production
                systems. Click any project to see more details.
            </motion.p>
        </motion.div>
    )
}
