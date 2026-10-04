import type { CSSProperties, ReactNode } from 'react'

import { cn } from '@/lib/utils'

/**
 * Style for a `.reveal` block: `order` sets its place in the entrance
 * cascade when a page mounts.
 */
export function reveal(order: number) {
    return { '--i': order } as CSSProperties
}

/** The small label above a page title or section. */
export function Eyebrow({
    children,
    className,
    style,
}: {
    children: ReactNode
    className?: string
    style?: CSSProperties
}) {
    return (
        <p
            className={cn('font-mono text-[15px] text-faint', className)}
            style={style}
        >
            {children}
        </p>
    )
}

export function Cursor() {
    return (
        <span
            aria-hidden
            className="cursor-block ml-[0.08em] inline-block h-[0.82em] w-[0.5em] bg-accent align-[-0.04em]"
        />
    )
}

export function PageTitle({ children }: { children: ReactNode }) {
    return (
        <h1 className="font-mono text-[clamp(40px,7vw,88px)] leading-[0.95] font-extrabold tracking-[-0.05em]">
            {children}
        </h1>
    )
}

export function SectionLabel({
    children,
    className,
}: {
    children: ReactNode
    className?: string
}) {
    return (
        <h2
            className={cn(
                'font-mono text-sm font-normal text-accent',
                className
            )}
        >
            {children}
        </h2>
    )
}

/** Section with a label column on the left and content on the right. */
export function SplitSection({
    label,
    order,
    children,
}: {
    label: ReactNode
    order: number
    children: ReactNode
}) {
    return (
        <section
            className="reveal flex flex-wrap gap-x-8 gap-y-6 border-t border-line py-14"
            style={reveal(order)}
        >
            <SectionLabel className="flex-[1_1_220px]">{label}</SectionLabel>
            <div className="min-w-0 flex-[3_1_480px]">{children}</div>
        </section>
    )
}

export function PlusList({ items }: { items: string[] }) {
    return (
        <ul className="flex flex-col gap-2 text-base leading-relaxed text-body">
            {items.map((item) => (
                <li key={item} className="flex gap-3">
                    <span aria-hidden className="font-mono text-accent">
                        +
                    </span>
                    <span>{item}</span>
                </li>
            ))}
        </ul>
    )
}

export function Shell({ children }: { children: ReactNode }) {
    return (
        <pre className="overflow-x-auto bg-ink-2 px-4 py-4 font-mono text-[13px] leading-relaxed text-body">
            {children}
        </pre>
    )
}

export const buttonPrimary =
    'inline-flex min-h-11 items-center bg-accent px-5 font-mono text-[13px] font-semibold text-ink transition-opacity hover:opacity-85'
export const buttonGhost =
    'inline-flex min-h-11 items-center border border-line-strong px-5 font-mono text-[13px] transition-colors hover:border-accent hover:text-accent'
