import * as React from 'react'

import { cn } from '@/lib/utils'

function Card({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                'rounded-3xl border border-border/60 bg-card/75 text-card-foreground shadow-[0_30px_90px_-40px_hsl(var(--foreground)/0.45)] backdrop-blur-xl',
                className
            )}
            {...props}
        />
    )
}

function CardHeader({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn('flex flex-col gap-2 p-6', className)} {...props} />
    )
}

function CardTitle({
    className,
    ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3
            className={cn(
                'font-heading text-xl font-semibold tracking-tight text-balance',
                className
            )}
            {...props}
        />
    )
}

function CardDescription({
    className,
    ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
    return (
        <p
            className={cn('text-sm leading-6 text-muted-foreground', className)}
            {...props}
        />
    )
}

function CardContent({
    className,
    ...props
}: React.HTMLAttributes<HTMLDivElement>) {
    return <div className={cn('px-6 pb-6', className)} {...props} />
}

export { Card, CardContent, CardDescription, CardHeader, CardTitle }
