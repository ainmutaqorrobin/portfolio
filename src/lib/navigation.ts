export const navItems = [
    { href: '/', label: 'Home' },
    { href: '/work', label: 'Work' },
    { href: '/experience', label: 'Experience' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
] as const

export type NavDirection = 'nav-forward' | 'nav-back'

function stripHash(path: string) {
    return path.split('#')[0] || '/'
}

/** Index of the top-level nav section a path belongs to. */
export function sectionIndex(path: string) {
    const clean = stripHash(path)
    if (clean === '/') return 0
    const index = navItems.findIndex(
        (item) =>
            item.href !== '/' &&
            (clean === item.href || clean.startsWith(`${item.href}/`))
    )
    return index === -1 ? navItems.length : index
}

export function isActive(href: string, pathname: string) {
    return sectionIndex(href) === sectionIndex(pathname)
}

/**
 * Which way the page should travel. Moving right along the nav, or deeper
 * into a section, reads as forward; everything else reads as back.
 */
export function navDirection(from: string, to: string): NavDirection {
    const fromIndex = sectionIndex(from)
    const toIndex = sectionIndex(to)
    if (fromIndex !== toIndex) {
        return toIndex > fromIndex ? 'nav-forward' : 'nav-back'
    }
    const depth = (path: string) =>
        stripHash(path).split('/').filter(Boolean).length
    return depth(to) >= depth(from) ? 'nav-forward' : 'nav-back'
}

/** Breadcrumb after the name in the header, e.g. `/work/appctl` → `/ work / appctl`. */
export function crumbFor(pathname: string) {
    if (pathname === '/') return ''
    // The 404 page is prerendered under this internal path.
    if (pathname === '/_not-found') return '/ 404'
    return `/ ${pathname.split('/').filter(Boolean).join(' / ')}`
}
