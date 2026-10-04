import type { Metadata } from 'next'

import { PageTransition } from '@/components/site/page-transition'
import { Eyebrow, PageTitle, reveal } from '@/components/ui'
import { WorkList } from '@/components/work/work-list'
import { siteProjects } from '@/lib/content'

export const metadata: Metadata = {
    title: 'Work',
    description:
        'Full-stack apps, CLIs and infrastructure projects by Ain Mutaqorrobin.',
    alternates: { canonical: '/work' },
}

export default function WorkPage() {
    return (
        <PageTransition>
            <section className="flex flex-col gap-5 pt-18 pb-8">
                <Eyebrow className="reveal" style={reveal(0)}>
                    Projects
                </Eyebrow>
                <div className="reveal" style={reveal(1)}>
                    <PageTitle>Work</PageTitle>
                </div>
                <p
                    className="reveal max-w-2xl text-[19px] leading-relaxed text-body"
                    style={reveal(2)}
                >
                    Full-stack apps, CLIs and infrastructure.{' '}
                    {siteProjects.length} public repos, each with the stack it
                    actually runs on.
                </p>
            </section>
            <div className="reveal" style={reveal(3)}>
                <WorkList projects={siteProjects} />
            </div>
        </PageTransition>
    )
}
