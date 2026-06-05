'use client'

import { motion } from 'framer-motion'
import { Briefcase, Calendar, Star } from 'lucide-react'
import { SectionReveal } from '@/components/section-reveal'
import type { Profile } from '@/lib/content'

export function ExperienceSection({
    workExperience,
}: Pick<Profile, 'workExperience'>) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, x: -30 },
        visible: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <SectionReveal id="experience" delay={120}>
            <div className="space-y-12 sm:space-y-16">
                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="space-y-4 sm:space-y-6 text-center lg:text-left"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold"
                    >
                        Work Experience
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto lg:mx-0 max-w-3xl text-base sm:text-lg text-muted-foreground"
                    >
                        A timeline of roles, responsibilities, and impact across
                        different organizations and industries.
                    </motion.p>
                </motion.div>

                {/* Timeline */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="space-y-6 sm:space-y-8"
                >
                    {workExperience.map((job, index) => {
                        const [periodStart, periodEnd] = job.period
                            .split(' - ')
                            .map((v) => v.trim())
                        const isCurrentRole = periodEnd === 'Present'

                        return (
                            <motion.div
                                key={`${job.company}-${index}`}
                                variants={itemVariants}
                                className="group relative"
                            >
                                {/* Connector line - Hidden on mobile, visible on larger screens */}
                                {index < workExperience.length - 1 && (
                                    <motion.div
                                        className="hidden sm:block absolute left-6 sm:left-12 top-32 h-12 w-1 rounded-full bg-linear-to-b from-primary to-transparent"
                                        initial={{ scaleY: 0 }}
                                        whileInView={{ scaleY: 1 }}
                                        viewport={{ once: true }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.2,
                                        }}
                                    />
                                )}

                                <div className="flex gap-4 sm:gap-6 lg:gap-12">
                                    {/* Timeline dot */}
                                    <motion.div
                                        className="relative flex flex-col items-center shrink-0"
                                        whileInView={{ scale: [0.8, 1.2, 1] }}
                                        transition={{
                                            duration: 0.6,
                                            delay: index * 0.15,
                                        }}
                                        viewport={{ once: true }}
                                    >
                                        <div
                                            className={`relative z-10 flex h-10 sm:h-12 w-10 sm:w-12 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                                                isCurrentRole
                                                    ? 'border-primary bg-primary/20 shadow-lg shadow-primary/50'
                                                    : 'border-primary/40 bg-background group-hover:border-primary group-hover:bg-primary/10'
                                            }`}
                                        >
                                            {isCurrentRole ? (
                                                <Star
                                                    className="h-4 sm:h-5 w-4 sm:w-5 text-primary"
                                                    fill="currentColor"
                                                />
                                            ) : (
                                                <Briefcase className="h-4 sm:h-5 w-4 sm:w-5 text-primary" />
                                            )}
                                        </div>
                                    </motion.div>

                                    {/* Content */}
                                    <motion.div
                                        whileHover={{
                                            y: -8,
                                            boxShadow:
                                                '0 25px 50px rgba(var(--primary), 0.15)',
                                        }}
                                        className="flex-1 overflow-hidden rounded-lg sm:rounded-xl border border-primary/20 bg-linear-to-br from-background/60 to-background/30 p-5 sm:p-8 lg:p-10 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 mb-4 sm:mb-0"
                                    >
                                        {/* Animated gradient background */}
                                        <div className="absolute inset-0 bg-linear-to-r from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                                        <div className="relative space-y-3 sm:space-y-4">
                                            {/* Header */}
                                            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-xs font-bold uppercase tracking-widest text-primary">
                                                        {job.company}
                                                    </p>
                                                    <h3 className="font-heading text-lg sm:text-2xl font-bold">
                                                        {job.role}
                                                    </h3>
                                                </div>
                                                {isCurrentRole && (
                                                    <motion.div
                                                        initial={{
                                                            scale: 0.8,
                                                            opacity: 0,
                                                        }}
                                                        whileInView={{
                                                            scale: 1,
                                                            opacity: 1,
                                                        }}
                                                        transition={{
                                                            duration: 0.4,
                                                        }}
                                                        viewport={{
                                                            once: true,
                                                        }}
                                                        className="inline-flex items-center gap-1.5 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold text-primary shrink-0"
                                                    >
                                                        <span className="relative flex h-2 w-2">
                                                            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                                            <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                                                        </span>
                                                        Current Role
                                                    </motion.div>
                                                )}
                                            </div>

                                            {/* Summary */}
                                            <p className="text-sm sm:text-base leading-relaxed text-foreground/80">
                                                {job.summary}
                                            </p>

                                            {/* Timeline info */}
                                            <div className="flex flex-row items-center gap-2 text-xs sm:text-sm text-muted-foreground pt-2 border-t border-border/30">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="h-3 sm:h-4 w-3 sm:w-4 text-primary/60 shrink-0" />
                                                    <span>{periodStart}</span>
                                                </div>
                                                <span className="text-primary/60">
                                                    →
                                                </span>
                                                <span>
                                                    {periodEnd || 'Present'}
                                                </span>
                                            </div>

                                            {/* Highlights */}
                                            <div className="space-y-3 border-t border-border/30 pt-3 sm:pt-4">
                                                <p className="text-xs font-bold uppercase tracking-widest text-primary/80">
                                                    Key Highlights
                                                </p>
                                                <motion.ul
                                                    className="space-y-2"
                                                    initial="hidden"
                                                    whileInView="visible"
                                                    viewport={{ once: true }}
                                                    variants={{
                                                        visible: {
                                                            transition: {
                                                                staggerChildren: 0.1,
                                                            },
                                                        },
                                                    }}
                                                >
                                                    {job.highlights.map(
                                                        (highlight) => (
                                                            <motion.li
                                                                key={highlight}
                                                                variants={{
                                                                    hidden: {
                                                                        opacity: 0,
                                                                        x: -10,
                                                                    },
                                                                    visible: {
                                                                        opacity: 1,
                                                                        x: 0,
                                                                    },
                                                                }}
                                                                className="flex gap-3 text-xs sm:text-sm text-muted-foreground"
                                                            >
                                                                <span className="mt-1 inline-flex h-2 w-2 shrink-0 rounded-full bg-primary/60" />
                                                                <span>
                                                                    {highlight}
                                                                </span>
                                                            </motion.li>
                                                        )
                                                    )}
                                                </motion.ul>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        )
                    })}
                </motion.div>
            </div>
        </SectionReveal>
    )
}
