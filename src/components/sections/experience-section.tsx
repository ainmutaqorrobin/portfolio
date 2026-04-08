import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Profile } from '@/lib/content'

export function ExperienceSection({
    workExperience,
}: Pick<Profile, 'workExperience'>) {
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
                    {workExperience.map((job, index) => (
                        <article
                            className="grid gap-5 rounded-[1.75rem] border border-border/60 bg-secondary/35 p-6 lg:grid-cols-[140px_1fr]"
                            key={`${job.company}-${job.period}`}
                        >
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.24em] text-primary">
                                    Role {String(index + 1).padStart(2, '0')}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {job.period}
                                </p>
                            </div>
                            <div className="space-y-4">
                                <div>
                                    <h3 className="font-heading text-2xl">
                                        {job.role}
                                    </h3>
                                    <p className="mt-1 text-sm text-muted-foreground">
                                        {job.company}
                                    </p>
                                </div>
                                <p className="max-w-3xl text-sm leading-7 text-muted-foreground sm:text-base">
                                    {job.summary}
                                </p>
                                <ul className="grid gap-2 text-sm text-muted-foreground">
                                    {job.highlights.map((highlight) => (
                                        <li
                                            className="rounded-2xl border border-border/60 bg-background/50 px-4 py-3"
                                            key={highlight}
                                        >
                                            {highlight}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </article>
                    ))}
                </CardContent>
            </Card>
        </SectionReveal>
    )
}
