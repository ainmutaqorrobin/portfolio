'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

import { HeroIntro } from '@/components/hero/hero-intro'
import { HeroPortrait } from '@/components/hero/hero-portrait'
import { HeroSkills } from '@/components/hero/hero-skills'
import { HeroStats } from '@/components/hero/hero-stats'
import { fadeInItem, staggerContainer } from '@/lib/motion'
import type { Profile } from '@/lib/content'

export function HeroSection({
    profile,
    projectCount,
}: {
    profile: Profile
    projectCount: number
}) {
    const containerVariants = staggerContainer(0.15, 0.2)
    const itemVariants = fadeInItem({ y: 30, duration: 0.8 })

    const skillGroups = Object.entries(profile.skills) as [string, string[]][]

    const stats = [
        { value: `${projectCount}+`, label: 'Projects Built' },
        { value: profile.workExperience.length, label: 'Roles Held' },
        {
            value: Object.keys(profile.skills).length,
            label: 'Skill Categories',
        },
    ]

    return (
        <section
            id="hero"
            className="relative min-h-screen overflow-hidden rounded-3xl bg-gradient-to-b from-background via-background to-background/95"
        >
            {/* Animated background elements */}
            <motion.div
                className="absolute inset-0 opacity-40"
                animate={{
                    background: [
                        'radial-gradient(circle at 20% 50%, rgba(var(--primary), 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 80% 80%, rgba(var(--accent), 0.1) 0%, transparent 50%)',
                        'radial-gradient(circle at 40% 20%, rgba(var(--primary), 0.1) 0%, transparent 50%)',
                    ],
                }}
                transition={{ duration: 8, repeat: Infinity }}
            />

            <div className="relative z-10 w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20 max-w-7xl">
                <motion.div
                    className="space-y-12 sm:space-y-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main hero content */}
                    <div className="grid items-center gap-8 sm:gap-12 lg:grid-cols-2">
                        <HeroIntro profile={profile} variants={itemVariants} />
                        <HeroPortrait
                            name={profile.name}
                            variants={itemVariants}
                        />
                    </div>

                    <HeroStats stats={stats} variants={itemVariants} />
                    <HeroSkills
                        skillGroups={skillGroups}
                        variants={itemVariants}
                    />
                </motion.div>

                {/* Scroll indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <ChevronDown className="size-6 text-muted-foreground" />
                </motion.div>
            </div>
        </section>
    )
}
