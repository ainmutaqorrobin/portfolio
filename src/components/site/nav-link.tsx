'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import type { ComponentProps } from 'react'

import { navDirection } from '@/lib/navigation'

type NavLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
    href: string
}

/**
 * Internal link that tags the navigation with a direction, so the page
 * transition slides the right way.
 */
export function NavLink({ href, ...props }: NavLinkProps) {
    const pathname = usePathname()

    return (
        <Link
            href={href}
            transitionTypes={[navDirection(pathname, href)]}
            {...props}
        />
    )
}
