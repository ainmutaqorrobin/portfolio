'use client'

import { motion } from 'framer-motion'

import { buildContactChannels } from '@/components/contact/contact-data'
import { ContactChannelCard } from '@/components/contact/contact-channel-card'
import { ContactCta } from '@/components/contact/contact-cta'
import { SectionReveal } from '@/components/section-reveal'
import { fadeInItem, staggerContainer } from '@/lib/motion'
import type { Profile } from '@/lib/content'

export function ContactSection({ contact }: Pick<Profile, 'contact'>) {
    const containerVariants = staggerContainer(0.15, 0.1)
    const itemVariants = fadeInItem({ y: 30 })

    const contactChannels = buildContactChannels(contact)

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
                    {contactChannels.map((channel, index) => (
                        <ContactChannelCard
                            key={channel.label}
                            channel={channel}
                            index={index}
                            variants={itemVariants}
                        />
                    ))}
                </motion.div>

                {/* CTA Section */}
                <ContactCta
                    contact={contact}
                    containerVariants={containerVariants}
                    itemVariants={itemVariants}
                />

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
