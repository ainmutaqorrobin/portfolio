import { Flag, Play } from 'lucide-react'
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
            <Card className="overflow-hidden">
                <CardContent className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.34fr_0.66fr]">
                    <div className="space-y-5 lg:sticky lg:top-28 lg:self-start">
                        <Badge variant="outline" className="w-fit">
                            Work Experience
                        </Badge>
                        <div className="space-y-3">
                            <CardTitle className="text-3xl sm:text-4xl">
                                Roles, ownership, and delivery history
                            </CardTitle>
                            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                Experience matters most when it proves range:
                                product work, maintenance, debugging, and the
                                operational side that keeps releases moving.
                            </p>
                        </div>
                    </div>

                    <div className="relative mx-auto w-full max-w-5xl py-1">
                        <div className="absolute bottom-0 left-[1.05rem] top-0 w-px bg-linear-to-b from-primary/60 via-border/80 to-transparent" />
                        {timelineItems.map((job, index) => {
                            const [periodStart, periodEnd] = job.period
                                .split(' - ')
                                .map((value) => value.trim())
                            const isCurrentRole = periodEnd === 'Present'

                            return (
                                <SectionReveal
                                    className="relative pb-8 last:pb-0"
                                    delay={index * 80}
                                    key={`${job.company}-${job.period}`}
                                >
                                    <div className="absolute left-[1.05rem] top-10 size-4 -translate-x-1/2 rounded-full border-4 border-background bg-primary shadow-[0_0_0_1px_hsl(var(--border))]" />
                                    <div className="ml-10 grid gap-4 md:grid-cols-[9rem_1fr] md:gap-6">
                                        <div className="flex flex-col gap-3 md:pt-4">
                                            <div className="flex items-center gap-3">
                                                <span className="font-heading text-2xl tracking-[-0.06em] text-foreground/82">
                                                    {String(index + 1).padStart(
                                                        2,
                                                        '0'
                                                    )}
                                                </span>
                                                <span className="h-px flex-1 bg-border/70" />
                                            </div>
                                            <div className="rounded-[1.35rem] border border-border/60 bg-background/58 px-4 py-3">
                                                <div className="flex items-center gap-2 text-[0.68rem] font-medium uppercase tracking-[0.26em] text-muted-foreground">
                                                    <Play className="size-3.5 shrink-0" />
                                                    <span>{periodStart}</span>
                                                </div>
                                                {periodEnd ? (
                                                    <div
                                                        className={cn(
                                                            'mt-2 flex items-center gap-2 text-[0.68rem] uppercase tracking-[0.26em] text-muted-foreground',
                                                            isCurrentRole &&
                                                                'font-semibold text-foreground'
                                                        )}
                                                    >
                                                        <Flag className="size-3.5 shrink-0" />
                                                        <span>{periodEnd}</span>
                                                    </div>
                                                ) : null}
                                            </div>
                                        <div className="flex flex-wrap gap-2">
                                            {isCurrentRole ? (
                                                    <Badge className="w-fit bg-primary/12 text-primary">
                                                        Current Role
                                                    </Badge>
                                                ) : null}
                                                <Badge
                                                    variant="outline"
                                                    className="w-fit bg-background/60"
                                                >
                                                    {index === 0
                                                        ? 'Most Recent'
                                                        : 'Previous Role'}
                                                </Badge>
                                            </div>
                                        </div>

                                        <article
                                            className={cn(
                                                'rounded-[1.9rem] border p-6 shadow-sm transition-colors',
                                                isCurrentRole
                                                    ? 'border-primary/25 bg-primary/[0.06]'
                                                    : 'border-border/60 bg-background/58'
                                            )}
                                        >
                                            <div className="mb-5 flex flex-col gap-4 border-b border-border/60 pb-5 sm:flex-row sm:items-start sm:justify-between">
                                                <div className="space-y-1">
                                                    <p className="text-[0.7rem] uppercase tracking-[0.28em] text-muted-foreground">
                                                        {job.company}
                                                    </p>
                                                    <h3 className="font-heading text-2xl">
                                                        {job.role}
                                                    </h3>
                                                    <p className="max-w-2xl text-sm leading-7 text-muted-foreground sm:text-base">
                                                        {job.summary}
                                                    </p>
                                                </div>
                                            </div>
                                            <ul className="grid gap-3 text-sm text-muted-foreground">
                                                {job.highlights.map(
                                                    (highlight) => (
                                                        <li
                                                            className={cn(
                                                                'rounded-[1.35rem] border px-4 py-3 leading-7',
                                                                isCurrentRole
                                                                    ? 'border-primary/20 bg-background/54'
                                                                    : 'border-border/60 bg-background/50'
                                                            )}
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
