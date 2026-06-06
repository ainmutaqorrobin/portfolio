import type { Variants } from 'framer-motion'

/**
 * Fade-in container that staggers its children. Shared by every animated
 * section so the reveal timing stays consistent and isn't redefined per file.
 */
export function staggerContainer(
    staggerChildren = 0.15,
    delayChildren = 0.1
): Variants {
    return {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren, delayChildren },
        },
    }
}

/**
 * Fade-in item that slides in from an optional x/y offset. Pairs with
 * {@link staggerContainer} as the `variants` for individual children.
 */
export function fadeInItem({
    duration = 0.6,
    x = 0,
    y = 0,
}: { duration?: number; x?: number; y?: number } = {}): Variants {
    return {
        hidden: { opacity: 0, x, y },
        visible: {
            opacity: 1,
            x: 0,
            y: 0,
            transition: { duration },
        },
    }
}
