'use client'

import { motion, type Variants } from 'framer-motion'
import { ArrowRight } from 'lucide-react'

import type { ContactChannel } from './contact-data'

export function ContactChannelCard({
    channel,
    index,
    variants,
}: {
    channel: ContactChannel
    index: number
    variants: Variants
}) {
    const Icon = channel.icon
    const isExternal = channel.href.startsWith('http')

    return (
        <motion.a
            href={channel.href}
            target={isExternal ? '_blank' : undefined}
            rel={isExternal ? 'noreferrer' : undefined}
            variants={variants}
            whileHover={{
                y: -12,
                boxShadow: '0 30px 60px rgba(var(--primary), 0.2)',
            }}
            className="group relative overflow-hidden rounded-lg border border-primary/20 bg-gradient-to-br from-background/60 to-background/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-primary/40"
        >
            {/* Animated gradient background */}
            <motion.div
                className={`absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 bg-linear-to-br ${channel.color}`}
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
            />

            {/* Animated glow effect */}
            <motion.div
                className="absolute -top-8 -right-8 h-24 w-24 rounded-full bg-primary/10 blur-2xl"
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: index * 0.3,
                }}
            />

            {/* Content */}
            <div className="relative space-y-3">
                <motion.div
                    className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-primary/20 text-primary group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                >
                    <Icon className="h-5 w-5" />
                </motion.div>

                <div>
                    <p className="text-sm font-semibold text-foreground">
                        {channel.label}
                    </p>
                    <p className="text-xs text-muted-foreground group-hover:text-foreground/70 transition-colors line-clamp-1">
                        {channel.value}
                    </p>
                </div>

                <p className="text-xs text-muted-foreground group-hover:text-foreground/60 transition-colors">
                    {channel.description}
                </p>

                <motion.div
                    className="inline-flex items-center gap-1 text-xs text-primary opacity-0 transition-all duration-300 group-hover:opacity-100"
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                >
                    Connect <ArrowRight className="h-3 w-3" />
                </motion.div>
            </div>
        </motion.a>
    )
}
