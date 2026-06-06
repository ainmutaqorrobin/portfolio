'use client'

import { motion, type Variants } from 'framer-motion'

export type HeroStat = { value: string | number; label: string }

export function HeroStats({
    stats,
    variants,
}: {
    stats: HeroStat[]
    variants: Variants
}) {
    return (
        <motion.div
            variants={variants}
            className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-3"
        >
            {stats.map((stat, index) => (
                <motion.div
                    key={stat.label}
                    whileHover={{
                        y: -5,
                        boxShadow: '0 20px 40px rgba(var(--primary), 0.1)',
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
    )
}
