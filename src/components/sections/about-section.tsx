'use client'

import { motion } from 'framer-motion'

import { principles } from '@/components/about/about-data'
import { PrincipleCard } from '@/components/about/principle-card'
import { StoryCard } from '@/components/about/story-card'
import { SectionReveal } from '@/components/section-reveal'
import { fadeInItem, staggerContainer } from '@/lib/motion'
import type { Profile } from '@/lib/content'

export function AboutSection({ about }: Pick<Profile, 'about'>) {
    const containerVariants = staggerContainer(0.2, 0.1)
    const itemVariants = fadeInItem({ y: 20 })

    return (
        <SectionReveal id="about" delay={80}>
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
                        About Me
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto lg:mx-0 max-w-3xl text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed"
                    >
                        I'm a software engineer passionate about building
                        systems that teams can ship with confidence. Here's what
                        drives my work:
                    </motion.p>
                </motion.div>

                {/* Story paragraphs with glassmorphism */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
                >
                    {about.map((paragraph, index) => (
                        <StoryCard
                            key={paragraph}
                            paragraph={paragraph}
                            index={index}
                            variants={itemVariants}
                        />
                    ))}
                </motion.div>

                {/* Core principles with 3D cards */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="space-y-6 sm:space-y-8"
                >
                    <motion.h3
                        variants={itemVariants}
                        className="font-heading text-2xl sm:text-3xl font-bold text-center lg:text-left"
                    >
                        My Engineering Philosophy
                    </motion.h3>

                    <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3">
                        {principles.map((principle, index) => (
                            <PrincipleCard
                                key={principle.title}
                                principle={principle}
                                index={index}
                                variants={itemVariants}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </SectionReveal>
    )
}
