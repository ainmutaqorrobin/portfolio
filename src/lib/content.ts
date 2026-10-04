import profile from '@/data/profile.json'
import projects from '@/data/projects.json'

export const siteUrl = 'https://mutaqorrobin.online'
export const siteTitle = 'Ain Mutaqorrobin | Software Engineer'
export const siteDescription =
    'Ain Mutaqorrobin is a software engineer in Kuala Lumpur who builds web and mobile apps end to end, from the interface to the APIs and deployment behind it.'

export type ProjectStatus = 'development' | 'deprecated' | 'live'

/** A box in the architecture diagram, placed on a `cols` × `rows` grid. */
export type DiagramNode = {
    id: string
    name: string
    detail: string
    /** Grid column; halves centre a box between two columns. */
    col: number
    row: number
    kind?: 'external' | 'store'
    highlight?: boolean
}

export type DiagramEdge = {
    from: string
    to: string
    label?: string
    /** Queues and events: drawn dashed and animated. */
    async?: boolean
    /** Arrowheads at both ends, e.g. publish and subscribe. */
    both?: boolean
    /** For boxes in the same row that sit too close for a straight arrow. */
    route?: 'over' | 'under'
}

/** A labelled boundary drawn behind a group of boxes (a host, a subnet). */
export type DiagramZone = {
    label: string
    col: number
    row: number
    colSpan: number
    rowSpan: number
    /** Pulls a nested zone in from its parent's edges. */
    inset?: number
}

export type Diagram = {
    title: string
    cols: number
    rows: number
    zones?: DiagramZone[]
    nodes: DiagramNode[]
    edges: DiagramEdge[]
}

export type CaseStudy = {
    headline: string
    problem: string[]
    stackGroups: { label: string; items: string }[]
    diagram: Diagram
    flow: {
        title: string
        /** Happy-path states, left to right; the last one renders as done. */
        states: string[]
        failState?: string
        steps: string[]
    }
    decisions: { tag: string; title: string; body: string }[]
    deploy: { comment: string; command: string }[]
    /** Hidden until written, so a draft never ships as a visible TODO. */
    lessons: string[]
}

export type Project = {
    slug: string
    name: string
    date: string
    featured: boolean
    stack: string[]
    status: ProjectStatus
    githubRepo: string
    hostedLink: string
    tagline: string
    summary: string[]
    /** Real screenshot in public/. Projects without a UI use `command`. */
    image?: string
    /** The one-liner that runs the project, shown for CLIs and infra. */
    command?: string
    caseStudy?: CaseStudy
}

export type WorkExperience = {
    company: string
    role: string
    location: string
    period: string
    summary: string
    tags: string[]
    highlights: string[]
}

export type Profile = {
    name: string
    role: string
    location: string
    timezone: string
    tagline: string
    heroSummary: string
    availability: string
    contact: {
        email: string
        github: string
        linkedin: string
        phone: string
        whatsapp: string
    }
    /** The downloadable résumé, served from public/. */
    resume: { pdf: string; pages: number }
    about: string[]
    principles: { title: string; body: string }[]
    learning: string[]
    workExperience: WorkExperience[]
    education: { title: string; school: string; period: string; note: string }[]
    /** Each links to the issuer's public verification page. */
    certifications: { name: string; issuer: string; url: string }[]
    skills: Record<string, string[]>
}

export const siteProfile = profile as Profile
export const siteProjects = projects as Project[]

export function getProject(slug: string) {
    return siteProjects.find((project) => project.slug === slug)
}

export const caseStudyProjects = siteProjects.filter(
    (project) => project.caseStudy
)

export const statusLabel: Record<ProjectStatus, string> = {
    live: 'Live',
    development: 'In development',
    deprecated: 'Archived',
}

export const statusTone: Record<ProjectStatus, string> = {
    live: 'text-ok',
    development: 'text-accent',
    deprecated: 'text-faint',
}
