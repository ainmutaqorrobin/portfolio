import { NavLink } from '@/components/site/nav-link'
import { PageTransition } from '@/components/site/page-transition'
import { buttonPrimary, Eyebrow, PageTitle } from '@/components/ui'

export default function NotFound() {
    return (
        <PageTransition>
            <section className="flex flex-col gap-6 py-[clamp(64px,12vw,160px)]">
                <Eyebrow>Page not found</Eyebrow>
                <PageTitle>404</PageTitle>
                <p className="font-mono text-[15px] text-err">
                    This page doesn&apos;t exist, or it moved.
                </p>
                <NavLink href="/" className={`${buttonPrimary} self-start`}>
                    Back to home
                </NavLink>
            </section>
        </PageTransition>
    )
}
