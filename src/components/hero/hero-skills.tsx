'use client'

import { motion, type Variants } from 'framer-motion'

import { SkillIcon } from '@/components/skill-icon'

export function HeroSkills({
    skillGroups,
    variants,
}: {
    skillGroups: [string, string[]][]
    variants: Variants
}) {
    return (
        <motion.div variants={variants} className="space-y-4 sm:space-y-6">
            <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-center lg:text-left">
                Skills & Technologies
            </h3>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                {skillGroups.map(([category, skills], categoryIndex) => (
                    <motion.div
                        key={category}
                        whileHover={{
                            y: -8,
                            boxShadow: '0 20px 40px rgba(var(--primary), 0.15)',
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                            duration: 0.6,
                            delay: 0.5 + categoryIndex * 0.1,
                        }}
                        className="group relative overflow-hidden rounded-3xl border border-border/30 bg-gradient-to-br from-background/60 to-background/30 p-6 backdrop-blur-sm"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                        <div className="relative space-y-4">
                            <p className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-primary text-center sm:text-left">
                                {category}
                            </p>
                            <div className="flex flex-wrap gap-2 justify-center sm:justify-start">
                                {skills.map((skill) => (
                                    <motion.div
                                        key={skill}
                                        whileHover={{ scale: 1.05 }}
                                        className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/70 px-3 py-1.5 text-xs text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
                                    >
                                        <SkillIcon skill={skill} />
                                        {skill}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    )
}
