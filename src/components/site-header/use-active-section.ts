'use client'

import { useEffect, useState, useTransition } from 'react'

import { navItems } from './nav-items'

/**
 * Scroll-spy that reports which nav section is currently in focus. Picks the
 * section nearest a fixed focus line near the top of the viewport, and snaps to
 * the last section once scrolled to the bottom of the page.
 */
export function useActiveSection() {
    const [activeSection, setActiveSection] = useState<string>('about')
    const [, startTransition] = useTransition()

    useEffect(() => {
        const sections = navItems
            .map((item) => document.getElementById(item.id))
            .filter((section): section is HTMLElement => section !== null)

        if (sections.length === 0) return

        let ticking = false

        const updateActiveSection = () => {
            const focusLine = 150
            const scrollBottom = window.scrollY + window.innerHeight
            const documentHeight = document.documentElement.scrollHeight

            let currentSection = sections[0].id

            if (scrollBottom >= documentHeight - 4) {
                currentSection = sections.at(-1)?.id ?? currentSection
            } else {
                let closestDistance = Number.POSITIVE_INFINITY

                for (const section of sections) {
                    const top = section.getBoundingClientRect().top

                    if (top <= focusLine) {
                        const distance = Math.abs(top - focusLine)

                        if (distance < closestDistance) {
                            closestDistance = distance
                            currentSection = section.id
                        }
                    }
                }
            }

            startTransition(() => {
                setActiveSection((previousSection) =>
                    previousSection === currentSection
                        ? previousSection
                        : currentSection
                )
            })
            ticking = false
        }

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(updateActiveSection)
                ticking = true
            }
        }

        updateActiveSection()
        window.addEventListener('scroll', onScroll, { passive: true })
        window.addEventListener('resize', onScroll)

        return () => {
            window.removeEventListener('scroll', onScroll)
            window.removeEventListener('resize', onScroll)
        }
    }, [])

    return activeSection
}
