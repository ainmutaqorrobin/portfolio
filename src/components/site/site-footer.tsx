import { ContactIcon, type ContactKind } from '@/components/contact-icon'
import { ResumeLink } from '@/components/resume-link'
import { siteProfile } from '@/lib/content'

export function SiteFooter() {
    const { contact } = siteProfile

    return (
        <footer className="shell mt-24">
            <div className="flex flex-wrap items-end justify-between gap-6 border-t border-line py-10 font-mono text-xs text-faint">
                <div className="flex flex-col gap-2">
                    <span>Email me</span>
                    <a
                        href={`mailto:${contact.email}`}
                        className="flex items-center gap-2.5 text-base text-fg transition-colors hover:text-accent"
                    >
                        <ContactIcon kind="email" />
                        {contact.email}
                    </a>
                </div>
                <div className="flex flex-wrap gap-x-5">
                    <ExternalLink kind="github" href={contact.github}>
                        GitHub
                    </ExternalLink>
                    <ExternalLink kind="linkedin" href={contact.linkedin}>
                        LinkedIn
                    </ExternalLink>
                    <ExternalLink kind="whatsapp" href={contact.whatsapp}>
                        WhatsApp
                    </ExternalLink>
                    <ResumeLink className="min-h-11 transition-colors hover:text-accent [&>svg]:size-3.5">
                        Resume
                    </ResumeLink>
                </div>
                <span>
                    © {new Date().getFullYear()} Ain Mutaqorrobin · Kuala Lumpur
                </span>
            </div>
        </footer>
    )
}

function ExternalLink({
    kind,
    href,
    children,
}: {
    kind: ContactKind
    href: string
    children: React.ReactNode
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer"
            className="flex min-h-11 items-center gap-2 transition-colors hover:text-accent"
        >
            <ContactIcon kind={kind} className="size-3.5" />
            {children}
        </a>
    )
}
