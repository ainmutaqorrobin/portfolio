'use client'

import { motion, type Variants } from 'framer-motion'

export function StoryCard({
    paragraph,
    index,
    variants,
}: {
    paragraph: string
    index: number
    variants: Variants
}) {
    return (
        <motion.div
            variants={variants}
            whileHover={{
                y: -10,
                boxShadow: '0 25px 50px rgba(var(--primary), 0.1)',
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
    )
}
