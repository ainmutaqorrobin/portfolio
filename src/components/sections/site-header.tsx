'use client'

import { useEffect, useState, useTransition } from 'react'

import { SectionReveal } from '@/components/section-reveal'
import { ThemeToggle } from '@/components/theme-toggle'
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

    return (
        <SectionReveal className="sticky top-0 z-50 w-full">
            <header>
                <div className="w-full border-b border-border/60 bg-background/86 shadow-lg shadow-black/10 backdrop-blur">
                    <div className="mx-auto flex w-full max-w-7xl flex-col gap-3 px-4 py-3 sm:px-6 lg:px-8">
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <p className="font-heading text-sm font-semibold uppercase tracking-[0.25em] text-primary">
                                    Portfolio
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {role}
                                </p>
                            </div>
                            <nav className="hidden items-center gap-1 md:flex">
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
                            <ThemeToggle />
                        </div>
                        <nav className="flex flex-wrap gap-2 text-sm text-muted-foreground md:hidden">
                            {navItems.map((item) => {
                                const isActive = activeSection === item.id

                                return (
                                    <a
                                        key={item.id}
                                        className={cn(
                                            'rounded-full border border-border/60 px-3 py-1.5 transition-colors',
                                            isActive
                                                ? 'border-primary/40 bg-primary text-primary-foreground'
                                                : 'bg-background/40 hover:text-foreground'
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
                    </div>
                </div>
            </header>
        </SectionReveal>
    )
}
