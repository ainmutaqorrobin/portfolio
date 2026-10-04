import { ContactIcon, type ContactKind } from '@/components/contact-icon'
import { ResumeLink } from '@/components/resume-link'
import { siteProfile } from '@/lib/content'

export function SiteFooter() {
    const { contact } = siteProfile

    return (
        <footer className="shell mt-24">
            {/*
              Email, links, copyright. Stacked on phones; from md the email and
              links sit side by side with the copyright on its own line below.
              The links are their own grid (2 x 2, or one row when there's
              room) sized to their content, so they line up instead of
              wrapping unevenly or overlapping.
            */}
            <div className="grid gap-8 border-t border-line py-10 font-mono text-xs text-faint md:grid-cols-[1fr_auto] md:items-end md:gap-x-10">
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
                <div className="grid grid-cols-2 gap-x-6 sm:grid-cols-[repeat(4,max-content)] md:grid-cols-[repeat(2,max-content)] lg:grid-cols-[repeat(4,max-content)]">
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
                <span className="md:col-span-2">
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
