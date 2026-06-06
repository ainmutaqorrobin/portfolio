import { cn } from '@/lib/utils'

import { navItems } from './nav-items'

export function DesktopNav({ activeSection }: { activeSection: string }) {
    return (
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
                        aria-current={isActive ? 'page' : undefined}
                    >
                        {item.label}
                    </a>
                )
            })}
        </nav>
    )
}
