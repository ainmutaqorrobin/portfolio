import Image from 'next/image'
import { ArrowRight, Github, Mail, MapPin } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { SkillIcon } from '@/components/skill-icon'
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
        <section id="hero" className="grid items-start gap-6 lg:grid-cols-3">
            <SectionReveal className="lg:col-span-3">
                <Card className="relative overflow-hidden border-primary/15 bg-card/65">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.2),transparent_36%),radial-gradient(circle_at_bottom_right,hsl(196_100%_65%/0.15),transparent_28%)]" />
                    <CardContent className="relative grid gap-8 p-7 sm:p-10">
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

            <SectionReveal delay={120}>
                <Card>
                    <CardHeader>
                        <CardDescription className="uppercase tracking-[0.22em] text-primary">
                            Stack & Skills
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
                                        <Badge
                                            key={`${category}-${skill}`}
                                            className="gap-2 normal-case tracking-normal"
                                        >
                                            <SkillIcon skill={skill} />
                                            {skill}
                                        </Badge>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </SectionReveal>

            <SectionReveal delay={180}>
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
            </SectionReveal>

            <SectionReveal delay={240}>
                <Card className="overflow-hidden border-primary/15 bg-card/70">
                    <CardContent className="p-4">
                        <div className="relative overflow-hidden rounded-3xl border border-border/60 bg-[linear-gradient(180deg,hsl(var(--primary)/0.18),hsl(var(--secondary))_38%,hsl(var(--background)))]">
                            <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap justify-between gap-2 p-4">
                                <Badge
                                    variant="outline"
                                    className="bg-background/70"
                                >
                                    Based in Malaysia
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-background/70"
                                >
                                    Full-Stack Developer
                                </Badge>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 z-10 bg-linear-to-t from-background via-background/60 to-transparent p-5">
                                <p className="font-heading text-xl text-foreground">
                                    {profile.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Building web, backend, mobile, and delivery
                                    workflows.
                                </p>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.16),transparent_70%)] blur-2xl" />
                            <Image
                                src="/Myself.png"
                                alt={`${profile.name} portrait`}
                                width={1440}
                                height={1800}
                                sizes="(min-width: 1024px) 32vw, (min-width: 640px) 50vw, 100vw"
                                className="relative z-1 mx-auto h-90 w-auto max-w-full object-contain object-bottom pt-14 sm:h-[440px] lg:h-[520px]"
                                priority
                            />
                        </div>
                    </CardContent>
                </Card>
            </SectionReveal>
        </section>
    )
}
