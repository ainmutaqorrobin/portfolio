'use client'

import { motion } from 'framer-motion'
import { BookOpen, Lightbulb, Users } from 'lucide-react'
import { SectionReveal } from '@/components/section-reveal'
import type { Profile } from '@/lib/content'

const principles = [
    {
        icon: Lightbulb,
        title: 'Practical Shipping',
        body: 'I prefer useful software over impressive complexity, and I care about whether teams can keep delivering after launch.',
        color: 'from-yellow-500/20 to-yellow-500/5',
        accent: 'text-yellow-500',
    },
    {
        icon: Users,
        title: 'Cross-Stack Ownership',
        body: 'Frontend, backend, deployment, and debugging all matter when product quality depends on the full system.',
        color: 'from-blue-500/20 to-blue-500/5',
        accent: 'text-blue-500',
    },
    {
        icon: BookOpen,
        title: 'Calm Engineering',
        body: 'Readable structure, documented decisions, and repeatable workflows beat heroics when deadlines start to tighten.',
        color: 'from-purple-500/20 to-purple-500/5',
        accent: 'text-purple-500',
    },
]

export function AboutSection({ about }: Pick<Profile, 'about'>) {
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
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

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
                        <motion.div
                            key={paragraph}
                            variants={itemVariants}
                            whileHover={{
                                y: -10,
                                boxShadow:
                                    '0 25px 50px rgba(var(--primary), 0.1)',
                            }}
                            className="group relative overflow-hidden rounded-lg sm:rounded-xl border border-primary/20 bg-gradient-to-br from-background/40 to-background/20 p-6 sm:p-8 backdrop-blur-xl cursor-default"
                        >
                            {/* Animated gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-accent/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Content */}
                            <div className="relative space-y-4">
                                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-sm sm:text-lg font-bold text-primary">
                                    {index + 1}
                                </div>
                                <p className="text-sm sm:text-base leading-relaxed text-foreground/90">
                                    {paragraph}
                                </p>
                            </div>
                        </motion.div>
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
                        {principles.map((principle, index) => {
                            const Icon = principle.icon
                            return (
                                <motion.div
                                    key={principle.title}
                                    variants={itemVariants}
                                    whileHover={{
                                        y: -15,
                                        boxShadow:
                                            '0 30px 60px rgba(0, 0, 0, 0.2)',
                                        scale: 1.02,
                                    }}
                                    className="group relative overflow-hidden rounded-lg sm:rounded-2xl border border-border/30 bg-gradient-to-br from-background/50 to-background/20 p-6 sm:p-8 backdrop-blur-md"
                                >
                                    {/* Animated gradient overlay */}
                                    <motion.div
                                        className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br ${principle.color}`}
                                        initial={{ opacity: 0 }}
                                        whileHover={{ opacity: 1 }}
                                    />

                                    {/* Animated icon background */}
                                    <motion.div
                                        className="absolute -top-12 -right-12 size-40 rounded-full bg-primary/5 blur-3xl"
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.6, 0.3],
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            delay: index * 0.5,
                                        }}
                                    />

                                    {/* Content */}
                                    <div className="relative space-y-4">
                                        <motion.div
                                            className={`inline-flex h-12 w-12 items-center justify-center rounded-lg sm:rounded-xl bg-gradient-to-br from-primary/30 to-primary/10 ${principle.accent}`}
                                            whileHover={{
                                                rotate: 360,
                                                scale: 1.1,
                                            }}
                                            transition={{ duration: 0.6 }}
                                        >
                                            <Icon className="size-6" />
                                        </motion.div>

                                        <h4 className="font-heading text-lg sm:text-xl font-semibold">
                                            {principle.title}
                                        </h4>
                                        <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                            {principle.body}
                                        </p>
                                    </div>
                                </motion.div>
                            )
                        })}
                    </div>
                </motion.div>
            </div>
        </SectionReveal>
    )
}
