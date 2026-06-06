import { siGithub } from 'simple-icons'
import { cn } from '@/lib/utils'

export function GithubIcon({ className }: { className?: string }) {
    return (
        <svg
            role="img"
            viewBox="0 0 24 24"
            aria-label={siGithub.title}
            className={cn('size-4 shrink-0', className)}
            fill="currentColor"
        >
            <title>{siGithub.title}</title>
            <path d={siGithub.path} />
        </svg>
    )
}
