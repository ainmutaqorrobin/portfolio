import { Mail, Linkedin, MessageCircle, Phone } from 'lucide-react'
import type { ElementType } from 'react'

import { GithubIcon } from '@/components/icons/github-icon'
import type { Profile } from '@/lib/content'

export type ContactChannel = {
    icon: ElementType
    label: string
    value: string
    href: string
    description: string
    color: string
}

export function buildContactChannels(
    contact: Profile['contact']
): ContactChannel[] {
    return [
        {
            icon: Mail,
            label: 'Email',
            value: contact.email,
            href: `mailto:${contact.email}`,
            description: 'Best for detailed project inquiries',
            color: 'from-blue-500/20 to-blue-500/5',
        },
        {
            icon: MessageCircle,
            label: 'WhatsApp',
            value: 'Quick Chat',
            href: contact.whatsapp,
            description: 'Fastest for initial contact',
            color: 'from-green-500/20 to-green-500/5',
        },
        {
            icon: GithubIcon,
            label: 'GitHub',
            value: 'View Repos',
            href: contact.github,
            description: 'Check out my open source work',
            color: 'from-slate-500/20 to-slate-500/5',
        },
        {
            icon: Linkedin,
            label: 'LinkedIn',
            value: 'Connect',
            href: contact.linkedin,
            description: 'Professional networking',
            color: 'from-cyan-500/20 to-cyan-500/5',
        },
        {
            icon: Phone,
            label: 'Phone',
            value: contact.phone,
            href: `tel:${contact.phone.replace(/\s+/g, '')}`,
            description: 'For urgent matters',
            color: 'from-purple-500/20 to-purple-500/5',
        },
    ]
}
