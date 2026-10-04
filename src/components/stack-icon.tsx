import type { SimpleIcon } from 'simple-icons'
import {
    siAndroid,
    siAngular,
    siAnsible,
    siAxios,
    siCloudinary,
    siConvex,
    siDocker,
    siExpo,
    siExpress,
    siFirebase,
    siGit,
    siGithub,
    siGithubactions,
    siGitlab,
    siGrafana,
    siIos,
    siJavascript,
    siJest,
    siKubernetes,
    siMongodb,
    siNatsdotio,
    siNestjs,
    siNextdotjs,
    siNodedotjs,
    siNx,
    siPostgresql,
    siPostman,
    siPrometheus,
    siRadixui,
    siReact,
    siRedis,
    siRedux,
    siSqlite,
    siSwagger,
    siTailwindcss,
    siTerraform,
    siTypescript,
    siVercel,
} from 'simple-icons'

import { cn } from '@/lib/utils'

// Keyed by the exact labels in profile.json's skills. Anything not listed
// gets a neutral dot: either a concept with no logo (REST, RAG, Microservices)
// or a brand that asked Simple Icons to drop its mark (AWS, OpenAI,
// Microsoft), whose logos shouldn't be hand-copied in instead.
const icons: Record<string, SimpleIcon> = {
    JavaScript: siJavascript,
    TypeScript: siTypescript,
    React: siReact,
    'Next.js': siNextdotjs,
    Angular: siAngular,
    Redux: siRedux,
    'Tailwind CSS': siTailwindcss,
    'Radix UI': siRadixui,
    'React Native': siReact,
    Expo: siExpo,
    'EAS Build': siExpo,
    'EAS Submit': siExpo,
    'EAS CI/CD': siExpo,
    Android: siAndroid,
    iOS: siIos,
    'Node.js': siNodedotjs,
    'Express.js': siExpress,
    NestJS: siNestjs,
    PostgreSQL: siPostgresql,
    MongoDB: siMongodb,
    SQLite: siSqlite,
    Firebase: siFirebase,
    Convex: siConvex,
    Redis: siRedis,
    Terraform: siTerraform,
    Docker: siDocker,
    Kubernetes: siKubernetes,
    Ansible: siAnsible,
    'GitHub Actions': siGithubactions,
    Prometheus: siPrometheus,
    Grafana: siGrafana,
    'Monorepo (Nx, Turbo)': siNx,
    Postman: siPostman,
    Axios: siAxios,
    Swagger: siSwagger,
    'NATS Streaming': siNatsdotio,
    Cloudinary: siCloudinary,
    'Vercel AI SDK': siVercel,
    Jest: siJest,
    Git: siGit,
    GitHub: siGithub,
    GitLab: siGitlab,
}

/** Single-colour brand mark for a tool, or a neutral dot when there's none. */
export function StackIcon({
    name,
    className,
}: {
    name: string
    className?: string
}) {
    const icon = icons[name]
    return (
        <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden
            className={cn('size-3.5 shrink-0', className)}
        >
            {icon ? (
                <path d={icon.path} />
            ) : (
                <circle cx="12" cy="12" r="3.5" opacity="0.6" />
            )}
        </svg>
    )
}
