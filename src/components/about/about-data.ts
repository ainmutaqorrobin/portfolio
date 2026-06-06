import { BookOpen, Lightbulb, Users, type LucideIcon } from 'lucide-react'

export type Principle = {
    icon: LucideIcon
    title: string
    body: string
    color: string
    accent: string
}

export const principles: Principle[] = [
    {
        icon: Lightbulb,
        title: 'Practical Shipping',
        body: 'I prefer useful software over impressive complexity, and I care about whether teams can keep delivering after launch.',
        color: 'from-yellow-500/20 to-yellow-500/5',
        accent: 'text-yellow-500',
    },
    {
        icon: Users,
        title: 'Cross-Stack Ownership',
        body: 'Frontend, backend, deployment, and debugging all matter when product quality depends on the full system.',
        color: 'from-blue-500/20 to-blue-500/5',
        accent: 'text-blue-500',
    },
    {
        icon: BookOpen,
        title: 'Calm Engineering',
        body: 'Readable structure, documented decisions, and repeatable workflows beat heroics when deadlines start to tighten.',
        color: 'from-purple-500/20 to-purple-500/5',
        accent: 'text-purple-500',
    },
]
