'use client'

import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { DesktopNav } from '@/components/site-header/desktop-nav'
import { MobileNav } from '@/components/site-header/mobile-nav'
import { useActiveSection } from '@/components/site-header/use-active-section'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button } from '@/components/ui/button'
import type { Profile } from '@/lib/content'

export function SiteHeader({ role }: Pick<Profile, 'role'>) {
    const activeSection = useActiveSection()
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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
                            <DesktopNav activeSection={activeSection} />
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
                        <MobileNav
                            activeSection={activeSection}
                            isOpen={isMobileMenuOpen}
                            onNavigate={() => setIsMobileMenuOpen(false)}
                        />
                    </div>
                </div>
            </header>
        </SectionReveal>
    )
}
