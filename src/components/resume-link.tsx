import type { ReactNode } from 'react'

import { ContactIcon } from '@/components/contact-icon'
import { siteProfile } from '@/lib/content'
import { cn } from '@/lib/utils'

/** Saves the résumé under a readable name instead of the URL slug. */
export const RESUME_FILENAME = 'Ain Mutaqorrobin - Resume'

export function ResumeLink({
    className,
    children,
}: {
    className?: string
    children: ReactNode
}) {
    return (
        <a
            href={siteProfile.resume.pdf}
            download={`${RESUME_FILENAME}.pdf`}
            className={cn('inline-flex items-center gap-2', className)}
        >
            <ContactIcon kind="resume" />
            {children}
        </a>
    )
}
