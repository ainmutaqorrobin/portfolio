'use client'

import { motion } from 'framer-motion'

import { ExperienceItem } from '@/components/experience/experience-item'
import { SectionReveal } from '@/components/section-reveal'
import { fadeInItem, staggerContainer } from '@/lib/motion'
import type { Profile } from '@/lib/content'

export function ExperienceSection({
    workExperience,
}: Pick<Profile, 'workExperience'>) {
    const containerVariants = staggerContainer(0.2, 0.1)
    const itemVariants = fadeInItem({ x: -30 })

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
                    {workExperience.map((job, index) => (
                        <ExperienceItem
                            key={`${job.company}-${index}`}
                            job={job}
                            index={index}
                            isLast={index === workExperience.length - 1}
                            variants={itemVariants}
                        />
                    ))}
                </motion.div>
            </div>
        </SectionReveal>
    )
}
