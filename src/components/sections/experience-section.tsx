import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Profile } from '@/lib/content'

export function ExperienceSection({
    workExperience,
}: Pick<Profile, 'workExperience'>) {
    const timelineItems = workExperience

    return (
        <SectionReveal id="experience" delay={120}>
            <Card>
                <CardHeader className="gap-3">
                    <Badge variant="outline" className="w-fit">
                        Work Experience
                    </Badge>
                    <CardTitle className="text-3xl sm:text-4xl">
                        Roles, ownership, and delivery history
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4">
                    <div className="relative mx-auto max-w-5xl py-4">
                        <div className="absolute bottom-0 left-4 top-0 w-px bg-border/70 md:left-1/2 md:-translate-x-1/2" />
                        {timelineItems.map((job, index) => {
                            return (
                                <SectionReveal
                                    className="relative pb-8 last:pb-0"
                                    delay={index * 80}
                                    key={`${job.company}-${job.period}`}
                                >
                                    <div className="absolute left-4 top-10 size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary shadow-[0_0_0_1px_hsl(var(--border))] md:left-1/2" />
                                    <div
                                        className={cn(
                                            'ml-10 md:ml-0 md:grid md:grid-cols-2 md:gap-10',
                                            index % 2 === 0
                                                ? ''
                                                : 'md:[&>*:first-child]:col-start-2'
                                        )}
                                    >
                                        <article className="rounded-[1.75rem] border border-border/60 bg-secondary/35 p-6 shadow-sm">
                                            <div className="mb-4 flex flex-col gap-3">
                                                <p className="text-sm text-muted-foreground">
                                                    {job.period}
                                                </p>
                                                <div className="space-y-1">
                                                    <h3 className="font-heading text-2xl">
                                                        {job.role}
                                                    </h3>
                                                    <p className="text-sm text-muted-foreground">
                                                        {job.company}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                                {job.summary}
                                            </p>
                                            <ul className="mt-4 grid gap-2 text-sm text-muted-foreground">
                                                {job.highlights.map(
                                                    (highlight) => (
                                                        <li
                                                            className="rounded-2xl border border-border/60 bg-background/50 px-4 py-3"
                                                            key={highlight}
                                                        >
                                                            {highlight}
                                                        </li>
                                                    )
                                                )}
                                            </ul>
                                        </article>
                                    </div>
                                </SectionReveal>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </SectionReveal>
    )
}
