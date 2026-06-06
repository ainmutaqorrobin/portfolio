'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import { GithubIcon } from '@/components/icons/github-icon'
import { buttonVariants } from '@/components/ui/button'
import type { Profile } from '@/lib/content'

export function HeroIntro({
    profile,
    variants,
}: {
    profile: Profile
    variants: Variants
}) {
    const { contact } = profile

    return (
        <motion.div
            variants={variants}
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
                        transition={{ duration: 0.8, delay: 0.1 }}
                        className="block text-foreground"
                    >
                        {profile.name}
                    </motion.span>
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="block bg-gradient-to-r from-primary via-primary to-accent bg-clip-text text-transparent"
                    >
                        {profile.role}
                    </motion.span>
                </h1>

                <motion.p
                    variants={variants}
                    className="text-base sm:text-lg lg:text-xl leading-relaxed text-muted-foreground"
                >
                    {profile.tagline}
                </motion.p>
            </div>

            <motion.p
                variants={variants}
                className="text-sm sm:text-base leading-relaxed text-foreground/80"
            >
                {profile.heroSummary}
            </motion.p>

            {/* CTA Buttons - Stack on mobile */}
            <motion.div
                variants={variants}
                className="flex flex-col sm:flex-row justify-center lg:justify-start gap-3 sm:gap-4"
            >
                <a
                    href="#projects"
                    className={buttonVariants({
                        size: 'lg',
                        className: 'w-full sm:w-auto text-xs sm:text-sm',
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
                        className: 'w-full sm:w-auto text-xs sm:text-sm',
                    })}
                >
                    <GithubIcon className="size-4 sm:size-5" />
                    GitHub
                </a>
            </motion.div>
        </motion.div>
    )
}
