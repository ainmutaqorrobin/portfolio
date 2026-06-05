'use client'

import Image from 'next/image'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, Github, ChevronDown } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { SkillIcon } from '@/components/skill-icon'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import type { Profile } from '@/lib/content'

const portraitSrc = '/Myself-v2.png'

export function HeroSection({
    profile,
    projectCount,
}: {
    profile: Profile
    projectCount: number
}) {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [scrollY, setScrollY] = useState(0)
    const [isMobile, setIsMobile] = useState(false)
    const { contact } = profile
    const skillGroups = Object.entries(profile.skills)

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024)
        const handleMouseMove = (e: MouseEvent) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1024)
        }
        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8 },
        },
    }

    const stats = [
        { value: projectCount + '+', label: 'Projects Built' },
        { value: profile.workExperience.length, label: 'Roles Held' },
        {
            value: Object.keys(profile.skills).length,
            label: 'Skill Categories',
        },
    ]

    return (
        <section
            id="hero"
            className="relative min-h-screen overflow-hidden bg-gradient-to-b from-background via-background to-background/95"
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
                        {/* Left: Text content - Centered on mobile */}
                        <motion.div
                            variants={itemVariants}
                            className="space-y-6 sm:space-y-8 text-center lg:text-left"
                        >
                            <div className="space-y-3 sm:space-y-4">
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.6 }}
                                    className="inline-flex mx-auto lg:mx-0 items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-3 sm:px-4 py-2"
                                >
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                                        <span className="relative inline-flex size-2 rounded-full bg-primary" />
                                    </span>
                                    <span className="text-xs sm:text-sm font-medium text-primary">
                                        Available for opportunities
                                    </span>
                                </motion.div>

                                <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.1,
                                        }}
                                        className="block text-foreground"
                                    >
                                        {profile.name}
                                    </motion.span>
                                    <motion.span
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.2,
                                        }}
                                        className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
                                    >
                                        {profile.role}
                                    </motion.span>
                                </h1>

                                <motion.p
                                    variants={itemVariants}
                                    className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground"
                                >
                                    {profile.tagline}
                                </motion.p>
                            </div>

                            <motion.p
                                variants={itemVariants}
                                className="text-sm sm:text-base leading-relaxed text-foreground/80"
                            >
                                {profile.heroSummary}
                            </motion.p>

                            {/* CTA Buttons - Stack on mobile */}
                            <motion.div
                                variants={itemVariants}
                                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
                            >
                                <a
                                    href="#projects"
                                    className={buttonVariants({
                                        size: 'lg',
                                        className:
                                            'w-full sm:w-auto text-xs sm:text-sm',
                                    })}
                                >
                                    Explore Projects
                                    <ArrowRight className="size-4 sm:size-5" />
                                </a>
                                <a
                                    href={contact.github}
                                    target="_blank"
                                    rel="noreferrer"
                                    className={buttonVariants({
                                        size: 'lg',
                                        variant: 'outline',
                                        className:
                                            'w-full sm:w-auto text-xs sm:text-sm',
                                    })}
                                >
                                    <Github className="size-4 sm:size-5" />
                                    GitHub
                                </a>
                            </motion.div>
                        </motion.div>

                        {/* Right: 3D animated image - Hidden on very small mobile */}
                        <motion.div
                            variants={itemVariants}
                            className="relative h-64 sm:h-72 md:h-80 lg:h-80 xl:h-96 mt-8 lg:mt-0"
                            style={{
                                perspective: 1000,
                            }}
                        >
                            <motion.div
                                className="relative h-full w-full"
                                animate={{
                                    y: isMobile ? 0 : scrollY * 0.5,
                                    rotateX: isMobile
                                        ? 0
                                        : (mousePosition.y - 300) * 0.02,
                                    rotateY: isMobile
                                        ? 0
                                        : (mousePosition.x - 300) * 0.02,
                                }}
                                transition={{
                                    type: 'spring',
                                    stiffness: 100,
                                    damping: 30,
                                }}
                                style={{
                                    transformStyle: 'preserve-3d',
                                }}
                            >
                                <div className="absolute inset-0 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 blur-xl" />
                                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-primary/30 bg-background/50 backdrop-blur-sm">
                                    <Image
                                        src={portraitSrc}
                                        alt={profile.name}
                                        fill
                                        className="object-cover"
                                        style={{ objectPosition: 'center 20%' }}
                                        priority
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                                </div>
                            </motion.div>
                        </motion.div>
                    </div>

                    {/* Stats with animated counters */}
                    <motion.div
                        variants={itemVariants}
                        className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3"
                    >
                        {stats.map((stat, index) => (
                            <motion.div
                                key={stat.label}
                                whileHover={{
                                    y: -5,
                                    boxShadow:
                                        '0 20px 40px rgba(var(--primary), 0.1)',
                                }}
                                className="group relative overflow-hidden rounded-3xl border border-primary/20 bg-gradient-to-br from-background/80 to-background/40 p-6 backdrop-blur-sm cursor-pointer"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-accent/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                                <div className="relative space-y-3">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.5 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{
                                            duration: 0.6,
                                            delay: 0.3 + index * 0.1,
                                        }}
                                        className="font-heading text-3xl sm:text-4xl font-bold text-primary text-center sm:text-left"
                                    >
                                        {stat.value}
                                    </motion.div>
                                    <p className="text-xs sm:text-sm text-muted-foreground group-hover:text-foreground/80 transition-colors text-center sm:text-left">
                                        {stat.label}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>

                    {/* Skills showcase with scroll animation */}
                    <motion.div
                        variants={itemVariants}
                        className="space-y-4 sm:space-y-6"
                    >
                        <h3 className="font-heading text-2xl sm:text-3xl font-semibold text-center lg:text-left">
                            Skills & Technologies
                        </h3>
                        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                            {skillGroups.map(
                                ([category, skills], categoryIndex) => (
                                    <motion.div
                                        key={category}
                                        whileHover={{
                                            y: -8,
                                            boxShadow:
                                                '0 20px 40px rgba(var(--primary), 0.15)',
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
                                                {(skills as string[]).map(
                                                    (skill) => (
                                                        <motion.div
                                                            key={skill}
                                                            whileHover={{
                                                                scale: 1.05,
                                                            }}
                                                            className="inline-flex items-center gap-1.5 rounded-full border border-border/40 bg-background/70 px-3 py-1.5 text-xs text-foreground/80 hover:border-primary/50 hover:text-primary transition-colors"
                                                        >
                                                            <SkillIcon
                                                                skill={skill}
                                                            />
                                                            {skill}
                                                        </motion.div>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                    </motion.div>
                                )
                            )}
                        </div>
                    </motion.div>
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
