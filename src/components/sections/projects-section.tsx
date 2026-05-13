import Image from 'next/image'
import type { ComponentProps } from 'react'
import { Clock3, ExternalLink, Github } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { buttonVariants } from '@/components/ui/button'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card'
import type { Project, ProjectStatus } from '@/lib/content'

const statusVariants: Record<
    ProjectStatus,
    ComponentProps<typeof Badge>['variant']
> = {
    development: 'warning',
    deprecated: 'muted',
    live: 'success',
}

const statusLabels: Record<ProjectStatus, string> = {
    development: 'In Development',
    deprecated: 'Deprecated',
    live: 'Live',
}

const projectImages: Record<string, string> = {
    'AI-Powered Notes with RAG': '/ai-notes.png',
    'Book Review Platform': '/book-review.png',
    'Ticketing App': '/ticket-app.png',
    'Recipe Shop': '/recipe-shop.png',
}

const pendingActionClassName = buttonVariants({
    variant: 'outline',
})

export function ProjectsSection({ projects }: { projects: Project[] }) {
    const [featuredProject, ...otherProjects] = projects

    return (
        <SectionReveal id="projects" delay={160}>
            <Card className="overflow-hidden">
                <CardHeader className="gap-3">
                    <Badge variant="outline" className="w-fit">
                        Projects
                    </Badge>
                    <CardTitle className="text-3xl sm:text-4xl">
                        Selected work that shows product range
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-6">
                    {featuredProject ? (
                        <SectionReveal delay={40}>
                            <Card className="flex overflow-hidden border-primary/18 bg-background/58">
                                <div className="grid lg:grid-cols-[1.08fr_0.92fr]">
                                    <div className="relative min-h-[18rem] border-b border-border/60 lg:min-h-full lg:border-b-0 lg:border-r">
                                        {projectImages[featuredProject.name] ? (
                                            <>
                                                <Image
                                                    src={
                                                        projectImages[
                                                            featuredProject.name
                                                        ]
                                                    }
                                                    alt={`${featuredProject.name} preview`}
                                                    fill
                                                    sizes="(max-width: 1024px) 100vw, 48vw"
                                                    className="object-cover object-top"
                                                />
                                                <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.04),hsl(var(--background)/0.14)_40%,hsl(var(--background)/0.84))]" />
                                            </>
                                        ) : null}
                                        <div className="absolute inset-x-0 top-0 flex flex-wrap items-center justify-between gap-3 p-5">
                                            <Badge
                                                variant="outline"
                                                className="bg-background/75"
                                            >
                                                Featured Project
                                            </Badge>
                                            <Badge
                                                variant={
                                                    statusVariants[
                                                        featuredProject.status
                                                    ]
                                                }
                                            >
                                                {
                                                    statusLabels[
                                                        featuredProject.status
                                                    ]
                                                }
                                            </Badge>
                                        </div>
                                    </div>
                                    <div className="flex h-full flex-col gap-5 p-6 sm:p-8">
                                        <div className="space-y-4">
                                            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                                                {featuredProject.date}
                                            </p>
                                            <CardTitle className="text-3xl">
                                                {featuredProject.name}
                                            </CardTitle>
                                            <div className="space-y-2">
                                                {featuredProject.summary.map(
                                                    (paragraph) => (
                                                        <CardDescription
                                                            className="text-sm leading-7 sm:text-base"
                                                            key={paragraph}
                                                        >
                                                            {paragraph}
                                                        </CardDescription>
                                                    )
                                                )}
                                            </div>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            {featuredProject.stack.map(
                                                (item) => (
                                                    <Badge
                                                        key={item}
                                                        variant="outline"
                                                    >
                                                        {item}
                                                    </Badge>
                                                )
                                            )}
                                        </div>
                                        <div className="mt-auto border-t border-border/60 pt-5">
                                            <div className="grid gap-3 sm:grid-cols-2">
                                            <a
                                                href={featuredProject.githubRepo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={buttonVariants({
                                                    variant: 'secondary',
                                                })}
                                            >
                                                <Github className="size-4" />
                                                GitHub Repo
                                            </a>
                                            {featuredProject.hostedLink ? (
                                                <a
                                                    href={
                                                        featuredProject.hostedLink
                                                    }
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={buttonVariants({
                                                        variant: 'outline',
                                                    })}
                                                >
                                                    <ExternalLink className="size-4" />
                                                    Live Demo
                                                </a>
                                            ) : (
                                                <span
                                                    className={`${pendingActionClassName} cursor-default justify-center border-dashed bg-background/38 text-muted-foreground opacity-75`}
                                                >
                                                    <Clock3 className="size-4" />
                                                    Hosted Link Pending
                                                </span>
                                            )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </SectionReveal>
                    ) : null}

                    <div className="grid gap-4 xl:grid-cols-3">
                        {otherProjects.map((project, index) => (
                            <SectionReveal delay={index * 80} key={project.name}>
                                <Card className="relative flex h-full flex-col overflow-hidden border-border/70 bg-background/55">
                                    {projectImages[project.name] ? (
                                        <div className="relative h-52 overflow-hidden border-b border-border/60 sm:h-56">
                                            <Image
                                                src={projectImages[project.name]}
                                                alt={`${project.name} preview`}
                                                fill
                                                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 30vw"
                                                className="object-cover object-top"
                                            />
                                            <div className="absolute inset-0 bg-[linear-gradient(180deg,hsl(var(--background)/0.08),hsl(var(--background)/0.16)_35%,hsl(var(--background)/0.72))]" />
                                            <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/85 to-transparent" />
                                        </div>
                                    ) : null}
                                    <CardHeader className="relative gap-4 bg-background/92">
                                        <div className="flex flex-wrap items-center justify-between gap-3">
                                            <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">
                                                {project.date}
                                            </p>
                                            <Badge
                                                variant={
                                                    statusVariants[project.status]
                                                }
                                            >
                                                {statusLabels[project.status]}
                                            </Badge>
                                        </div>
                                        <CardTitle className="text-2xl">
                                            {project.name}
                                        </CardTitle>
                                        <div className="space-y-2">
                                            {project.summary.map((paragraph) => (
                                                <CardDescription
                                                    className="text-sm leading-7"
                                                    key={paragraph}
                                                >
                                                    {paragraph}
                                                </CardDescription>
                                            ))}
                                        </div>
                                    </CardHeader>
                                    <CardContent className="relative flex flex-1 flex-col gap-5 bg-background/92">
                                        <div className="flex flex-wrap gap-2">
                                            {project.stack.map((item) => (
                                                <Badge key={item} variant="outline">
                                                    {item}
                                                </Badge>
                                            ))}
                                        </div>
                                        <div className="mt-auto border-t border-border/60 pt-5">
                                            <div className="grid gap-3 sm:grid-cols-2">
                                            <a
                                                href={project.githubRepo}
                                                target="_blank"
                                                rel="noreferrer"
                                                className={buttonVariants({
                                                    variant: 'secondary',
                                                })}
                                            >
                                                <Github className="size-4" />
                                                GitHub Repo
                                            </a>
                                            {project.hostedLink ? (
                                                <a
                                                    href={project.hostedLink}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className={buttonVariants({
                                                        variant: 'outline',
                                                    })}
                                                >
                                                    <ExternalLink className="size-4" />
                                                    Live Demo
                                                </a>
                                            ) : (
                                                <span
                                                    className={`${pendingActionClassName} cursor-default justify-center border-dashed bg-background/38 text-muted-foreground opacity-75`}
                                                >
                                                    <Clock3 className="size-4" />
                                                    Hosted Link Pending
                                                </span>
                                            )}
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </SectionReveal>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </SectionReveal>
    )
}
