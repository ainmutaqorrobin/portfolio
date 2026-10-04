import type { Metadata } from 'next'

import { ContactIcon, type ContactKind } from '@/components/contact-icon'
import { PageTransition } from '@/components/site/page-transition'
import { Eyebrow, Cursor, PageTitle, reveal } from '@/components/ui'
import { RESUME_FILENAME } from '@/components/resume-link'
import { siteProfile } from '@/lib/content'

export const metadata: Metadata = {
    title: 'Contact',
    description:
        'Get in touch with Ain Mutaqorrobin for freelance projects, software roles, and technical collaborations.',
    alternates: { canonical: '/contact' },
}

export default function ContactPage() {
    const { contact, availability, location, timezone, resume } = siteProfile

    const channels: {
        kind: ContactKind
        command: string
        value: string
        href: string
        note: string
        download?: string
    }[] = [
        {
            kind: 'email',
            command: 'Email',
            value: contact.email,
            href: `mailto:${contact.email}`,
            note: 'Best for detailed project inquiries',
        },
        {
            kind: 'whatsapp',
            command: 'WhatsApp',
            value: 'Quick chat',
            href: contact.whatsapp,
            note: 'Fastest for initial contact',
        },
        {
            kind: 'github',
            command: 'GitHub',
            value: contact.github.replace('https://', ''),
            href: contact.github,
            note: 'Code for every project on this site',
        },
        {
            kind: 'linkedin',
            command: 'LinkedIn',
            value: contact.linkedin.replace('https://www.linkedin.com/', ''),
            href: contact.linkedin,
            note: 'Professional networking',
        },
        {
            kind: 'resume',
            command: 'Resume',
            value: 'Download PDF',
            href: resume.pdf,
            note: `${resume.pages} pages · experience, projects, education`,
            download: `${RESUME_FILENAME}.pdf`,
        },
    ]

    return (
        <PageTransition>
            <section className="flex flex-col gap-7 pt-[clamp(64px,10vw,120px)] pb-14">
                <Eyebrow className="reveal" style={reveal(0)}>
                    Contact
                </Eyebrow>
                <div className="reveal" style={reveal(1)}>
                    <PageTitle>
                        Let&apos;s talk
                        <Cursor />
                    </PageTitle>
                </div>
                <p
                    className="reveal max-w-2xl text-[19px] leading-relaxed text-body"
                    style={reveal(2)}
                >
                    {availability} Email is best for anything detailed; WhatsApp
                    is fastest for a first hello.
                </p>
                <a
                    href={`mailto:${contact.email}`}
                    className="reveal mt-3 self-start border-b-2 border-accent pb-1.5 font-mono text-[clamp(22px,4.4vw,52px)] font-semibold tracking-[-0.03em] break-all transition-colors hover:text-accent"
                    style={reveal(3)}
                >
                    {contact.email}
                </a>
            </section>

            <section className="border-t border-line">
                {channels.map((channel, i) => (
                    <a
                        key={channel.command}
                        href={channel.href}
                        target={
                            channel.href.startsWith('http')
                                ? '_blank'
                                : undefined
                        }
                        download={channel.download}
                        rel="noreferrer"
                        className="reveal group flex flex-wrap items-center gap-x-6 gap-y-3 border-b border-line py-6 font-mono"
                        style={reveal(i + 4)}
                    >
                        <span className="flex flex-[0_0_200px] items-center gap-4">
                            <span className="flex size-11 flex-none items-center justify-center border border-line-strong text-fg transition-colors group-hover:border-accent group-hover:text-accent">
                                <ContactIcon
                                    kind={channel.kind}
                                    className="size-5"
                                />
                            </span>
                            <span className="text-[13px] text-faint">
                                {channel.command}
                            </span>
                        </span>
                        <span className="min-w-0 flex-[1_1_300px] text-lg font-semibold [overflow-wrap:anywhere] group-hover:text-accent sm:text-xl">
                            {channel.value}
                        </span>
                        <span className="flex-[0_1_280px] font-sans text-[15px] text-dim">
                            {channel.note}
                        </span>
                        <span aria-hidden className="text-accent">
                            {channel.download ? '↓' : '↗'}
                        </span>
                    </a>
                ))}
            </section>

            <section
                className="reveal grid grid-cols-[repeat(auto-fit,minmax(220px,1fr))] gap-6 py-14 font-mono text-[13px]"
                style={reveal(8)}
            >
                <div className="flex flex-col gap-2">
                    <span className="text-faint">location</span>
                    <span>{location}</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-faint">timezone</span>
                    <span>{timezone} (MYT)</span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-faint">status</span>
                    <span className="text-ok">● open to work</span>
                </div>
            </section>
        </PageTransition>
    )
}
