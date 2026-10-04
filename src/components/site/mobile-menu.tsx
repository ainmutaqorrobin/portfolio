'use client'

import { useEffect, useRef, type CSSProperties } from 'react'

import { ContactIcon, type ContactKind } from '@/components/contact-icon'
import { ResumeLink } from '@/components/resume-link'
import { NavLink } from '@/components/site/nav-link'
import { buttonPrimary } from '@/components/ui'
import { siteProfile } from '@/lib/content'
import { isActive, navItems } from '@/lib/navigation'
import { cn } from '@/lib/utils'

export const MOBILE_MENU_ID = 'mobile-menu'

/** The button that opens the menu; shown below the lg breakpoint. */
export function MenuButton({
    open,
    onToggle,
    buttonRef,
}: {
    open: boolean
    onToggle: () => void
    buttonRef: React.RefObject<HTMLButtonElement | null>
}) {
    return (
        <button
            ref={buttonRef}
            type="button"
            aria-expanded={open}
            aria-controls={MOBILE_MENU_ID}
            onClick={onToggle}
            className="flex min-h-11 flex-none items-center gap-2.5 border border-line-strong px-3.5 text-fg transition-colors hover:border-accent hover:text-accent lg:hidden"
        >
            <span className="relative block h-3 w-4" aria-hidden>
                <span
                    className={cn(
                        'absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300',
                        open ? 'top-1.5 rotate-45' : 'top-0'
                    )}
                />
                <span
                    className={cn(
                        'absolute top-1.5 left-0 h-[1.5px] w-4 bg-current transition-opacity duration-200',
                        open && 'opacity-0'
                    )}
                />
                <span
                    className={cn(
                        'absolute left-0 h-[1.5px] w-4 bg-current transition-transform duration-300',
                        open ? 'top-1.5 -rotate-45' : 'top-3'
                    )}
                />
            </span>
            {open ? 'Close' : 'Menu'}
        </button>
    )
}

const contactLinks = (): {
    kind: ContactKind
    label: string
    href: string
}[] => {
    const { contact } = siteProfile
    return [
        { kind: 'email', label: 'Email', href: `mailto:${contact.email}` },
        { kind: 'whatsapp', label: 'WhatsApp', href: contact.whatsapp },
        { kind: 'github', label: 'GitHub', href: contact.github },
        { kind: 'linkedin', label: 'LinkedIn', href: contact.linkedin },
    ]
}

/**
 * Full-screen page menu for phones. Sits under the sticky header, locks the
 * page behind it, and closes on navigation, Escape, or widening to desktop.
 */
export function MobileMenu({
    open,
    pathname,
    onClose,
    returnFocusTo,
}: {
    open: boolean
    pathname: string
    onClose: () => void
    returnFocusTo: React.RefObject<HTMLButtonElement | null>
}) {
    const panelRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (!open) return

        const root = document.documentElement
        const behind = Array.from(
            document.querySelectorAll<HTMLElement>('main, footer')
        )
        root.style.overflow = 'hidden'
        behind.forEach((element) => (element.inert = true))
        panelRef.current?.querySelector<HTMLElement>('a')?.focus()

        const onKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') onClose()
        }
        // Widening the window past lg swaps to the inline nav.
        const desktop = window.matchMedia('(min-width: 64rem)')
        const onWiden = () => desktop.matches && onClose()

        window.addEventListener('keydown', onKey)
        desktop.addEventListener('change', onWiden)
        const button = returnFocusTo.current
        return () => {
            root.style.overflow = ''
            behind.forEach((element) => (element.inert = false))
            window.removeEventListener('keydown', onKey)
            desktop.removeEventListener('change', onWiden)
            button?.focus({ preventScroll: true })
        }
    }, [open, onClose, returnFocusTo])

    if (!open) return null

    return (
        <div
            ref={panelRef}
            id={MOBILE_MENU_ID}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="mobile-menu fixed inset-0 z-30 flex flex-col overflow-y-auto bg-ink pt-[72px] lg:hidden"
        >
            <div className="shell flex flex-1 flex-col gap-8 py-8">
                <nav aria-label="Pages">
                    <ol className="flex flex-col border-t border-line">
                        {navItems.map((item, index) => {
                            const active = isActive(item.href, pathname)
                            return (
                                <li
                                    key={item.href}
                                    className="menu-item border-b border-line"
                                    style={{ '--i': index } as CSSProperties}
                                >
                                    <NavLink
                                        href={item.href}
                                        aria-current={
                                            active ? 'page' : undefined
                                        }
                                        onClick={onClose}
                                        className={cn(
                                            'flex min-h-16 items-center gap-4 py-3 transition-colors',
                                            active
                                                ? 'text-accent'
                                                : 'text-fg hover:text-accent'
                                        )}
                                    >
                                        <span className="w-6 font-mono text-xs text-faint">
                                            {String(index + 1).padStart(2, '0')}
                                        </span>
                                        <span className="flex-1 font-mono text-[28px] leading-none font-semibold tracking-[-0.03em]">
                                            {item.label}
                                        </span>
                                        {active ? (
                                            <span className="font-mono text-[11px] text-accent">
                                                You are here
                                            </span>
                                        ) : (
                                            <span
                                                aria-hidden
                                                className="text-faint"
                                            >
                                                →
                                            </span>
                                        )}
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ol>
                </nav>

                <div
                    className="menu-item flex flex-col gap-5"
                    style={{ '--i': navItems.length } as CSSProperties}
                >
                    <ResumeLink className={cn(buttonPrimary, 'justify-center')}>
                        Download resume
                    </ResumeLink>
                    <ul className="grid grid-cols-4 gap-2">
                        {contactLinks().map((link) => (
                            <li key={link.kind}>
                                <a
                                    href={link.href}
                                    target={
                                        link.href.startsWith('http')
                                            ? '_blank'
                                            : undefined
                                    }
                                    rel="noreferrer"
                                    className="flex min-h-12 flex-col items-center justify-center gap-1.5 border border-line-strong py-2.5 text-fg transition-colors hover:border-accent hover:text-accent"
                                >
                                    <ContactIcon
                                        kind={link.kind}
                                        className="size-5"
                                    />
                                    <span className="font-mono text-[10px] text-faint">
                                        {link.label}
                                    </span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <p
                    className="menu-item mt-auto font-mono text-xs text-faint"
                    style={{ '--i': navItems.length + 1 } as CSSProperties}
                >
                    <span className="text-ok">●</span> Open to work ·{' '}
                    {siteProfile.location}
                </p>
            </div>
        </div>
    )
}
