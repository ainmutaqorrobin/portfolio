'use client'

import { useEffect, useState, useTransition } from 'react'
import { Menu, X } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Profile } from '@/lib/content'

const navItems = [
    { href: '#about', label: 'About', id: 'about' },
    { href: '#experience', label: 'Experience', id: 'experience' },
    { href: '#projects', label: 'Projects', id: 'projects' },
    { href: '#contact', label: 'Contact', id: 'contact' },
] as const

export function SiteHeader({ role }: Pick<Profile, 'role'>) {
    const [activeSection, setActiveSection] = useState<string>('about')
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [, startTransition] = useTransition()

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter((section): section is HTMLElement => section !== null)

        if (sections.length === 0) return

        let ticking = false

        const updateActiveSection = () => {
            const focusLine = 150
            const scrollBottom = window.scrollY + window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            let currentSection = sections[0].id

            if (scrollBottom >= documentHeight - 4) {
                currentSection = sections.at(-1)?.id ?? currentSection
            } else {
                let closestDistance = Number.POSITIVE_INFINITY

                for (const section of sections) {
                    const top = section.getBoundingClientRect().top

                    if (top <= focusLine) {
                        const distance = Math.abs(top - focusLine)

                        if (distance < closestDistance) {
                            closestDistance = distance
                            currentSection = section.id
                        }
                    }
                }
            }

            startTransition(() => {
                setActiveSection((previousSection) =>
                    previousSection === currentSection
                        ? previousSection
                        : currentSection
                )
            })
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveSection)
                ticking = true
            }
        }

        updateActiveSection()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    useEffect(() => {
        const mediaQuery = window.matchMedia('(min-width: 768px)')

        const handleViewportChange = (event: MediaQueryListEvent) => {
            if (event.matches) {
                setIsMobileMenuOpen(false)
            }
        }

        mediaQuery.addEventListener('change', handleViewportChange)

        return () => {
            mediaQuery.removeEventListener('change', handleViewportChange)
        }
    }, [])

    return (
        <SectionReveal className="sticky top-0 z-50 w-full">
            <header>
                <div className="w-full border-b border-border/60 bg-background/82 shadow-[0_16px_50px_-24px_hsl(var(--foreground)/0.3)] backdrop-blur-xl">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="flex size-11 items-center justify-center rounded-2xl border border-border/70 bg-background/75 font-heading text-sm font-semibold tracking-[0.24em] text-primary shadow-sm">
                                    AM
                                </div>
                                <div>
                                    <p className="font-heading text-sm font-semibold uppercase tracking-[0.28em] text-primary">
                                        Ain Mutaqorrobin
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {role}
                                    </p>
                                </div>
                            </div>
                            <nav className="hidden items-center gap-1 rounded-full border border-border/70 bg-background/65 p-1 md:flex">
                                {navItems.map((item) => {
                                    const isActive = activeSection === item.id

                                    return (
                                        <a
                                            key={item.id}
                                            className={cn(
                                                'rounded-full px-4 py-2 text-sm transition-colors',
                                                isActive
                                                    ? 'bg-primary text-primary-foreground'
                                                    : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'
                                            )}
                                            href={item.href}
                                            aria-current={
                                                isActive ? 'page' : undefined
                                            }
                                        >
                                            {item.label}
                                        </a>
                                    )
                                })}
                            </nav>
                            <div className="flex items-center gap-2">
                                <a
                                    href="#contact"
                                    className="hidden rounded-full border border-primary/30 bg-primary/12 px-4 py-2 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground lg:inline-flex"
                                >
                                    Available for work
                                </a>
                                <ThemeToggle />
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="md:hidden"
                                    type="button"
                                    aria-label={
                                        isMobileMenuOpen
                                            ? 'Close navigation menu'
                                            : 'Open navigation menu'
                                    }
                                    aria-expanded={isMobileMenuOpen}
                                    aria-controls="mobile-site-nav"
                                    onClick={() =>
                                        setIsMobileMenuOpen((isOpen) => !isOpen)
                                    }
                                >
                                    {isMobileMenuOpen ? (
                                        <X className="size-5" />
                                    ) : (
                                        <Menu className="size-5" />
                                    )}
                                </Button>
                            </div>
                        </div>
                        <nav
                            id="mobile-site-nav"
                            className={cn(
                                'grid overflow-hidden text-sm text-muted-foreground transition-[grid-template-rows,opacity,margin] duration-200 md:hidden',
                                isMobileMenuOpen
                                    ? 'mt-1 grid-rows-[1fr] opacity-100'
                                    : 'grid-rows-[0fr] opacity-0'
                            )}
                        >
                            <div className="min-h-0 overflow-hidden">
                                <div className="grid gap-2 rounded-2xl border border-border/60 bg-background/72 p-3">
                                    {navItems.map((item) => {
                                        const isActive =
                                            activeSection === item.id

                                        return (
                                            <a
                                                key={item.id}
                                                className={cn(
                                                    'rounded-xl border border-border/60 px-3 py-2 text-center transition-colors',
                                                    isActive
                                                        ? 'border-primary/40 bg-primary text-primary-foreground'
                                                        : 'bg-background/40 hover:text-foreground'
                                                )}
                                                href={item.href}
                                                aria-current={
                                                    isActive
                                                        ? 'page'
                                                        : undefined
                                                }
                                                onClick={() =>
                                                    setIsMobileMenuOpen(false)
                                                }
                                            >
                                                {item.label}
                                            </a>
                                        )
                                    })}
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </header>
        </SectionReveal>
    )
}
