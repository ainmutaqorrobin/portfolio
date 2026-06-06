'use client'

import { useEffect, useState } from 'react'

/**
 * Tracks pointer position and scroll to drive the hero portrait's 3D parallax.
 * Returns a framer-motion `animate` object; parallax is disabled below the lg
 * breakpoint where pointer tracking doesn't apply.
 */
export function useHeroParallax() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [scrollY, setScrollY] = useState(0)
    const [isMobile, setIsMobile] = useState(false)

    useEffect(() => {
        setIsMobile(window.innerWidth < 1024)

        const handleMouseMove = (e: MouseEvent) =>
            setMousePosition({ x: e.clientX, y: e.clientY })
        const handleScroll = () => setScrollY(window.scrollY)
        const handleResize = () => setIsMobile(window.innerWidth < 1024)

        window.addEventListener('mousemove', handleMouseMove)
        window.addEventListener('scroll', handleScroll)
        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
            window.removeEventListener('scroll', handleScroll)
            window.removeEventListener('resize', handleResize)
        }
    }, [])

    return {
        y: isMobile ? 0 : scrollY * 0.5,
        rotateX: isMobile ? 0 : (mousePosition.y - 300) * 0.02,
        rotateY: isMobile ? 0 : (mousePosition.x - 300) * 0.02,
    }
}
