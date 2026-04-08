import type { ComponentProps } from 'react'
import { ExternalLink, Github } from 'lucide-react'

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
import type { Project, ProjectStatus } from '@/lib/content'
import { cn } from '@/lib/utils'

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

export function ProjectsSection({ projects }: { projects: Project[] }) {
    return (
        <SectionReveal id="projects" delay={160}>
            <Card>
                <CardHeader className="gap-3">
                    <Badge variant="outline" className="w-fit">
                        Skills and Projects
                    </Badge>
                    <CardTitle className="text-3xl sm:text-4xl">
                        Stacks and Projects I have built
                    </CardTitle>
                </CardHeader>
                <CardContent className="grid gap-4 lg:grid-cols-2">
                    {projects.map((project, index) => (
                        <SectionReveal delay={index * 80} key={project.name}>
                            <Card
                                className={cn(
                                    'relative h-full overflow-hidden border-border/70 bg-background/55',
                                    project.status === 'deprecated' &&
                                        'border-red-400/15 bg-red-400/5'
                                )}
                            >
                                {projectImages[project.name] ? (
                                    <div className="relative h-52 overflow-hidden border-b border-border/60 sm:h-60">
                                        <div
                                            className="absolute inset-0 bg-cover bg-center"
                                            style={{
                                                backgroundImage: `url(${projectImages[project.name]})`,
                                            }}
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
                                <CardContent className="relative grid gap-5 bg-background/92">
                                    <div className="flex flex-wrap gap-2">
                                        {project.stack.map((item) => (
                                            <Badge key={item} variant="outline">
                                                {item}
                                            </Badge>
                                        ))}
                                    </div>
                                    <div className="flex flex-wrap gap-3">
                                        <a
                                            href={project.githubRepo}
                                            target="_blank"
                                            rel="noreferrer"
                                        >
                                            <Button variant="secondary">
                                                <Github className="size-4" />
                                                GitHub Repo
                                            </Button>
                                        </a>
                                        {project.hostedLink ? (
                                            <a
                                                href={project.hostedLink}
                                                target="_blank"
                                                rel="noreferrer"
                                            >
                                                <Button variant="outline">
                                                    <ExternalLink className="size-4" />
                                                    Live Demo
                                                </Button>
                                            </a>
                                        ) : (
                                            <Badge variant="muted">
                                                Hosted link pending
                                            </Badge>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </SectionReveal>
                    ))}
                </CardContent>
            </Card>
        </SectionReveal>
    )
}
