'use client'

import * as React from 'react'

import { cn } from '@/lib/utils'

export function SectionReveal({
    children,
    className,
    delay = 0,
    ...props
}: React.HTMLAttributes<HTMLDivElement> & {
    delay?: number
}) {
    const ref = React.useRef<HTMLDivElement | null>(null)
    const [visible, setVisible] = React.useState(false)

    React.useEffect(() => {
        const node = ref.current
        if (!node) return

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                }
            },
            { threshold: 0.15 }
        )

        observer.observe(node)
        return () => observer.disconnect()
    }, [])

    return (
        <div
            ref={ref}
            style={{ transitionDelay: `${delay}ms` }}
            className={cn(
                'transform-gpu transition-all duration-700 ease-out',
                visible
                    ? 'translate-y-0 opacity-100 blur-0'
                    : 'translate-y-8 opacity-0 blur-sm',
                className
            )}
            {...props}
        >
            {children}
        </div>
    )
}
