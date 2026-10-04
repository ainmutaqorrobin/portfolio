'use client'

import { usePathname } from 'next/navigation'
import { useCallback, useRef, useState, type CSSProperties } from 'react'

import { MenuButton, MobileMenu } from '@/components/site/mobile-menu'
import { NavLink } from '@/components/site/nav-link'
import { cn } from '@/lib/utils'
import { crumbFor, isActive, navItems } from '@/lib/navigation'

export function SiteHeader() {
    const pathname = usePathname()
    const crumb = crumbFor(pathname)
    const menuButton = useRef<HTMLButtonElement>(null)

    // Remembers which page the menu was opened on, so any navigation (a link,
    // or the browser's back button) closes it without an extra effect.
    const [menuOpenOn, setMenuOpenOn] = useState<string | null>(null)
    const menuOpen = menuOpenOn === pathname
    const closeMenu = useCallback(() => setMenuOpenOn(null), [])

    return (
        <>
            <header className="site-header sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md">
                <div className="shell flex items-center justify-between gap-4 py-3 font-mono text-[13px]">
                    <NavLink
                        href="/"
                        aria-label="Home"
                        onClick={closeMenu}
                        className="flex min-h-11 min-w-0 items-center overflow-hidden"
                    >
                        <span className="flex-none font-semibold text-fg">
                            Ain Mutaqorrobin
                        </span>
                        {/*
                          Re-keyed per route so the breadcrumb types itself out
                          again. A 404 hydrates with the prerendered `/ 404`, not
                          the unknown URL the visitor typed, hence the suppression.
                          Hidden on phones, where it would be cut off mid-word and
                          the open menu already marks the current page.
                        */}
                        <span
                            key={pathname}
                            suppressHydrationWarning
                            className="type-path ml-2 min-w-0 text-accent"
                            style={{ '--chars': crumb.length } as CSSProperties}
                        >
                            {crumb}
                        </span>
                    </NavLink>
                    <nav
                        aria-label="Primary"
                        className="hidden whitespace-nowrap lg:flex"
                    >
                        {navItems.map((item) => {
                            const active = isActive(item.href, pathname)
                            return (
                                <NavLink
                                    key={item.href}
                                    href={item.href}
                                    aria-current={active ? 'page' : undefined}
                                    className={cn(
                                        'flex min-h-11 items-center px-2.5 transition-colors hover:text-accent',
                                        active
                                            ? 'text-accent underline decoration-2 underline-offset-8'
                                            : 'text-fg'
                                    )}
                                >
                                    {item.label}
                                </NavLink>
                            )
                        })}
                    </nav>
                    <MenuButton
                        open={menuOpen}
                        onToggle={() =>
                            setMenuOpenOn(menuOpen ? null : pathname)
                        }
                        buttonRef={menuButton}
                    />
                </div>
                <span key={pathname} className="route-sweep" aria-hidden />
            </header>
            <MobileMenu
                open={menuOpen}
                pathname={pathname}
                onClose={closeMenu}
                returnFocusTo={menuButton}
            />
        </>
    )
}
