'use client'

import Image from 'next/image'
import { motion, type Variants } from 'framer-motion'

import { useHeroParallax } from './use-hero-parallax'

const portraitSrc = '/Myself-v2.png'

export function HeroPortrait({
    name,
    variants,
}: {
    name: string
    variants: Variants
}) {
    const parallax = useHeroParallax()

    return (
        <motion.div
            variants={variants}
            className="relative h-64 sm:h-72 md:h-80 lg:h-80 xl:h-96 mt-8 lg:mt-0"
            style={{ perspective: 1000 }}
        >
            <motion.div
                className="relative h-full w-full"
                animate={parallax}
                transition={{ type: 'spring', stiffness: 100, damping: 30 }}
                style={{ transformStyle: 'preserve-3d' }}
            >
                <div className="absolute inset-0 rounded-3xl border border-primary/20 bg-gradient-to-br from-primary/10 to-accent/10 blur-xl" />
                <div className="relative h-full w-full overflow-hidden rounded-3xl border border-primary/30 bg-background/50 backdrop-blur-sm">
                    <Image
                        src={portraitSrc}
                        alt={name}
                        fill
                        className="object-cover"
                        style={{ objectPosition: 'center 20%' }}
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent" />
                </div>
            </motion.div>
        </motion.div>
    )
}
