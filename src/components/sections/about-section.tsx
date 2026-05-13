import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import type { Profile } from '@/lib/content'

const principles = [
    {
        title: 'Practical Shipping',
        body: 'I prefer useful software over impressive complexity, and I care about whether teams can keep delivering after launch.',
    },
    {
        title: 'Cross-Stack Ownership',
        body: 'Frontend, backend, deployment, and debugging all matter when product quality depends on the full system.',
    },
    {
        title: 'Calm Engineering',
        body: 'Readable structure, documented decisions, and repeatable workflows beat heroics when deadlines start to tighten.',
    },
] as const

export function AboutSection({ about }: Pick<Profile, 'about'>) {
    return (
        <SectionReveal id="about" delay={80}>
            <Card className="overflow-hidden">
                <CardContent className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[0.42fr_0.58fr]">
                    <div className="space-y-5">
                        <Badge variant="outline" className="w-fit">
                            About Me
                        </Badge>
                        <div className="space-y-3">
                            <CardTitle className="text-3xl sm:text-4xl">
                                What I build and what I care about when shipping
                                it
                            </CardTitle>
                            <p className="max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                                The strongest portfolio signal is not a long
                                stack list. It is showing how you think,
                                collaborate, and keep products stable while they
                                evolve.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-4">
                        <div className="grid gap-4 md:grid-cols-3">
                            {about.map((paragraph) => (
                                <p
                                    key={paragraph}
                                    className="rounded-[1.7rem] border border-border/60 bg-secondary/42 p-5 text-sm leading-7 text-muted-foreground sm:text-base"
                                >
                                    {paragraph}
                                </p>
                            ))}
                        </div>

                        <div className="grid gap-4 border-t border-border/60 pt-5 md:grid-cols-3">
                            {principles.map((principle) => (
                                <div
                                    key={principle.title}
                                    className="rounded-[1.7rem] border border-border/60 bg-background/55 p-5"
                                >
                                    <p className="text-xs uppercase tracking-[0.24em] text-primary">
                                        {principle.title}
                                    </p>
                                    <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                        {principle.body}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </SectionReveal>
    )
}
