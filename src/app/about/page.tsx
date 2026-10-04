import type { Metadata } from 'next'
import Image from 'next/image'

import { PageTransition } from '@/components/site/page-transition'
import {
    Eyebrow,
    PageTitle,
    reveal,
    SectionLabel,
    SplitSection,
} from '@/components/ui'
import { StackIcon } from '@/components/stack-icon'
import { siteProfile } from '@/lib/content'

export const metadata: Metadata = {
    title: 'About',
    description:
        'How Ain Mutaqorrobin works, the current learning focus, and the full technology stack.',
    alternates: { canonical: '/about' },
}

export default function AboutPage() {
    const { about, principles, skills, learning, location } = siteProfile

    return (
        <PageTransition>
            <section className="flex flex-wrap gap-10 pt-18 pb-14">
                <div className="flex min-w-0 flex-[3_1_520px] flex-col gap-5">
                    <Eyebrow className="reveal" style={reveal(0)}>
                        About
                    </Eyebrow>
                    <div className="reveal" style={reveal(1)}>
                        <PageTitle>About me</PageTitle>
                    </div>
                    <div
                        className="reveal flex max-w-2xl flex-col gap-4 text-[19px] leading-relaxed text-body"
                        style={reveal(2)}
                    >
                        {about.map((paragraph) => (
                            <p key={paragraph}>{paragraph}</p>
                        ))}
                    </div>
                </div>
                <figure
                    className="reveal flex flex-[2_1_300px] flex-col gap-2.5"
                    style={reveal(3)}
                >
                    <div className="relative h-[460px] overflow-hidden border border-line bg-ink-2">
                        <Image
                            src="/Myself-v2.png"
                            alt="Ain Mutaqorrobin in a baju Melayu, raising one hand toward the camera"
                            fill
                            sizes="(min-width: 1024px) 420px, 100vw"
                            className="object-cover object-top contrast-110 grayscale"
                        />
                    </div>
                    <figcaption className="font-mono text-xs text-faint">
                        ain.png · {location}
                    </figcaption>
                </figure>
            </section>

            <section
                className="reveal flex flex-col gap-6 border-t border-line py-14"
                style={reveal(4)}
            >
                <SectionLabel>How I work</SectionLabel>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-px border border-line bg-line">
                    {principles.map((principle, i) => (
                        <div
                            key={principle.title}
                            className="flex flex-col gap-3 bg-ink p-7"
                        >
                            <span className="font-mono text-xs text-accent">
                                {String(i + 1).padStart(2, '0')}
                            </span>
                            <h3 className="text-[21px] font-semibold">
                                {principle.title}
                            </h3>
                            <p className="leading-relaxed text-dim">
                                {principle.body}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            <section
                className="reveal flex flex-col gap-6 border-t border-line py-14 font-mono"
                style={reveal(5)}
            >
                <SectionLabel>Tech stack</SectionLabel>
                {/*
                  One card per category, one tag per tool. Tags never break
                  across lines, so "Tailwind CSS" or "Monorepo (Nx, Turbo)"
                  always reads as a single item.
                */}
                <ul className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-px border border-line bg-line">
                    {Object.entries(skills).map(([group, items]) => (
                        <li
                            key={group}
                            className="flex flex-col gap-4 bg-ink p-5"
                        >
                            <h3 className="flex items-baseline justify-between gap-3 text-[13px] font-semibold text-fg">
                                {group}
                                <span className="text-[11px] font-normal text-faint">
                                    {items.length}
                                </span>
                            </h3>
                            <ul className="flex flex-wrap gap-1.5">
                                {items.map((item) => (
                                    <li
                                        key={item}
                                        className="inline-flex items-center gap-1.5 border border-line-strong px-2 py-1 text-xs whitespace-nowrap text-body"
                                    >
                                        <StackIcon
                                            name={item}
                                            className="text-dim"
                                        />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </section>

            <SplitSection order={6} label="Currently learning">
                <ul className="font-mono text-[15px] leading-loose text-body">
                    {learning.map((topic) => (
                        <li key={topic} className="flex gap-3">
                            <span aria-hidden className="text-accent">
                                →
                            </span>
                            {topic}
                        </li>
                    ))}
                </ul>
            </SplitSection>
        </PageTransition>
    )
}
