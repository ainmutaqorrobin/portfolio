import { ViewTransition, type ReactNode } from 'react'

const pageAnimation = {
    'nav-forward': 'page-forward',
    'nav-back': 'page-back',
    default: 'page-fade',
}

/**
 * Wraps a page so route changes animate: the old page lifts away while the
 * new one rises in from the direction of travel. Styles live in globals.css.
 */
export function PageTransition({ children }: { children: ReactNode }) {
    return (
        <ViewTransition
            enter={pageAnimation}
            exit={pageAnimation}
            default="none"
        >
            <div>{children}</div>
        </ViewTransition>
    )
}
