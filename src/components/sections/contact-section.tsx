'use client'

import { motion } from 'framer-motion'
import {
    Mail,
    Github,
    Linkedin,
    MessageCircle,
    Phone,
    ArrowRight,
    Send,
} from 'lucide-react'
import { SectionReveal } from '@/components/section-reveal'
import { buttonVariants } from '@/components/ui/button'
import type { Profile } from '@/lib/content'

export function ContactSection({ contact }: Pick<Profile, 'contact'>) {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.1,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    const contactChannels = [
        {
            icon: Mail,
            label: 'Email',
            value: contact.email,
            href: `mailto:${contact.email}`,
            description: 'Best for detailed project inquiries',
            color: 'from-blue-500/20 to-blue-500/5',
        },
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: 'Quick Chat',
            href: contact.whatsapp,
            description: 'Fastest for initial contact',
            color: 'from-green-500/20 to-green-500/5',
        },
        {
            icon: Github,
            label: 'GitHub',
            value: 'View Repos',
            href: contact.github,
            description: 'Check out my open source work',
            color: 'from-slate-500/20 to-slate-500/5',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'Connect',
            href: contact.linkedin,
            description: 'Professional networking',
            color: 'from-cyan-500/20 to-cyan-500/5',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: contact.phone,
            href: `tel:${contact.phone.replace(/\s+/g, '')}`,
            description: 'For urgent matters',
            color: 'from-purple-500/20 to-purple-500/5',
        },
    ]

    return (
        <SectionReveal id="contact" delay={200}>
            <div className="space-y-12 sm:space-y-16">
                {/* Header */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="space-y-4 sm:space-y-6 text-center"
                >
                    <motion.h2
                        variants={itemVariants}
                        className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold"
                    >
                        Let's Work Together
                    </motion.h2>
                    <motion.p
                        variants={itemVariants}
                        className="mx-auto max-w-2xl text-sm sm:text-base lg:text-lg text-muted-foreground"
                    >
                        I'm always interested in hearing about new projects and
                        opportunities. Feel free to reach out through any of the
                        channels below.
                    </motion.p>
                </motion.div>

                {/* Contact Grid */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="grid gap-4 sm:gap-6 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
                >
                    {contactChannels.map((channel, index) => {
                        const Icon = channel.icon
                        return (
                            <motion.a
                                key={channel.label}
                                href={channel.href}
                                target={
                                    channel.href.startsWith('http')
                                        ? '_blank'
                                        : undefined
                                }
                                rel={
                                    channel.href.startsWith('http')
                                        ? 'noreferrer'
                                        : undefined
                                }
                                variants={itemVariants}
                                whileHover={{
                                    y: -12,
                                    boxShadow:
                                        '0 30px 60px rgba(var(--primary), 0.2)',
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
                                        Connect{' '}
                                        <ArrowRight className="h-3 w-3" />
                                    </motion.div>
                                </div>
                            </motion.a>
                        )
                    })}
                </motion.div>

                {/* CTA Section */}
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-100px' }}
                    className="relative overflow-hidden rounded-lg sm:rounded-2xl border border-primary/30 bg-linear-to-br from-primary/5 to-accent/5 p-6 sm:p-8 lg:p-12 backdrop-blur-sm"
                >
                    {/* Animated background elements */}
                    <motion.div
                        className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-primary/10 blur-3xl"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />
                    <motion.div
                        className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
                        animate={{
                            scale: [1.2, 1, 1.2],
                            opacity: [0.3, 0.6, 0.3],
                        }}
                        transition={{ duration: 5, repeat: Infinity }}
                    />

                    <div className="relative space-y-4 sm:space-y-6 text-center">
                        <motion.h3
                            variants={itemVariants}
                            className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold"
                        >
                            Ready to start something new?
                        </motion.h3>
                        <motion.p
                            variants={itemVariants}
                            className="mx-auto max-w-xl text-xs sm:text-sm lg:text-base text-muted-foreground"
                        >
                            Whether you need a developer for web, backend,
                            mobile, or DevOps work, I'm open to opportunities
                            and collaborations.
                        </motion.p>
                        <motion.div
                            variants={itemVariants}
                            className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
                        >
                            <a
                                href={`mailto:${contact.email}`}
                                className={buttonVariants({
                                    size: 'lg',
                                    className:
                                        'w-full sm:w-auto text-xs sm:text-sm',
                                })}
                            >
                                <Send className="h-4 sm:h-5 w-4 sm:w-5" />
                                Send Email
                            </a>
                            <a
                                href={contact.whatsapp}
                                target="_blank"
                                rel="noreferrer"
                                className={buttonVariants({
                                    size: 'lg',
                                    variant: 'outline',
                                    className:
                                        'w-full sm:w-auto text-xs sm:text-sm',
                                })}
                            >
                                <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                                Message on WhatsApp
                            </a>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer note */}
                <motion.div
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center text-xs sm:text-sm text-muted-foreground"
                >
                    <p>
                        Based in Malaysia • Available for remote and on-site
                        work
                    </p>
                </motion.div>
            </div>
        </SectionReveal>
    )
}
