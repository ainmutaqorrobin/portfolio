'use client'

import { motion, type Variants } from 'framer-motion'
import { MessageCircle, Send } from 'lucide-react'

import { buttonVariants } from '@/components/ui/button'
import type { Profile } from '@/lib/content'

export function ContactCta({
    contact,
    containerVariants,
    itemVariants,
}: {
    contact: Profile['contact']
    containerVariants: Variants
    itemVariants: Variants
}) {
    return (
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
                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 5, repeat: Infinity }}
            />
            <motion.div
                className="absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-accent/10 blur-3xl"
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.3, 0.6, 0.3] }}
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
                    Whether you need a developer for web, backend, mobile, or
                    DevOps work, I'm open to opportunities and collaborations.
                </motion.p>
                <motion.div
                    variants={itemVariants}
                    className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4"
                >
                    <a
                        href={`mailto:${contact.email}`}
                        className={buttonVariants({
                            size: 'lg',
                            className: 'w-full sm:w-auto text-xs sm:text-sm',
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
                            className: 'w-full sm:w-auto text-xs sm:text-sm',
                        })}
                    >
                        <MessageCircle className="h-4 sm:h-5 w-4 sm:w-5" />
                        Message on WhatsApp
                    </a>
                </motion.div>
            </div>
        </motion.div>
    )
}
