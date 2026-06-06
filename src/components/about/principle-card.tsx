'use client'

import { motion, type Variants } from 'framer-motion'

import type { Principle } from './about-data'

export function PrincipleCard({
    principle,
    index,
    variants,
}: {
    principle: Principle
    index: number
    variants: Variants
}) {
    const Icon = principle.icon

    return (
        <motion.div
            variants={variants}
            whileHover={{
                y: -15,
                boxShadow: '0 30px 60px rgba(0, 0, 0, 0.2)',
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
                    whileHover={{ rotate: 360, scale: 1.1 }}
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
}
