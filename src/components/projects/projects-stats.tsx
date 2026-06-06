'use client'

import { motion, type Variants } from 'framer-motion'

interface ProjectsStatsProps {
    containerVariants: Variants
    itemVariants: Variants
}

const stats = [
    { label: 'Lines of Code', value: '50K+' },
    { label: 'Deployment Cycles', value: '200+' },
    { label: 'Technologies', value: '15+' },
]

export function ProjectsStats({
    containerVariants,
    itemVariants,
}: ProjectsStatsProps) {
    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3"
        >
            {stats.map((stat) => (
                <motion.div
                    key={stat.label}
                    variants={itemVariants}
                    whileHover={{
                        y: -5,
                        boxShadow: '0 20px 40px rgba(var(--primary), 0.1)',
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
    )
}
