import { cn } from '@/lib/utils'

import { navItems } from './nav-items'

export function MobileNav({
    activeSection,
    isOpen,
    onNavigate,
}: {
    activeSection: string
    isOpen: boolean
    onNavigate: () => void
}) {
    return (
        <nav
            id="mobile-site-nav"
            className={cn(
                'grid overflow-hidden text-sm text-muted-foreground transition-[grid-template-rows,opacity,margin] duration-200 md:hidden',
                isOpen
                    ? 'mt-1 grid-rows-[1fr] opacity-100'
                    : 'grid-rows-[0fr] opacity-0'
            )}
        >
            <div className="min-h-0 overflow-hidden">
                <div className="grid gap-2 rounded-2xl border border-border/60 bg-background/72 p-3">
                    {navItems.map((item) => {
                        const isActive = activeSection === item.id

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
                                aria-current={isActive ? 'page' : undefined}
                                onClick={onNavigate}
                            >
                                {item.label}
                            </a>
                        )
                    })}
                </div>
            </div>
        </nav>
    )
}
