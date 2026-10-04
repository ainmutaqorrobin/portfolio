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
                className="reveal flex flex-col gap-4 border-t border-line py-14 font-mono text-sm"
                style={reveal(5)}
            >
                <SectionLabel>Tech stack</SectionLabel>
                <dl className="flex flex-col">
                    {Object.entries(skills).map(([group, items]) => (
                        <div
                            key={group}
                            className="flex flex-wrap gap-x-6 gap-y-1.5 border-b border-ink-2 py-2 leading-relaxed"
                        >
                            <dt className="flex-[0_0_200px] text-faint">
                                {group}
                            </dt>
                            <dd className="min-w-0 flex-[1_1_400px] text-body">
                                {items.join(' · ')}
                            </dd>
                        </div>
                    ))}
                </dl>
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
