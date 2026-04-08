import { ArrowRight, Github, Mail, MapPin } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { Profile } from '@/lib/content'

export function HeroSection({ profile }: { profile: Profile }) {
    const { contact } = profile
    const skillGroups = Object.entries(profile.skills)

    return (
        <section
            id="hero"
            className="grid gap-6 lg:min-h-[calc(100vh-8rem)] lg:grid-cols-[1.35fr_0.9fr]"
        >
            <SectionReveal className="flex">
                <Card className="relative flex-1 overflow-hidden border-primary/15 bg-card/65">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.2),transparent_36%),radial-gradient(circle_at_bottom_right,hsl(196_100%_65%/0.15),transparent_28%)]" />
                    <CardContent className="relative flex h-full flex-col justify-between gap-10 p-7 sm:p-10">
                        <div className="space-y-6">
                            <Badge className="w-fit" variant="outline">
                                Personal Brand / Software Portfolio
                            </Badge>
                            <div className="space-y-4">
                                <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-[-0.06em] text-balance sm:text-6xl lg:text-7xl">
                                    {profile.name}
                                </h1>
                                <p className="text-base uppercase tracking-[0.3em] text-muted-foreground sm:text-sm">
                                    {profile.role} / {profile.location}
                                </p>
                                <p className="max-w-3xl text-lg leading-8 text-foreground/90 sm:text-xl">
                                    {profile.tagline}
                                </p>
                                <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                                    {profile.heroSummary}
                                </p>
                            </div>
                        </div>

                        <div className="flex flex-wrap items-center gap-3">
                            <a href="#projects">
                                <Button size="lg">
                                    View Projects
                                    <ArrowRight className="size-4" />
                                </Button>
                            </a>
                            <a href="#contact">
                                <Button size="lg" variant="outline">
                                    Contact Me
                                </Button>
                            </a>
                        </div>
                    </CardContent>
                </Card>
            </SectionReveal>

            <SectionReveal className="grid gap-6" delay={120}>
                <Card className="overflow-hidden">
                    <CardHeader>
                        <CardDescription className="uppercase tracking-[0.22em] text-primary">
                            Current Focus
                        </CardDescription>
                        <CardTitle className="text-3xl">
                            {profile.availability}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 text-sm text-muted-foreground">
                        <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-4">
                            <Mail className="mt-0.5 size-4 text-primary" />
                            <div className="space-y-1">
                                <p className="text-foreground">Email</p>
                                <a
                                    className="hover:text-foreground"
                                    href={`mailto:${contact.email}`}
                                >
                                    {contact.email}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-4">
                            <Github className="mt-0.5 size-4 text-primary" />
                            <div className="space-y-1">
                                <p className="text-foreground">GitHub</p>
                                <a
                                    className="break-all hover:text-foreground"
                                    href={contact.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {contact.github}
                                </a>
                            </div>
                        </div>
                        <div className="flex items-start gap-3 rounded-2xl border border-border/60 bg-secondary/40 p-4">
                            <MapPin className="mt-0.5 size-4 text-primary" />
                            <div className="space-y-1">
                                <p className="text-foreground">LinkedIn</p>
                                <a
                                    className="break-all hover:text-foreground"
                                    href={contact.linkedin}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {contact.linkedin}
                                </a>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardDescription className="uppercase tracking-[0.22em] text-primary">
                            Skills Snapshot
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4">
                        {skillGroups.map(([category, items]) => (
                            <div key={category} className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                    {category}
                                </p>
                                <div className="flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <Badge key={`${category}-${skill}`}>{skill}</Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </SectionReveal>
        </section>
    )
}
