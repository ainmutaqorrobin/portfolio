import Image from 'next/image'
import {
    ArrowRight,
    Github,
    Linkedin,
    Mail,
    MapPin,
} from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { SkillIcon } from '@/components/skill-icon'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { Profile } from '@/lib/content'

const statLabels = ['Selected Projects', 'Roles Held', 'Core Domains'] as const
const portraitSrc = '/Myself-v2.png'

export function HeroSection({
    profile,
    projectCount,
}: {
    profile: Profile
    projectCount: number
}) {
    const { contact } = profile
    const skillGroups = Object.entries(profile.skills)
    const statValues = [
        `${projectCount}+`,
        `${profile.workExperience.length}`,
        `${skillGroups.length}`,
    ]

    return (
        <section id="hero" className="grid items-start gap-6 xl:grid-cols-[1.15fr_0.85fr]">
            <SectionReveal className="xl:row-span-2">
                <Card className="relative overflow-hidden border-primary/18 bg-card/72">
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(var(--primary)/0.22),transparent_34%),radial-gradient(circle_at_90%_14%,hsl(var(--accent)/0.24),transparent_28%),linear-gradient(135deg,hsl(var(--background)/0),hsl(var(--background)/0.3)_70%,hsl(var(--foreground)/0.03))]" />
                    <CardContent className="relative grid gap-10 p-7 sm:p-10">
                        <div className="flex flex-wrap items-center justify-between gap-3">
                            <Badge className="w-fit bg-background/75" variant="outline">
                                Editorial / Delivery-Focused Portfolio
                            </Badge>
                            <p className="text-xs uppercase tracking-[0.34em] text-muted-foreground">
                                Open for selected builds
                            </p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-4">
                                <p className="text-sm uppercase tracking-[0.36em] text-muted-foreground">
                                    {profile.location}
                                </p>
                                <h1 className="max-w-4xl font-heading text-5xl font-semibold tracking-[-0.07em] text-balance sm:text-6xl lg:text-7xl">
                                    <span className="block text-foreground/72">
                                        {profile.role}
                                    </span>
                                    <span className="mt-2 block">{profile.name}</span>
                                </h1>
                                <p className="max-w-3xl text-lg leading-8 text-foreground/92 sm:text-[1.35rem]">
                                    {profile.tagline}
                                </p>
                                <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                                    {profile.heroSummary}
                                </p>
                            </div>

                            <div className="flex flex-wrap items-center gap-3">
                                <a
                                    href="#projects"
                                    className={buttonVariants({
                                        size: 'lg',
                                    })}
                                >
                                    View Projects
                                    <ArrowRight className="size-4" />
                                </a>
                                <a
                                    href="#contact"
                                    className={buttonVariants({
                                        size: 'lg',
                                        variant: 'outline',
                                    })}
                                >
                                    Contact Me
                                </a>
                            </div>
                        </div>

                        <div className="grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-3">
                            {statLabels.map((label, index) => (
                                <div
                                    key={label}
                                    className="flex min-h-[8.5rem] flex-col items-center justify-center rounded-[1.7rem] border border-border/60 bg-background/55 p-5 text-center"
                                >
                                    <p className="text-xs uppercase tracking-[0.28em] text-muted-foreground">
                                        {label}
                                    </p>
                                    <p className="mt-4 font-heading text-4xl tracking-[-0.06em] text-foreground">
                                        {statValues[index]}
                                    </p>
                                </div>
                            ))}
                        </div>

                        <div className="grid justify-items-center gap-5 border-t border-border/60 pt-6 text-center">
                            <div className="space-y-2">
                                <p className="text-xs uppercase tracking-[0.28em] text-primary">
                                    What I optimize for
                                </p>
                                <p className="mx-auto max-w-2xl text-sm leading-7 text-muted-foreground">
                                    Maintainable product delivery, cross-stack
                                    ownership, and systems that teams can keep
                                    shipping on without friction.
                                </p>
                            </div>
                            <div className="grid w-full max-w-3xl gap-3 sm:grid-cols-3">
                                {[
                                    'Maintainable codebases',
                                    'Fast iteration loops',
                                    'Production-ready delivery',
                                ].map((focus) => (
                                    <div
                                        key={focus}
                                        className="rounded-[1.6rem] border border-border/60 bg-background/55 px-4 py-4 text-sm leading-6 text-foreground/88"
                                    >
                                        {focus}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </SectionReveal>

            <SectionReveal delay={140}>
                <Card className="overflow-hidden border-primary/14 bg-card/76">
                    <CardContent className="p-4">
                        <div className="relative overflow-hidden rounded-[1.8rem] border border-border/60 bg-[linear-gradient(180deg,hsl(var(--primary)/0.18),hsl(var(--secondary))_34%,hsl(var(--background)))]">
                            <div className="absolute inset-x-0 top-0 z-10 flex flex-wrap justify-between gap-2 p-4">
                                <Badge
                                    variant="outline"
                                    className="bg-background/72"
                                >
                                    Based in Malaysia
                                </Badge>
                                <Badge
                                    variant="outline"
                                    className="bg-background/72"
                                >
                                    Software Engineer
                                </Badge>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 z-20 bg-linear-to-t from-background via-background/75 to-transparent p-5">
                                <p className="font-heading text-2xl text-foreground">
                                    {profile.name}
                                </p>
                                <p className="max-w-xs text-sm leading-6 text-muted-foreground">
                                    Building web, backend, mobile, and delivery
                                    workflows with a bias toward clean systems.
                                </p>
                            </div>
                            <div className="absolute inset-x-0 bottom-0 h-28 bg-[radial-gradient(circle_at_center,hsl(var(--foreground)/0.16),transparent_70%)] blur-2xl" />
                            <Image
                                src={portraitSrc}
                                alt={`${profile.name} portrait`}
                                width={1440}
                                height={1800}
                                sizes="(min-width: 1280px) 34vw, (min-width: 640px) 50vw, 100vw"
                                className="relative z-10 mx-auto h-90 w-auto max-w-full object-contain object-bottom pt-14 sm:h-[440px] lg:h-[520px]"
                                priority
                            />
                        </div>
                    </CardContent>
                </Card>
            </SectionReveal>

            <SectionReveal delay={220}>
                <Card className="overflow-hidden">
                    <CardHeader className="gap-3">
                        <CardDescription className="uppercase tracking-[0.22em] text-primary">
                            Contact & Availability
                        </CardDescription>
                        <CardTitle className="text-3xl">
                            {profile.availability}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="grid gap-4 text-sm text-muted-foreground">
                        <div className="grid gap-3 sm:grid-cols-2">
                            <a
                                className="rounded-[1.6rem] border border-border/60 bg-secondary/35 p-4 transition-transform duration-200 hover:-translate-y-1 hover:text-foreground"
                                href={`mailto:${contact.email}`}
                            >
                                <div className="flex items-start gap-3">
                                    <Mail className="mt-0.5 size-4 text-primary" />
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                            Email
                                        </p>
                                        <p className="break-all text-foreground">
                                            {contact.email}
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <a
                                className="rounded-[1.6rem] border border-border/60 bg-secondary/35 p-4 transition-transform duration-200 hover:-translate-y-1 hover:text-foreground"
                                href={contact.linkedin}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="flex items-start gap-3">
                                    <Linkedin className="mt-0.5 size-4 text-primary" />
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                            LinkedIn
                                        </p>
                                        <p className="text-foreground">
                                            Connect professionally
                                        </p>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <a
                                className="rounded-[1.6rem] border border-border/60 bg-secondary/35 p-4 transition-transform duration-200 hover:-translate-y-1 hover:text-foreground"
                                href={contact.github}
                                target="_blank"
                                rel="noreferrer"
                            >
                                <div className="flex items-start gap-3">
                                    <Github className="mt-0.5 size-4 text-primary" />
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                            GitHub
                                        </p>
                                        <p className="break-all text-foreground">
                                            Review my repositories
                                        </p>
                                    </div>
                                </div>
                            </a>
                            <div className="rounded-[1.6rem] border border-border/60 bg-secondary/35 p-4">
                                <div className="flex items-start gap-3">
                                    <MapPin className="mt-0.5 size-4 text-primary" />
                                    <div className="space-y-1">
                                        <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground">
                                            Location
                                        </p>
                                        <p className="text-foreground">
                                            {profile.location}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </SectionReveal>

            <SectionReveal delay={280} className="xl:col-span-2">
                <Card className="border-border/70 bg-card/68">
                    <CardHeader>
                        <CardDescription className="uppercase tracking-[0.22em] text-primary">
                            Stack & Skills
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 lg:grid-cols-4">
                        {skillGroups.map(([category, items]) => (
                            <div
                                key={category}
                                className="rounded-[1.75rem] border border-border/60 bg-background/46 p-4"
                            >
                                <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">
                                    {category}
                                </p>
                                <div className="mt-4 flex flex-wrap gap-2">
                                    {items.map((skill) => (
                                        <Badge
                                            key={`${category}-${skill}`}
                                            className="gap-2 border-border/70 bg-background/70 normal-case tracking-normal"
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
        </section>
    )
}
