'use client'

import { usePathname } from 'next/navigation'
import type { CSSProperties } from 'react'

import { NavLink } from '@/components/site/nav-link'
import { cn } from '@/lib/utils'
import { crumbFor, isActive, navItems } from '@/lib/navigation'

export function SiteHeader() {
    const pathname = usePathname()
    const crumb = crumbFor(pathname)

    return (
        <header className="site-header relative top-0 z-40 border-b border-line bg-ink/90 backdrop-blur-md md:sticky">
            <div className="shell flex flex-wrap items-center justify-between gap-x-6 gap-y-1 py-3 font-mono text-[13px]">
                <NavLink
                    href="/"
                    aria-label="Home"
                    className="flex min-h-11 min-w-0 items-center"
                >
                    <span className="font-semibold text-fg">
                        Ain Mutaqorrobin
                    </span>
                    {/*
                      Re-keyed per route so the breadcrumb types itself out
                      again. A 404 hydrates with the prerendered `/ 404`, not
                      the unknown URL the visitor typed, hence the suppression.
                    */}
                    <span
                        key={pathname}
                        suppressHydrationWarning
                        className="type-path ml-2 text-accent"
                        style={{ '--chars': crumb.length } as CSSProperties}
                    >
                        {crumb}
                    </span>
                </NavLink>
                <nav
                    aria-label="Primary"
                    className="-mx-2.5 flex max-w-[calc(100%+1.25rem)] overflow-x-auto [scrollbar-width:none] whitespace-nowrap md:mx-0"
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
            </div>
            <span key={pathname} className="route-sweep" aria-hidden />
        </header>
    )
}
