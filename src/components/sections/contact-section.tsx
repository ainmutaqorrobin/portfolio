import { ExternalLink, Github, Mail, MessageCircle, Phone } from 'lucide-react'

import { SectionReveal } from '@/components/section-reveal'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { Profile } from '@/lib/content'

export function ContactSection({ contact }: Pick<Profile, 'contact'>) {
    return (
        <SectionReveal id="contact" delay={200}>
            <Card className="overflow-hidden">
                <CardContent className="grid gap-8 p-7 sm:p-10 lg:grid-cols-[1.1fr_0.9fr]">
                    <div className="space-y-5">
                        <Badge variant="outline" className="w-fit">
                            Contact
                        </Badge>
                        <div className="space-y-3">
                            <h2 className="font-heading text-4xl tracking-[-0.05em] sm:text-5xl">
                                Let&apos;s build something useful.
                            </h2>
                            <p className="max-w-2xl text-base leading-8 text-muted-foreground">
                                If you are looking for a developer for web,
                                backend, mobile, or DevOps-related work, feel
                                free to reach out. I am open to freelance
                                projects, collaborations, and software
                                opportunities.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-3">
                        <a
                            href={contact.whatsapp}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Card className="border-border/70 bg-background/55 transition-transform duration-200 hover:-translate-y-1">
                                <CardContent className="flex items-center gap-4 p-5">
                                    <MessageCircle className="size-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            WhatsApp
                                        </p>
                                        <p className="font-medium">
                                            Chat on WhatsApp
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                        <a href={`mailto:${contact.email}`}>
                            <Card className="border-border/70 bg-background/55 transition-transform duration-200 hover:-translate-y-1">
                                <CardContent className="flex items-center gap-4 p-5">
                                    <Mail className="size-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Email
                                        </p>
                                        <p className="font-medium">
                                            {contact.email}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                        <a
                            href={contact.github}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Card className="border-border/70 bg-background/55 transition-transform duration-200 hover:-translate-y-1">
                                <CardContent className="flex items-center gap-4 p-5">
                                    <Github className="size-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            GitHub
                                        </p>
                                        <p className="font-medium">
                                            View repositories
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                        <a
                            href={contact.linkedin}
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Card className="border-border/70 bg-background/55 transition-transform duration-200 hover:-translate-y-1">
                                <CardContent className="flex items-center gap-4 p-5">
                                    <ExternalLink className="size-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            LinkedIn
                                        </p>
                                        <p className="font-medium">
                                            Connect professionally
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                        <a href={`tel:${contact.phone.replace(/\s+/g, '')}`}>
                            <Card className="border-border/70 bg-background/55 transition-transform duration-200 hover:-translate-y-1">
                                <CardContent className="flex items-center gap-4 p-5">
                                    <Phone className="size-5 text-primary" />
                                    <div>
                                        <p className="text-sm text-muted-foreground">
                                            Phone
                                        </p>
                                        <p className="font-medium">
                                            {contact.phone}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </a>
                    </div>
                </CardContent>
            </Card>
        </SectionReveal>
    )
}
