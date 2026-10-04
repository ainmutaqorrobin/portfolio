'use client'

import { useEffect, useRef, useState, type ReactNode } from 'react'

type RevealState = 'idle' | 'armed' | 'shown'

/**
 * Holds a diagram's boxes and arrows back until it scrolls into view, then
 * lets globals.css draw them in. Without JS it simply renders fully drawn.
 */
export function DiagramReveal({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    const ref = useRef<HTMLDivElement>(null)
    const [state, setState] = useState<RevealState>('idle')

    useEffect(() => {
        const element = ref.current
        if (!element) return
        if (!('IntersectionObserver' in window)) {
            setState('shown')
            return
        }
        setState('armed')
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry?.isIntersecting) {
                    setState('shown')
                    observer.disconnect()
                }
            },
            { threshold: 0.25 }
        )
        observer.observe(element)
        return () => observer.disconnect()
    }, [])

    return (
        <div ref={ref} data-diagram={state} className={className}>
            {children}
        </div>
    )
}
